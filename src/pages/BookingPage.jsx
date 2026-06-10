import { useState } from 'react'
import emailjs from '@emailjs/browser'
import './BookingPage.css'
import { translations } from '../translations'

import book1 from '../assets/booking/Book-1.png'
import book2 from '../assets/booking/Book-2.png'
import book3 from '../assets/booking/Book-3.png'
import book4 from '../assets/booking/Book-4.png'
import book5 from '../assets/booking/Book-5.png'
import book6 from '../assets/booking/Book-6.png'
import book7 from '../assets/booking/Book-7.png'

const yachtGallery = [book1, book2, book3, book4, book5, book6, book7]

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const CUSTOMER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID // mail do klienta
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function getCustomerMessage(language, data) {
  if (language === 'pl') {
    return `
Cześć ${data.full_name},

Dziękujemy za kontakt z Adventure To Remember.

Otrzymaliśmy Twoje zapytanie. Przygotujemy indywidualną ofertę na podstawie wybranej destynacji, sezonu, liczby gości oraz Twoich preferencji.

━━━━━━━━━━━━━━━━━━
📋 PODSUMOWANIE ZAPYTANIA
━━━━━━━━━━━━━━━━━━

🌍 Destynacja: ${data.destination}
📅 Sezon: ${data.season}
👥 Liczba gości: ${data.guests}
📞 Telefon: ${data.phone}

━━━━━━━━━━━━━━━━━━

⏱ Standardowy czas odpowiedzi: do 24 godzin.

Jeśli Twoje zapytanie jest pilne, skontaktuj się z nami bezpośrednio przez WhatsApp:

💬 WhatsApp:
+49 1521 7187281

Pozdrawiamy,
⚓ Adventure To Remember
Prywatne rejsy katamaranem i wodne przygody
`
  }

  if (language === 'de') {
    return `
Hallo ${data.full_name},

vielen Dank für deine Anfrage bei Adventure To Remember.

Wir haben deine Anfrage erfolgreich erhalten und erstellen ein individuelles Angebot basierend auf deinem Reiseziel, der Saison, der Gruppengröße und deinen Wünschen.

━━━━━━━━━━━━━━━━━━
📋 ZUSAMMENFASSUNG DEINER ANFRAGE
━━━━━━━━━━━━━━━━━━

🌍 Reiseziel: ${data.destination}
📅 Saison: ${data.season}
👥 Gäste: ${data.guests}
📞 Telefon: ${data.phone}

━━━━━━━━━━━━━━━━━━

⏱ Übliche Antwortzeit: innerhalb von 24 Stunden.

Falls deine Anfrage dringend ist, kontaktiere uns direkt per WhatsApp:

💬 WhatsApp:
+49 1521 7187281

Viele Grüße,
⚓ Adventure To Remember
Private Katamaran- & Wasserabenteuer
`
  }

  return `
Hello ${data.full_name},

Thank you for contacting Adventure To Remember.

We have successfully received your request and our team will prepare a personalized offer based on your destination, season, group size and preferences.

━━━━━━━━━━━━━━━━━━
📋 YOUR REQUEST SUMMARY
━━━━━━━━━━━━━━━━━━

🌍 Destination: ${data.destination}
📅 Season: ${data.season}
👥 Guests: ${data.guests}
📞 Phone: ${data.phone}

━━━━━━━━━━━━━━━━━━

⏱ Typical response time: within 24 hours.

If your request is urgent, contact us directly on WhatsApp:

💬 WhatsApp:
+49 1521 7187281

Best regards,
⚓ Adventure To Remember
Private Catamaran & Water Adventures
`
}

