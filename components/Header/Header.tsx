import {
  AppBar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { LanguageEnum } from "@/constants";
import { cookies } from "next/headers";
import { AuthContent } from "./AuthContent";
import { redirect } from "next/navigation";

export const Header: React.FC<{
  lang: LanguageEnum;
}> = async ({ lang }) => {
  const dictionary = await getDictionary(lang);
  const isAuthenticated = Boolean(cookies().get("access_token"));

  const handleAction = async (): Promise<void> => {
    "use server";
    cookies().delete("access_token");
    redirect("/login");
  };

  const nonAuthenticatedContent = (
    <Box display="flex" gap={1}>
      <Link href="/en/login">
        <MenuItem>{dictionary.login.login}</MenuItem>
      </Link>
      <Link href="/en/sign-up">
        <MenuItem>{dictionary.signUp.signUp}</MenuItem>
      </Link>
    </Box>
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        {isAuthenticated ? (
          <AuthContent
            onAction={handleAction}
            buttonLabel={dictionary.common.signOut}
          />
        ) : (
          nonAuthenticatedContent
        )}
      </Toolbar>
    </AppBar>
  );
};
