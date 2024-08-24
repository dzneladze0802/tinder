"use client";

import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { IWithDictionary } from "@/types";
import { SelectGender } from "./SelectGender";
import { SignUpEnum } from "./types";
import { CreateUserSchema, createUserSchema } from "./schema";

export const SignUpForm: React.FC<IWithDictionary> = ({ dictionary }) => {
  const {
    control,
    formState: { errors },
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
            label={dictionary["sign-up"].firstName}
            error={!!errors[SignUpEnum.FIRST_NAME]}
            helperText={errors[SignUpEnum.FIRST_NAME]?.message}
            {...register(SignUpEnum.FIRST_NAME)}
          />
          <TextField
            fullWidth
            id={SignUpEnum.LAST_NAME}
            label={dictionary["sign-up"].lastName}
            error={!!errors[SignUpEnum.LAST_NAME]}
            {...register(SignUpEnum.LAST_NAME)}
          />
        </Box>
        <TextField
          id={SignUpEnum.EMAIL}
          label={dictionary["sign-up"].email}
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
            label={dictionary["sign-up"].age}
            error={!!errors[SignUpEnum.AGE]}
            helperText={errors[SignUpEnum.AGE]?.message}
            {...register(SignUpEnum.AGE)}
          />
          <SelectGender
            label={dictionary["sign-up"].gender}
            control={control}
          />
        </Box>
        <TextField
          id={SignUpEnum.PASSWORD}
          label={dictionary["sign-up"].password}
          error={!!errors[SignUpEnum.PASSWORD]}
          helperText={errors[SignUpEnum.PASSWORD]?.message}
          type="password"
          {...register(SignUpEnum.PASSWORD)}
        />
        <TextField
          id={SignUpEnum.REPEAT_PASSWORD}
          label={dictionary["sign-up"].repeatPassword}
          error={!!errors[SignUpEnum.REPEAT_PASSWORD]}
          helperText={errors[SignUpEnum.REPEAT_PASSWORD]?.message}
          type="password"
          {...register(SignUpEnum.REPEAT_PASSWORD)}
        />
        <Button type="submit" variant="contained">
          {dictionary["common"].submit}
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
