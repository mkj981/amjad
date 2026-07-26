<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#EEE7DE">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Amjad & Amal | Wedding</title>
  <meta name="description" content="The official wedding website of Amjad and Amal.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('wedding/css/style.css') }}">
</head>
<body>
  <div class="page-loader" id="pageLoader" aria-hidden="true">
    <div class="loader-monogram">A<span>&</span>A</div>
  </div>

  <div class="music-consent" id="musicConsent" role="dialog" aria-modal="true" aria-labelledby="musicTitle">
    <div class="music-consent__card">
      <span class="eyebrow">Amjad & Amal</span>
      <h1 id="musicTitle">Welcome to Our Story</h1>
      <p>Enter the website and enjoy our music while exploring every detail of our celebration.</p>
      <button class="button button--dark" id="enterWebsite" type="button">Enter with Music</button>
      <button class="text-button" id="enterMuted" type="button">Enter without Music</button>
    </div>
  </div>

  <audio id="backgroundAudio" preload="auto" loop>
    <source src="{{ asset('wedding/audio/wedding-theme.wav') }}" type="audio/wav">
  </audio>

  <header class="site-header" id="siteHeader">
    <a class="brand" href="#welcome" aria-label="Back to the beginning">
      <span>A</span><i>&</i><span>A</span>
    </a>

    <button class="menu-toggle" id="menuToggle" type="button" aria-expanded="false" aria-controls="siteNav" aria-label="Open navigation menu">
      <span></span><span></span>
    </button>

    <nav class="site-nav" id="siteNav" aria-label="Main navigation">
      <a href="#welcome" class="is-active">Home</a>
      <a href="#story">Our Story</a>
      <a href="#schedule">Schedule</a>
      <a href="#questions">Q&A</a>
      <a href="#rsvp">RSVP</a>
    </nav>

    <a class="header-rsvp" href="#rsvp">RSVP</a>
  </header>

  <main>
    <section class="hero section-observer" id="welcome" data-section="welcome">
      <div class="hero__background" aria-hidden="true"></div>
      <div class="hero__veil" aria-hidden="true"></div>
      <div class="hero__content reveal">
        <p class="hero__date">18 · 09 · 2026</p>
        <h1><span>Amjad</span><em>&</em><span>Amal</span></h1>
        <p class="hero__subtitle">Celebrating love and the beginning of a beautiful new chapter.</p>
        <a class="scroll-cue" href="#story" aria-label="Continue to our story">
          <span>Discover Our Story</span>
          <i></i>
        </a>
      </div>
      <div class="hero__side-note">Amman · Jordan</div>
    </section>

    <section class="intro section-observer" id="story" data-section="story">
      <div class="ornament ornament--top" aria-hidden="true">❦</div>
      <div class="section-heading reveal">
        <span class="eyebrow">Our Story</span>
        <h2>This Is Where Our Story Began</h2>
      </div>
      <div class="story-grid">
        <article class="story-copy reveal">
          <p class="drop-cap">In one simple moment, chance became a beginning, and that beginning became a story we are delighted to share with you.</p>
          <p>Your presence will make our day warmer and even more meaningful. We created this website to bring together everything you may need, from the celebration schedule and venue details to common questions and RSVP information.</p>
          <div class="signature">Amjad & Amal</div>
        </article>
        <div class="story-visual reveal" aria-label="Placeholder for a photograph of the couple">
          <div class="photo-frame">
            <img src="{{ asset('wedding/images/couple-placeholder.svg') }}" alt="Placeholder photograph of Amjad and Amal">
          </div>
          <span class="vertical-label">Together is a beautiful place to be</span>
        </div>
      </div>
    </section>

    <section class="quote-band" aria-label="Wedding quote">
      <div class="quote-band__image" aria-hidden="true"></div>
      <blockquote class="reveal">
        <span>“</span>
        <p>We choose each other today and every day.</p>
        <cite>18 September 2026</cite>
      </blockquote>
    </section>

    <section class="schedule section-observer" id="schedule" data-section="schedule">
      <div class="section-heading section-heading--center reveal">
        <span class="eyebrow">The Celebration</span>
        <h2>Schedule of the Day</h2>
        <p>Times may be adjusted. Any important updates will be shared here.</p>
      </div>

      <div class="timeline">
        <article class="timeline-item reveal">
          <div class="timeline-item__time"><strong>6:30</strong><span>PM</span></div>
          <div class="timeline-item__line"><i></i></div>
          <div class="timeline-item__content">
            <span class="timeline-item__number">01</span>
            <h3>Guest Reception</h3>
            <p>Welcome to the beginning of an evening filled with joy and unforgettable memories.</p>
          </div>
        </article>
        <article class="timeline-item reveal">
          <div class="timeline-item__time"><strong>7:30</strong><span>PM</span></div>
          <div class="timeline-item__line"><i></i></div>
          <div class="timeline-item__content">
            <span class="timeline-item__number">02</span>
            <h3>Couple's Entrance</h3>
            <p>The moment we have been waiting for begins together.</p>
          </div>
        </article>
        <article class="timeline-item reveal">
          <div class="timeline-item__time"><strong>8:30</strong><span>PM</span></div>
          <div class="timeline-item__line"><i></i></div>
          <div class="timeline-item__content">
            <span class="timeline-item__number">03</span>
            <h3>Dinner & Celebration</h3>
            <p>Dinner, music, dancing, and memories to last a lifetime.</p>
          </div>
        </article>
      </div>
    </section>

    <section class="details-panel">
      <div class="details-panel__content reveal">
        <span class="eyebrow">Location</span>
        <h2>Amman, Jordan</h2>
        <p>Venue or Hotel Name<br>Full address goes here</p>
        <a class="button button--outline" href="https://maps.google.com" target="_blank" rel="noopener">Open in Google Maps</a>
      </div>
    </section>

    <section class="questions section-observer" id="questions" data-section="questions">
      <div class="section-heading reveal">
        <span class="eyebrow">Questions & Answers</span>
        <h2>Everything You Need to Know</h2>
      </div>

      <div class="accordion" data-accordion>
        <article class="accordion-item reveal">
          <button type="button" aria-expanded="false">
            <span>What time should I arrive?</span><i></i>
          </button>
          <div class="accordion-content"><p>We recommend arriving 30 minutes before the celebration begins so you have enough time to be welcomed and seated comfortably.</p></div>
        </article>
        <article class="accordion-item reveal">
          <button type="button" aria-expanded="false">
            <span>Is parking available?</span><i></i>
          </button>
          <div class="accordion-content"><p>Yes. Guest parking and valet service will be available at the venue entrance.</p></div>
        </article>
        <article class="accordion-item reveal">
          <button type="button" aria-expanded="false">
            <span>May I bring children?</span><i></i>
          </button>
          <div class="accordion-content"><p>We kindly ask that this be an adults-only evening unless your invitation states otherwise.</p></div>
        </article>
        <article class="accordion-item reveal">
          <button type="button" aria-expanded="false">
            <span>When should I submit my RSVP?</span><i></i>
          </button>
          <div class="accordion-content"><p>Please submit your RSVP by September 1, 2026, to help us finalize the celebration arrangements.</p></div>
        </article>
      </div>
    </section>

    <section class="rsvp section-observer" id="rsvp" data-section="rsvp">
      <div class="rsvp__decor rsvp__decor--left" aria-hidden="true"></div>
      <div class="rsvp__decor rsvp__decor--right" aria-hidden="true"></div>
      <div class="rsvp-card reveal">
        <span class="eyebrow">Kindly Reply</span>
        <h2>Will You Celebrate with Us?</h2>
        <p>Please complete the form below for each invitation.</p>
          @if (session('success'))
              <div
                  class="form-status form-status--success"
                  role="status"
              >
                  {{ session('success') }}
              </div>
          @endif

          @if ($errors->any())
              <div
                  class="form-status form-status--error"
                  role="alert"
              >
                  <strong>Please correct the following errors:</strong>

                  <ul>
                      @foreach ($errors->all() as $error)
                          <li>{{ $error }}</li>
                      @endforeach
                  </ul>
              </div>
          @endif
          <form
              id="rsvpForm"
              action="{{ route('wedding.rsvp.store') }}"
              method="POST"
          >
              @csrf
              <div class="form-field">
                  <label for="guestName">Full Name</label>

                  <input
                      id="guestName"
                      name="name"
                      type="text"
                      value="{{ old('name') }}"
                      autocomplete="name"
                      maxlength="255"
                      required
                  >

                  <small>Please enter your full name.</small>
              </div>

              <div class="form-field">
                  <label for="guestPhone">Phone Number</label>

                  <input
                      id="guestPhone"
                      name="phone"
                      type="tel"
                      value="{{ old('phone') }}"
                      autocomplete="tel"
                      inputmode="tel"
                      maxlength="30"
                      placeholder="+962 7X XXX XXXX"

                  >

                  <small>Please enter your phone number.</small>
              </div>

              <fieldset class="attendance-field">
                  <legend>Attendance</legend>

                  <label>
                      <input
                          type="radio"
                          name="attendance"
                          value="yes"
                          @checked(old('attendance') === 'yes')
                          required
                      >

                      <span>Joyfully accepts</span>
                  </label>

                  <label>
                      <input
                          type="radio"
                          name="attendance"
                          value="no"
                          @checked(old('attendance') === 'no')
                          required
                      >

                      <span>Regretfully declines</span>
                  </label>
              </fieldset>

              <div class="form-field">
                  <label for="guestCount">Number of Guests</label>

                  <select id="guestCount" name="guests" required>
                      <option value="" disabled @selected(old('guests') === null)>
                          Select number of guests
                      </option>

                      <option value="1" @selected(old('guests') == 1)>1 guest</option>
                      <option value="2" @selected(old('guests') == 2)>2 guests</option>
                      <option value="3" @selected(old('guests') == 3)>3 guests</option>
                      <option value="4" @selected(old('guests') == 4)>4 guests</option>
                  </select>

                  <small>Please select the number of guests.</small>
              </div>

              <div class="form-field">
                  <label for="guestMessage">Message for the Couple</label>

                  <textarea
                      id="guestMessage"
                      name="message"
                      rows="3"
                      maxlength="1000"

                  >{{ old('message') }}</textarea>

                  <small>Please write a message for the couple.</small>
              </div>

              <button
                  class="button button--dark button--wide"
                  type="submit"
              >
                  Submit RSVP
              </button>

              <div
                  class="form-status"
                  id="formStatus"
                  role="status"
                  aria-live="polite"
              ></div>
          </form>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-monogram">A <span>&</span> A</div>
    <p>We cannot wait to celebrate with you.</p>
    <small>© 2026 Amjad & Amal</small>
  </footer>

  <button class="music-toggle" id="musicToggle" type="button" aria-label="Pause music" title="Music">
    <span class="music-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
    <span class="music-toggle__label">Music</span>
  </button>

  <script src="{{ asset('wedding/js/app.js') }}"></script>
</body>
</html>
