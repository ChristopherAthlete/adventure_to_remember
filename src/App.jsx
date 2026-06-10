import { useEffect, useRef, useState } from 'react'
import './App.css'
import { translations } from './translations'
import BookingPage from './pages/BookingPage'

import hero1 from './assets/hero-optimized/hero-1.mp4'
import hero2 from './assets/hero-optimized/hero-2.mp4'
import hero3 from './assets/hero-optimized/hero-3.mp4'
import hero4 from './assets/hero-optimized/hero-4.mp4'
import hero5 from './assets/hero-optimized/hero-5.mp4'
import hero6 from './assets/hero-optimized/hero-6.mp4'
import hero7 from './assets/hero-optimized/hero-7.mp4'
import hero8 from './assets/hero-optimized/hero-8.mp4'
import hero9 from './assets/hero-optimized/hero-9.mp4'
import hero10 from './assets/hero-optimized/hero-10.mp4'
import hero11 from './assets/hero-optimized/hero-11.mp4'
import hero12 from './assets/hero-optimized/hero-12.mp4'
import hero13 from './assets/hero-optimized/hero-13.mp4'
import hero14 from './assets/hero-optimized/hero-14.mp4'
import hero15 from './assets/hero-optimized/hero-15.mp4'
import hero16 from './assets/hero-optimized/hero-16.mp4'

import gallery1 from './assets/gallery/gallery-1.png'
import gallery2 from './assets/gallery/gallery-2.png'
import gallery3 from './assets/gallery/gallery-3.png'
import gallery4 from './assets/gallery/gallery-4.png'
import gallery6 from './assets/gallery/gallery-6.png'
import gallery7 from './assets/gallery/gallery-7.jpg'
import gallery8 from './assets/gallery/gallery-8.png'
import gallery9 from './assets/gallery/gallery-9.JPG'
import gallery10 from './assets/gallery/gallery-10.JPG'
import gallery11 from './assets/gallery/gallery-11.JPG'
import gallery5 from './assets/gallery/gallery-5.png'
import gallery12 from './assets/gallery/gallery-12.png'
import gallery13 from './assets/gallery/gallery-13.png'


const galleryImages = [
  gallery8,
  gallery13,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery9,
  gallery10,
  gallery11,
  gallery12,
  gallery1,

]

function VideoSequence({ videos }) {
  const videoRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (isHovering && videoRef.current) {
      videoRef.current.play()
    }
  }, [index, isHovering])

  function startVideo() {
    setIsHovering(true)
    videoRef.current.play()
  }

  function stopVideo() {
    setIsHovering(false)
    videoRef.current.pause()
    videoRef.current.currentTime = 0
    setIndex(0)
  }

  function nextVideo() {
    if (isHovering) {
      setIndex((current) => (current + 1) % videos.length)
    }
  }

  return (
    <video
      ref={videoRef}
      key={index}
      className="storyVideo"
      src={videos[index]}
      muted
      playsInline
      preload="metadata"
      onMouseEnter={startVideo}
      onMouseLeave={stopVideo}
      onEnded={nextVideo}
    />
  )
}