export default function BookingPage({ goHome, scrollToSection, language, setLanguage }) {
  const t = translations[language]

  const [sendStatus, setSendStatus] = useState('')
  const [isSending, setIsSending] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSending(true)
    setSendStatus('')

    const form = event.currentTarget
    if (form.website.value) {
  setIsSending(false)
  return
}


    const templateParams = {
  full_name: form.full_name.value,
  email: form.email.value,
  phone: form.phone.value || 'Not provided',
  destination: form.destination.value,
  season: form.season.value,
  guests: form.guests.value || 'Not provided',
  included: form.included.value || 'Not provided',
  other_destination: form.other_destination.value || 'Not provided',
  message: form.message.value || 'Not provided',
}

templateParams.customer_message = getCustomerMessage(language, templateParams)
    try {
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    templateParams,
    PUBLIC_KEY
  )

  await emailjs.send(
    SERVICE_ID,
    CUSTOMER_TEMPLATE_ID,
    templateParams,
    PUBLIC_KEY
  )

  setSendStatus('success')
  form.reset()

    } catch (error) {
      console.error('EmailJS error:', error)
      setSendStatus('error')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <main className="bookingPage">
      <header className="bookingNav">
        <button className="bookingBrand" type="button" onClick={goHome}>
          <span>ATR</span>
          Adventure To Remember
        </button>

        <nav className="menu">
          <button type="button" onClick={() => scrollToSection('experiences')}>{t.nav.adventures}</button>
          <button type="button" onClick={() => scrollToSection('gallery')}>{t.nav.gallery}</button>
          <button type="button" onClick={() => scrollToSection('about')}>{t.nav.about}</button>
          <button type="button" onClick={() => scrollToSection('contact')}>{t.nav.contact}</button>
        </nav>

        <div className="languageSwitcher">
          <button
            type="button"
            className={language === 'en' ? 'activeLang' : ''}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>

          <button
            type="button"
            className={language === 'de' ? 'activeLang' : ''}
            onClick={() => setLanguage('de')}
          >
            DE
          </button>

          <button
            type="button"
            className={language === 'pl' ? 'activeLang' : ''}
            onClick={() => setLanguage('pl')}
          >
            PL
          </button>
        </div>

        <button className="backButton" type="button" onClick={goHome}>
          {t.nav.backHome}
        </button>
      </header>

      <section className="bookingHero">
        <p className="bookingTag">{t.booking.tag}</p>
        <h1>{t.booking.title}</h1>
        <p>{t.booking.description}</p>
      </section>

      <section className="bookingLayout">
        <form className="quoteForm" onSubmit={handleSubmit}>
  <input
    className="honeypot"
    type="text"
    name="website"
    tabIndex="-1"
    autoComplete="off"
  />

  <div className="formBookingHint" tabIndex="0">
    <span>i</span>
    <div className="formBookingHintBubble">
      {t.booking.bookingHint}
    </div>
  </div>

  <label>
    {t.booking.fullName}
    <input
      type="text"
      name="full_name"
      required
      maxLength="80"
    />
  </label>

  <label>
    {t.booking.email}
    <input
      type="email"
      name="email"
      required
      maxLength="120"
    />
  </label>

  <label>
    {t.booking.phone}
    <input
      type="text"
      name="phone"
      maxLength="40"
    />
  </label>

  <label>
    <span className="labelWithHint">
      {t.booking.destination}
      <span className="hintWrap" tabIndex="0">
        <span className="hint">?</span>
        <span className="hintBubble">
          {t.booking.destinationHint}
        </span>
      </span>
    </span>

    <select name="destination">
      <option>Croatia</option>
      <option>Greece</option>
      <option>Italy</option>
      <option>Turkey</option>
      <option>Other destination</option>
      <option>Not sure yet</option>
    </select>
  </label>

  <label>
    {t.booking.season}
    <select name="season">
      <option>Low Season: October – April</option>
      <option>Mid Season: May – June & September</option>
      <option>High Season: July – August</option>
      <option>Not sure yet</option>
    </select>
  </label>

  <label>
    {t.booking.guests}
    <input
      type="number"
      min="1"
      max="20"
      name="guests"
    />
  </label>

  <label className="wide">
    {t.booking.included}
    <textarea
      name="included"
      rows="6"
      maxLength="600"
      placeholder={t.booking.includedPlaceholder}
    />
  </label>

  <label className="wide">
    {t.booking.otherDestination}
    <textarea
      name="other_destination"
      rows="4"
      maxLength="400"
      placeholder={t.booking.otherDestinationPlaceholder}
    />
  </label>

  <label className="wide">
    {t.booking.message}
    <textarea
      name="message"
      rows="10"
      maxLength="1200"
      placeholder={t.booking.messagePlaceholder}
    />
  </label>

  <button
    className="submitButton"
    type="submit"
    disabled={isSending}
  >
    {isSending ? t.booking.sending : t.booking.sendRequest}
  </button>

  {sendStatus === 'success' && (
    <p className="formStatus success">
      {t.booking.success}
    </p>
  )}

  {sendStatus === 'error' && (
    <p className="formStatus error">
      {t.booking.error}
    </p>
  )}
</form>

        <aside className="bookingInfo">
          <p className="bookingTag">{t.booking.premiumPackage}</p>
          <h2>{t.booking.examplePackage}</h2>

          <div className="priceCard premiumCard">
            <h3>{t.booking.croatiaAdventure}</h3>
            <p>{t.booking.itinerary}</p>

            <strong>€18,000</strong>

            <span className="priceSub">
              {t.booking.priceSub}
            </span>

            <div className="premiumFeatures">
              {t.booking.features.map((feature) => (
                <p key={feature}>✓ {feature}</p>
              ))}
            </div>
          </div>

          <div className="customNotice">
            {t.booking.customNotice}
          </div>

          <a
            className="whatsappButton"
            href="https://wa.me/4915217187281"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp Us
          </a>
        </aside>
      </section>

      <section className="bookingBoxSection">
        <p className="bookingTag">{t.booking.whyTag}</p>
        <h2>{t.booking.whyTitle}</h2>

        <div className="whyGrid">
          {t.booking.whyCards.map((card) => (
            <article key={card.title}>
              <span>{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="yacht-gallery" className="bookingBoxSection yachtGallerySection">
        <p className="bookingTag">{t.booking.yachtGallery}</p>
        <h2>{t.booking.yachtTitle}</h2>

        <div className="gallery">
          {yachtGallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Bali 4.8 catamaran ${index + 1}`}
              loading="lazy"
            />
          ))}
        </div>
      </section>
    </main>
  )
}