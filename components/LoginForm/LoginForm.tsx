"use client";

import { Button, FormControl, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginInputEnum, LoginInputsType } from "./types";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<LoginInputsType>();

  return (
    <FormControl component="form" onSubmit={handleSubmit(() => {})}>
      <TextField
        id={LoginInputEnum.EMAIL}
        label={LoginInputEnum.EMAIL}
        type="email"
        {...register(LoginInputEnum.EMAIL)}
      />
      <TextField
        id={LoginInputEnum.NAME}
        label={LoginInputEnum.NAME}
        {...register(LoginInputEnum.EMAIL)}
      />
      <TextField
        id={LoginInputEnum.PASSWORD}
        label={LoginInputEnum.PASSWORD}
        type="password"
        {...register(LoginInputEnum.PASSWORD)}
      />
      <Button type="submit">click</Button>
    </FormControl>
  );
};
