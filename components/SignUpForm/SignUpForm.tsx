"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { IWithDictionary } from "@/types";
import { SelectGender } from "./SelectGender";
import { SignUpEnum } from "./types";
import { CreateUserSchema, createUserSchema } from "./schema";

export const SignUpForm: React.FC<IWithDictionary> = ({ dictionary }) => {
  const {
    control,
    formState: { errors, isLoading, isSubmitting },
    register,
    handleSubmit,
    setError,
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });
  const router = useRouter();

  const isWaiting = isLoading || isSubmitting;

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
        router.push("/");
      } else {
        setError("root", { message: data?.message });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(submit)}
        display="flex"
        flexDirection="column"
        marginTop="8rem"
        padding="1rem"
        maxWidth="40rem"
        width="100%"
        gap="1rem"
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
            label={dictionary.signUp.firstName}
            error={!!errors[SignUpEnum.FIRST_NAME]}
            helperText={errors[SignUpEnum.FIRST_NAME]?.message}
            disabled={isWaiting}
            {...register(SignUpEnum.FIRST_NAME)}
          />
          <TextField
            fullWidth
            id={SignUpEnum.LAST_NAME}
            label={dictionary.signUp.lastName}
            error={!!errors[SignUpEnum.LAST_NAME]}
            disabled={isWaiting}
            {...register(SignUpEnum.LAST_NAME)}
          />
        </Box>
        <TextField
          id={SignUpEnum.EMAIL}
          label={dictionary.signUp.email}
          error={!!errors[SignUpEnum.EMAIL]}
          helperText={errors[SignUpEnum.EMAIL]?.message}
          disabled={isWaiting}
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
            label={dictionary.signUp.age}
            error={!!errors[SignUpEnum.AGE]}
            helperText={errors[SignUpEnum.AGE]?.message}
            disabled={isWaiting}
            {...register(SignUpEnum.AGE)}
          />
          <SelectGender
            label={dictionary.signUp.gender}
            control={control}
            isDisabled={isWaiting}
          />
        </Box>
        <TextField
          id={SignUpEnum.PASSWORD}
          label={dictionary.signUp.password}
          error={!!errors[SignUpEnum.PASSWORD]}
          helperText={errors[SignUpEnum.PASSWORD]?.message}
          type="password"
          disabled={isWaiting}
          {...register(SignUpEnum.PASSWORD)}
        />
        <TextField
          id={SignUpEnum.REPEAT_PASSWORD}
          label={dictionary.signUp.repeatPassword}
          error={!!errors[SignUpEnum.REPEAT_PASSWORD]}
          helperText={errors[SignUpEnum.REPEAT_PASSWORD]?.message}
          type="password"
          disabled={isWaiting}
          {...register(SignUpEnum.REPEAT_PASSWORD)}
        />
        <Button type="submit" variant="contained" disabled={isWaiting}>
          {isWaiting ? (
            <CircularProgress size={25} />
          ) : (
            dictionary.signUp.signUp
          )}
        </Button>
        {!!errors?.root && (
          <Typography color="tomato" style={{ alignSelf: "center" }}>
            {errors?.root.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
