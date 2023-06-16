import React from 'react';


const About = () => {
    return(
        <div>
            <h1 className='about-us-header'>About Us</h1>
            <p className='about-us-p'>Welcome to our online sanctuary of timeless elegance and historical charm, your premier destination for medieval reproduction vases.</p>
            <p className='about-us-p'>We are a passionate team of four, dedicated to capturing the robust beauty and intricate artistry of the medieval era. Our journey began with a shared appreciation for the timeless beauty of medieval craftsmanship. We wanted to bring these stories into today's homes, to share their magic with others who, like us, are captivated by the charm of the past.</p>
            <p className='about-us-p'>At our store, every vase is a labor of love, a product of painstaking attention to detail. Each piece is carefully sourced and meticulously reproduced to echo the authentic textures, shapes, and patterns of original medieval pottery.</p>
            <p className='about-us-p'>Beyond our product offerings, what truly sets us apart is our commitment to delivering a personal and immersive shopping experience. When you choose us, you're not just buying a vase; you're embarking on a journey back in time, gaining a slice of history and a narrative that's as compelling as it is unique.</p>
            <p className='about-us-p'>We invite you to explore our curated collection and let the stories behind our vases captivate your imagination, add depth to your décor, and bring the enchantment of the medieval period into your home. From all of us here at VaseShopper, we look forward to sharing our love of the past with you.</p>
            <section className="team-container">
                <h2 className="team-header">Meet the Team</h2>
                <div className="team-cards">
                    <div className="team-card">
                        {/* <img src="team-member1.jpg" alt="Team Member 1" className="team-img"> */}
                        <div className='team-details'>
                            <h3 className="team-name">Mayra Sanchez</h3>
                            <p className="team-role">Software Engineer</p>
                            <div className="team-socials">
                                <a href="https://www.linkedin.com/in/mayrasanchez2/">LinkedIn</a>
                                <a href="https://github.com/may231">Github</a>
                        </div>
                        </div>
                    </div>
                    <div className="team-card">
                        {/* <img src="team-member2.jpg" alt="Team Member 2" className="team-img"> */}
                        <h3 className="team-name">Grant Way</h3>
                        <p className="team-role">Software Engineer</p>
                        <div className="team-socials">
                            <a href="https://www.linkedin.com/in/grant-way/">LinkedIn</a>
                            <a href="https://github.com/empoleonz0">Github</a>
                        </div>
                    </div>
                    <div className="team-card">
                        {/* <img src="team-member3.jpg" alt="Team Member 3" className="team-img"> */}
                        <h3 className="team-name">Nick Redford</h3>
                        <p className="team-role">Software Engineer</p>
                        <div className="team-socials">
                            <a href="https://www.linkedin.com/in/nicholas-redford/">LinkedIn</a>
                            <a href="https://github.com/Neurotrip3005">Github</a>
                        </div>
                    </div>
                    <div className="team-card">
                        {/* <img src="team-member4.jpg" alt="Team Member 4" className="team-img"> */}
                        <h3 className="team-name">Allen Harper</h3>
                        <p className="team-role">Software Engineer</p>
                        <div className="team-socials">
                            <a href="https://www.linkedin.com/in/allenharper5/">LinkedIn</a>
                            <a href="https://github.com/Allen55">Github</a>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
export default About;