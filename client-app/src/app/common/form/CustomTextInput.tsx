import React from 'react';
import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';

interface Props {
  name: string;
  placeholder: string;
  type?: string;
  label?: string;
}

export default function CustomTextInput(props: Props) {
  // this will return field props for an <input />
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error  
        ? (<Label basic color='red'>{meta.error}</Label>) 
        : null}
    </Form.Field>
  );
}