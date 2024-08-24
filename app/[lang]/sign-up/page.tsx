import { SignUpForm } from "@/components";
import { IWithLanguage } from "@/types";
import { getDictionary } from "../dictionaries";

export default async function SignUp({ params: { lang } }: IWithLanguage) {
  const dictionary = await getDictionary(lang);

  return <SignUpForm dictionary={dictionary} />;
}
