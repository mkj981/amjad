<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>
        Thank You, {{ $weddingRsvp->name }} | Amjad & Amal
    </title>

    <link
        rel="stylesheet"
        href="{{ asset('wedding/css/thank-you.css') }}"
    >
</head>

<body
    data-guest-name="{{ $weddingRsvp->name }}"
    data-attendance="{{ $weddingRsvp->attendance }}"
>
<audio
    id="backgroundAudio"
    preload="auto"
    loop
>
    <source
        src="{{ asset('wedding/audio/wedding-theme.wav') }}"
        type="audio/wav"
    >
</audio>

<button
    type="button"
    class="music-toggle"
    id="musicToggle"
    aria-label="Play music"
    title="Play music"
>
    <span class="music-toggle__playing">♫</span>
    <span class="music-toggle__muted">×</span>
</button>

<main class="thank-you-page">
    <section class="thank-you-layout">
        <div class="thank-you-intro">
            <p class="eyebrow">
                Amjad & Amal
            </p>

            <h1>
                Thank You,
                <span>{{ $weddingRsvp->name }}</span>
            </h1>

            @if ($weddingRsvp->attendance === 'yes')
                <p class="thank-you-message">
                    We are delighted that you will be celebrating
                    this special day with us. Your presence will
                    make our wedding even more meaningful.
                </p>
            @else
                <p class="thank-you-message">
                    Thank you for letting us know. We are sorry
                    that you will not be able to join us, and you
                    will certainly be missed on our special day.
                </p>
            @endif

            <div class="thank-you-actions">
                <button
                    type="button"
                    class="button button--primary"
                    id="downloadCard"
                >
                    Download Your Card
                </button>

                <a
                    href="{{ route('wedding') }}"
                    class="button button--secondary"
                >
                    Return to Wedding Website
                </a>
            </div>

            <p
                class="download-status"
                id="downloadStatus"
                role="status"
                aria-live="polite"
            ></p>
        </div>

        <div class="card-wrapper">
            <article
                class="thank-you-card"
                id="thankYouCard"
            >
                <div class="card-border"></div>

                <div class="floral-corner floral-corner--top-left">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div class="floral-corner floral-corner--bottom-right">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div class="card-content">
                    <p class="card-label">
                        With love and gratitude
                    </p>

                    <div class="card-monogram">
                        A
                        <span>&</span>
                        A
                    </div>

                    <p class="card-small-title">
                        Amjad & Amal
                    </p>

                    <div class="card-divider">
                        <span></span>
                        <i>◆</i>
                        <span></span>
                    </div>

                    <p class="card-thank-you">
                        Thank You
                    </p>

                    <h2>
                        {{ $weddingRsvp->name }}
                    </h2>

                    @if ($weddingRsvp->attendance === 'yes')
                        <p class="card-message">
                            We are honored to celebrate our
                            special day with you.
                        </p>
                    @else
                        <p class="card-message">
                            Thank you for your warm wishes.
                            You will be missed.
                        </p>
                    @endif

                    <div class="card-date">
                        <span>Saturday</span>
                        <strong>22</strong>
                        <span>August 2026</span>
                    </div>

                    <p class="card-venue">
                        Exit Venue
                    </p>
                </div>
            </article>
        </div>
    </section>
</main>

<script src="{{ asset('wedding/js/thank-you.js') }}"></script>
</body>
</html>
