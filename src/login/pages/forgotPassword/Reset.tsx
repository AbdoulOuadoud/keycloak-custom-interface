import { useState } from "react";
import { PageProps } from "../../types";

const BASE_IMAGE_URL = "https://izichangebucket.s3.eu-west-3.amazonaws.com";

const ForgotPasswordReset = (props: PageProps<"login-reset-password.ftl">) => {
    const { kcContext, Template, i18n } = props;
    const { url, message } = kcContext;
    const { msg } = i18n;
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    return (
        <Template i18n={i18n} kcContext={kcContext}>
            <div className="min-h-screen flex flex-col bg-white dark:bg-[var(--background)] transition-colors">
                <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    <div className="max-w-md w-full space-y-8">
                        <div className="flex justify-start pt-8 pb-4">
                            <img src={`${BASE_IMAGE_URL}/logos-izichange/logo.png`} alt="Logo" className="h-14 w-auto" />
                        </div>
                        <h1 className="text-2xl font-bold mb-4">{msg("resetPassword", "Réinitialiser le mot de passe")}</h1>
                        <form action={url.loginAction} method="post" className="space-y-4">
                            {/* Message d'erreur/succès */}
                            {message && (
                                <div className="bg-red-100 text-red-700 p-2 rounded mb-2">{message.summary}</div>
                            )}
                            <div>
                                <label htmlFor="password" className="block mb-1">{msg("password", "Nouveau mot de passe")}</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="password-confirm" className="block mb-1">{msg("passwordConfirm", "Confirmer le mot de passe")}</label>
                                <input
                                    id="password-confirm"
                                    name="password-confirm"
                                    type="password"
                                    value={confirm}
                                    onChange={e => setConfirm(e.target.value)}
                                    required
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <button type="submit" className="w-full bg-primary text-white py-2 rounded">{msg("doSubmit", "Valider")}</button>
                        </form>
                    </div>
                </main>
            </div>
        </Template>
    );
};

export default ForgotPasswordReset;
