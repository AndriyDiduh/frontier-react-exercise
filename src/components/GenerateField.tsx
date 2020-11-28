import { kMaxLength } from "buffer";
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

  // Check for the number in the metadata
  private metadataNumberTypeGuard = (
    item: number | null | undefined
  ): item is number => {
    return typeof item !== "undefined" && typeof item !== null;
  };

  private metadataArrayTypeGuard = (
    item: Metadata["options"]
  ): item is OptionsEntity[] => {
    return typeof item !== "undefined" && typeof item !== null;
  };

  // Limits on input
  private fieldInputLimits: {
    minLength: number;
    maxLength: number;
    size: number;
  } = {
    minLength: 2,
    maxLength: 32,
    size: 33,
  };

  private fieldNumberLimits: {
    min: number;
    max: number;
  } = {
    min: 1,
    max: 80,
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
          name={id}
          className="inputField fieldText"
          type="text"
          placeholder={placeholder}
          {...(required ? { required: true } : {})}
          {...{ minLength: this.fieldInputLimits.minLength }}
          {...{ maxLength: this.fieldInputLimits.maxLength }}
          {...{ size: this.fieldInputLimits.size }}
        />
      </>
    );
  };

  private fieldTextArea = (
    id: string,
    placeholder: string,
    required: boolean
  ): JSX.Element => {
    return (
      <>
        <textarea
          id={id}
          name={id}
          className="inputField fieldTextArea"
          placeholder={placeholder}
          {...(required ? { required: true } : {})}
        ></textarea>
      </>
    );
  };

  // Templates for Fields
  private fieldNumber = (
    id: string,
    placeholder: string,
    required: boolean
  ): JSX.Element => {
    return (
      <>
        <input
          id={id}
          name={id}
          className="inputField fieldNumber"
          type="number"
          placeholder={placeholder}
          {...(required ? { required: true } : {})}
          {...{ min: this.fieldNumberLimits.min }}
          {...{ max: this.fieldNumberLimits.max }}
        />
      </>
    );
  };

  private fieldEmail = (
    id: string,
    placeholder: string,
    required: boolean,
    pattern: string
  ): JSX.Element => {
    return (
      <>
        <input
          id={id}
          name={id}
          className="inputField fieldEmail"
          type="email"
          placeholder={placeholder}
          pattern={pattern}
          {...(required ? { required: true } : {})}
          {...{ minLength: this.fieldInputLimits.minLength }}
          {...{ maxLength: this.fieldInputLimits.maxLength }}
          {...{ size: this.fieldInputLimits.size }}
        />
      </>
    );
  };

  private fieldPhone = (
    id: string,
    placeholder: string,
    required: boolean,
    pattern: string,
    maxLength: number
  ): JSX.Element => {
    return (
      <>
        <input
          id={id}
          name={id}
          className="inputField fieldPhone"
          type="tel"
          placeholder={placeholder}
          pattern={pattern}
          {...(required ? { required: true } : {})}
          {...{ minLength: this.fieldInputLimits.minLength }}
          {...{ maxLength: maxLength }}
          {...{ size: this.fieldInputLimits.size }}
        />
      </>
    );
  };

  private fieldUrl = (
    id: string,
    placeholder: string,
    required: boolean,
    pattern: string
  ): JSX.Element => {
    return (
      <>
        <input
          id={id}
          name={id}
          className="inputField fieldUrl"
          type="url"
          placeholder={placeholder}
          pattern={pattern}
          {...(required ? { required: true } : {})}
          {...{ minLength: this.fieldInputLimits.minLength }}
          {...{ maxLength: this.fieldInputLimits.maxLength }}
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
            id={id + "-yes"}
            name={id}
            className="boolSwitch-button buttonLeft"
            type="radio"
            value="Yes"
          />
          <label htmlFor={id + "-yes"}>Yes</label>
          <input
            id={id + "-no"}
            name={id}
            className="boolSwitch-button buttonRight"
            type="radio"
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
        return (
          <option key={index} value={val.value}>
            {val.label}
          </option>
        );
      }
    );

    return (
      <>
        <select name={id} id={id} {...(required ? { required: true } : {})}>
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
    // For the key "originStep", no proper explanation was provided to explain what that key means, 
    // and how to use it, that's why I will not use "originStep" for now. 

    // Generate list
    const optionsLayout: JSX.Element[] = options.map(
      (val: OptionsEntity, index: number): JSX.Element => {
        return (
          <option key={index} value={val.value}>
            {val.label}
          </option>
        );
      }
    );

    return (
      <>
        <select
          name={id}
          id={id}
          {...(required ? { required: true } : {})}
          multiple
        >
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

    let maxLength: number = 0;
    if (this.metadataNumberTypeGuard(fieldItem.metadata.maxlength)) {
      maxLength = fieldItem.metadata.maxlength;
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
      case "textarea": {
        field = this.fieldTextArea(
          fieldItem.id,
          placeholder,
          fieldItem.metadata.required
        );
        break;
      }
      case "number": {
        field = this.fieldNumber(
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
          fieldItem.metadata.required,
          pattern
        );
        break;
      }
      case "phone": {
        field = this.fieldPhone(
          fieldItem.id,
          placeholder,
          fieldItem.metadata.required,
          pattern,
          maxLength
        );
        break;
      }
      case "url": {
        field = this.fieldUrl(
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
      case "multichoice": {
        field = this.selectMultiList(
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
            ***
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
