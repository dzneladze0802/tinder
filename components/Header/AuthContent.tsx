import { Box, Button, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

export const AuthContent: React.FC<{
  buttonLabel: string;
  onAction: VoidFunction;
}> = ({ buttonLabel, onAction }) => {
  return (
    <Box
      component="form"
      action={onAction}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Button variant="contained" color="error" type="submit">
        {buttonLabel}
      </Button>
    </Box>
  );
};
