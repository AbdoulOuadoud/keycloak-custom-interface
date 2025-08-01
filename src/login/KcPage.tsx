import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import { Login } from "./pages/login/Index";
import { LoginOtp } from "./pages/login-otp/Index";
import { Template } from "./Template";
import { createTheme, ThemeProvider } from "@mui/material";
import "./styles/theme.scss";
import Register from "./pages/register/Index";
import ForgotPassword from "./pages/forgotPassword/Index";
const UserProfileFormFields = lazy(
  () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;

  const { i18n } = useI18n({ kcContext });
  const theme = createTheme({
    cssVariables: true,
    colorSchemes: {
      light: {
        palette: {
          background: {
            default: "#f0f0f0",
          },
          primary: {
            main: kcContext.properties.FDN_THEME_PRIMARY_COLOR
          },
          secondary: {
            main: kcContext.properties.FDN_THEME_SECONDARY_COLOR
          }
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Suspense>
        {(() => {
          switch (kcContext.pageId) {
            case "login.ftl":
              return (
                <Login Template={Template} i18n={i18n} kcContext={kcContext} />
              );
            case "login-otp.ftl":
              return (
                <LoginOtp Template={Template} i18n={i18n} kcContext={kcContext} />
              );
            case "register.ftl":
              return (
                <Register Template={Template} i18n={i18n} kcContext={kcContext} />
              );
            case "login-reset-password.ftl":
              return (
                <ForgotPassword Template={Template} i18n={i18n} kcContext={kcContext} />
              );
            default:
              return (
                <DefaultPage
                  kcContext={kcContext}
                  i18n={i18n}
                  classes={classes}
                  Template={Template}
                  doUseDefaultCss={true}
                  UserProfileFormFields={UserProfileFormFields}
                  doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
              );
          }
        })()}
      </Suspense>
    </ThemeProvider>
  );
}

const classes = {} satisfies { [key in ClassKey]?: string };
