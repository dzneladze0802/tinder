import { Box, Button, Typography } from "@mui/material";
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "@/constants";
import { IWithLanguage } from "@/types";
import { getDictionary } from "../dictionaries";

export default async function Profile({ params: { lang } }: IWithLanguage) {
  const accessToken = cookies().get(ACCESS_TOKEN);
  const dictionary = await getDictionary(lang);

  const response = await fetch(`${process.env.AUTH_API}/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken?.value}`,
    },
    method: "GET",
  });

  const data = await response.json();

  const { firstName, lastName, gender, age } = data?.user;

  return (
    <Box
      component="form"
      sx={{
        marginTop: "90px",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: 3,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="subtitle1" color="textSecondary">
          {dictionary.signUp.firstName}
        </Typography>
        <Typography variant="body1">{firstName}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="subtitle1" color="textSecondary">
          {dictionary.signUp.lastName}
        </Typography>
        <Typography variant="body1">{lastName}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="subtitle1" color="textSecondary">
          {dictionary.signUp.age}
        </Typography>
        <Typography variant="body1">{age}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="subtitle1" color="textSecondary">
          {dictionary.signUp.gender}
        </Typography>
        <Typography variant="body1">{gender}</Typography>
      </Box>
    </Box>
  );
}
