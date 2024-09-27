export interface InputProps {
  type?: string;
  id?: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export interface TextAreaProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  required?: boolean;
}

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export interface DatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export interface TimePickerProps {
  label?: string;
  value: string;
  onChange: (time: string) => void;
}

export interface DateTimePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export interface RadioButtonProps {
  name: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export interface PhoneInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

export interface AddressInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

export interface FormField {
  type:
    | "text"
    | "password"
    | "email"
    | "phone"
    | "address"
    | "select"
    | "textarea"
    | "radio"
    | "checkbox"
    | "datepicker"
    | "timepicker"
    | "datetimepicker";
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface FormProps {
  fields: FormField[];
  layout?: "vertical" | "grid" | "stepper";
  gridTemplateColumns?: number;
  onSubmit: (values: Record<string, any>) => void;
}

export interface WrapperFormProps {
  formConfig: FormProps;
  onSubmit: (values: Record<string, any>) => void;
}
