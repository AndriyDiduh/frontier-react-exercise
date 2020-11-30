import {
  FormInstructions,
  SectionsEntity,
  ContentEntity,
  OptionsEntity,
  Metadata,
} from "../data/formInstructionTypes";

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

// If boolean
export const theBooleanAgainstStringTypeGuard = (
    item: boolean | string | any
  ): item is boolean => {
    return typeof item !== 'string' && !(item instanceof String);
  };

// If string
export const theStringTypeGuard = (
    item: boolean | string | any
  ): item is string => {
    return typeof item == 'string' || item instanceof String;
  };
