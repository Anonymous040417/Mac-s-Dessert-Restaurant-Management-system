import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HomeHero from '../components/home/HomeHero'
import WhatYouWillGet from '../components/home/WhatYouWillGet'
import OurTopChoiceMeal from '../components/home/OurTopChoiceMeal'

const Home: React.FC = () => {
    return (
        <div className="page-container">
            <Navbar />
            <main className="main-content">
                <HomeHero />
                <WhatYouWillGet />
                <OurTopChoiceMeal />
            </main>
            <Footer />
        </div>
    )
}

export default Home