import React from "react";
import { SubmitAction, NextAction, BackAction } from "./FormActions";
import { FormInstructions, SectionsEntity } from "../data/formInstructionTypes";
import { sectionsEntityTypeGuard } from "./TypeGuard";

/**
 * Local interfaces
 */

interface GenerateActionsBarProps {
  activeSection: string;
  masterFormInstructionsSections: FormInstructions["sections"];

  // Here we do not need to check the types strictly, just pull one data that is available
  masterFormDataEdited: any;

  handleSubmit: () => void;
  handleNext: (sectionId: string, sectionPositionNumber: number) => void;
  handleBack: (sectionId: string, sectionPositionNumber: number) => void;
}

interface GenerateActionsBarState {}

interface SectionsPositionList {
  id: string;
  position: string;
  nextId: string;
  nextPosition: number;
  backId: string;
  backPosition: number;
}

/**
 * Generate the bar with from action buttons
 */

export default class GenerateActionsBar extends React.Component<
  GenerateActionsBarProps,
  GenerateActionsBarState
> {
  public constructor(props: GenerateActionsBarProps) {
    super(props);

    this.state = {};
  }

  // Check the data

  // Generate the correct button layout
  private generateButtonsLayout = (): JSX.Element => {
    let layout: JSX.Element | (JSX.Element | string)[] = <></>;

    // Extract all section ids to array
    const sections: FormInstructions["sections"] = sectionsEntityTypeGuard(
      this.props.masterFormInstructionsSections
    )
      ? this.props.masterFormInstructionsSections
      : [];
    const sectionsPositionList: SectionsPositionList[] = sections.map(
      (val: SectionsEntity, index: number): SectionsPositionList => {
        if (index === 0 && index === sections.length - 1) {
          // Only one section
          return {
            id: val.id,
            position: "single",
            nextId: "",
            nextPosition: 0,
            backId: "",
            backPosition: 0,
          };
        } else {
          // Two or more sections
          if (index === 0) {
            return {
              id: val.id,
              position: "start",
              nextId: sections[index + 1].id,
              nextPosition: index + 2,
              backId: "",
              backPosition: 0,
            };
          } else if (index > 0 && index < sections.length - 1) {
            return {
              id: val.id,
              position: "mid",
              nextId: sections[index + 1].id,
              nextPosition: index + 2,
              backId: sections[index - 1].id,
              backPosition: index,
            };
          } else if (index === sections.length - 1) {
            return {
              id: val.id,
              position: "finish",
              nextId: "",
              nextPosition: 0,
              backId: sections[index - 1].id,
              backPosition: index,
            };
          } else {
            // Just as default case and should not be triggered
            return {
              id: val.id,
              position: "",
              nextId: "",
              nextPosition: 0,
              backId: "",
              backPosition: 0,
            };
          }
        }
      }
    );

    // Just submit trigger for one section
    if (sectionsPositionList.length === 1) {
      layout = <SubmitAction handleSubmit={this.props.handleSubmit} />;
    }
 
    // More triggers for 2 and more sections
    if (sectionsPositionList.length > 1) {
      // Based on the position in array
      layout = sectionsPositionList.map(
        (val: SectionsPositionList, index: number): JSX.Element | string => {
          if (val.id === this.props.activeSection) {
            if (val.position === "start") {
              return (
                <div key={index}>
                  <NextAction
                    sectionId={val.nextId}
                    sectionPositionNumber={val.nextPosition}
                    handleNext={this.props.handleNext}
                  />
                </div>
              );
            } else if (val.position === "mid") {
              return (
                <div key={index}>
                  <BackAction
                    sectionId={val.backId}
                    sectionPositionNumber={val.backPosition}
                    handleBack={this.props.handleBack}
                  />
                  <NextAction
                    sectionId={val.nextId}
                    sectionPositionNumber={val.nextPosition}
                    handleNext={this.props.handleNext}
                  />
                </div>
              );
            } else if (val.position === "finish") {
              return (
                <div key={index}>
                  <BackAction
                    sectionId={val.backId}
                    sectionPositionNumber={val.backPosition}
                    handleBack={this.props.handleBack}
                  />
                  <SubmitAction handleSubmit={this.props.handleSubmit} />
                </div>
              );
            } else {
              return "";
            }
          } else {
            return "";
          }
        }
      );
    }

    return <>{layout}</>;
  };

  public render = (): JSX.Element => {
    return (
      <div className="formActionsBar-outset">
        <div className="formActionsBar">{this.generateButtonsLayout()}</div>
      </div>
    );
  };
}
