import React from 'react';
import { useField } from 'formik';
import { Form, Label, Select } from 'semantic-ui-react';

interface Props {
  name: string;
  placeholder: string;
  label?: string;
  options: any;
}

export default function CustomSelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        value={field.value || null}
        options={props.options}
        placeholder={props.placeholder}
        onChange={(e, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
      />
      {meta.touched && meta.error  
        ? (<Label basic color='red'>{meta.error}</Label>) 
        : null}
    </Form.Field>
  );
}