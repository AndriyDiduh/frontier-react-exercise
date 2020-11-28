// Types for formInstructions.json

export interface FormInstructions {
  theme: Theme;
  sections?: SectionsEntity[] | null;
}

export interface Theme {
  primary_color: string;
  secondary_color: string;
  background_color: string;
}

export interface SectionsEntity {
  id: string;
  title: string;
  content?: ContentEntity[] | null;
}

export interface ContentEntity {
  id: string;
  type: string;
  metadata: Metadata;
  question_text: string;
  output?: OutputEntity[] | null;
}

export interface Metadata {
  format?: string | null;
  required: boolean;
  pattern?: string | null;
  placeholder?: string | null;
  maxlength?: number | null;
  options?: OptionsEntity[] | null;
}

export interface OptionsEntity {
  label: string;
  value: string;
}

export interface OutputEntity {
  originStep: number;
}
