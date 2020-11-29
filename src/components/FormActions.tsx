import React from "react";

/**
 * Local interfaces
 */

interface SubmitProps {
  handleSubmit: () => void;
}

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
