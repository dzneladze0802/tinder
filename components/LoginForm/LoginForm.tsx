"use client";

import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { IWithDictionary } from "@/types";
import { LoginEnum } from "./types";
import { CreateLoginSchema, createLoginSchema } from "./schema";

export const LoginForm: React.FC<IWithDictionary> = ({ dictionary }) => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm<CreateLoginSchema>({
    resolver: zodResolver(createLoginSchema),
  });
  const router = useRouter();

  const submit = async (input: CreateLoginSchema) => {
    try {
      const response = await fetch("/api/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(input),
      });

      const data: { message: string; statusCode: number } =
        await response.json();

      if (data?.statusCode === 200) {
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
        <TextField
          id={LoginEnum.EMAIL}
          label={dictionary.login.email}
          error={!!errors[LoginEnum.EMAIL]}
          helperText={errors[LoginEnum.EMAIL]?.message}
          type="email"
          {...register(LoginEnum.EMAIL)}
        />

        <TextField
          id={LoginEnum.PASSWORD}
          label={dictionary.login.password}
          error={!!errors[LoginEnum.PASSWORD]}
          helperText={errors[LoginEnum.PASSWORD]?.message}
          type="password"
          {...register(LoginEnum.PASSWORD)}
        />

        <Button type="submit" variant="contained">
          {dictionary.login.login}
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
