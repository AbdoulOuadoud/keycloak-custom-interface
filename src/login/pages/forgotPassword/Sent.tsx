import { PageProps } from "../../types";

const BASE_IMAGE_URL = "https://izichangebucket.s3.eu-west-3.amazonaws.com";

const ForgotPasswordSent = (props: PageProps<any>) => {
    const { kcContext, Template, i18n } = props;
    const { msg } = i18n;
    return (
        <Template i18n={i18n} kcContext={kcContext}>
            <div className="min-h-screen flex flex-col bg-white dark:bg-[var(--background)] transition-colors">
                <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    <div className="max-w-md w-full space-y-8">
                        <div className="flex justify-start pt-8 pb-4">
                            <img src={`${BASE_IMAGE_URL}/logos-izichange/logo.png`} alt="Logo" className="h-14 w-auto" />
                        </div>
                        <h1 className="text-2xl font-bold mb-4">{msg("doForgotPassword", "Vérifiez votre boîte mail")}</h1>
                        <p>Si un compte existe pour cet email, un lien de réinitialisation a été envoyé.</p>
                    </div>
                </main>
            </div>
        </Template>
    );
};

export default ForgotPasswordSent;
