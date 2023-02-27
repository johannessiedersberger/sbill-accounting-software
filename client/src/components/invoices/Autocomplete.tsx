import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

interface AutoCompleteProps {
    onUpdateClient: (client: string) => void,
    suggestions: string[],

}

interface AutoCompleteState {
    activeSuggestion: number,
    // The suggestions that match the user's input
    filteredSuggestions: string[],
    // Whether or not the suggestion list is shown
    showSuggestions: boolean,
    // What the user has entered
    userInput: string,

    onUpdateClient: (client: string) => void,
}

class Autocomplete extends Component<AutoCompleteProps, AutoCompleteState> {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        suggestions: []
    };


    constructor(props: AutoCompleteProps) {
        super(props);

        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: "",

            onUpdateClient: props.onUpdateClient
        };
    }

    setClient = (clientString: string) => {
        const { suggestions }: any = this.props;
        const userInput = clientString;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            (suggestion: string) =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: false,
            userInput: clientString
        });
        const { activeSuggestion, }: any = this.state;
        this.state.onUpdateClient(filteredSuggestions[activeSuggestion]);
    }

    onChange = (e: { currentTarget: { value: any; }; }) => {
        const { suggestions }: any = this.props;
        const userInput = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            (suggestion: string) =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
        const { activeSuggestion, }: any = this.state;
        this.state.onUpdateClient(filteredSuggestions[activeSuggestion]);
    };

    onClick = (e: any) => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
        const { activeSuggestion, filteredSuggestions }: any = this.state;
        this.state.onUpdateClient(filteredSuggestions[activeSuggestion]);
    };

    onKeyDown = (e: any) => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
            this.state.onUpdateClient(filteredSuggestions[activeSuggestion]);
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
            this.state.onUpdateClient(filteredSuggestions[activeSuggestion]);
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
            this.state.onUpdateClient(filteredSuggestions[activeSuggestion]);
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <Suggestions className="uk-list uk-list-divider">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                //className = "suggestion-active";
                                return (
                                    <SuggestionActive key={suggestion} onClick={onClick}>
                                        {suggestion}
                                    </SuggestionActive>


                                );
                            }


                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </Suggestions>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>This Client does not exist!</em>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <input
                    className="uk-input col"
                    id="customer-name"
                    type="text"
                    placeholder="Search Client"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                />
                {suggestionsListComponent}
            </Fragment>
        );
    }
}

const Suggestions = styled.ul`
    border: 1px solid #999;
    border-top-width: 0;
    
    margin-top: 0;
    max-height: 143px;
    overflow-y: auto;
    padding-left: 0;
    

    li {
        padding: 0.5rem;
        &:hover {
            background-color: "#6c63ff";
            color: #1e87f0;
            cursor: pointer;
            font-weight: 700;
        }
    }
`;

const NoSuggestion = styled.div`
    color: #999;
    padding: 0.5rem;
`;

const SuggestionActive = styled.li`
        padding: 0.5rem;
            background-color: "#6c63ff";
            color: #1e87f0;
            cursor: pointer;
            font-weight: 700;
        
`;

export default Autocomplete;