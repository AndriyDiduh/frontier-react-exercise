import React from "react";
import GenerateField from "./GenerateField";
import {
  FormInstructions,
  ContentEntity,
  SectionsEntity,
} from "../data/formInstructionTypes";

/**
 * Local interfaces
 */

interface GenerateSectionsProps {
  masterFormInstructionsSections: FormInstructions["sections"];
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
   * Type Guard
   */

  // Single item of the section array
  private sectionsEntityTypeGuard = (
    item: FormInstructions["sections"]
  ): item is SectionsEntity[] => {
    return typeof item !== "undefined" && typeof item !== null;
  };

  // Content in the specific item of the section array
  private sectionsEntityContentTypeGuard = (
    item: SectionsEntity["content"]
  ): item is ContentEntity[] => {
    return typeof item !== "undefined" && typeof item !== null;
  };

  /**
   * Generate layout
   */

  // Generate all sections
  private generateSections = (): JSX.Element => {
    const sections: GenerateSectionsProps["masterFormInstructionsSections"] = this
      .props.masterFormInstructionsSections;

    // Gen. a Section 
    let layoutComplete: JSX.Element[] | [] = [];

    if (this.sectionsEntityTypeGuard(sections)) {
      layoutComplete = sections.map(
        (val: SectionsEntity, index: number): JSX.Element => {
          let id: string = sections[index]["id"];
          let title: string = sections[index]["title"];
          let fieldsList: ContentEntity[] = [];

          // Fix to deal with TypeScript "!predictable nature"
          // - https://github.com/microsoft/TypeScript/issues/33391
          let content = sections[index]["content"];

          // Test our content
          fieldsList = this.sectionsEntityContentTypeGuard(content)
            ? content
            : [];

          // Gen. a header
          const sectionHeader: JSX.Element = (
            <>
              <div>Section Header</div>
              <div>{id}</div>
              <div>{title}</div>
            </>
          );

          // Gen. a list of fields
          const generatedListOfFields: JSX.Element = this.generateFieldsList(
            fieldsList
          );

          const layout: JSX.Element = (
            <div key={index}>
              {sectionHeader}
              {generatedListOfFields}
            </div>
          );

          return layout;
        }
      );
    }

    return <>{layoutComplete}</>;
  };

  // Generate a list of fields
  private generateFieldsList = (fieldsList: ContentEntity[]): JSX.Element => {
    let layout: JSX.Element = <></>;

    // Test for undefined and null
    const fieldsListTested = this.sectionsEntityContentTypeGuard(fieldsList)
      ? fieldsList
      : [];

    const generatedFields: JSX.Element[] = fieldsListTested.map(
      (val: ContentEntity, index: number): JSX.Element => {
        // Generate a single field layout
        return <GenerateField fieldData={val} key={index} />;
      }
    );

    layout = (
      <>
        Generated list
        {generatedFields}
      </>
    );

    return layout;
  };

  // Render the full layout
  public render = (): JSX.Element => {
    return <>{this.generateSections()}</>;
  };
}
