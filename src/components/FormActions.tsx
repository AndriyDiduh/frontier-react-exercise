import React from "react";

/**
 * Local interfaces
 */

interface SubmitProps {
  handleSubmit: () => void;
}

interface NextProps {
  sectionId: string;
  sectionPositionNumber: number;
  handleNext: (sectionId: string, sectionPositionNumber: number) => void;
}

interface BackProps {
  sectionId: string;
  sectionPositionNumber: number;
  handleBack: (sectionId: string, sectionPositionNumber: number) => void;
}

/**
 * Submit action for the Master Form
 */

export class SubmitAction extends React.Component<SubmitProps, any> {
  public constructor(props: any) {
    super(props);
    this.state = {};
  }

  public render = (): JSX.Element => {
    return (
      <>
        <button
          type="submit"
          className="actionTrigger submitTrigger"
          onClick={() => this.props.handleSubmit()}
        >
          Submit
        </button>
      </>
    );
  };
}

/**
 * Next action for the Master Form
 */

export class NextAction extends React.Component<NextProps, any> {
  public constructor(props: any) {
    super(props);
    this.state = {};
  }

  public render = (): JSX.Element => {
    return (
      <>
        <button
          type="submit"
          className="actionTrigger nextTrigger"
          onClick={() =>
            this.props.handleNext(
              this.props.sectionId,
              this.props.sectionPositionNumber
            )
          }
        >
          Next
        </button>
      </>
    );
  };
}

/**
 * Back action for the Master Form
 */

export class BackAction extends React.Component<BackProps, any> {
  public constructor(props: any) {
    super(props);
    this.state = {};
  }

  public render = (): JSX.Element => {
    return (
      <>
        <button
          type="button"
          className="actionTrigger backTrigger"
          onClick={() =>
            this.props.handleBack(
              this.props.sectionId,
              this.props.sectionPositionNumber
            )
          }
        >
          Back
        </button>
      </>
    );
  };
}
