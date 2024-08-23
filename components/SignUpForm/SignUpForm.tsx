"use client";

import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { SelectGender } from "./SelectGender";
import { SignUpEnum, SignUpInputsType } from "./types";
import { CreateUserSchema, createUserSchema } from "./schema";

export const SignUpForm: React.FC = () => {
  const {
    control,
    formState: { errors, isDirty, isValid },
    register,
    handleSubmit,
    setError,
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });
  const router = useRouter();

  const submit = async (input: CreateUserSchema) => {
    try {
      const response = await fetch("/api/sign-up", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(input),
      });

      const data: { message: string; statusCode: number } =
        await response.json();

      if (data?.statusCode === 201) {
        router.push("/profile");
      } else {
        setError("root", { message: data?.message });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "1rem",
      }}
    >
      <Box
        component="div"
        display="flex"
        width="100%"
        justifyContent="space-between"
        gap={2}
      >
        <TextField
          fullWidth
          id={SignUpEnum.FIRST_NAME}
          label={SignUpEnum.FIRST_NAME}
          error={!!errors[SignUpEnum.FIRST_NAME]}
          helperText={errors[SignUpEnum.FIRST_NAME]?.message}
          {...register(SignUpEnum.FIRST_NAME)}
        />
        <TextField
          fullWidth
          id={SignUpEnum.LAST_NAME}
          label={SignUpEnum.LAST_NAME}
          error={!!errors[SignUpEnum.LAST_NAME]}
          helperText={errors[SignUpEnum.LAST_NAME]?.message}
          {...register(SignUpEnum.LAST_NAME)}
        />
      </Box>
      <TextField
        id={SignUpEnum.EMAIL}
        label={SignUpEnum.EMAIL}
        error={!!errors[SignUpEnum.EMAIL]}
        helperText={errors[SignUpEnum.EMAIL]?.message}
        type="email"
        {...register(SignUpEnum.EMAIL)}
      />
      <Box
        component="div"
        display="flex"
        width="100%"
        justifyContent="space-between"
        gap={2}
      >
        <TextField
          fullWidth
          id={SignUpEnum.AGE}
          label={SignUpEnum.AGE}
          error={!!errors[SignUpEnum.AGE]}
          helperText={errors[SignUpEnum.AGE]?.message}
          {...register(SignUpEnum.AGE)}
        />
        <SelectGender control={control} />
      </Box>
      <TextField
        id={SignUpEnum.PASSWORD}
        label={SignUpEnum.PASSWORD}
        error={!!errors[SignUpEnum.PASSWORD]}
        helperText={errors[SignUpEnum.PASSWORD]?.message}
        type="password"
        {...register(SignUpEnum.PASSWORD)}
      />
      <TextField
        id={SignUpEnum.REPEAT_PASSWORD}
        label={SignUpEnum.REPEAT_PASSWORD}
        error={!!errors[SignUpEnum.REPEAT_PASSWORD]}
        helperText={errors[SignUpEnum.REPEAT_PASSWORD]?.message}
        type="password"
        {...register(SignUpEnum.REPEAT_PASSWORD)}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
      {!!errors?.root && (
        <Typography color="tomato" style={{ alignSelf: "center" }}>
          {errors?.root.message}
        </Typography>
      )}
    </form>
  );
};
