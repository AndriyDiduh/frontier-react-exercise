import React from "react";
import GenerateSections from "./GenerateSections";
import { SubmitAction } from "./FormActions";
import formInstructionsData from "../data/formInstructions.json";
import { FormInstructions, SectionsEntity } from "../data/formInstructionTypes";

// Add types to catch any errors during build
const formInstructions: FormInstructions = formInstructionsData;

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
      activeSection: "",
      masterFormDataEdited: {},
    };

    // SUBMIT
    this.handleSubmit = this.handleSubmit.bind(this);

    // On change handlers
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
    this.handleSelectFieldChange = this.handleSelectFieldChange.bind(this);
    this.handleRadioFieldChange = this.handleRadioFieldChange.bind(this);
  }

  // Initiate on start
  public componentDidMount = (): void => {
    // Get the default active section, the first one
    const sectionId: string =
      this.sectionsEntityTypeGuard(formInstructions.sections) &&
      formInstructions.sections.length
        ? formInstructions.sections[0].id
        : "";
    this.setState({ ...this.state, activeSection: sectionId });
  };

  /**
   * Type Guard
   */

  // Single item of the section array
  private sectionsEntityTypeGuard = (
    item: FormInstructions["sections"]
  ): item is SectionsEntity[] => {
    return typeof item !== "undefined" && typeof item !== null;
  };

  // Submit
  private handleSubmit = (): void => {
    // Output to console by a request from the readme
    console.log(
      `\n\n%c > SUBMIT `,
      `background: #222; color: #bada55; font-size: 25px;`
    );
    console.log(this.state.masterFormDataEdited);
    console.log(
      `%c > success \n\n`,
      `background: #bada55; color: #fff; font-size: 15px;`
    );
  };

  // Next and back
  private handleNextBack = (): void => {
    // Switch to the next section
    // Switch to the previous section
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
                activeSection={this.state.activeSection}
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
