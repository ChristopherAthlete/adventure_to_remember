import { useState } from 'react'
import './App.css'

import hero1 from './assets/hero/hero-1.mov'
import hero2 from './assets/hero/hero-2.mov'
import hero3 from './assets/hero/hero-3.mov'
import hero4 from './assets/hero/hero-4.mov'
import hero5 from './assets/hero/hero-5.mov'
import hero6 from './assets/hero/hero-6.mov'
import hero7 from './assets/hero/hero-7.mov'
import hero8 from './assets/hero/hero-8.mov'
import hero9 from './assets/hero/hero-9.mov'
import hero10 from './assets/hero/hero-10.mov'
import hero11 from './assets/hero/hero-11.mov'
import hero12 from './assets/hero/hero-12.mov'
import hero13 from './assets/hero/hero-13.mov'
import hero14 from './assets/hero/hero-14.mov'

import catamaran from './assets/adventures/catamaran.png'
import jetski from './assets/adventures/jetski.png'
import wakeboard from './assets/adventures/wakeboard.png'
import waterski from './assets/adventures/waterski.png'
import tubing from './assets/adventures/tubing.png'
import snorkeling from './assets/adventures/snorkeling.png'

import gallery1 from './assets/gallery/gallery-1.jpeg'
import gallery2 from './assets/gallery/gallery-2.png'
import gallery3 from './assets/gallery/gallery-3.png'
import gallery4 from './assets/gallery/gallery-4.png'
import gallery5 from './assets/gallery/gallery-5.png'
import gallery6 from './assets/gallery/gallery-6.png'
import gallery7 from './assets/gallery/gallery-7.jpg'

const heroVideos = [
  hero1, hero2, hero3, hero4, hero5, hero6, hero7,
  hero8, hero9, hero10, hero11, hero12, hero13, hero14,
]

function App() {
  const [currentVideo, setCurrentVideo] = useState(0)

  function playNextVideo() {
    setCurrentVideo((currentVideo + 1) % heroVideos.length)
  }

  return (
    <main className="site">
      <header className="nav">
        <div className="brand">Adventure To Remember</div>
        <nav className="menu">
          <a href="#experiences">Experiences</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroText">
          <span className="eyebrow">Catamaran • Jet Ski • Wakeboard</span>
          <h1>Sea adventures you will never forget.</h1>
          <p>
            Private catamaran trips, hidden beaches, snorkeling, jet ski,
            wakeboarding, water skiing, tubing rides and overnight stays at anchor.
          </p>

          <div className="actions">
            <a className="btn primary" href="https://wa.me/4915217187281">WhatsApp Us</a>
            <a className="btn secondary" href="#experiences">View Adventures</a>
          </div>
        </div>

        <div className="heroImage">
          <video
            key={currentVideo}
            className="heroPhoto"
            src={heroVideos[currentVideo]}
            autoPlay
            muted
            playsInline
            onEnded={playNextVideo}
          />
        </div>
      </section>

      <section id="experiences" className="section">
        <span className="eyebrow">Experiences</span>
        <h2>Choose your adventure</h2>

        <div className="cards">
          <div className="flipCard">
            <div className="flipInner">
              <div className="flipFront"><h3>Private Catamaran Trips</h3><p>Luxury sailing, hidden bays and sunset moments.</p></div>
              <div className="flipBack"><img src={catamaran} alt="Catamaran" /></div>
            </div>
          </div>

          <div className="flipCard">
            <div className="flipInner">
              <div className="flipFront"><h3>Jet Ski Adventures</h3><p>Fast rides across beautiful blue water.</p></div>
              <div className="flipBack"><img src={jetski} alt="Jet ski" /></div>
            </div>
          </div>

          <div className="flipCard">
            <div className="flipInner">
              <div className="flipFront"><h3>Wakeboarding</h3><p>Adrenaline and action behind the boat.</p></div>
              <div className="flipBack"><img src={wakeboard} alt="Wakeboard" /></div>
            </div>
          </div>

          <div className="flipCard">
            <div className="flipInner">
              <div className="flipFront"><h3>Water Skiing</h3><p>Classic water sport fun.</p></div>
              <div className="flipBack"><img src={waterski} alt="Water ski" /></div>
            </div>
          </div>

          <div className="flipCard">
            <div className="flipInner">
              <div className="flipFront"><h3>Tubing Rides</h3><p>Inflatable rides full of fun.</p></div>
              <div className="flipBack"><img src={tubing} alt="Tubing" /></div>
            </div>
          </div>

          <div className="flipCard">
            <div className="flipInner">
              <div className="flipFront"><h3>Snorkeling</h3><p>Crystal-clear water and hidden bays.</p></div>
              <div className="flipBack"><img src={snorkeling} alt="Snorkeling" /></div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="section">
        <span className="eyebrow">Gallery</span>
        <h2>Real moments from the sea</h2>

        <div className="gallery">
          {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7].map((img, i) => (
            <img key={i} src={img} alt={`Gallery ${i + 1}`} />
          ))}
        </div>
      </section>

      <section id="about" className="section about">
        <div>
          <span className="eyebrow">About Me</span>
          <h2>I create trips full of freedom, water and adventure.</h2>
        </div>
        <p>
          Adventure To Remember is for guests who want more than a normal boat tour.
          I organize catamaran experiences with jet skis, wakeboarding, water skiing,
          tubing, snorkeling, yacht-only beaches and overnight stays at anchor.
        </p>
      </section>

      <section id="contact" className="section contact">
        <span className="eyebrow">Contact</span>
        <h2>Ready for your adventure?</h2>

        <div className="contactBox">
          <a className="btn primary" href="https://wa.me/4915217187281">WhatsApp: +49 1521 7187281</a>
          <a className="btn secondary" href="mailto:christopher.kalinsm@yahoo.com">christopher.kalinsm@yahoo.com</a>
        </div>
      </section>
    </main>
  )
}

export default App
