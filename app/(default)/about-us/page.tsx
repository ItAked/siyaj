"use client"

import { useEffect, useState } from "react";
import carousel_arrow from "../../../public/images/carousel_arrow.png"
import Image from "next/image";

export default function AboutUs() {
    const [isMounted, setIsmounted] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    useEffect(() => setIsmounted(true), [])
    let isNext = false;
    let animationTime = 350;
    let highlightElevation = 60
    let easing = "ease-in-out"
    const wrapper = isMounted ? document.getElementById("wrapper") : null
    
    function handleNext() {
        if (!isMounted) return
        if (isClicked) return
        setIsClicked(true)
        isNext = true
        animateUnHighlight()
        setTimeout(() => {
            if (!wrapper) return;
            const oldElements = calculatePos(wrapper.children)
            wrapper.append(wrapper.removeChild(wrapper.children[0]))
            const newElements = calculatePos(wrapper.children)
            animateChange(wrapper, oldElements, newElements)
            setTimeout(() => { setIsClicked(false) }, animationTime * 2)
        }, animationTime)
    }

    function handlePrev() {
        if (!isMounted) return
        if (isClicked) return
        setIsClicked(true)
        isNext = false
        animateUnHighlight()
        setTimeout(() => {
            if (!wrapper) return;
            const oldElements = calculatePos(wrapper.children)
            wrapper.prepend(wrapper.removeChild(wrapper.children[wrapper.children.length - 1]))
            const newElements = calculatePos(wrapper.children)
            animateChange(wrapper, oldElements, newElements)
            setTimeout(() => { setIsClicked(false) }, animationTime * 2)
        }, animationTime)
    }

    function calculatePos(elements: HTMLCollection | Element[]) {
        const elementsPos = []
        const arr = Array.from(elements as ArrayLike<Element>);
        for (const element of arr) {
            const pos = (element as HTMLElement).getBoundingClientRect()
            elementsPos.push({ element: element, x: pos.left, y: pos.top })
        }
        return elementsPos
    }

    function animateChange(wrapper: HTMLElement, oldElements: any[], newElements: any[]) {
        if (!wrapper) return;
        const centerIndex = Math.floor(wrapper.children.length / 2);
        
        for (let index = 0; index < newElements.length; index++) {
            const newElement = newElements[index];
            const oldElement = oldElements.find(oldElement => oldElement.element === newElement.element)
            const translateX = oldElement.x - newElement.x
            const translateY = oldElement.y - newElement.y

            if (isNext && index === wrapper.children.length - 1) continue;
            if (!isNext && index === 0) continue;

            newElement.element.animate([
                { transform: `translate(${translateX}px,${translateY}px)` },
                { transform: "none" }
            ], { duration: animationTime, easing: easing })
        }
        setTimeout(() => { animateHighlight() }, animationTime)
    }

    function animateHighlight() {
        if (!wrapper) return;
        if (!wrapper) return;
        const centerIndex = Math.floor(wrapper.children.length / 2);
        const highlightedElement = wrapper.children[centerIndex] as HTMLElement
        highlightedElement.style.transform = `translateY(-${highlightElevation}px)`
        highlightedElement.animate([
            { transform: "none" }, 
            { transform: `translateY(${-highlightElevation}px)` }
        ], { duration: animationTime, easing: easing })
    }

    function animateUnHighlight() {
        if (!wrapper) return;
        const centerIndex = Math.floor(wrapper.children.length / 2);
        const highlightedElement = wrapper.children[centerIndex] as HTMLElement
        highlightedElement.style.transform = "translateY(0px)"
        highlightedElement.style.marginBottom = "0"
        highlightedElement.animate([
            { transform: `translateY(${-highlightElevation}px)` }, 
            { transform: "none" }
        ], { duration: animationTime, easing: easing })
        setTimeout(() => highlightedElement.animate(
            [
                { marginBottom: "-3%" },
                { marginBottom: "0%" }
            ],
            { duration: animationTime, easing: easing }
        ), animationTime)
    }

    let goals = [
        {
            id: 1,
            goal: 'تقديم دعم قانوني متخصص'
        },
        {
            id: 2,
            goal: 'حماية حقوق الممارسين الصحيين'
        },
        {
            id: 3,
            goal: 'توفير منصة تقنية شاملة'
        },
        {
            id: 4,
            goal: 'تعزيز الكفاءة وتقليل الوقت المستغرق في الإجراءات القانونية'
        },
        {
            id: 5,
            goal: 'الامتثال للأنظمة والقوانين المحلية'
        },
        {
            id: 6,
            goal: 'إتاحة حلول قانونية ميسورة التكلفة'
        },
        {
            id: 7,
            goal: 'دعم التحول الرقمي في القطاع القانوني والصحي'
        },
    ];

    const centerIndex = Math.floor(goals.length / 2);

    return (
        <>
            <section className="relative">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="pb-12 pt-32 md:pb-20 md:pt-40">
                        <div className="pb-12 text-center md:pb-16">
                            <h1
                                className="mb-6 border-y text-5xl font-bold md:text-6xl"
                                data-aos="zoom-y-out"
                                data-aos-delay={150}
                            >
                                منصة رقمية متكاملة <br className="max-lg:hidden" />
                                تسهل على الممارسين الصحيين الوصول إلى الدعم القانوني المناسب في أي وقت ومن أي مكان.
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="relative before:absolute before:inset-0 before:-z-20 before:bg-gray-900 my-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="py-12 md:py-20">
                        <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
                            <h2 className="text-3xl font-bold text-gray-200 md:text-4xl">أهدافنا</h2>
                        </div>

                        <div id="membersCard" className="backgroundColor">
                            <div id="ellipseDec#1" className="ellipseUp" />
                            <div id="ellipseDec#2" className="ellipseDown" />
                            <div id="membersContent" className="h-full w-full flex flex-col items-center">
                                <div id="membersCarousel" className="flex flex-row w-full justify-center items-center relative">
                                    <button onClick={handlePrev} id="prev" className="border-white border-2 rounded-full rotate-180 z-10 h-[48px] w-[48px] ml-10 hover:bg-yellow-600 hover:border-yellow-600 transition-colors shrink-0">
                                        <Image alt="a next button" src={carousel_arrow} layout='responsive' quality={100} />
                                    </button>
                                    <div id="membersList" className="my-20 relative overflow-hidden mx-[-5%]">
                                        <div id="wrapper" className="flex justify-center flex-nowrap relative z-1 pt-16 mb-[-48px]">
                                            {goals.map((goal, index) => (
                                                <div 
                                                    key={index} 
                                                    className="flex flex-col justify-center items-center px-4 whitespace-nowrap flex-shrink-0"
                                                    style={{ 
                                                        transform: (index === centerIndex ? `translateY(${-highlightElevation}px)` : ``),
                                                        width: `${100 / (centerIndex + 1)}%`
                                                    }}
                                                >
                                                    <p className="text-center font-bold text-xs my-3 text-white md:text-2xl lg:text-2xl">{goal.goal}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={handleNext} id="prev" className="border-white border-2 rounded-full mr-10 z-10 h-[48px] w-[48px] hover:bg-yellow-600 hover:border-yellow-600 transition-colors shrink-0">
                                        <Image alt="a next button" src={carousel_arrow} layout='responsive' quality={100} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}