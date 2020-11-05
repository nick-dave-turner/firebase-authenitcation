import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { SIGNIN_RESOURCES, SIGNUP_RESOURCES } from "./resources";
import { useStyles } from "./use-styles";

interface Props {
  type: "SIGNIN" | "SIGNUP";
  errorMessage: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: () => void;
  inputs: { email: string; password: string };
  isFormValid: boolean;
}

export const AuthForm: React.FC<Props> = ({
  errorMessage,
  handleOnChange,
  handleOnSubmit,
  inputs,
  isFormValid,
  type,
}) => {
  const classes = useStyles();
  const resources = type === "SIGNIN" ? SIGNIN_RESOURCES : SIGNUP_RESOURCES;

  return (
    <Container component="main" className={classes.layout} maxWidth="sm">
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          {resources.title}
        </Typography>

        <Typography component="h2" variant="subtitle1">
          {resources.subTitle}
        </Typography>

        <form className={classes.form} noValidate>
          <TextField
            autoComplete="email"
            autoFocus
            fullWidth
            id="email"
            inputProps={{ "data-testid": "email-input" }}
            label="Email Address"
            margin="normal"
            name="email"
            onChange={handleOnChange}
            required
            value={inputs.email}
          />

          <TextField
            autoComplete="current-password"
            fullWidth
            id="password"
            inputProps={{ "data-testid": "password-input" }}
            label="Password"
            margin="normal"
            name="password"
            onChange={handleOnChange}
            required
            type="password"
            value={inputs.password}
          />

          {errorMessage && (
            <Alert className={classes.alert} severity="error">
              {errorMessage}
            </Alert>
          )}

          <Button
            className={classes.submit}
            color="primary"
            data-testid="submit-button"
            disabled={isFormValid}
            fullWidth
            onClick={handleOnSubmit}
            type="button"
            variant="contained"
          >
            {resources.buttonLabel}
          </Button>
        </form>

        <Grid container>
          <Grid item xs />
          <Grid item>
            <Link
              component={RouterLink}
              to={resources.footer.link}
              variant="body2"
            >
              {resources.footer.text}
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
