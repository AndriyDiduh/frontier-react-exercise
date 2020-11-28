import React from "react";
import {
  ContentEntity,
  OptionsEntity,
  Metadata,
} from "../data/formInstructionTypes";

/**
 * Local interfaces
 */

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

  /**
   * Type Guard
   */

  // Check for the string in the metadata
  private metadataStringTypeGuard = (
    item: string | null | undefined
  ): item is string => {
    return typeof item !== "undefined" && typeof item !== null;
  };

  private metadataArrayTypeGuard = (
    item: Metadata["options"]
  ): item is OptionsEntity[] => {
    return typeof item !== "undefined" && typeof item !== null;
  };

  // Limits
  private fieldInputLimits: {
    minlength: number;
    maxlength: number;
    size: number;
  } = {
    minlength: 2,
    maxlength: 32,
    size: 33,
  };

  // Templates for Fields
  private fieldText = (
    id: string,
    placeholder: string,
    required: boolean
  ): JSX.Element => {
    return (
      <>
        <input
          id={id}
          className="inputField fieldText"
          type="text"
          placeholder={placeholder}
          {...(required ? { required: true } : {})}
          {...{ minLength: this.fieldInputLimits.minlength }}
          {...{ maxLength: this.fieldInputLimits.maxlength }}
          {...{ size: this.fieldInputLimits.size }}
        />
      </>
    );
  };

  private fieldEmail = (
    id: string,
    placeholder: string,
    required: boolean
  ): JSX.Element => {
    return (
      <>
        <input
          id={id}
          className="inputField fieldEmail"
          type="email"
          placeholder={placeholder}
          {...(required ? { required: true } : {})}
          {...{ minLength: this.fieldInputLimits.minlength }}
          {...{ maxLength: this.fieldInputLimits.maxlength }}
          {...{ size: this.fieldInputLimits.size }}
        />
      </>
    );
  };

  private fieldPhone = (
    id: string,
    placeholder: string,
    required: boolean,
    pattern: string
  ): JSX.Element => {
    return (
      <>
        <input
          id={id}
          className="inputField fieldPhone"
          type="tel"
          placeholder={placeholder}
          pattern={pattern}
          {...(required ? { required: true } : {})}
          {...{ minLength: this.fieldInputLimits.minlength }}
          {...{ maxLength: this.fieldInputLimits.maxlength }}
          {...{ size: this.fieldInputLimits.size }}
        />
      </>
    );
  };

  private boolSwitch = (id: string, required: boolean): JSX.Element => {
    return (
      <>
        <div
          id={id}
          className="boolSwitch"
          {...(required ? { required: true } : {})}
        >
          <input
            type="radio"
            className="boolSwitch-button buttonLeft"
            id={id + "-yes"}
            name={id}
            value="Yes"
          />
          <label htmlFor={id + "-yes"}>Yes</label>
          <input
            type="radio"
            className="boolSwitch-button buttonRight"
            id={id + "-no"}
            name={id}
            value="No"
          />
          <label htmlFor={id + "-no"}>No</label>
        </div>
      </>
    );
  };

  private selectMonoList = (
    id: string,
    required: boolean,
    options: OptionsEntity[]
  ): JSX.Element => {
    // Generate list
    const optionsLayout: JSX.Element[] = options.map(
      (val: OptionsEntity, index: number): JSX.Element => {
        return <option key={index} value={val.value}>{val.label}</option>;
      }
    );

    return (
      <>
        <select name={id} id={id}>
          {optionsLayout}
        </select>
      </>
    );
  };

  private selectMultiList = (
    id: string,
    required: boolean,
    options: OptionsEntity[]
  ): JSX.Element => {
    // Generate list
    const optionsLayout: JSX.Element[] = options.map(
      (val: OptionsEntity, index: number): JSX.Element => {
        return <option key={index} value={val.value}>{val.label}</option>;
      }
    );

    return (
      <>
        <select name={id} id={id}>
          {optionsLayout}
        </select>
      </>
    );
  };

  // Generate field
  private generateField = (
    fieldItem: GenerateFieldProps["fieldData"]
  ): JSX.Element => {
    let layout: JSX.Element = <></>;
    let field: JSX.Element = <></>;

    // Test for undefined and null
    let placeholder: string = "";
    if (this.metadataStringTypeGuard(fieldItem.metadata.placeholder)) {
      placeholder = fieldItem.metadata.placeholder;
    }

    let pattern: string = "";
    if (this.metadataStringTypeGuard(fieldItem.metadata.pattern)) {
      pattern = fieldItem.metadata.pattern;
    }

    let options: OptionsEntity[] = [];
    if (this.metadataArrayTypeGuard(fieldItem.metadata.options)) {
      options = fieldItem.metadata.options;
    }

    // Switch to the correct field type
    switch (fieldItem.type) {
      case "text":
      case "location": {
        field = this.fieldText(
          fieldItem.id,
          placeholder,
          fieldItem.metadata.required
        );
        break;
      }
      case "email": {
        field = this.fieldEmail(
          fieldItem.id,
          placeholder,
          fieldItem.metadata.required
        );
        break;
      }
      case "phone": {
        field = this.fieldPhone(
          fieldItem.id,
          placeholder,
          fieldItem.metadata.required,
          pattern
        );
        break;
      }
      case "boolean": {
        field = this.boolSwitch(fieldItem.id, fieldItem.metadata.required);
        break;
      }
      case "monochoice": {
        field = this.selectMonoList(
          fieldItem.id,
          fieldItem.metadata.required,
          options
        );
        break;
      }
    }

    // Assemble layout
    layout = (
      <div className="fieldBlock-outset">
        <div className="fieldBlock">
          <div className="fieldBlock-inset">
            <label htmlFor={fieldItem.id} className="fieldTitle">
              {fieldItem.question_text}
            </label>
            {field}
          </div>
        </div>
      </div>
    );

    return layout;
  };

  // Render the full layout
  public render = (): JSX.Element => {
    return this.generateField(this.props.fieldData);
  };
}
