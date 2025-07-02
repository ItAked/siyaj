/* eslint-disable react/jsx-key */
"use client"

import goals from "../../../public/data/goals";
import Image from "next/image";
import carousel_arrow from "../../../public/images/carousel_arrow.png";
import { useEffect, useState, useRef } from "react";
import { Clock, LaptopMinimal, Shield, Tag } from "lucide-react";

export default function OurGoals() {
    const icons = [
        <Clock className="text-yellow-600 w-[70px] h-[70px]" />,
        <Shield className="text-yellow-600 w-[70px] h-[70px]" />,
        <Tag className="text-yellow-600 w-[70px] h-[70px]" />,
        <LaptopMinimal className="text-yellow-600 w-[70px] h-[70px]" />
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationTime = 300;
    const carouselRef = useRef<HTMLDivElement>(null);

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(prev => (prev + 1) % goals.length);
        setTimeout(() => setIsAnimating(false), animationTime);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(prev => (prev - 1 + goals.length) % goals.length);
        setTimeout(() => setIsAnimating(false), animationTime);
    };

    // Animation effect
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        // Reset animation classes
        carousel.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');

        // Force reflow to restart animation
        void carousel.offsetWidth;

        // Add appropriate animation class
        if (isAnimating) {
            carousel.classList.add('slide-out-left');
            setTimeout(() => {
                carousel.classList.remove('slide-out-left');
                carousel.classList.add('slide-in-right');
            }, animationTime / 2);
        }
    }, [currentIndex, isAnimating]);

    return (
        <>
            <div id="membersContent" className="max-sm:w-full max-sm:flex max-sm:flex-col max-sm:items-center hidden max-sm:bg-gray-900">
                <div id="membersCarousel" className="flex flex-row w-full justify-center items-center relative">
                    <button 
                        onClick={handleNext} 
                        className="rounded-full mr-10 z-10 h-[48px] w-[48px] transition-colors shrink-0"
                        disabled={isAnimating}
                    >
                        <Image alt="a previous button" src={carousel_arrow} layout='responsive' quality={100} />
                    </button>
                    
                    <div className="my-20 relative overflow-hidden w-[60%] h-[200px] flex items-center justify-center">
                        <div 
                            ref={carouselRef}
                            className="absolute w-full text-center transition-transform duration-300"
                        >
                            <div className="flex flex-col items-center" data-aos="flip-down">
                                {icons[currentIndex]}
                                <p className="text-center font-bold text-xs my-3 text-white md:text-2xl lg:text-2xl">
                                    {goals[currentIndex].title}
                                </p>
                                <p className="text-center font-bold text-xs my-3 text-white md:text-2xl lg:text-2xl">
                                    {goals[currentIndex].goal}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handlePrev} 
                        className="rounded-full rotate-180 z-10 h-[48px] w-[48px] ml-10 transition-colors shrink-0"
                        disabled={isAnimating}
                    >
                        <Image alt="a next button" src={carousel_arrow} layout='responsive' quality={100} />
                    </button>
                </div>
            </div>

            {/* Add these styles for the animations */}
            <style jsx global>{`
                .slide-in-right {
                    animation: slideInRight ${animationTime}ms ease-out forwards;
                }
                .slide-out-left {
                    animation: slideOutLeft ${animationTime}ms ease-out forwards;
                }
                .slide-in-left {
                    animation: slideInLeft ${animationTime}ms ease-out forwards;
                }
                .slide-out-right {
                    animation: slideOutRight ${animationTime}ms ease-out forwards;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutLeft {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(-100%); opacity: 0; }
                }
                @keyframes slideInLeft {
                    from { transform: translateX(-100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `}</style>

            <section className="bg-gray-900 text-white py-20 max-sm:hidden">
                <div className="grid grid-cols-4">
                    {goals.map((goal, index) => (
                        <article key={index} className="grid place-items-center gap-y-2.5 text-balance text-center" data-aos="flip-down">
                            {icons[index]}
                            <h3 className="text-2xl font-medium">{goal.title}</h3>
                            <p className="text-[20px]">{goal.goal}</p>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}