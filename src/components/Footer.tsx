import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
            <aside>
                <div className="text-4xl mb-2">🍛</div>
                <p>
                    Taste of Kenya
                    <br />
                    Serving authentic Kenyan cuisine since 2015
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Traditional Dining</a>
                <a className="link link-hover">Catering</a>
                <a className="link link-hover">Cultural Events</a>
                <a className="link link-hover">Cooking Classes</a>
            </nav>
            <nav>
                <h6 className="footer-title">Restaurant</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Kenyan Dishes</a>
                <a className="link link-hover">Reservations</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    )
}

export default Footer