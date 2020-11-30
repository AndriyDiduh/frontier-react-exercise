import React from "react";
import GenerateField from "./GenerateField";
import {
  FormInstructions,
  ContentEntity,
  SectionsEntity,
} from "../data/formInstructionTypes";
import { messageText } from "./Helpers";
import {
  sectionsEntityTypeGuard,
  sectionsEntityContentTypeGuard,
} from "./TypeGuard";

/**
 * Local interfaces
 */

interface GenerateSectionsProps {
  activeSection: string;
  masterFormInstructionsSections: FormInstructions["sections"];

  // Here we do not need to check the types strictly, just pull one data that is available
  masterFormDataEdited: any;

  handleSubmit: () => void;
  handleInputFieldChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleSelectFieldChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    specialType: string
  ) => void;
  handleRadioFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

    const generatedFields: JSX.Element[] = fieldsListTested.map(
      (val: ContentEntity, index: number): JSX.Element => {
        // Get value and switch to bool (for radio buttons)
        const fieldValue: string | boolean = this.props.masterFormDataEdited[val.id];

        // Generate a single field layout
        return (
          <GenerateField
            fieldData={val}
            fieldEditedValState={fieldValue}
            key={index}
            handleInputFieldChange={this.props.handleInputFieldChange}
            handleSelectFieldChange={this.props.handleSelectFieldChange}
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
