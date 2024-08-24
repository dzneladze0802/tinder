import { SignUpForm } from "@/components";
import { getDictionary } from "../dictionaries";

export default async function SignUp({ params: { lang } }: any) {
  const dictionary = await getDictionary(lang);

  return <SignUpForm dictionary={dictionary} />;
}
