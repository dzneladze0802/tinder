import { IWithLanguage } from "@/types";
import { LoginForm } from "@/components";
import { getDictionary } from "../dictionaries";

export default async function Login({ params: { lang } }: IWithLanguage) {
  const dictionary = await getDictionary(lang);

  return <LoginForm dictionary={dictionary} />;
}
