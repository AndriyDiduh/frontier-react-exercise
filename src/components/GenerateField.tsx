import React from "react";
import { ContentEntity } from "../data/formInstructionTypes";

interface GenerateFieldProps {
  fieldData: ContentEntity;
}

interface GenerateFieldState {}

/**
 * Generate a field
 */
export default class GenerateField extends React.Component<
  GenerateFieldProps,
  GenerateFieldState
> {
  public constructor(props: GenerateFieldProps) {
    super(props);
    this.state = {};
  }

  // Generate field
  private generateField = (
    fieldItem: GenerateFieldProps["fieldData"]
  ): JSX.Element => {
    let layout: JSX.Element = <div>Field Item</div>;

    return layout;
  };

  // Render the full layout
  public render = (): JSX.Element => {
    return this.generateField(this.props.fieldData);
  };
}
