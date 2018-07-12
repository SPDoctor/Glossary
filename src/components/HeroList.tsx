import * as React from 'react';
import { Icon } from 'office-ui-fabric-react';

export interface HeroListItem {
    icon: string;
    primaryText: string;
}

export interface HeroListProps {
    message: string;
    items: HeroListItem[];
    icon: string;
    title: string;
}

export default class HeroList extends React.Component<HeroListProps> {
    render() {
        const listItems = this.props.items.map((item, index) => (
            <li key={index}>
                <div className="row">
                    <div className="col-1"><Icon iconName={item.icon} /></div>
                    <div className="col-2">{item.primaryText}</div>
                </div>
            </li>
        ));

        return (
            <section className="hero-list">
                <h1>
                    <img width='90' height='90' src={this.props.icon} alt={this.props.title} title={this.props.title} />
                </h1>
                <h2 className="ms-fontColor-themeDark">{this.props.message}</h2>
                <ul>
                    {listItems}
                </ul>
                {this.props.children}
            </section>
        );
    }
}
