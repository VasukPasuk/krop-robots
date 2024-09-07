import React from 'react';
import { TextField, TextFieldProps } from "@mui/material";
import { useController, UseControllerProps, FieldPath, FieldValues } from "react-hook-form";

interface WidgetTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TName> {
  textFieldProps?: Omit<TextFieldProps, 'name' | 'onChange' | 'onBlur' | 'value' | 'inputRef'>;
}

function WidgetTextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ control, name, rules, textFieldProps }: WidgetTextInputProps<TFieldValues, TName>) {
  const {
    field,
  } = useController({
    name,
    control,
    rules: rules || { required: true },
  });

  return (
    <TextField
      {...textFieldProps}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      inputRef={field.ref}
    />
  );
}

export default WidgetTextInput;