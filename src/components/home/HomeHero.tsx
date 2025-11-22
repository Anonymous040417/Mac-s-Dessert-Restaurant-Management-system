import React from 'react'
import homehero from '../../assets/hero-homw-pic.jpg';

const HomeHero: React.FC = () => {
    return (
        <div className="flex items-center min-h-screen bg-amber-50 px-5 py-15">
            <div className="flex flex-col lg:flex-row-reverse items-center max-w-6xl mx-auto gap-6">
                <div className="flex-1">
                    <img
                        src={homehero}
                        alt="Kenyan Cuisine Hero"
                        className="w-full h-80 md:h-96 object-cover rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                    />
                </div>

                <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-xl md:text-5xl lg:text-6xl font-bold text-amber-800 mb-5 leading-tight">
                        Taste Authentic Kenyan Flavors!
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                        Experience the rich culinary heritage of Kenya with our traditional dishes made from family recipes passed down through generations. From coastal Swahili delicacies to highland specialties.
                    </p>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                        Explore Kenyan Dishes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeHero