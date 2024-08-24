import type { Control } from "react-hook-form";
import { CreateUserSchema } from "./schema";

export enum SignUpEnum {
  EMAIL = "email",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  AGE = "age",
  GENDER = "gender",
  PASSWORD = "password",
  REPEAT_PASSWORD = "repeatPassword",
}

export interface ISelectGenderProps {
  control: Control<CreateUserSchema, any>;
  label: string;
}

export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
