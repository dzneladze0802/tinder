import { LanguageEnum } from "@/constants";
import "server-only";

const dictionaries = {
  [LanguageEnum.ENGLISH]: () =>
    import("./dictionaries/en.json").then((module) => module.default),
  [LanguageEnum.FRENCH]: () =>
    import("./dictionaries/fr.json").then((module) => module.default),
};

export const getDictionary = async (locale: LanguageEnum) =>
  dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
