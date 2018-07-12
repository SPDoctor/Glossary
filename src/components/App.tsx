import * as React from 'react';
import { Fabric, PrimaryButton, ButtonType, Icon } from 'office-ui-fabric-react';
import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import HelpPage from './HelpPage';
import HeroList, { HeroListItem } from './HeroList';
import WordList, { WordListItem } from './WordList';
import Dictionary from '../Dictionary';

export interface AppProps {
    title: string;
    isOfficeInitialized: boolean;
}

export interface AppState {
    heroListItems: HeroListItem[];
    glossary: WordListItem[];
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            heroListItems: [],
            glossary: []
        };
    }

    componentDidMount() {
        this.setState({
            heroListItems: [
                {
                    icon: 'BulletedList',
                    primaryText: 'Quickly generate a glossary for your document'
                },
                {
                    icon: 'Education',
                    primaryText: 'Educate your readers by helping them learn terminology'
                },
                {
                    icon: 'WordLogo',
                    primaryText: 'Give your Word documents a professional look'
                }
            ]
        });

        this.setState({ glossary: [] }); // initially empty
    }

    findWords(content: string): WordListItem[] {
        var dictionary = new Dictionary();
        var regex = new RegExp("(\\w+)", "g");
        var glossary: WordListItem[] = [];
        var words = content.match(regex);
        for (var dictionaryEntry of dictionary.getEntries()) {
            if (words.indexOf(dictionaryEntry.word) > -1) {
                glossary.push(dictionaryEntry);
            }
        }
        return glossary;
    }

    generateGlossary(content: string): WordListItem[] {
        if (content) return this.findWords(content);
        else return [];
    }


    clickCreate = async () => {
        if (!this.props.isOfficeInitialized) {
            // test data
            var testContent = "Lorem ipsum IDE ovum UI es intransit CLI";
            this.setState({ glossary: this.generateGlossary(testContent) });
        }
        else {
            await Word.run(async (context) => {
                var range = context.document.body.getRange('Whole');
                range.load("text");
                await context.sync();
                this.setState({ glossary: this.generateGlossary(range.text) });
            });
        }
    }

    clickAppend = async () => {
        if (this.props.isOfficeInitialized) {
            await Word.run(async (context) => {
                var body = context.document.body;
                body.insertParagraph('Glossary', 'End').styleBuiltIn = Word.Style.heading1;
                for (var item of this.state.glossary) {
                    var line = item.word + ": " + item.definition;
                    body.insertParagraph(line, 'End').styleBuiltIn = Word.Style.normal;
                }
                await context.sync();
            });
        }
    }


    render() {
        return (
            <Fabric>
                <Pivot linkSize={PivotLinkSize.large} linkFormat={PivotLinkFormat.tabs}>
                    <PivotItem linkText="Home" itemKey="home" key="home">
                        <HeroList title={this.props.title} icon='assets/logo-filled.png' message="Automatic Glossary Tool" items={this.state.heroListItems}>
                            <p>
                                <PrimaryButton buttonType={ButtonType.hero} iconProps={{ iconName: 'ChevronRight' }} onClick={this.clickCreate}>Create Glossary</PrimaryButton>
                            </p>
                            <p>
                                <PrimaryButton buttonType={ButtonType.hero} disabled={this.state.glossary.length === 0} iconProps={{ iconName: 'ChevronRight' }} onClick={this.clickAppend}>Append Glossary</PrimaryButton>
                            </p>
                        </HeroList>
                    </PivotItem>
                    <PivotItem linkText="Glossary" itemKey="glossary" key="glossary">
                        <WordList emptymessage="It looks as though you don't have any words in the glossary yet - try clicking on the Create Glossary button on the Home tab" items={this.state.glossary}></WordList>
                    </PivotItem>
                    <PivotItem linkText="Help" itemKey="help" key="help">
                        <HelpPage logo='assets/logo-filled.png' title={this.props.title} />
                    </PivotItem>
                </Pivot>
            </Fabric>
        );
    }
}
