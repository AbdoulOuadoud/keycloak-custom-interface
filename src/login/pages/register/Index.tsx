import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { PageProps } from "../../types";
import AuthSlider from "../../../components/AuthSlider";

const BASE_IMAGE_URL = "https://izichangebucket.s3.eu-west-3.amazonaws.com";

const Register = (props: PageProps<"register.ftl">) => {
    const { kcContext, Template, i18n } = props;
    const { url, message, isAppInitiatedAction, messagesPerField, profile, termsAcceptanceRequired } = kcContext;
    const { msg } = i18n;
    const emailDefault = profile?.attributesByName?.email?.value ?? "";
    const phoneDefault = profile?.attributesByName?.phone?.value ?? "";
    const [phone, setPhone] = useState(phoneDefault);

    return (
        <Template i18n={i18n} kcContext={kcContext}>
            <div className="min-h-screen flex flex-col bg-white dark:bg-[var(--background)] transition-colors">
                <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                        {/* Section gauche - Texte et illustration */}
                        <div className="text-center lg:text-left group order-1 lg:order-0">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-[var(--text-dark)] mb-4 sm:mb-6 transition-colors">
                                {msg('doRegister')}
                            </h1>
                            <div className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-[var(--text-muted)] mb-6 sm:mb-8 transition-colors font-medium">
                                Rejoignez la communauté et profitez de tous nos services en créant votre compte personnel sécurisé.
                            </div>
                            <div className="hidden sm:block">
                                <AuthSlider />
                            </div>
                        </div>
                        {/* Section droite - Formulaire */}
                        <div className="dark:bg-[var(--bg-light)] p-4 sm:p-6 lg:p-0 rounded-lg sm:rounded-xl lg:rounded-none transition-colors order-1">
                            {/* Logo au-dessus du formulaire */}
                            <div className="flex justify-start pt-8 pb-4 mb-6">
                                <img src={`${BASE_IMAGE_URL}/logos-izichange/logo.png`} alt="Logo" className="h-14 w-auto" />
                            </div>
                            <form 
                                id="kc-register-form" 
                                action={url.registrationAction} 
                                method="post" 
                                className="space-y-4 sm:space-y-6"
                                onSubmit={e => {
                                    // S'assurer que tous les champs nécessaires sont correctement soumis
                                    const form = e.target as HTMLFormElement;
                                    
                                    // Vérifier que l'email et username sont synchronisés
                                    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
                                    const usernameInput = form.querySelector('input[name="username"]') as HTMLInputElement;
                                    
                                    if (emailInput && usernameInput) {
                                        usernameInput.value = emailInput.value;
                                    }
                                }}
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
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-[var(--text-dark)] mb-2 transition-colors">
                                        {msg('email')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={clsx(
                                            "w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border",
                                            messagesPerField?.existsError?.('email') ? "border-red-500" : "border-gray-300 dark:border-[var(--border-color)]",
                                            "dark:bg-[var(--bg-lighter)] dark:text-[var(--text-dark)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                                        )}
                                        defaultValue={emailDefault}
                                        placeholder="Email"
                                        autoComplete="email"
                                        required
                                    />
                                    {/* Champ username caché qui copie la valeur de l'email */}
                                    <input
                                        type="hidden"
                                        name="username"
                                        defaultValue={emailDefault}
                                        ref={(input) => {
                                            if (input) {
                                                const emailInput = input.form?.querySelector('input[name="email"]') as HTMLInputElement;
                                                if (emailInput) {
                                                    emailInput.addEventListener('input', (e) => {
                                                        input.value = (e.target as HTMLInputElement).value;
                                                    });
                                                }
                                            }
                                        }}
                                    />
                                    {messagesPerField?.existsError?.('email') && (
                                        <div className="text-xs text-red-600 mt-1">{messagesPerField.getFirstError('email')}</div>
                                    )}
                                </div>
                                {/* Téléphone (champ custom, à gérer côté backend si besoin) */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-[var(--text-dark)] mb-2 transition-colors">
                                        {msg('phone')}
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className={clsx(
                                            "w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border",
                                            messagesPerField?.existsError?.('phone') ? "border-red-500" : "border-gray-300 dark:border-[var(--border-color)]",
                                            "dark:bg-[var(--bg-lighter)] dark:text-[var(--text-dark)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                                        )}
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        placeholder="Votre numéro de téléphone"
                                    />
                                    {messagesPerField?.existsError?.('phone') && (
                                        <div className="text-xs text-red-600 mt-1">{messagesPerField.getFirstError('phone')}</div>
                                    )}
                                </div>
                                {/* Mot de passe */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-[var(--text-dark)] mb-2 transition-colors">
                                        {msg('password')}
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className={clsx(
                                            "w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border",
                                            messagesPerField?.existsError?.('password') ? "border-red-500" : "border-gray-300 dark:border-[var(--border-color)]",
                                            "dark:bg-[var(--bg-lighter)] dark:text-[var(--text-dark)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                                        )}
                                        autoComplete="new-password"
                                        placeholder="Mot de passe"
                                        required
                                    />
                                    {messagesPerField?.existsError?.('password') && (
                                        <div className="text-xs text-red-600 mt-1">{messagesPerField.getFirstError('password')}</div>
                                    )}
                                </div>
                                {/* Confirmation mot de passe */}
                                <div>
                                    <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700 dark:text-[var(--text-dark)] mb-2 transition-colors">
                                        {msg('passwordConfirm')}
                                    </label>
                                    <input
                                        type="password"
                                        id="password-confirm"
                                        name="password-confirm"
                                        className={clsx(
                                            "w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border",
                                            messagesPerField?.existsError?.('password-confirm') ? "border-red-500" : "border-gray-300 dark:border-[var(--border-color)]",
                                            "dark:bg-[var(--bg-lighter)] dark:text-[var(--text-dark)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                                        )}
                                        autoComplete="new-password"
                                        placeholder="Confirmer le mot de passe"
                                        required
                                    />
                                    {messagesPerField?.existsError?.('password-confirm') && (
                                        <div className="text-xs text-red-600 mt-1">{messagesPerField.getFirstError('password-confirm')}</div>
                                    )}
                                </div>
                                {/* CGU/Terms */}
                                {termsAcceptanceRequired && (
                                    <div className="flex items-start sm:items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            id="termsAccepted"
                                            name="termsAccepted"
                                            className="w-4 h-4 mt-0.5 sm:mt-0 text-[var(--primary)] border-gray-300 dark:border-[var(--border-color)] dark:bg-[var(--bg-lighter)] rounded focus:ring-[var(--primary)] flex-shrink-0 transition-colors"
                                            required
                                        />
                                        <label htmlFor="termsAccepted" className="text-sm text-gray-600 dark:text-[var(--text-muted)] leading-relaxed transition-colors">
                                            {msg('termsText')}
                                        </label>
                                    </div>
                                )}
                                {/* Bouton S'inscrire */}
                                <button
                                    type="submit"
                                    className="w-full bg-[var(--primary)] text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium hover:bg-[var(--primary-dark)] transition-colors text-sm sm:text-base"
                                >
                                    {msg('doRegister')}
                                </button>

                                {/* Lien vers la connexion */}
                                {url.loginUrl && (
                                    <p className="text-center text-sm text-gray-600 dark:text-[var(--text-muted)] transition-colors mt-4">
                                        {'Vous avez déjà un compte ?'} {" "}
                                        <a
                                            href={url.loginUrl}
                                            className="text-[var(--primary)] hover:underline font-medium transition-colors"
                                        >
                                            {msg('doLogIn', 'Se connecter')}
                                        </a>
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </Template>
    );
};

export default Register;
