import {
  FormInstructions,
  SectionsEntity,
  ContentEntity,
  OptionsEntity,
  Metadata,
} from "../data/formInstructionTypes";
import { FormDataEdited, FieldDataEditedEntity } from "./mainTypes";

/**
 * Type Guard
 */

// We need to put Instruction to State before we can use them
export const formInstructionsTypeGuard = (
  item: FormInstructions | {}
): item is FormInstructions => {
  return typeof item !== "undefined" && item !== null;
};

// Single item of the section array
export const sectionsEntityTypeGuard = (
  item: FormInstructions["sections"]
): item is SectionsEntity[] => {
  return typeof item !== "undefined" && item !== null;
};

// Check for the string in the metadata
export const metadataStringTypeGuard = (
  item: string | null | undefined
): item is string => {
  return typeof item !== "undefined" && item !== null;
};

// Check for the number in the metadata
export const metadataNumberTypeGuard = (
  item: number | null | undefined
): item is number => {
  return typeof item !== "undefined" && item !== null;
};

// Check for the options array
export const metadataArrayTypeGuard = (
  item: Metadata["options"]
): item is OptionsEntity[] => {
  return typeof item !== "undefined" && item !== null;
};

// Content in the specific item of the section array
export const sectionsEntityContentTypeGuard = (
  item: SectionsEntity["content"]
): item is ContentEntity[] => {
  return typeof item !== "undefined" && item !== null;
};

// If boolean but not a string
export const booleanNotStringTypeGuard = (
  item: boolean | string | any
): item is boolean => {
  return typeof item !== "string" && !(item instanceof String);
};

// If string but not a boolean
export const stringNotBooleanTypeGuard = (
  item: boolean | string | any
): item is string => {
  return typeof item == "string" || item instanceof String;
};

// If string is not undefined and not null
export const stringTypeGuard = (item: any): item is object => {
  return typeof item !== "undefined" && item !== null;
};

// FormDataEdited check
export const formDataEditedTypeGuard = (
    item: FormDataEdited | undefined | null
  ): item is FormDataEdited => {
    return typeof item !== "undefined" && item !== null;
  };

// FieldDataEditedEntity check
export const fieldDataEditedEntityTypeGuard = (
  item: FieldDataEditedEntity | undefined | null
): item is FieldDataEditedEntity => {
  return typeof item !== "undefined" && item !== null;
};

// For multi select component data check check
export const dataMultiSelectTypeGuard = (
    item: string | boolean | { value: string; label: string; }[]
  ): item is { value: string; label: string; }[] => {
    return typeof item !== "undefined" && item !== null;
  };
