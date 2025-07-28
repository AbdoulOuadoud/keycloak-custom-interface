import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { PageProps } from "../../types";
import AuthSlider from "../../../components/AuthSlider.tsx";

const BASE_IMAGE_URL = "https://izichangebucket.s3.eu-west-3.amazonaws.com";

const LoginOtp = (props: PageProps<"login-otp.ftl">) => {
  const { kcContext, Template, i18n } = props;
  const {
    otpLogin,
    url,
    messagesPerField,
    message,
    isAppInitiatedAction
  } = kcContext;

  const { msg } = i18n;

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [selectedCredentialId, setSelectedCredentialId] = useState(
    otpLogin?.selectedCredentialId || otpLogin?.userOtpCredentials?.[0]?.id || ""
  );

  const handleSubmit = () => {
    setIsSubmitButtonDisabled(true);
    return true;
  };

  const hasMultipleCredentials = otpLogin?.userOtpCredentials && otpLogin.userOtpCredentials.length > 1;

  return (
    <Template i18n={i18n} kcContext={kcContext}>
      <div className="min-h-screen flex flex-col bg-white dark:bg-[var(--background)] transition-colors">
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Section gauche - Texte et illustration */}
            <div className="text-center lg:text-left group order-1 lg:order-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-[var(--text-dark)] mb-4 sm:mb-6 transition-colors">
                {msg("auth.otp.title")}
              </h1>
              <div className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-[var(--text-muted)] mb-6 sm:mb-8 transition-colors font-medium">
                Saisissez le code de vérification généré par votre application d'authentification pour sécuriser votre connexion.
              </div>
              <div className="hidden sm:block">
                <AuthSlider />
              </div>
            </div>

            {/* Section droite - Formulaire OTP */}
            <div className="dark:bg-[var(--bg-light)] p-4 sm:p-6 lg:p-0 rounded-lg sm:rounded-xl lg:rounded-none transition-colors order-1">
              {/* Logo au-dessus du formulaire */}
              <div className="flex justify-start pt-8 pb-4 mb-6">
                <img src={`${BASE_IMAGE_URL}/logos-izichange/logo.png`} alt="Logo" className="h-14 w-auto" />
              </div>

              <form
                id="kc-otp-login-form"
                onSubmit={e => {
                  e.preventDefault();
                  handleSubmit();
                  (e.target as HTMLFormElement).submit();
                }}
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

                {/* Sélection du dispositif OTP (si plusieurs) */}
                {hasMultipleCredentials && (
                  <div>
                    <label
                      htmlFor="selectedCredentialId"
                      className="block text-sm font-medium text-gray-700 dark:text-[var(--text-dark)] mb-2 transition-colors"
                    >
                      {msg("loginChooseAuthenticator")}
                    </label>
                    <select
                      id="selectedCredentialId"
                      name="selectedCredentialId"
                      value={selectedCredentialId}
                      onChange={(e) => setSelectedCredentialId(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-[var(--border-color)] dark:bg-[var(--bg-lighter)] dark:text-[var(--text-dark)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                    >
                      {otpLogin?.userOtpCredentials?.map((credential) => (
                        <option key={credential.id} value={credential.id}>
                          {credential.userLabel}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Code OTP */}
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 dark:text-[var(--text-dark)] mb-2 transition-colors"
                  >
                    {msg("loginOtpOneTime")}
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    autoComplete="off"
                    autoFocus={true}
                    className={clsx(
                      "w-full px-3 sm:px-4 py-2.5 sm:py-3 border text-center font-mono text-lg tracking-widest",
                      messagesPerField?.existsError?.('totp') ? "border-red-500" : "border-gray-300 dark:border-[var(--border-color)]",
                      "dark:bg-[var(--bg-lighter)] dark:text-[var(--text-dark)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                    )}
                    placeholder="000000"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    inputMode="numeric"
                  />
                  {messagesPerField?.existsError?.('totp') && (
                    <div className="text-xs text-red-600 mt-1">
                      {messagesPerField.getFirstError('totp')}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 dark:text-[var(--text-muted)] mt-1 transition-colors">
                    Saisissez le code à 6 chiffres de votre application d'authentification
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  className={clsx(
                    "w-full bg-[var(--primary)] text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-colors text-sm sm:text-base flex items-center justify-center",
                    isSubmitButtonDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[var(--primary-dark)]"
                  )}
                  name="login"
                  id="kc-login"
                  type="submit"
                  disabled={isSubmitButtonDisabled}
                >
                  {isSubmitButtonDisabled ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {msg("doSubmit")}
                    </>
                  ) : (
                    msg("doSubmit")
                  )}
                </button>

                {/* Lien de retour */}
                <div className="text-center">
                  <a
                    href={url.loginUrl}
                    className="text-sm text-[var(--primary)] hover:underline transition-colors"
                  >
                    ← Retour à la connexion
                  </a>
                </div>

                {/* Aide pour l'OTP */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      <p className="font-medium mb-1">Besoin d'aide ?</p>
                      <p>Ouvrez votre application d'authentification (Google Authenticator, Authy, etc.) et saisissez le code à 6 chiffres affiché.</p>
                    </div>
                  </div>
                </div>

                {/* Hidden inputs pour la compatibilité Keycloak */}
                {selectedCredentialId && (
                  <input
                    type="hidden"
                    id="selectedCredentialId"
                    name="selectedCredentialId"
                    value={selectedCredentialId}
                  />
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
    </Template>
  );
};

export { LoginOtp };
