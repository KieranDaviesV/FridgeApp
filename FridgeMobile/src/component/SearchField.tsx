import React, { Component } from "react";
import { AppRegistry, TextInput } from "react-native";

interface IAppSearchField {
    text: string;
}
export default class SearchField extends Component {
    constructor(props: any, state: IAppSearchField) {
        super(props);
        this.state = { text: "" };
    }
    public render() {
        // @ts-ignore
        const {text} = this.state;
        return (
            <TextInput
                style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                onChange={(text) => this.setState({ text })}
                value={text}
            />
        );
    }
}
