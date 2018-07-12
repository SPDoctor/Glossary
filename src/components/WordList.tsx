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
            <li key={index}>
                <div className="col-1">{item.word}</div>
                <div className="col-2">{item.definition}</div>
            </li>
        ));

        if (listItems.length === 0) return (
            <div>
                <MessageBar messageBarType={MessageBarType.warning} isMultiline={true}>{this.props.emptymessage}</MessageBar>
            </div>
        );
        return (
            <div className='word-list'>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}
