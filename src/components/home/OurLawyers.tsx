/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect, useRef } from "react";
import lawyers from "../../../public/data/lawyers"

const OurLawyers = () => {
    const [activePage, setActivePage] = useState<number>(1);
    const carouselRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const currentCarouselRef = carouselRef.current;
        const currentItemsRef = itemsRef.current;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const pageNumber = parseInt(id.replace('item', ''));
                    setActivePage(pageNumber);
                }
            });
        }, {
            root: currentCarouselRef,
            threshold: 0.5
        });
        currentItemsRef.forEach(item => {
            if (item) observer.observe(item);
        });
        return () => {
            currentItemsRef.forEach(item => {
                if (item) observer.unobserve(item);
            });
        };
    }, []);
    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el && !itemsRef.current.includes(el)) {
            itemsRef.current[index] = el;
        }
    };

    return(
        <>
            <section className="relative before:absolute before:inset-0 before:-z-20 my-28">
                <div className="mx-auto">
                    <div className="py-12 md:py-20">
                        <div className="max-w-3xl pb-16 text-right md:pb-20 px-14">
                            <h2 className="text-6xl text-gray-900 dark:text-white">محامينا</h2>
                        </div>
                        <div className="carousel w-full overflow-x-auto" ref={carouselRef}>
                            {Array.from({ length: Math.ceil(lawyers.length / 3) }).map((_, index) => {
                                const startIndex = index * 3;
                                const endIndex = startIndex + 3;
                                const lawyersChunk = lawyers.slice(startIndex, endIndex);
                                return (
                                    <div key={`item${index + 1}`} id={`item${index + 1}`} ref={el => addToRefs(el, index)} className="carousel-item grid grid-cols-3 w-full
                                    gap-x-0 place-items-center snap-start max-sm:grid-cols-1 max-sm:gap-y-4">
                                        {lawyersChunk.map((lawyer, key: number) => (
                                            <div key={key} className="card bg-[#BCBDBF] w-[425px] h-[561px] shadow-xl flex flex-col justify-between">
                                                <div className="card-body">
                                                    <div className="card-title text-2xl font-medium">{lawyer.name}</div>
                                                    <p className="text-xl">{lawyer.breif}</p>
                                                </div>
                                                <figure className="px-10 pb-10">
                                                    <img src="/images/eb7f36c2-e08a-4b98-918b-b1faf9aa5e96 1.png" alt={lawyer.name} className="rounded-xl" />
                                                </figure>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex w-full justify-center gap-2 py-2">
                            {Array.from({ length: Math.ceil(lawyers.length / 3) }).map((_, index) => (
                                <a key={`nav${index + 1}`} href={`#item${index + 1}`} className={`btn ${activePage === index + 1 ? 'w-20' : 'w-5 h-5'} btn-xs rounded-full
                                transition-all duration-300 ${activePage === index + 1 ? 'bg-gray-900' : 'bg-gray-300'}`}></a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OurLawyers;