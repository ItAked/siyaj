/* eslint-disable react/jsx-key */
"use client"

import goals from "../../../public/data/goals";
import { useEffect, useState, useRef } from "react";
import { Clock, LaptopMinimal, Shield, Tag } from "lucide-react";

export default function OurGoals() {
    const icons = [
        <Clock className="text-blue-300 w-[70px] h-[70px]" />,
        <Shield className="text-blue-300 w-[70px] h-[70px]" />,
        <Tag className="text-blue-300 w-[70px] h-[70px]" />,
        <LaptopMinimal className="text-blue-300 w-[70px] h-[70px]" />
    ];
    const [currentIndex, ] = useState(0);
    const [isAnimating, ] = useState(false);
    const animationTime = 300;
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;
        carousel.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
        void carousel.offsetWidth;
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
                    <div className="my-20 relative overflow-hidden w-[60%] h-[200px] flex items-center justify-center">
                        <div ref={carouselRef} className="absolute w-full text-center transition-transform duration-300">
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
                </div>
            </div>
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
            <section className="bg-gray-900 text-white py-20 max-sm:hidden dark:bg-gray-950">
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