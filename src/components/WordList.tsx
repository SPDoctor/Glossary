import * as React from 'react';

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

        if(listItems.length === 0) return (
            <h2>{this.props.emptymessage}</h2>
        );
        return (
            <div className='wordlist'>
                <ul className='ms-List ms-welcome__features ms-u-slideUpIn10'>
                    {listItems}
                </ul>
            </div>
        );
    }
}
