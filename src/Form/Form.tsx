import { FC, useState } from "react";
import { FormProps, InputProps, WrapperFormProps } from "./models";
import formStyles from "./Form.module.css";

const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  required,
}) => (
  <div className={formStyles["cs-input"]}>
    <input
      type="text"
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      required={required}
    />

    {label && (
      <label htmlFor={id} style={{ marginRight: 8 }}>
        {label}
      </label>
    )}
  </div>
);

interface FormFieldValues {
  [key: string]: string;
}

const Form: React.FC<FormProps> = ({
  fields,
  // layout,
  // gridTemplateColumns,
  onSubmit,
}) => {
  const [values, setValues] = useState<FormFieldValues>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className={formStyles["form-container"]}>
      {fields.map((field, index) => {
        switch (field.type) {
          case "text":
            return (
              <Input
                key={index}
                id={field.id}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                required
                value={values[field.name]}
                onChange={(value: string) => {
                  setValues((prev) => ({ ...prev, [field.name]: value }));
                }}
              />
            );
          default:
            return null;
        }
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export const WrapperForm: FC<WrapperFormProps> = ({ formConfig, onSubmit }) => {
  return (
    <Form
      fields={formConfig.fields}
      layout={formConfig.layout}
      gridTemplateColumns={formConfig.gridTemplateColumns}
      onSubmit={onSubmit}
    />
  );
};
