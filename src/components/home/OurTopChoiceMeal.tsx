import React from 'react'

interface OurTopChoiceMeal {
    menu_item_id: number;
    name: string;
    description: string;
    category_name?: string;
    price: number;
    menuitemimage_url: string;
    is_available: boolean;
}

const OurTopChoiceMeals: OurTopChoiceMeal[] = [
    {
        menu_item_id: 1,
        name: 'Nyama Choma Platter',
        description: 'Tender grilled meat marinated in traditional Kenyan spices, served with kachumbari and ugali.',
        price: 18.99,
        category_name: 'Grilled',
        menuitemimage_url: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        is_available: true,
    },
    {
        menu_item_id: 2,
        name: 'Pilau Rice with Beef',
        description: 'Fragrant rice cooked with beef, spices, and herbs - a Swahili coastal specialty.',
        price: 14.99,
        category_name: 'Rice Dishes',
        menuitemimage_url: 'https://images.unsplash.com/photo-1563379091339-03246963d96f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        is_available: true,
    },
    {
        menu_item_id: 3,
        name: 'Sukuma Wiki & Ugali',
        description: 'Traditional Kenyan staple of collard greens served with maize flour porridge.',
        price: 9.99,
        category_name: 'Traditional',
        menuitemimage_url: 'https://images.unsplash.com/photo-1546833999-bd92994c20e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        is_available: true,
    }
]

const OurTopChoiceMeal: React.FC = () => {
    return (
        <section className="py-20 px-5 bg-white">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">Kenyan Signature Dishes</h2>
                <p className="text-lg text-gray-600 mb-15 max-w-2xl mx-auto leading-relaxed">
                    Taste our most beloved Kenyan dishes, prepared with authentic recipes and served with traditional hospitality
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {OurTopChoiceMeals.map((meal) => (
                        <div key={meal.menu_item_id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={meal.menuitemimage_url}
                                    alt={meal.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                                    {meal.category_name}
                                </div>
                            </div>

                            <div className="p-6 text-left">
                                <h3 className="text-xl font-semibold text-amber-800 mb-3">{meal.name}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6 h-16 overflow-hidden">
                                    {meal.description}
                                </p>

                                <div className="flex justify-between items-center">
                                    <div className="text-2xl font-bold text-amber-800">${meal.price}</div>
                                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OurTopChoiceMeal