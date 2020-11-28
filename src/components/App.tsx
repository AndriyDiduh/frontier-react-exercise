import React from "react";
import GenerateSections from "./GenerateSections";
import formInstructions from "../data/formInstructions.json";

/**
 * Generate the Master Form
 */
export default class App extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);
    this.state = {
      activeSection: "about",
      masterFormDataEdited: {},
    };
  }

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
              />
            </div>
            <div className="masterForm-actions">
              {/**
               * Action triggers, next, back, submit, etc...
               */}
            </div>
          </div>
        </div>
      </>
    );
  };
}
