import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { PageProps } from "../../types";
import AuthSlider from "../../../components/AuthSlider.tsx";

const BASE_IMAGE_URL = "https://izichangebucket.s3.eu-west-3.amazonaws.com";

const Login = (props: PageProps<"login.ftl">) => {
  const { kcContext, Template, i18n } = props;
  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
    message,
    isAppInitiatedAction,
    messagesPerField
  } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const handleSubmit = () => {
    setIsLoginButtonDisabled(true);
    return true;
  };

  return (
    <Template i18n={i18n} kcContext={kcContext} >
      <div className="min-h-screen flex flex-col bg-white dark:bg-[var(--background)] transition-colors">
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Section gauche - Texte et illustration */}
            <div className="text-center lg:text-left group order-1 lg:order-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-[var(--text-dark)] mb-4 sm:mb-6 transition-colors">
                {msg("auth.login.title")}
              </h1>
              <div className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-[var(--text-muted)] mb-6 sm:mb-8 transition-colors font-medium">
                Bienvenue sur votre espace sécurisé. Connectez-vous pour accéder à tous vos services personnalisés.
              </div>
              <div className="hidden sm:block">
                <AuthSlider />
              </div>
            </div>

            {/* Section droite - Formulaire */}
            <div className="dark:bg-[var(--bg-light)] p-4 sm:p-6 lg:p-0 rounded-lg sm:rounded-xl lg:rounded-none transition-colors order-1">
              {/* Logo au-dessus du formulaire */}
              <div className="flex justify-start pt-8 pb-4">
                <img src={`${BASE_IMAGE_URL}/logos-izichange/logo.png`} alt="Logo" className="h-14 w-auto" />
              </div>
              <form
                id="kc-form-login"
                onSubmit={e => { e.preventDefault(); handleSubmit(); (e.target as HTMLFormElement).submit(); }}
                action={url.loginAction}
                method="post"
                className="space-y-4 sm:space-y-6"
              >
                {/* Message d'erreur/succès */}
                {message && (message.type !== 'warning' || !isAppInitiatedAction) && (
                  <div className={clsx(
                    "px-4 py-3 rounded-lg text-sm",
                    message.type === 'success' && "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400",
                    message.type === 'warning' && "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400",
                    message.type === 'error' && "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400",
                    message.type === 'info' && "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400"
                  )}>
                    <span dangerouslySetInnerHTML={{ __html: message.summary }} />
                  </div>
                )}

                {/* Username/Email */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-[var(--text-dark)] mb-2 transition-colors"
                  >
                    {!realm.loginWithEmailAllowed
                      ? msg("username")
                      : !realm.registrationEmailAsUsername
                        ? msg("usernameOrEmail")
                        : msg("email")}
                  </label>
                  <input
                    tabIndex={1}
                    id="username"
                    className={clsx(
                      "w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border",
                      messagesPerField?.existsError?.('username') ? "border-red-500" : "border-gray-300 dark:border-[var(--border-color)]",
                      "dark:bg-[var(--bg-lighter)] dark:text-[var(--text-dark)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                    )}
                    name="username"
                    defaultValue={login?.username ?? ""}
                    type="text"
                    autoFocus={true}
                    autoComplete="off"
                    disabled={usernameHidden}
                    placeholder={
                      !realm.loginWithEmailAllowed
                        ? msgStr("username")
                        : !realm.registrationEmailAsUsername
                          ? msgStr("usernameOrEmail")
                          : msgStr("email")
                    }
                  />
                  {messagesPerField?.existsError?.('username') && (
                    <div className="text-xs text-red-600 mt-1">{messagesPerField.getFirstError('username')}</div>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-[var(--text-dark)] mb-2 transition-colors"
                  >
                    {msg("password")}
                  </label>
                  <input
                    tabIndex={2}
                    id="password"
                    className={clsx(
                      "w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border",
                      messagesPerField?.existsError?.('password') ? "border-red-500" : "border-gray-300 dark:border-[var(--border-color)]",
                      "dark:bg-[var(--bg-lighter)] dark:text-[var(--text-dark)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                    )}
                    name="password"
                    type="password"
                    autoComplete="off"
                    placeholder={msgStr("password")}
                  />
                  {messagesPerField?.existsError?.('password') && (
                    <div className="text-xs text-red-600 mt-1">{messagesPerField.getFirstError('password')}</div>
                  )}
                </div>

                {/* Remember me et forgot password */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  {realm.rememberMe && !usernameHidden && (
                    <div className="flex items-center space-x-2">
                      <input
                        tabIndex={3}
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        defaultChecked={!!login?.rememberMe}
                        className="w-4 h-4 text-[var(--primary)] border-gray-300 dark:border-[var(--border-color)] dark:bg-[var(--bg-lighter)] rounded focus:ring-[var(--primary)] transition-colors"
                      />
                      <label htmlFor="rememberMe" className="text-sm text-gray-600 dark:text-[var(--text-muted)] transition-colors">
                        {msg("rememberMe")}
                      </label>
                    </div>
                  )}
                  {realm.resetPasswordAllowed && (
                    <a
                      tabIndex={5}
                      href={url.loginResetCredentialsUrl}
                      className="text-sm text-[var(--primary)] hover:underline transition-colors"
                    >
                      {msg("doForgotPassword")}
                    </a>
                  )}
                </div>

                {/* Login Button */}
                <input
                  type="hidden"
                  id="id-hidden-input"
                  name="credentialId"
                  value={auth?.selectedCredential ?? ""}
                />
                <button
                  tabIndex={4}
                  className={clsx(
                    "w-full bg-[var(--primary)] text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-colors text-sm sm:text-base flex items-center justify-center",
                    isLoginButtonDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[var(--primary-dark)]"
                  )}
                  name="login"
                  id="kc-login"
                  type="submit"
                  value="Sign In"
                  disabled={isLoginButtonDisabled}
                >
                  {isLoginButtonDisabled ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {msg("doLogIn")}
                    </>
                  ) : (
                    msg("doLogIn")
                  )}
                </button>

                {/* Lien vers l'inscription */}
                {realm.password && realm.registrationAllowed && !registrationDisabled && (
                  <p className="text-center text-sm text-gray-600 dark:text-[var(--text-muted)] transition-colors mt-4">
                    {msg("noAccount")} {" "}
                    <a
                      tabIndex={6}
                      href={url.registrationUrl}
                      className="text-[var(--primary)] hover:underline font-medium transition-colors"
                    >
                      {msg("doRegister")}
                    </a>
                  </p>
                )}

                {/* Social Providers */}
                {realm.password && social && social.providers && social.providers.length > 0 && (
                  <>
                    <div className="relative my-4 sm:my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-[var(--border-color)] transition-colors"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white dark:bg-[var(--bg-light)] text-gray-500 dark:text-[var(--text-muted)] transition-colors">
                          {msg("identity-provider-login-label")}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-3 sm:space-x-4">
                      {social.providers.map((p) => (
                        <a
                          key={p.alias}
                          id={`social-${p.alias}`}
                          className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-[var(--bg-lighter)] rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[var(--border-color)] transition-colors"
                          type="button"
                          href={p.loginUrl}
                        >
                          {p.alias === 'google' && (
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                          )}
                          {p.alias === 'facebook' && (
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                          )}
                          {p.alias === 'github' && (
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900 dark:text-gray-100 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          )}
                          {!['google', 'facebook', 'github'].includes(p.alias) && (
                            <span className="text-xs font-medium">{p.displayName}</span>
                          )}
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
    </Template>
  );
}

export { Login };
