/**
 * Utilitaires pour améliorer la compatibilité et la gestion des redirections Keycloak
 */

export const ensureFormFields = (form: HTMLFormElement, fields: Record<string, string>) => {
    Object.entries(fields).forEach(([fieldName, fieldValue]) => {
        const existing = form.querySelector(`input[name="${fieldName}"]`) as HTMLInputElement;
        if (!existing) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = fieldName;
            input.value = fieldValue;
            form.appendChild(input);
        } else {
            existing.value = fieldValue;
        }
    });
};

export const logKeycloakContext = (kcContext: any) => {
    console.group('🔑 Keycloak Context Debug');
    console.log('Page ID:', kcContext.pageId);
    console.log('Realm:', kcContext.realm?.name);
    console.log('Client ID:', kcContext.client?.clientId);
    console.log('URLs:', {
        loginAction: kcContext.url?.loginAction,
        registrationAction: kcContext.url?.registrationAction,
        loginResetCredentialsUrl: kcContext.url?.loginResetCredentialsUrl
    });
    console.log('Auth Context:', kcContext.auth);
    console.log('Messages:', kcContext.message);
    console.groupEnd();
};

export const validateFormSubmission = (form: HTMLFormElement, requiredFields: string[]) => {
    const missingFields: string[] = [];

    requiredFields.forEach(fieldName => {
        const field = form.querySelector(`input[name="${fieldName}"], select[name="${fieldName}"], textarea[name="${fieldName}"]`) as HTMLInputElement;
        if (!field || !field.value.trim()) {
            missingFields.push(fieldName);
        }
    });

    return {
        isValid: missingFields.length === 0,
        missingFields
    };
};

export const addFormDebugListeners = () => {
    if (typeof window !== 'undefined') {
        window.addEventListener('DOMContentLoaded', () => {
            const forms = document.querySelectorAll('form[action*="loginAction"], form[action*="registrationAction"]');

            forms.forEach(form => {
                form.addEventListener('submit', () => {
                    console.group('📝 Form Submission Debug');
                    console.log('Form Action:', (form as HTMLFormElement).action);
                    console.log('Form Method:', (form as HTMLFormElement).method);

                    const formData = new FormData(form as HTMLFormElement);
                    const data: Record<string, string> = {};
                    formData.forEach((value, key) => {
                        data[key] = value.toString();
                    });
                    console.log('Form Data:', data);
                    console.groupEnd();
                });
            });
        });
    }
};
