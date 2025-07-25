import { FC } from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BASE_IMAGE_URL = "https://izichangebucket.s3.eu-west-3.amazonaws.com";

const Footer: FC = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-primary py-6 sm:py-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    {/* Copyright */}
                    <p className="text-white text-xs sm:text-sm text-center md:text-left">
                        {t('auth.footer.copyright')}
                    </p>

                    {/* Icônes réseaux sociaux */}
                    <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4">
                        <p className="text-white text-sm sm:text-base">{t('auth.footer.socialNetworks')}</p>
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <a href="#" className="bg-white rounded-full p-1.5 sm:p-2 hover:bg-gray-100 transition-colors">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="#" className="bg-white rounded-full p-1.5 sm:p-2 hover:bg-gray-100 transition-colors">
                                <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            </a>
                            <a href="#" className="bg-white rounded-full p-1.5 sm:p-2 hover:bg-gray-100 transition-colors">
                                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            </a>
                            <a href="#" className="bg-white rounded-full p-1.5 sm:p-2 hover:bg-gray-100 transition-colors">
                                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            </a>
                            <a href="#" className="bg-white rounded-full p-1.5 sm:p-2 hover:bg-gray-100 transition-colors">
                                <img src={`${BASE_IMAGE_URL}/social-media-icons/Telegram.svg`} alt="Telegram" className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;