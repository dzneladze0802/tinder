export enum LoginInputEnum {
  EMAIL = "Email",
  NAME = "Name",
  PASSWORD = "Password",
  REPEAT_PASSWORD = "Repeat Password",
}

export type LoginInputsType = {
  [key in LoginInputEnum]: string;
};
