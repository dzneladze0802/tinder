import { Dictionary } from "@/app/[lang]/dictionaries";
import { LanguageEnum } from "@/constants";

export interface IWithLanguage {
  params: { lang: LanguageEnum };
}

export interface IWithDictionary {
  dictionary: Dictionary;
}
