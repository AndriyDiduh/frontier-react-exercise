// Types shared with different components

export interface FieldDataEditedEntity {
  section: string;
  value: string | { value: string; label: string }[] | boolean;
  required: boolean;
  filled: boolean;
  correct: boolean;
  error: boolean;
  msg: string;
}

export interface FormDataEdited {
  [key: string]: FieldDataEditedEntity | undefined | null;
}
