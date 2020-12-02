import React from "react";
import MultiSelect from "react-multi-select-component";
import { ContentEntity, OptionsEntity } from "../data/formInstructionTypes";
import {
  metadataStringTypeGuard,
  metadataNumberTypeGuard,
  metadataArrayTypeGuard,
  stringNotBooleanTypeGuard,
  booleanNotStringTypeGuard,
  dataMultiSelectTypeGuard,
} from "./TypeGuard";
import { FieldDataEditedEntity } from "./mainTypes";

/**
 * Local interfaces
 */

interface GenerateFieldProps {
  fieldData: ContentEntity;
  fieldEditedDataState: FieldDataEditedEntity;
  handleInputFieldChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    required: boolean
  ) => void;
  handleSelectFieldChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    required: boolean,
    specialType: string
  ) => void;
  handleMultiSelectFieldChange: (
    e: { value: string; label: string }[],
    required: boolean,
    id: string
  ) => void;
  handleRadioFieldChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    required: boolean
  ) => void;
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
    fieldEditedValState: string,
    placeholder: string,
    required: boolean,
    filled: boolean,
    correct: boolean,
    error: boolean,
    msg: string
  ): JSX.Element => {
    return (
      <>
        <input
          id={id}
          name={id}
          className={
            "inputField fieldText" +
            (filled ? " filled" : " empty") +
            (correct ? " correct" : " incorrect") +
            (error ? " error" : "")
          }
          type="text"
          onChange={(e) => this.props.handleInputFieldChange(e, required)}
          placeholder={placeholder}
          value={fieldEditedValState}
          {...(required ? { required: true } : { required: false })}
          {...{ minLength: this.fieldInputLimits.minLength }}
          {...{ maxLength: this.fieldInputLimits.maxLength }}
          {...{ size: this.fieldInputLimits.size }}
        />
        {msg.length > 0 ? <div className="errorFieldMsg">{msg}</div> : ""}
      </>
    );
  };

  private fieldTextArea = (
    id: string,
    fieldEditedValState: string,
    placeholder: string,
    required: boolean,
    filled: boolean,
    correct: boolean,
    error: boolean,
    msg: string
  ): JSX.Element => {
    return (
      <>
        <textarea
          id={id}
          name={id}
          className={
            "inputField fieldTextArea" +
            (filled ? " filled" : " empty") +
            (correct ? " correct" : " incorrect") +
            (error ? " error" : "")
          }
          onChange={(e) => this.props.handleInputFieldChange(e, required)}
          placeholder={placeholder}
          value={fieldEditedValState}
          {...(required ? { required: true } : { required: false })}
        ></textarea>
        {msg.length > 0 ? <div className="errorFieldMsg">{msg}</div> : ""}
      </>
    );
  };

  private fieldNumber = (
    id: string,
    fieldEditedValState: string,
    placeholder: string,
    required: boolean,
    filled: boolean,
    correct: boolean,
    error: boolean,
    msg: string
  ): JSX.Element => {
    return (
      <>
        <input
          id={id}
          name={id}
          className={
            "inputField fieldNumber" +
            (filled ? " filled" : " empty") +
            (correct ? " correct" : " incorrect") +
            (error ? " error" : "")
          }
          type="number"
          onChange={(e) => this.props.handleInputFieldChange(e, required)}
          placeholder={placeholder}
          value={fieldEditedValState}
          {...(required ? { required: true } : { required: false })}
          {...{ min: this.fieldNumberLimits.min }}
          {...{ max: this.fieldNumberLimits.max }}
        />
        {msg.length > 0 ? <div className="errorFieldMsg">{msg}</div> : ""}
      </>
    );
  };

  private fieldEmail = (
    id: string,
    fieldEditedValState: string,
    placeholder: string,
    required: boolean,
    pattern: string,
    filled: boolean,
    correct: boolean,
    error: boolean,
    msg: string
  ): JSX.Element => {
    return (
      <>
        <input
          id={id}
          name={id}
          className={
            "inputField fieldEmail" +
            (filled ? " filled" : " empty") +
            (correct ? " correct" : " incorrect") +
            (error ? " error" : "")
          }
          type="email"
          onChange={(e) => this.props.handleInputFieldChange(e, required)}
          placeholder={placeholder}
          value={fieldEditedValState}
          pattern={pattern}
          {...(required ? { required: true } : { required: false })}
          {...{ minLength: this.fieldInputLimits.minLength }}
          {...{ maxLength: this.fieldInputLimits.maxLength }}
          {...{ size: this.fieldInputLimits.size }}
        />
        {msg.length > 0 ? <div className="errorFieldMsg">{msg}</div> : ""}
      </>
    );
  };

  private fieldPhone = (
    id: string,
    fieldEditedValState: string,
    placeholder: string,
    required: boolean,
    pattern: string,
    maxLength: number,
    filled: boolean,
    correct: boolean,
    error: boolean,
    msg: string
  ): JSX.Element => {
    return (
      <>
        <input
          id={id}
          name={id}
          className={
            "inputField fieldPhone" +
            (filled ? " filled" : " empty") +
            (correct ? " correct" : " incorrect") +
            (error ? " error" : "")
          }
          type="tel"
          onChange={(e) => this.props.handleInputFieldChange(e, required)}
          placeholder={placeholder}
          value={fieldEditedValState}
          pattern={pattern}
          {...(required ? { required: true } : { required: false })}
          {...{ minLength: this.fieldInputLimits.minLength }}
          {...{ maxLength: maxLength }}
          {...{ size: this.fieldInputLimits.size }}
        />
        {msg.length > 0 ? <div className="errorFieldMsg">{msg}</div> : ""}
      </>
    );
  };

  private fieldUrl = (
    id: string,
    fieldEditedValState: string,
    placeholder: string,
    required: boolean,
    pattern: string,
    filled: boolean,
    correct: boolean,
    error: boolean,
    msg: string
  ): JSX.Element => {
    return (
      <>
        <input
          id={id}
          name={id}
          className={
            "inputField fieldUrl" +
            (filled ? " filled" : " empty") +
            (correct ? " correct" : " incorrect") +
            (error ? " error" : "")
          }
          type="url"
          onChange={(e) => this.props.handleInputFieldChange(e, required)}
          placeholder={placeholder}
          value={fieldEditedValState}
          pattern={pattern}
          {...(required ? { required: true } : { required: false })}
          {...{ minLength: this.fieldInputLimits.minLength }}
          {...{ maxLength: this.fieldInputLimits.maxLength }}
          {...{ size: this.fieldInputLimits.size }}
        />
        {msg.length > 0 ? <div className="errorFieldMsg">{msg}</div> : ""}
      </>
    );
  };

  private boolSwitch = (
    id: string,
    fieldEditedValState: boolean,
    required: boolean,
    filled: boolean,
    correct: boolean,
    error: boolean
  ): JSX.Element => {
    return (
      <>
        <div
          id={id}
          className="boolSwitch"
          {...(required ? { required: true } : { required: false })}
        >
          <input
            id={id + "-yes"}
            name={id}
            className={
              "boolSwitch-button buttonLeft" +
              (filled ? " filled" : " empty") +
              (correct ? " correct" : " incorrect") +
              (error ? " error" : "")
            }
            type="radio"
            onChange={(e) => this.props.handleRadioFieldChange(e, required)}
            value="true"
            checked={fieldEditedValState === true ? true : false}
          />
          <label
            htmlFor={id + "-yes"}
            className={
              "boolSwitch-label labelLeft" +
              (filled ? " filled" : " empty") +
              (correct ? " correct" : " incorrect") +
              (error ? " error" : "")
            }
          >
            Yes
          </label>
          <input
            id={id + "-no"}
            name={id}
            className={
              "boolSwitch-button buttonRight" +
              (filled ? " filled" : " empty") +
              (correct ? " correct" : " incorrect") +
              (error ? " error" : "")
            }
            type="radio"
            onChange={(e) => this.props.handleRadioFieldChange(e, required)}
            value="false"
            checked={fieldEditedValState === false ? true : false}
          />
          <label
            htmlFor={id + "-no"}
            className={
              "boolSwitch-label labelRight" +
              (filled ? " filled" : " empty") +
              (correct ? " correct" : " incorrect") +
              (error ? " error" : "")
            }
          >
            No
          </label>
        </div>
      </>
    );
  };

  private selectMonoList = (
    id: string,
    fieldEditedValState: string,
    required: boolean,
    options: OptionsEntity[],
    filled: boolean,
    correct: boolean,
    error: boolean,
    msg: string
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
        <span className="selectField-arrow"></span>
        <select
          name={id}
          id={id}
          value={fieldEditedValState}
          className={
            "selectField monoSelect" +
            (filled ? " filled" : " empty") +
            (correct ? " correct" : " incorrect") +
            (error ? " error" : "")
          }
          onChange={(e) =>
            this.props.handleSelectFieldChange(e, required, "monochoice")
          }
          {...(required ? { required: true } : { required: false })}
        >
          {optionsLayout}
        </select>
        {msg.length > 0 ? <div className="errorFieldMsg">{msg}</div> : ""}
      </>
    );
  };

  private selectMultiList = (
    id: string,
    fieldEditedValState: { value: string; label: string }[],
    required: boolean,
    options: OptionsEntity[],
    filled: boolean,
    correct: boolean,
    error: boolean,
    msg: string
  ): JSX.Element => {
    // For the key "originStep", no proper explanation was provided to explain what that key means,
    // and how to use it, that's why I will not use "originStep" for now.

    return (
      <MultiSelect
        className={
          "multiSelect" +
          (filled ? " filled" : " empty") +
          (correct ? " correct" : " incorrect") +
          (error ? " error" : "")
        }
        options={options}
        value={fieldEditedValState}
        hasSelectAll={false}
        onChange={(e: any) =>
          this.props.handleMultiSelectFieldChange(e, required, id)
        }
        labelledBy={"Select"}
      />
    );
  };

  // Generate field
  private generateField = (
    fieldItemInstructions: GenerateFieldProps["fieldData"],
    fieldItemEditedDataState: GenerateFieldProps["fieldEditedDataState"]
  ): JSX.Element => {
    let layout: JSX.Element = <></>;
    let field: JSX.Element = <></>;

    // Instructions
    const id: string = fieldItemInstructions.id;
    let required: boolean = fieldItemInstructions.metadata.required;

    // Test the Field Instructions for undefined and null
    let placeholder: string = "";
    if (metadataStringTypeGuard(fieldItemInstructions.metadata.placeholder)) {
      placeholder = fieldItemInstructions.metadata.placeholder;
    }

    let pattern: string = "";
    if (metadataStringTypeGuard(fieldItemInstructions.metadata.pattern)) {
      pattern = fieldItemInstructions.metadata.pattern;
    }

    let options: OptionsEntity[] = [];
    if (metadataArrayTypeGuard(fieldItemInstructions.metadata.options)) {
      options = fieldItemInstructions.metadata.options;
    }

    let maxLength: number = 0;
    if (metadataNumberTypeGuard(fieldItemInstructions.metadata.maxlength)) {
      maxLength = fieldItemInstructions.metadata.maxlength;
    }

    // Edited state
    const filledValState: boolean = fieldItemEditedDataState.filled;
    const correctValState: boolean = fieldItemEditedDataState.correct;
    const errorValState: boolean = fieldItemEditedDataState.error;
    const errorMsgState: string = fieldItemEditedDataState.msg;
    let multiSelectValState: { value: string; label: string }[] = [];
    if (dataMultiSelectTypeGuard(fieldItemEditedDataState.value)) {
      multiSelectValState = fieldItemEditedDataState.value;
    }

    // Test the Edited Field Data
    let stringValState: string = "";
    if (stringNotBooleanTypeGuard(fieldItemEditedDataState.value)) {
      stringValState = fieldItemEditedDataState.value;
    }

    let booleanValState: boolean = false;
    if (booleanNotStringTypeGuard(fieldItemEditedDataState.value)) {
      booleanValState = fieldItemEditedDataState.value;
    }

    // Switch to the correct field type
    switch (fieldItemInstructions.type) {
      case "text":
      case "location": {
        field = this.fieldText(
          id,
          stringValState,
          placeholder,
          required,
          filledValState,
          correctValState,
          errorValState,
          errorMsgState
        );
        break;
      }
      case "textarea": {
        field = this.fieldTextArea(
          id,
          stringValState,
          placeholder,
          required,
          filledValState,
          correctValState,
          errorValState,
          errorMsgState
        );
        break;
      }
      case "number": {
        field = this.fieldNumber(
          id,
          stringValState,
          placeholder,
          required,
          filledValState,
          correctValState,
          errorValState,
          errorMsgState
        );
        break;
      }
      case "email": {
        field = this.fieldEmail(
          id,
          stringValState,
          placeholder,
          required,
          pattern,
          filledValState,
          correctValState,
          errorValState,
          errorMsgState
        );
        break;
      }
      case "phone": {
        field = this.fieldPhone(
          id,
          stringValState,
          placeholder,
          required,
          pattern,
          maxLength,
          filledValState,
          correctValState,
          errorValState,
          errorMsgState
        );
        break;
      }
      case "url": {
        field = this.fieldUrl(
          id,
          stringValState,
          placeholder,
          required,
          pattern,
          filledValState,
          correctValState,
          errorValState,
          errorMsgState
        );
        break;
      }
      case "boolean": {
        field = this.boolSwitch(
          id,
          booleanValState,
          required,
          filledValState,
          correctValState,
          errorValState
        );
        break;
      }
      case "monochoice": {
        field = this.selectMonoList(
          id,
          stringValState,
          required,
          options,
          filledValState,
          correctValState,
          errorValState,
          errorMsgState
        );
        break;
      }
      case "multichoice": {
        field = this.selectMultiList(
          id,
          multiSelectValState,
          required,
          options,
          filledValState,
          correctValState,
          errorValState,
          errorMsgState
        );
        break;
      }
    }

    // Assemble layout
    layout = (
      <div className="fieldBlock-outset">
        <div className="fieldBlock">
          <div className="fieldBlock-inset">
            <label htmlFor={fieldItemInstructions.id} className="fieldTitle">
              {fieldItemInstructions.question_text}
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
    return this.generateField(
      this.props.fieldData,
      this.props.fieldEditedDataState
    );
  };
}
