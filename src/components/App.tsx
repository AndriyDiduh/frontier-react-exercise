import React from "react";
import GenerateSections from "./GenerateSections";
import GenerateActionsBar from "./GenerateActionsBar";
import formInstructionsData from "../data/formInstructions.json";
import { FormInstructions } from "../data/formInstructionTypes";
import {
  formInstructionsTypeGuard,
  sectionsEntityTypeGuard,
} from "./TypeGuard";

import "../styles/main.scss";

// Add types to catch any errors during the build in the console, this is a necessary step
const formInstructions: FormInstructions = formInstructionsData;

/**
 * Local interfaces
 */

interface AppState {
  activeSection: string;
  activeSectionPosition: number;
  sectionsCount: number;
  formInstructions: FormInstructions | {};
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
      activeSectionPosition: 0,
      sectionsCount: 0,
      formInstructions: { "": "" },
      masterFormDataEdited: { "": "" },
    };

    // SUBMIT , Next, Back
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleNext.bind(this);

    // On change handlers
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
    this.handleSelectFieldChange = this.handleSelectFieldChange.bind(this);
    this.handleRadioFieldChange = this.handleRadioFieldChange.bind(this);
  }

  // Initiate on start
  public componentDidMount = (): void => {
    // Put form instructions to state first
    this.setState({ ...this.state, formInstructions: formInstructions }, () => {
      this.openDefaultFormSection();
      this.loadColorsInstructions();
    });
  };

  // Load colors from the instructions data
  private loadColorsInstructions = (): void => {
    const root = document.documentElement;
    if (formInstructionsTypeGuard(this.state.formInstructions)) {
      root.style.setProperty(
        "--primary-color",
        this.state.formInstructions.theme.primary_color
      );
      root.style.setProperty(
        "--secondary-color",
        this.state.formInstructions.theme.secondary_color
      );
      root.style.setProperty(
        "--background-color",
        this.state.formInstructions.theme.background_color
      );
    }
  };

  // Put the default section in view
  private openDefaultFormSection = (): void => {
    // Get the default active section, the first one
    let sectionId: string = "";
    let sectionsCount: number = 0;
    if (formInstructionsTypeGuard(this.state.formInstructions)) {
      sectionId =
        sectionsEntityTypeGuard(this.state.formInstructions.sections) &&
        this.state.formInstructions.sections.length
          ? this.state.formInstructions.sections[0].id
          : "";
      sectionsCount = sectionsEntityTypeGuard(
        this.state.formInstructions.sections
      )
        ? this.state.formInstructions.sections.length
        : 0;
    }

    this.setState({
      ...this.state,
      activeSection: sectionId,
      activeSectionPosition: 1,
      sectionsCount: sectionsCount,
    });
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
    alert("Results were logged to the console!");

    // Clear the form
    if (formInstructionsTypeGuard(this.state.formInstructions)) {
      this.setState({
        ...this.state,
        activeSection: sectionsEntityTypeGuard(
          this.state.formInstructions.sections
        )
          ? this.state.formInstructions.sections[0].id
          : "",
        activeSectionPosition: 1,
        masterFormDataEdited: {},
      });
    }
  };

  // Next form
  private handleNext = (
    sectionId: string,
    sectionPositionNumber: number
  ): void => {
    // Switch to the next section
    this.setState({
      ...this.state,
      activeSectionPosition: sectionPositionNumber,
      activeSection: sectionId,
    });
  };

  // Back to the previous form
  private handleBack = (
    sectionId: string,
    sectionPositionNumber: number
  ): void => {
    // Switch to the previous section
    this.setState({
      ...this.state,
      activeSectionPosition: sectionPositionNumber,
      activeSection: sectionId,
    });
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
        [e.currentTarget.name]: e.target.value === "true" ? true : false,
      },
    });
  };

  public render = (): JSX.Element => {
    return (
      <>
        <div className="masterForm-holder">
          <div className="masterForm">
            <div className="headerIphoneHat-outset">
              <div className="headerIphoneHat-holder">
                <div className="headerIphoneHat"></div>
              </div>
            </div>
            <div className="masterForm-header">
              {/**
               * Provides a steps counter.
               */}
              <div className="sectionsCounter">
                <div className="sectionsCounter-inset">
                  Step {this.state.activeSectionPosition} of{" "}
                  {this.state.sectionsCount}
                </div>
              </div>
              <div className="sectionProgressBar">
                <div
                  className="barFiller"
                  style={{
                    width:
                      (100 / this.state.sectionsCount) *
                        this.state.activeSectionPosition +
                      "%",
                  }}
                ></div>
              </div>
            </div>

            <div className="masterForm-content">
              {/**
               * The form sections.
               */}
              {formInstructionsTypeGuard(this.state.formInstructions) ? (
                <GenerateSections
                  activeSection={this.state.activeSection}
                  masterFormInstructionsSections={
                    this.state.formInstructions.sections
                  }
                  masterFormDataEdited={this.state.masterFormDataEdited}
                  handleSubmit={this.handleSubmit}
                  handleInputFieldChange={this.handleInputFieldChange}
                  handleSelectFieldChange={this.handleSelectFieldChange}
                  handleRadioFieldChange={this.handleRadioFieldChange}
                />
              ) : (
                ""
              )}
            </div>
            <div className="masterForm-actions">
              {/**
               * Action triggers, next, back, submit, etc...
               */}
              {formInstructionsTypeGuard(this.state.formInstructions) ? (
                <GenerateActionsBar
                  masterFormInstructionsSections={
                    this.state.formInstructions.sections
                  }
                  activeSection={this.state.activeSection}
                  handleSubmit={this.handleSubmit}
                  handleNext={this.handleNext}
                  handleBack={this.handleBack}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="copyAndriyDiduh">
          <a href="https://andriydiduh.com">by Andriy Diduh</a>
        </div>
      </>
    );
  };
}
