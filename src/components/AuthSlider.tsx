import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Définir la base URL des images
const BASE_IMAGE_URL = "https://izichangebucket.s3.eu-west-3.amazonaws.com";

// Typage de l'objet illustration
interface Illustration {
    src: string;
    alt: string;
}

const AuthSlider: React.FC = () => {
    const illustrations: Illustration[] = [
        {
            src: `${BASE_IMAGE_URL}/auth-slider-illustrations/Bitcoin-rafiki.svg`,
            alt: "Bitcoin illustration"
        },
        {
            src: `${BASE_IMAGE_URL}/auth-slider-illustrations/Bitcoin-cuate.svg`,
            alt: "Bitcoin cuate illustration"
        },
        {
            src: `${BASE_IMAGE_URL}/auth-slider-illustrations/Bitcoin-pana.svg`,
            alt: "Bitcoin pana illustration"
        },
        {
            src: `${BASE_IMAGE_URL}/auth-slider-illustrations/Bitcoin%20P2P-rafiki.svg`,
            alt: "Bitcoin P2P illustration"
        },
        {
            src: `${BASE_IMAGE_URL}/auth-slider-illustrations/Crypto%20portfolio-pana.svg`,
            alt: "Crypto portfolio illustration"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState<number>(1); // Commence à 1 pour éviter le premier slide dupliqué
    const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
    const sliderRef = useRef<HTMLDivElement | null>(null);

    // Créer un tableau avec les slides dupliqués pour la boucle infinie
    const extendedIllustrations: Illustration[] = [
        illustrations[illustrations.length - 1], // Dernier slide au début
        ...illustrations,
        illustrations[0] // Premier slide à la fin
    ];

    // Auto-slide toutes les 4 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Gérer la transition pour la boucle infinie
    useEffect(() => {
        if (currentIndex === 0) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(illustrations.length);
                setTimeout(() => setIsTransitioning(true), 50);
            }, 500);
        } else if (currentIndex === extendedIllustrations.length - 1) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(1);
                setTimeout(() => setIsTransitioning(true), 50);
            }, 500);
        }
    }, [currentIndex, illustrations.length, extendedIllustrations.length]);

    const goToPrevious = (): void => {
        setCurrentIndex(prev => prev - 1);
    };

    const goToNext = (): void => {
        setCurrentIndex(prev => prev + 1);
    };

    const goToSlide = (index: number): void => {
        setCurrentIndex(index + 1); // +1 car les vrais slides commencent à l'index 1
    };

    // Calculer l'index réel pour les indicateurs
    const getRealIndex = (): number => {
        if (currentIndex === 0) return illustrations.length - 1;
        if (currentIndex === extendedIllustrations.length - 1) return 0;
        return currentIndex - 1;
    };

    return (
        <div className="relative w-full max-w-md mx-auto lg:mx-0 group">
            {/* Container des images */}
            <div className="relative overflow-hidden rounded-lg">
                <div 
                    ref={sliderRef}
                    className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {extendedIllustrations.map((illustration, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <img
                                src={illustration.src}
                                alt={illustration.alt}
                                className="w-full h-auto"
                            />
                        </div>
                    ))}
                </div>

                {/* Boutons de navigation */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>

                <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
            </div>

            {/* Indicateurs de points */}
            <div className="flex justify-center space-x-2 mt-4">
                {illustrations.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === getRealIndex()
                                ? 'bg-[var(--primary)] scale-110'
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AuthSlider;