function App() {
  const [page, setPage] = useState(
  localStorage.getItem('atr-page') || 'home'
)

const [language, setLanguage] = useState(
  localStorage.getItem('atr-language') || 'en'
)

  const t = translations[language]

  useEffect(() => {
  localStorage.setItem('atr-page', page)
}, [page])

useEffect(() => {
  localStorage.setItem('atr-language', language)
}, [language])

  function goHome() {
  setPage('home')
  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
}

function goBooking() {
  setPage('booking')
  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
}

function scrollToSection(id) {
  setPage('home')
  setTimeout(() => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, 50)
}

  if (page === 'booking') {
  return (
  <BookingPage
    goHome={goHome}
    scrollToSection={scrollToSection}
    language={language}
    setLanguage={setLanguage}
  />
)
}

  return (
    <main className="site">
      <header className="navbar">
        <button className="brand" onClick={goHome}>
  <span className="brandMark">ATR</span>
  <span>Adventure To Remember</span>
</button>

        <nav className="menu">
  <button onClick={() => scrollToSection('experiences')}>{t.nav.adventures}</button>
  <button onClick={() => scrollToSection('gallery')}>{t.nav.gallery}</button>
  <button onClick={() => scrollToSection('about')}>{t.nav.about}</button>
  <button onClick={() => scrollToSection('contact')}>{t.nav.contact}</button>
</nav>
<div className="languageSwitcher">
  <button
    className={language === 'en' ? 'activeLang' : ''}
    onClick={() => setLanguage('en')}
  >
    EN
  </button>

  <button
    className={language === 'de' ? 'activeLang' : ''}
    onClick={() => setLanguage('de')}
  >
    DE
  </button>

  <button
    className={language === 'pl' ? 'activeLang' : ''}
    onClick={() => setLanguage('pl')}
  >
    PL
  </button>
</div>

        <button className="navButton buttonReset" onClick={goBooking}>
          {t.nav.bookNow}
        </button>
      </header>

      <section className="hero" style={{ backgroundImage: `url(${gallery1})` }}>
        <div className="heroOverlay"></div>

        <div className="heroContent">
          <p className="heroTag">{t.home.heroTag}</p>
          <h1>{t.home.heroTitle}</h1>
          <p>{t.home.heroText}</p>

          <div className="heroActions">
            <button className="btn primary buttonReset" onClick={goBooking}>
              {t.home.planTrip}
            </button>
            <a className="btn light" href="#experiences">
              {t.home.explore}
            </a>
          </div>
        </div>
      </section>

      <section className="quickCards">
        {t.home.quickCards.map((card) => (
          <article key={card.title}>
            <span>{card.icon}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </section>

      <section id="experiences" className="section">
        <p className="sectionTag">{t.home.chooseTag}</p>
        <h2>{t.home.chooseTitle}</h2>

        <div className="storyRow">
          <div className="storyText">
            <p className="smallTag">{t.home.experiences[0][0]}</p>
            <h3>{t.home.experiences[0][1]}</h3>
            <p>
              {t.home.experiences[0][2]}
            </p>
          </div>
          <VideoSequence videos={[hero1, hero2, hero4, hero5]} />
        </div>

        <div className="storyRow reverse">
          <div className="storyText">
            <p className="smallTag">{t.home.experiences[1][0]}</p>
            <h3>{t.home.experiences[1][1]}</h3>
            <p>
              {t.home.experiences[1][2]}
            </p>
          </div>
          <VideoSequence videos={[hero3]} />
        </div>

<div className="storyRow">
  <div className="storyText">
    <p className="smallTag">{t.home.experiences[2][0]}</p>

    <h3>{t.home.experiences[2][1]}</h3>

    <p>
      {t.home.experiences[2][2]}
    </p>


  </div>

  <VideoSequence videos={[hero16]} />
</div>

        <div className="storyRow reverse">
          <div className="storyText">
            <p className="smallTag">{t.home.experiences[3][0]}</p>
            <h3>{t.home.experiences[3][1]}</h3>
            <p>
              {t.home.experiences[3][2]}
            </p>
          </div>
          <VideoSequence videos={[hero6, hero7, hero8]} />
        </div>

        <div className="storyRow">
          <div className="storyText">
            <p className="smallTag">{t.home.experiences[4][0]}</p>
            <h3>{t.home.experiences[4][1]}</h3>
            <p>
              {t.home.experiences[4][2]}
            </p>
          </div>
          <VideoSequence videos={[hero9, hero12, hero13]} />
        </div>

        <div className="storyRow reverse">
          <div className="storyText">
            <p className="smallTag">{t.home.experiences[5][0]}</p>
            <h3>{t.home.experiences[5][1]}</h3>
            <p>
              {t.home.experiences[5][2]}
            </p>
          </div>
          <VideoSequence videos={[hero10, hero11]} />
        </div>

        <div className="storyRow">
          <div className="storyText">
            <p className="smallTag">{t.home.experiences[6][0]}</p>
            <h3>{t.home.experiences[6][1]}</h3>
            <p>
              {t.home.experiences[6][2]}
            </p>
          </div>
          <VideoSequence videos={[hero14]} />
        </div>

        <div className="storyRow reverse">
          <div className="storyText">
            <p className="smallTag">{t.home.experiences[7][0]}</p>
            <h3>{t.home.experiences[7][1]}</h3>
            <p>
              {t.home.experiences[7][2]}
            </p>
          </div>
          <VideoSequence videos={[hero15]} />
        </div>
      </section>

      <section id="gallery" className="gallerySection">
        <div className="section">
          <p className="sectionTag">{t.home.galleryTag}</p>
          <h2>{t.home.galleryTitle}</h2>

          <div className="gallery">
  {galleryImages.map((image, index) => (
    <img key={index} src={image} alt={`Adventure gallery ${index + 1}`} />
  ))}
</div>
        </div>
      </section>

      <section id="about" className="aboutSection">
        <div className="aboutImage" style={{ backgroundImage: `url(${gallery2})` }}></div>

        <div className="aboutText">
          <p className="sectionTag">{t.home.aboutTag}</p>
          <h2>{t.home.aboutTitle}</h2>
          {t.home.aboutText.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section id="contact" className="contactSection">
        <h2>{t.home.contactTitle}</h2>
        <p>{t.home.contactText}</p>

        <div className="contactButtons">
          <a className="btn primary" href="https://wa.me/4915217187281">
            WhatsApp: +49 1521 7187281
          </a>
          <a className="btn light" href="mailto:atr.booking@outlook.com">
            atr.booking@outlook.com
          </a>
        </div>
      </section>

      <footer className="footer">
        <strong>Adventure To Remember</strong>
        <span>{t.home.footerText}</span>
      </footer>
    </main>
  )
}

export default App
