import React from "react";
import GenerateField from "./GenerateField";
import { messageText } from "./Helpers";
import {
  sectionsEntityTypeGuard,
  sectionsEntityContentTypeGuard,
  fieldDataEditedEntityTypeGuard,
} from "./TypeGuard";
import {
  FormInstructions,
  ContentEntity,
  SectionsEntity,
} from "../data/formInstructionTypes";
import { FormDataEdited, FieldDataEditedEntity } from "./mainTypes";

/**
 * Local interfaces
 */

interface GenerateSectionsProps {
  activeSection: string;
  masterFormInstructionsSections: FormInstructions["sections"];
  masterFormDataEdited: FormDataEdited;
  handleSubmit: () => void;
  handleInputFieldChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    required: boolean
  ) => void;
  handleSelectFieldChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    required: boolean,
    id: string
  ) => void;
  handleMultiSelectFieldChange: (
    e: { value: string; label: string }[],
    required: boolean,
    specialType: string
  ) => void;
  handleRadioFieldChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    required: boolean
  ) => void;
}

interface GenerateSectionsState {}

/**
 * Generate all sections
 */

export default class GenerateSections extends React.Component<
  GenerateSectionsProps,
  GenerateSectionsState
> {
  public constructor(props: GenerateSectionsProps) {
    super(props);
    this.state = {};
  }

  /**
   * Generate layout
   */

  // Generate all sections
  private generateSections = (): JSX.Element => {
    const sections: GenerateSectionsProps["masterFormInstructionsSections"] = this
      .props.masterFormInstructionsSections;

    // Gen. a Section
    let layoutComplete:
      | JSX.Element[]
      | JSX.Element
      | (string | JSX.Element)[]
      | [] = [];

    // Execute if the SECTIONS key is present in the instructions
    if (sectionsEntityTypeGuard(sections)) {
      // Check if sections array is empty
      if (sections.length) {
        // Let's fill the empty map array items with a string ""
        layoutComplete = sections.map((val: SectionsEntity, index: number):
          | JSX.Element
          | string => {
          // Switch to correct section
          if (val.id === this.props.activeSection) {
            const id: string = sections[index]["id"];
            const title: string = sections[index]["title"];
            let fieldsList: ContentEntity[] = [];

            // Fix to deal with TypeScript "!predictable nature"
            // - https://github.com/microsoft/TypeScript/issues/33391
            let content = sections[index]["content"];

            // Test our content
            fieldsList = sectionsEntityContentTypeGuard(content) ? content : [];

            // Gen. a header
            const sectionHeader: JSX.Element = (
              <>
                <div className="sectionHeader">
                  <div className="sectionTitle">{title}</div>
                </div>
              </>
            );

            // Gen. a list of fields
            const generatedListOfFields: JSX.Element = this.generateFieldsList(
              fieldsList
            );

            const layout: JSX.Element = (
              <div key={index} id={id}>
                {sectionHeader}
                {generatedListOfFields}
              </div>
            );
            return layout;
          } else {
            return "";
          }
        });
      } else {
        layoutComplete = <>{messageText.noSections}</>;
      }
    }

    return <>{layoutComplete}</>;
  };

  // Generate a list of fields
  private generateFieldsList = (fieldsList: ContentEntity[]): JSX.Element => {
    let layout: JSX.Element = <></>;

    // Test for undefined and null
    const fieldsListTested = sectionsEntityContentTypeGuard(fieldsList)
      ? fieldsList
      : [];

    const generatedFields: JSX.Element[] | string = fieldsListTested.map(
      (val: ContentEntity, index: number): JSX.Element => {
        // Get value and switch to bool (for radio buttons)
        // But Check for Undefined and null first
        const fieldValueTypeCheck:
          | FieldDataEditedEntity
          | undefined
          | null = fieldDataEditedEntityTypeGuard(
          this.props.masterFormDataEdited[val.id]
        )
          ? this.props.masterFormDataEdited[val.id]
          : null;

        const fieldValue: FieldDataEditedEntity = fieldDataEditedEntityTypeGuard(
          fieldValueTypeCheck
        )
          ? fieldValueTypeCheck
          : {
              section: "",
              value: "" || [],
              required: false,
              filled: false,
              correct: false,
              error: false,
              msg: "",
            };

        // Generate a single field layout
        return (
          <GenerateField
            fieldData={val}
            fieldEditedDataState={fieldValue}
            key={index}
            handleInputFieldChange={this.props.handleInputFieldChange}
            handleSelectFieldChange={this.props.handleSelectFieldChange}
            handleMultiSelectFieldChange={this.props.handleMultiSelectFieldChange}
            handleRadioFieldChange={this.props.handleRadioFieldChange}
          />
        );
      }
    );

    layout = <>{generatedFields}</>;

    return layout;
  };

  // Render the full layout
  public render = (): JSX.Element => {
    return (
      <div className="formSection-outset">
        <div className="formSection">
          <div className="formSection-inset">{this.generateSections()}</div>
        </div>
      </div>
    );
  };
}
