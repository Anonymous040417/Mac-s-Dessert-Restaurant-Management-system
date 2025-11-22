import React from 'react'

const WhatYouWillGet: React.FC = () => {
    return (
        <section className="py-20 px-5 bg-orange-50">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-15">
                    Experience Authentic Kenyan Hospitality
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="text-5xl mb-5 bg-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg">
                            🌿
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-amber-800 mb-4">Traditional Recipes</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Authentic Kenyan dishes prepared using traditional methods and fresh, locally-sourced ingredients from Kenyan farms.
                        </p>
                    </div>

                    <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="text-5xl mb-5 bg-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg">
                            🏺
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-amber-800 mb-4">Cultural Experience</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Immerse yourself in Kenyan culture with our traditional decor, music, and warm Swahili hospitality.
                        </p>
                    </div>

                    <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="text-5xl mb-5 bg-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg">
                            🔥
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-amber-800 mb-4">Fresh & Hot</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Every meal is cooked to order using fresh ingredients and served hot, just like in a Kenyan home kitchen.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhatYouWillGet;