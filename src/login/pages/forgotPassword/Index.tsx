import { useState } from "react";
import { PageProps } from "../../types";

const ForgotPassword = (props: PageProps<any>) => {
    const { kcContext, Template, i18n } = props;
    const { url, message } = kcContext;
    const { msg } = i18n;
    const [email, setEmail] = useState("");

    const BASE_IMAGE_URL = "https://izichangebucket.s3.eu-west-3.amazonaws.com";


    return (
        <Template i18n={i18n} kcContext={kcContext}>
            <div className="min-h-screen flex flex-col bg-white dark:bg-[var(--background)] transition-colors">
                <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    <div className="max-w-md w-full space-y-8 bg-white/90 dark:bg-[var(--bg-light)] rounded-xl shadow-lg p-6 sm:p-8">
                        <div className="flex justify-center mb-2">
                            <img src={`${BASE_IMAGE_URL}/logos-izichange/logo.png`} alt="Logo" className="h-8 w-auto" />
                        </div>
                        <p className="text-gray-600 dark:text-[var(--text-muted)] text-center text-sm mb-4">Saisissez votre adresse email pour recevoir un lien de réinitialisation de votre mot de passe.</p>
                        <form action={url.loginAction} method="post" className="space-y-4">
                            {/* Message d'erreur/succès */}
                            {message && (
                                <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-center text-sm">{message.summary}</div>
                            )}
                            <div>
                                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-[var(--text-dark)]">{msg("email", "Adresse email")}</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-[var(--border-color)] dark:bg-[var(--bg-lighter)] dark:text-[var(--text-dark)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                                    placeholder="votre@email.com"
                                />
                            </div>
                            <button type="submit" className="w-full bg-primary hover:bg-primary/90 transition text-white py-2 rounded-lg font-semibold shadow">{msg("doSubmit", "Envoyer le lien de réinitialisation")}</button>
                        </form>
                        <div className="text-center mt-4">
                            <a href={url.loginUrl} className="text-primary hover:underline text-sm">Retour à la connexion</a>
                        </div>
                    </div>
                </main>
            </div>
        </Template>
    );
};

export default ForgotPassword;
