import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";

import { GenderEnum, ISelectGenderProps, SignUpEnum } from "./types";

export const SelectGender: React.FC<ISelectGenderProps> = ({ control }) => (
  <Controller
    name={SignUpEnum.GENDER}
    control={control}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <FormControl fullWidth error={!!error}>
        <InputLabel id={SignUpEnum.GENDER}>{SignUpEnum.GENDER}</InputLabel>
        <Select
          fullWidth
          labelId={SignUpEnum.GENDER}
          id={SignUpEnum.GENDER}
          value={value ?? ""}
          label={SignUpEnum.GENDER}
          onChange={onChange}
        >
          <MenuItem value={GenderEnum.MALE}>{GenderEnum.MALE}</MenuItem>
          <MenuItem value={GenderEnum.FEMALE}>{GenderEnum.FEMALE}</MenuItem>
        </Select>
        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
      </FormControl>
    )}
  />
);
