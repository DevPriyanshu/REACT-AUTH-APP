// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import {  SelectProps,TextField, TextFieldProps } from "@mui/material";


import React from 'react';

// ----------------------------------------------------------------------

interface IProps {
  name: string;
}

export function RHFTextField({ name, ...other }: IProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          {...other}
          helperText={error?.message ?? other.helperText}
        />
      )}
    />
  );
}


