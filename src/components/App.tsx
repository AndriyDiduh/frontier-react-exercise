import React from "react";
import GenerateSections from "./GenerateSections";
import GenerateActionsBar from "./GenerateActionsBar";
import formInstructionsData from "../data/formInstructions.json";
import {
  FormInstructions,
  SectionsEntity,
  ContentEntity,
} from "../data/formInstructionTypes";
import { FormDataEdited, FieldDataEditedEntity } from "./mainTypes";
import {
  formInstructionsTypeGuard,
  sectionsEntityTypeGuard,
  sectionsEntityContentTypeGuard,
  fieldDataEditedEntityTypeGuard,
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
  masterFormDataEdited: FormDataEdited;
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
      formInstructions: {},
      masterFormDataEdited: {},
    };

    // SUBMIT , Next, Back
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);

    // On change handlers
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
    this.handleSelectFieldChange = this.handleSelectFieldChange.bind(this);
    this.handleMultiSelectFieldChange = this.handleMultiSelectFieldChange.bind(
      this
    );
    this.handleRadioFieldChange = this.handleRadioFieldChange.bind(this);
  }

  // Initiate on start
  public componentDidMount = (): void => {
    // Put form instructions to state first
    this.setState(
      {
        ...this.state,
        formInstructions: formInstructions,
      },
      () => {
        // Fill the state with data according to the form instructions
        const formFieldsState: FormDataEdited = this.buildFormStateByInstructions(
          formInstructions
        );
        // Then create the default data for the fields edited values
        this.setState(
          {
            ...this.state,
            masterFormDataEdited: formFieldsState,
          },
          () => {
            this.openDefaultFormSection();
            this.loadColorsInstructions();
          }
        );
      }
    );
  };

  // Build the local state of form fields from the instructions
  private buildFormStateByInstructions = (
    formInstructions: FormInstructions
  ): FormDataEdited => {
    let formFieldsState: FormDataEdited = {};

    if (sectionsEntityTypeGuard(formInstructions.sections)) {
      // Loop on Sections level
      formInstructions.sections.map(
        (section: SectionsEntity, index: number): any => {
          if (sectionsEntityContentTypeGuard(section.content)) {
            // Loop on Fields level
            section.content.map((field: ContentEntity, index: number): any => {
              formFieldsState[field.id] = {
                section: section.id,
                value: "" || [],
                required: field.metadata.required,
                filled: false,
                correct: false,
                error: false,
                msg: "",
              };
            });
          }
        }
      );
    }

    return formFieldsState;
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

  // Get the default section if available from instructions in the state
  private getDefaultSectionId = (): string => {
    let sectionDefaultId: string = "";

    if (formInstructionsTypeGuard(this.state.formInstructions)) {
      sectionDefaultId =
        sectionsEntityTypeGuard(this.state.formInstructions.sections) &&
        this.state.formInstructions.sections.length
          ? this.state.formInstructions.sections[0].id
          : "";
    }

    return sectionDefaultId;
  };

  // Put the default section in view
  private openDefaultFormSection = (): void => {
    // Get the default active section, the first one
    let sectionDefaultId: string = this.getDefaultSectionId();
    let sectionsCount: number = 0;
    if (formInstructionsTypeGuard(this.state.formInstructions)) {
      sectionsCount = sectionsEntityTypeGuard(
        this.state.formInstructions.sections
      )
        ? this.state.formInstructions.sections.length
        : 0;
    }

    this.setState({
      ...this.state,
      activeSection: sectionDefaultId,
      activeSectionPosition: 1,
      sectionsCount: sectionsCount,
    });
  };

  // Submit
  private handleSubmit = (): void => {
    // Check if the form is filled correct
    if (
      this.checkFormFieldsFilled(
        this.state.activeSection,
        this.state.masterFormDataEdited
      )
    ) {
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
          masterFormDataEdited: this.buildFormStateByInstructions(
            this.state.formInstructions
          ),
        });
      }
    }
  };

  // Next form
  private handleNext = (
    sectionId: string,
    sectionPositionNumber: number
  ): void => {
    // Check if the form is filled correct
    if (
      this.checkFormFieldsFilled(
        this.state.activeSection,
        this.state.masterFormDataEdited
      )
    ) {
      // Switch to the next section
      this.setState({
        ...this.state,
        activeSectionPosition: sectionPositionNumber,
        activeSection: sectionId,
      });
    }
  };

  // Back to the previous form
  private handleBack = (
    sectionId: string,
    sectionPositionNumber: number
  ): void => {
    console.log(sectionId);
    // Switch to the previous section
    this.setState({
      ...this.state,
      activeSectionPosition: sectionPositionNumber,
      activeSection: sectionId,
    });
  };

  // Check all fields in the form
  private checkFormFieldsFilled = (
    activeSection: string,
    formDataEditedState: FormDataEdited
  ): boolean => {
    let filled: boolean = true;

    // Build copy of the edited fields, check, and put back to state
    const formStateShallowCopy: any = Object.assign({}, formDataEditedState);

    // Extract data to array
    const formDataEdited: [
      string,
      FieldDataEditedEntity | null | undefined
    ][] = Object.entries(formDataEditedState);

    // Iterate through array
    for (const [fieldId, fieldData] of formDataEdited) {
      if (fieldDataEditedEntityTypeGuard(fieldData)) {
        // Only for the Active section
        if (fieldData.section === activeSection) {
          // Write an error to fields data if empty and required
          formStateShallowCopy[fieldId].error =
            !fieldData.filled && fieldData.required ? true : false;

          // Form is Not filled if One field is empty while required
          if ((!fieldData.filled || !fieldData.correct) && fieldData.required) {
            filled = false;
          }
        }
      }
    }

    // Write to state
    this.setState({
      ...this.state,
      masterFormDataEdited: formStateShallowCopy,
    });

    return filled;
  };

  // Field change event handlers
  private handleInputFieldChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    required: boolean,
    pattern?: RegExp
  ): void => {
    // Check the input
    const value: string = e.currentTarget.value;
    const filled: boolean = value.replace(/\s/g, "").length > 0 ? true : false;
    const validity: boolean = e.target.validity.valid;
    const correct: boolean = validity ? true : false; // For patterns
    const error: boolean = !filled && required && !correct ? true : false;
    const msg: string = e.target.validationMessage;

    this.setState({
      ...this.state,
      masterFormDataEdited: {
        ...this.state.masterFormDataEdited,
        [e.currentTarget.id]: {
          section: this.state.activeSection,
          value: value,
          required: required,
          filled: filled,
          correct: correct,
          error: error,
          msg: msg,
        },
      },
    });
  };

  private handleSelectFieldChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    required: boolean,
    specialType: string
  ): void => {
    // Check the select
    const value: string | number | string[] = e.currentTarget.value;
    const filled: boolean = value.replace(/\s/g, "").length > 0 ? true : false;
    const correct: boolean = filled ? true : false; // For patterns
    const error: boolean = !filled && required && !correct ? true : false;

    this.setState({
      ...this.state,
      masterFormDataEdited: {
        ...this.state.masterFormDataEdited,
        [e.currentTarget.id]: {
          section: this.state.activeSection,
          value: value,
          required: required,
          filled: filled,
          correct: correct,
          error: error,
          msg: "",
        },
      },
    });
  };

  private handleMultiSelectFieldChange = (
    e: { value: string; label: string }[],
    required: boolean,
    id: string
  ): void => {
    // Check the select
    const value: { value: string; label: string }[] = e;
    const filled: boolean = value.length > 0 ? true : false;
    const correct: boolean = filled ? true : false; // For patterns
    const error: boolean = !filled && required && !correct ? true : false;

    this.setState({
      ...this.state,
      masterFormDataEdited: {
        ...this.state.masterFormDataEdited,
        [id]: {
          section: this.state.activeSection,
          value: value,
          required: required,
          filled: filled,
          correct: correct,
          error: error,
          msg: "",
        },
      },
    });
  };

  private handleRadioFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    required: boolean
  ): void => {
    // Check the radio group
    const value: boolean = e.target.value === "true" ? true : false;
    const filled: boolean = true;
    const correct: boolean = filled ? true : false; // Reserved for pattern to Force Format the field
    const error: boolean = !filled && required && !correct ? true : false;

    this.setState({
      ...this.state,
      masterFormDataEdited: {
        ...this.state.masterFormDataEdited,
        [e.currentTarget.name]: {
          section: this.state.activeSection,
          value: value,
          required: required,
          filled: filled,
          correct: correct,
          error: error,
          msg: "",
        },
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
                  handleMultiSelectFieldChange={
                    this.handleMultiSelectFieldChange
                  }
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
                  masterFormDataEdited={this.state.masterFormDataEdited}
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
