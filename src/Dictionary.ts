
import {WordListItem} from './components/WordList';

export default class Dictionary {
    static dictionary: WordListItem[] = [
        { word: "Angular", definition: "A JavaScript single page application framework" },
        { word: "CLI", definition: "Command line interface" },
        { word: "GUI", definition: "Graphical User Interface" },
        { word: "Gulp", definition: "An open-source Node-based build automation tool" },
        { word: "IDE", definition: "Integrated Development Environment" },
        { word: "Node", definition: "NodeJS, a JavaScript-based server technology using the Chrome V8 JavaScript engine" },
        { word: "npm", definition: "Node package manager tool (although not an abbreviation)" },
        { word: "React", definition: "A JavaScript library for building user interfaces" },
        { word: "SPA", definition: "Single Page Application" },
        { word: "UI", definition: "User Interface" },
        { word: "UX", definition: "User Experience" },
        { word: "VS", definition: "Visual Studio - a Microsoft IDE product" },
        { word: "VSCode", definition: "Visual Studio Code - a Microsoft code editor" },
        { word: "XD", definition: "Adobe XD design tool" },
        { word: "Yeoman", definition: "An open source tool for project scaffolding" }
    ];

    public getEntries():WordListItem[] {
        return Dictionary.dictionary;
    }
}
