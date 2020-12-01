// Types shared with different components

export interface FieldDataEditedEntity {
  section: string;
  value: string | string[] | boolean;
  required: boolean;
  completed: boolean;
  correct: boolean;
}

export interface FormDataEdited {
  [key: string]: FieldDataEditedEntity | undefined | null;
}
