import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';

export interface WordListItem {
    word: string;
    definition: string;
}

export interface WordListProps {
    emptymessage: string;
    items: WordListItem[]
}

export default class WordList extends React.Component<WordListProps> {
    render() {
        const listItems = this.props.items.map((item, index) => (
            <li className='ms-ListItem' key={index}>
                <span className='ms-font-m ms-fontColor-neutralPrimary'>{item.word}</span>
                :&nbsp;
                <span className='ms-font-m ms-fontColor-neutralPrimary'>{item.definition}</span>
            </li>
        ));

        if (listItems.length === 0) return (
            <div>
                <MessageBar messageBarType={MessageBarType.warning} isMultiline={true}>{this.props.emptymessage}</MessageBar>
            </div>
        );
        return (
            <div className='wordlist'>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}
