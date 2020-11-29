import React from "react";
import GenerateSections from "./GenerateSections";
import { SubmitAction } from "./FormActions";
import formInstructions from "../data/formInstructions.json";

/**
 * Local interfaces
 */

interface AppState {
  activeSection: string;
  masterFormDataEdited: Object;
}

/**
 * Generate the Master Form
 */
export default class App extends React.Component<any, AppState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      activeSection: "about",
      masterFormDataEdited: {},
    };

    // SUBMIT
    //this.handleSubmit = this.handleSubmit.bind(this);

    // On change handlers
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
    this.handleSelectFieldChange = this.handleSelectFieldChange.bind(this);
    this.handleRadioFieldChange = this.handleRadioFieldChange.bind(this);
  }

  // Submit
  private handleSubmit = (): void => {
    // Output to console by a request from the readme
    console.log(`\n\n` + `%c > SUBMIT `, `background: #222; color: #bada55; font-size: 25px;`);
    console.log(this.state.masterFormDataEdited);
    console.log(`%c > success ` + `\n\n`, `background: #bada55; color: #fff; font-size: 15px;`);
  };

  // Fields change handler
  private handleInputFieldChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    this.setState({
      ...this.state,
      masterFormDataEdited: {
        ...this.state.masterFormDataEdited,
        [e.currentTarget.id]: e.currentTarget.value,
      },
    });
  };

  private handleSelectFieldChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    specialType: string
  ): void => {
    let val: string | number | string[] = e.currentTarget.value;

    // If we handle multi select field
    if (specialType === "multichoice") {
      val = Array.from(e.target.selectedOptions, (option) => option.value);
    }

    this.setState({
      ...this.state,
      masterFormDataEdited: {
        ...this.state.masterFormDataEdited,
        [e.currentTarget.id]: val,
      },
    });
  };

  private handleRadioFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    this.setState({
      ...this.state,
      masterFormDataEdited: {
        ...this.state.masterFormDataEdited,
        [e.currentTarget.name]: e.target.value,
      },
    });
  };

  public render = (): JSX.Element => {
    return (
      <>
        <div className="masterForm-holder">
          <div className="masterForm">
            <div className="masterForm-header">
              {/**
               * Provides a steps counter.
               */}
            </div>
            <div className="masterForm-content">
              {/**
               * The form sections.
               */}
              <GenerateSections
                masterFormInstructionsSections={formInstructions.sections}
                handleSubmit={this.handleSubmit}
                handleInputFieldChange={this.handleInputFieldChange}
                handleSelectFieldChange={this.handleSelectFieldChange}
                handleRadioFieldChange={this.handleRadioFieldChange}
              />
            </div>
            <div className="masterForm-actions">
              {/**
               * Action triggers, next, back, submit, etc...
               */}
              <SubmitAction handleSubmit={this.handleSubmit} />
            </div>
          </div>
        </div>
      </>
    );
  };
}
