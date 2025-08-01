import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import fr from './locales/fr.json';

// Ajoute d'autres langues ici si besoin

const resources = {
    en: { translation: en },
    fr: { translation: fr },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'fr', // langue par défaut
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React gère déjà l'échappement
        },
    });

export default i18n;
