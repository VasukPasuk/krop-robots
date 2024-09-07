import React from 'react';
import { TextField, TextFieldProps } from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Autocomplete, AutocompleteProps, AutocompleteValue } from "@mui/material";

type ControlledAutocompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> & {
  name: Path<FieldValues>;
  control: Control<FieldValues>;
  defaultValue?: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>;
  renderInput: (params: TextFieldProps) => React.ReactNode;
};

function ControlledAutocomplete<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>({
    options = [],
    renderInput,
    getOptionLabel,
    control,
    defaultValue,
    name,
    renderOption,
    multiple,
    ...rest
  }: ControlledAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  return (
    <Controller
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={options}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          renderInput={renderInput}
          onChange={(event, data) => field.onChange(data)}
          multiple={multiple}
          {...rest}
        />
      )}
      defaultValue={defaultValue}
      name={name}
      control={control}
    />
  );
}

export default ControlledAutocomplete;