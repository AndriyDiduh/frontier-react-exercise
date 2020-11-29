import React from "react";

/**
 * Local interfaces
 */

interface SubmitProps {
  handleSubmit: () => void;
}

interface NextProps {
  sectionId: string;
  handleNext: (sectionId: string) => void;
}

interface BackProps {
  sectionId: string;
  handleBack: (sectionId: string) => void;
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
          type="button"
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
          type="button"
          className="actionTrigger nextTrigger"
          onClick={() => this.props.handleNext(this.props.sectionId)}
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
          onClick={() => this.props.handleBack(this.props.sectionId)}
        >
          Back
        </button>
      </>
    );
  };
}
