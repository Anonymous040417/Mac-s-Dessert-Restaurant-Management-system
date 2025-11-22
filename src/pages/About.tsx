import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About: React.FC = () => {
    return (
        <div className="page-container">
            <Navbar />

            <div style={{
                background: 'linear-gradient(135deg, #b45309 0%, #78350f 100%)',
                color: 'white',
                padding: '4rem 2rem',
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    margin: '0 0 1rem 0',
                    fontWeight: 'bold'
                }}>
                    🍛 About Taste of Kenya
                </h1>
                <p style={{
                    fontSize: '1.3rem',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: '1.6',
                    opacity: '0.9'
                }}>
                    A culinary journey through Kenya's diverse regions, bringing authentic flavors and traditional cooking methods to your table.
                </p>
            </div>

            <div style={{
                padding: '4rem 2rem',
                backgroundColor: '#fff'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                    gap: '3rem',
                    alignItems: 'center'
                }}>
                    <div>
                        <h2 style={{
                            fontSize: '2.5rem',
                            color: '#b45309',
                            marginBottom: '1.5rem',
                            fontWeight: 'bold'
                        }}>
                            📖 Our Kenyan Story
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#555',
                            lineHeight: '1.8',
                            marginBottom: '1.5rem'
                        }}>
                            Founded in 2015, Taste of Kenya began as a small family kitchen in Nairobi, sharing grandmother's traditional recipes with the community. Our passion for authentic Kenyan cuisine has grown into a beloved restaurant that celebrates Kenya's rich culinary diversity.
                        </p>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#555',
                            lineHeight: '1.8',
                            marginBottom: '1.5rem'
                        }}>
                            From the coastal Swahili dishes influenced by Arab traders to the hearty highland meals of the Kikuyu and Maasai communities, every dish tells a story of Kenya's cultural tapestry. We believe food is a bridge that connects people to traditions, memories, and shared experiences.
                        </p>
                    </div>
                    <div style={{
                        textAlign: 'center'
                    }}>
                        <img
                            src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Kenyan Restaurant Interior"
                            style={{
                                width: '100%',
                                maxWidth: '450px',
                                borderRadius: '16px',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                height: '300px',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                </div>
            </div>

            <div style={{
                padding: '4rem 2rem',
                backgroundColor: '#fef3c7'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        color: '#b45309',
                        marginBottom: '1rem',
                        fontWeight: 'bold'
                    }}>
                        ✨ Our Kenyan Values
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#666',
                        maxWidth: '600px',
                        margin: '0 auto 3rem',
                        lineHeight: '1.6'
                    }}>
                        What makes our Kenyan dining experience unique
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            {
                                icon: '🌱',
                                title: 'Local Ingredients',
                                description: 'We source our ingredients directly from Kenyan farmers and local markets, supporting our community and ensuring freshness.'
                            },
                            {
                                icon: '❤️',
                                title: 'Family Recipes',
                                description: 'Every dish is prepared using traditional family recipes passed down through generations of Kenyan cooks.'
                            },
                            {
                                icon: '🤝',
                                title: 'Harambee Spirit',
                                description: 'We believe in coming together as a community, creating a welcoming space for everyone to share in Kenyan culture.'
                            }
                        ].map((value, index) => (
                            <div key={index} style={{
                                backgroundColor: 'white',
                                padding: '2rem',
                                borderRadius: '16px',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                transition: 'transform 0.3s ease',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                }}>
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '1rem'
                                }}>
                                    {value.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    color: '#b45309',
                                    marginBottom: '1rem',
                                    fontWeight: 'bold'
                                }}>
                                    {value.title}
                                </h3>
                                <p style={{
                                    fontSize: '1rem',
                                    color: '#666',
                                    lineHeight: '1.6'
                                }}>
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{
                padding: '4rem 2rem',
                backgroundColor: '#fff'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        color: '#b45309',
                        marginBottom: '1rem',
                        fontWeight: 'bold'
                    }}>
                        👥 Meet Our Kenyan Team
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#666',
                        maxWidth: '600px',
                        margin: '0 auto 3rem',
                        lineHeight: '1.6'
                    }}>
                        The passionate Kenyans behind your authentic dining experience
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            {
                                name: 'Chef Wanjiku Mwangi',
                                role: 'Head Chef & Founder',
                                image: 'https://i.pinimg.com/1200x/d9/77/d0/d977d0cb00609cdc03ce9dcc5ec10f0c.jpg',
                                description: 'With 20 years of culinary expertise, Chef Wanjiku brings traditional Kenyan recipes to life with authentic techniques.'
                            },
                            {
                                name: 'Chef Kamau Otieno',
                                role: 'Coastal Cuisine Specialist',
                                image: 'https://i.pinimg.com/1200x/87/cb/ca/87cbca3b19212fa120d706d8c0be593f.jpg',
                                description: 'Our coastal cuisine expert creates authentic Swahili dishes using traditional coastal spices and methods.'
                            },
                            {
                                name: 'Amina Hassan',
                                role: 'Restaurant Manager',
                                image: 'https://i.pinimg.com/1200x/35/a9/f8/35a9f8530c246dedcc230ed3acae06e3.jpg',
                                description: 'Amina ensures every guest experiences genuine Kenyan hospitality and enjoys an authentic dining journey.'
                            },
                            {
                                name: 'Chef Mumbi Njoroge',
                                role: 'Pastry Chef',
                                image: 'https://i.pinimg.com/1200x/61/fc/66/61fc6670ce03624162b56861469a14c7.jpg',
                                description: 'Mumbi specializes in traditional Kenyan desserts and baked goods, from mandazi to mahamri.'
                            }
                        ].map((member, index) => (
                            <div key={index} style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                transition: 'transform 0.3s ease',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                }}>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'fill'
                                    }}
                                />
                                <div style={{
                                    padding: '1.5rem'
                                }}>
                                    <h3 style={{
                                        fontSize: '1.3rem',
                                        color: '#b45309',
                                        marginBottom: '0.5rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {member.name}
                                    </h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#d97706',
                                        marginBottom: '1rem',
                                        fontWeight: '600'
                                    }}>
                                        {member.role}
                                    </p>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: '#666',
                                        lineHeight: '1.5'
                                    }}>
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{
                padding: '4rem 2rem',
                backgroundColor: '#fef3c7'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        color: '#b45309',
                        marginBottom: '1rem',
                        fontWeight: 'bold'
                    }}>
                        🎉 Kenyan Pride Facts
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '2rem',
                        marginTop: '2rem'
                    }}>
                        {[
                            { number: '25,000+', label: 'Happy Customers' },
                            { number: '50+', label: 'Traditional Recipes' },
                            { number: '4.9★', label: 'Average Rating' },
                            { number: '8 Years', label: 'Serving Kenya' }
                        ].map((fact, index) => (
                            <div key={index} style={{
                                backgroundColor: 'white',
                                padding: '2rem',
                                borderRadius: '16px',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                            }}>
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 'bold',
                                    color: '#b45309',
                                    marginBottom: '0.5rem'
                                }}>
                                    {fact.number}
                                </div>
                                <p style={{
                                    fontSize: '1.1rem',
                                    color: '#666',
                                    fontWeight: '500'
                                }}>
                                    {fact.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{
                padding: '4rem 2rem',
                background: 'linear-gradient(135deg, #b45309 0%, #78350f 100%)',
                color: 'white',
                textAlign: 'center'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        fontWeight: 'bold'
                    }}>
                        🌟 Ready for a Kenyan Feast?
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        marginBottom: '2rem',
                        lineHeight: '1.6',
                        opacity: '0.9'
                    }}>
                        Join us for an unforgettable journey through Kenya's culinary landscape. Whether it's a casual lunch,
                        family dinner, or special celebration, we're here to share our culture and flavors with you.
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <button style={{
                            backgroundColor: 'white',
                            color: '#b45309',
                            padding: '1rem 2rem',
                            border: 'none',
                            borderRadius: '25px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)'
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}>
                            🍛 View Kenyan Menu
                        </button>

                        <button style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            padding: '1rem 2rem',
                            border: '2px solid white',
                            borderRadius: '25px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'white'
                                e.currentTarget.style.color = '#b45309'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent'
                                e.currentTarget.style.color = 'white'
                            }}>
                            📞 Contact Us
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default About