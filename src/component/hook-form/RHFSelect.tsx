// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { TextField, TextFieldProps } from "@mui/material";


interface AdditionalSelectProps {
  }

interface IProps extends AdditionalSelectProps  {
    name: string;
    children: any;
  }
  
  export function RHFSelect({
    name,
    children,
    ...other
  }: IProps & TextFieldProps) {
    const { control } = useFormContext();
  
    return (
      <Controller
        name={name}
        control={control}
        {...other}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            select
            fullWidth
            // sx={{ flex: 1 }}
            // SelectProps={{ native: true }}
            error={!!error}
            helperText={error?.message}
            {...other}
          >
            {children}
          </TextField>
        )}
      />
    );
  }