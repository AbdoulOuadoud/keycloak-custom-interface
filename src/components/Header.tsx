import React, { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
// import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { useDarkMode } from '../../contexts/DarkModeContext';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "../components/ui/dropdown-menu";

const BASE_IMAGE_URL = "https://izichangebucket.s3.eu-west-3.amazonaws.com";

// Typage des props du Header
interface HeaderProps {
    currentPage?: 'login' | 'signup';
    onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage = 'signup', onMenuToggle }) => {
    // const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { t, i18n } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    console.log(currentPage)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (onMenuToggle) {
            onMenuToggle();
        }
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <>
            <nav className="bg-primary-light dark:bg-[var(--bg-light)] px-4 py-4 relative z-50 transition-colors">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                            src={`${BASE_IMAGE_URL}/logos-izichange/logo.png`}
                            alt="Izichange"
                            className="h-8 w-auto sm:h-10"
                        />
                    </div>

                    {/* Navigation desktop */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        <div className="flex items-center space-x-4 lg:space-x-6">
                            {/* Sélecteur de langue */}
                            {/* <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-[var(--text-dark)] hover:text-[var(--primary)] transition-colors">
                                    <span>{i18n.language === 'en' ? 'English' : 'Français'}</span>
                                    <ChevronDown className="w-4 h-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white dark:bg-[var(--bg-light)] border dark:border-[var(--border-color)] shadow-lg transition-colors">
                                    <DropdownMenuItem 
                                        onClick={() => changeLanguage('fr')}
                                        className="hover:bg-[var(--primary)] hover:text-white focus:bg-[var(--primary)] focus:text-white dark:text-[var(--text-dark)] transition-colors"
                                    >
                                        Français
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                        onClick={() => changeLanguage('en')}
                                        className="hover:bg-[var(--primary)] hover:text-white focus:bg-[var(--primary)] focus:text-white dark:text-[var(--text-dark)] transition-colors"
                                    >
                                        English
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu> */}

                            {/* Bouton télécharger l'app */}
                            <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-[var(--text-dark)] hover:text-[var(--primary)] transition-colors">
                                <Download className="w-4 h-4" />
                                <span className="hidden lg:inline">{t('auth.navbar.downloadApp')}</span>
                            </button>

                            {/* Toggle Dark/Light Mode */}
                            {/* <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[var(--bg-lighter)] transition-colors border border-gray-200 dark:border-[var(--border-color)]"
                                aria-label="Toggle theme"
                            >
                                {isDarkMode ? (
                                    <Sun className="w-5 h-5 text-[var(--primary)]" />
                                ) : (
                                    <Moon className="w-5 h-5 text-[var(--primary)]" />
                                )}
                            </button> */}
                        </div>

                        {/* Bouton d'action unique */}
                        {/* <div className="flex items-center">
                            {currentPage === 'login' ? (
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
                                >
                                    {t('auth.navbar.signup')}
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
                                >
                                    {t('auth.navbar.login')}
                                </Link>
                            )}
                        </div> */}
                    </div>

                    {/* Bouton menu mobile */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 rounded-lg text-gray-700 dark:text-[var(--text-dark)] hover:bg-gray-100 dark:hover:bg-[var(--bg-lighter)] transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Menu mobile overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-gray bg-opacity-10 backdrop-blur-sm z-40 md:hidden" onClick={closeMobileMenu}>
                    <div 
                        className="absolute top-16 left-0 right-0 bg-white dark:bg-[var(--bg-light)] shadow-lg border-t dark:border-[var(--border-color)] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-4 py-6 space-y-4">
                            {/* Sélecteur de langue mobile */}
                            <div className="border-b dark:border-[var(--border-color)] pb-4">
                                <p className="text-sm font-medium text-gray-900 dark:text-[var(--text-dark)] mb-2 transition-colors">{t('auth.navbar.language')}</p>
                                <div className="space-y-2">
                                    <button 
                                        onClick={() => changeLanguage('fr')}
                                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-[var(--text-muted)] hover:bg-gray-100 dark:hover:bg-[var(--bg-lighter)] rounded transition-colors"
                                    >
                                        Français
                                    </button>
                                    <button 
                                        onClick={() => changeLanguage('en')}
                                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-[var(--text-muted)] hover:bg-gray-100 dark:hover:bg-[var(--bg-lighter)] rounded transition-colors"
                                    >
                                        English
                                    </button>
                                </div>
                            </div>

                            {/* Options du thème mobile */}
                            {/* <div className="border-b dark:border-[var(--border-color)] pb-4">
                                <button
                                    onClick={toggleDarkMode}
                                    className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 dark:text-[var(--text-dark)] hover:bg-gray-100 dark:hover:bg-[var(--bg-lighter)] rounded transition-colors"
                                >
                                    <span>{t('auth.navbar.theme')}</span>
                                    {isDarkMode ? (
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-gray-500 dark:text-[var(--text-muted)]">{t('auth.navbar.darkMode')}</span>
                                            <Moon className="w-4 h-4 text-[var(--primary)]" />
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-gray-500 dark:text-[var(--text-muted)]">{t('auth.navbar.lightMode')}</span>
                                            <Sun className="w-4 h-4 text-[var(--primary)]" />
                                        </div>
                                    )}
                                </button>
                            </div> */}

                            {/* Télécharger l'app mobile */}
                            <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-[var(--text-dark)] hover:bg-gray-100 dark:hover:bg-[var(--bg-lighter)] rounded transition-colors">
                                <Download className="w-4 h-4" />
                                <span>{t('auth.navbar.downloadApp')}</span>
                            </button>

                            {/* Bouton d'action mobile unique */}
                            {/* <div className="pt-4">
                                {currentPage === 'login' ? (
                                    <Link
                                        to="/signup"
                                        onClick={closeMobileMenu}
                                        className="block w-full px-4 py-2 bg-[var(--primary)] text-white text-center text-sm font-medium rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
                                    >
                                        {t('auth.navbar.signup')}
                                    </Link>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={closeMobileMenu}
                                        className="block w-full px-4 py-2 bg-[var(--primary)] text-white text-center text-sm font-medium rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
                                    >
                                        {t('auth.navbar.login')}
                                    </Link>
                                )}
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;