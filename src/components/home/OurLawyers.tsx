/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

const OurLawyers = () => {
    return(
        <>
            <section className="relative before:absolute before:inset-0 before:-z-20 my-28" id="services">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="py-12 md:py-20">
                        <div className="max-w-3xl pb-16 text-right md:pb-20">
                            <h2 className="text-6xl text-gray-900">خدماتنا</h2>
                        </div>
                        <div className="carousel w-full">
                            <div id="item1" className="carousel-item w-full grid grid-cols-3 place-items-center">
                                <div className="card bg-base-100 w-96 shadow-xl border">
                                        <figure className="p-10">
                                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl" />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title">Card Title</h2>
                                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                                        </div>
                                    </div>
                                    <div className="card bg-base-100 w-96 shadow-xl border">
                                        <figure className="p-10">
                                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl" />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title">Card Title</h2>
                                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                                        </div>
                                    </div>
                                    <div className="card bg-base-100 w-96 shadow-xl border">
                                        <figure className="p-10">
                                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl" />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title">Card Title</h2>
                                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                                        </div>
                                    </div>
                            </div>
                            <div id="item2" className="carousel-item w-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp" className="w-full" />
                            </div>
                            <div id="item3" className="carousel-item w-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp" className="w-full" />
                            </div>
                            <div id="item4" className="carousel-item w-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp" className="w-full" />
                            </div>
                        </div>
                        <div className="flex w-full justify-center gap-2 py-2">
                            <a href="#item1" className="btn btn-xs">1</a>
                            <a href="#item2" className="btn btn-xs">2</a>
                            <a href="#item3" className="btn btn-xs">3</a>
                            <a href="#item4" className="btn btn-xs">4</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default OurLawyers