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
  handleSubmit: () => void;
  handleNext: (sectionId: string) => void;
  handleBack: (sectionId: string) => void;
}

interface GenerateActionsBarState {}

interface SectionsPositionList {
  id: string;
  position: string;
  nextId: string;
  backId: string;
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
          return { id: val.id, position: "single", nextId: "", backId: "" };
        } else {
          // Two or more sections
          if (index === 0) {
            return {
              id: val.id,
              position: "start",
              nextId: sections[index + 1].id,
              backId: "",
            };
          } else if (index > 0 && index < sections.length - 1) {
            return {
              id: val.id,
              position: "mid",
              nextId: sections[index + 1].id,
              backId: sections[index - 1].id,
            };
          } else if (index === sections.length - 1) {
            return {
              id: val.id,
              position: "finish",
              nextId: "",
              backId: sections[index - 1].id,
            };
          } else {
            // Just as default case and should not be triggered
            return { id: val.id, position: "", nextId: "", backId: "" };
          }
        }
      }
    );

    // Just submit trigger for one section
    if (sectionsPositionList.length === 1) {
      layout = (
        <>
          <SubmitAction handleSubmit={this.props.handleSubmit} />
        </>
      );
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
                    handleNext={this.props.handleNext}
                  />
                </div>
              );
            } else if (val.position === "mid") {
              return (
                <div key={index}>
                  <BackAction
                    sectionId={val.backId}
                    handleBack={this.props.handleBack}
                  />
                  <NextAction
                    sectionId={val.nextId}
                    handleNext={this.props.handleNext}
                  />
                </div>
              );
            } else if (val.position === "finish") {
              return (
                <div key={index}>
                  <BackAction
                    sectionId={val.backId}
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
    return this.generateButtonsLayout();
  };
}
