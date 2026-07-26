(() => {
    'use strict';

    /**
     * ------------------------------------------------------------
     * General elements
     * ------------------------------------------------------------
     */

    const body = document.body;
    const pageLoader = document.getElementById('pageLoader');
    const siteHeader = document.getElementById('siteHeader');
    const menuToggle = document.getElementById('menuToggle');
    const siteNav = document.getElementById('siteNav');

    const navLinks = Array.from(
        document.querySelectorAll('.site-nav a[href^="#"]')
    );

    /**
     * ------------------------------------------------------------
     * Page loader
     * ------------------------------------------------------------
     */

    const hidePageLoader = () => {
        if (!pageLoader) {
            return;
        }

        pageLoader.classList.add('is-hidden');

        window.setTimeout(() => {
            pageLoader.setAttribute('aria-hidden', 'true');
        }, 500);
    };

    window.addEventListener('load', () => {
        window.setTimeout(hidePageLoader, 300);
    });

    // Safety fallback in case the load event takes too long.
    window.setTimeout(hidePageLoader, 3000);

    /**
     * ------------------------------------------------------------
     * Sticky header
     * ------------------------------------------------------------
     */

    const updateHeaderState = () => {
        if (!siteHeader) {
            return;
        }

        siteHeader.classList.toggle(
            'is-scrolled',
            window.scrollY > 30
        );
    };

    updateHeaderState();

    window.addEventListener('scroll', updateHeaderState, {
        passive: true,
    });

    /**
     * ------------------------------------------------------------
     * Mobile navigation
     * ------------------------------------------------------------
     */

    const closeNavigation = () => {
        if (!menuToggle || !siteNav) {
            return;
        }

        menuToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('is-open');
        body.classList.remove('menu-is-open');
    };

    const openNavigation = () => {
        if (!menuToggle || !siteNav) {
            return;
        }

        menuToggle.setAttribute('aria-expanded', 'true');
        siteNav.classList.add('is-open');
        body.classList.add('menu-is-open');
    };

    menuToggle?.addEventListener('click', () => {
        const isOpen =
            menuToggle.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
            closeNavigation();
        } else {
            openNavigation();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeNavigation();
        }
    });

    document.addEventListener('click', (event) => {
        if (!siteNav || !menuToggle) {
            return;
        }

        const clickedInsideNavigation = siteNav.contains(event.target);
        const clickedMenuButton = menuToggle.contains(event.target);

        if (!clickedInsideNavigation && !clickedMenuButton) {
            closeNavigation();
        }
    });

    /**
     * ------------------------------------------------------------
     * Smooth section navigation
     * ------------------------------------------------------------
     */

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');

            if (!targetId || targetId === '#') {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();
            closeNavigation();

            const headerHeight = siteHeader?.offsetHeight ?? 0;
            const targetPosition =
                targetSection.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });

            if (window.history?.replaceState) {
                window.history.replaceState(
                    null,
                    '',
                    targetId
                );
            }
        });
    });

    /**
     * ------------------------------------------------------------
     * Reveal animations
     * ------------------------------------------------------------
     */

    const revealItems = document.querySelectorAll('.reveal');

    if (
        'IntersectionObserver' in window &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        revealItems.forEach((item) => {
            revealObserver.observe(item);
        });
    } else {
        revealItems.forEach((item) => {
            item.classList.add('is-visible');
        });
    }

    /**
     * ------------------------------------------------------------
     * Active navigation section
     * ------------------------------------------------------------
     */

    const observedSections = document.querySelectorAll(
        '.section-observer[id]'
    );

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const sectionId = entry.target.id;

                    navLinks.forEach((link) => {
                        const isActive =
                            link.getAttribute('href') ===
                            `#${sectionId}`;

                        link.classList.toggle(
                            'is-active',
                            isActive
                        );
                    });
                });
            },
            {
                rootMargin: '-35% 0px -55% 0px',
                threshold: 0,
            }
        );

        observedSections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    /**
     * ------------------------------------------------------------
     * Questions accordion
     * ------------------------------------------------------------
     */

    const accordionButtons = document.querySelectorAll(
        '[data-accordion] .accordion-item button'
    );

    accordionButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const currentItem = button.closest('.accordion-item');

            if (!currentItem) {
                return;
            }

            const wasOpen =
                currentItem.classList.contains('is-open');

            document
                .querySelectorAll(
                    '[data-accordion] .accordion-item'
                )
                .forEach((item) => {
                    item.classList.remove('is-open');

                    item
                        .querySelector('button')
                        ?.setAttribute(
                            'aria-expanded',
                            'false'
                        );
                });

            if (!wasOpen) {
                currentItem.classList.add('is-open');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /**
     * ------------------------------------------------------------
     * RSVP form
     * ------------------------------------------------------------
     *
     * Important:
     * We do not call event.preventDefault().
     * The form will be submitted normally to the Laravel route.
     */

    const rsvpForm = document.getElementById('rsvpForm');
    const formStatus = document.getElementById('formStatus');

    const getFieldContainer = (field) => {
        if (!field) {
            return null;
        }

        return (
            field.closest('.form-field') ||
            field.closest('fieldset')
        );
    };

    const removeFieldError = (field) => {
        const container = getFieldContainer(field);

        container?.classList.remove('has-error');
        field.removeAttribute('aria-invalid');
    };

    const addFieldError = (field) => {
        const container = getFieldContainer(field);

        container?.classList.add('has-error');
        field.setAttribute('aria-invalid', 'true');
    };

    rsvpForm?.querySelectorAll('input, select, textarea').forEach(
        (field) => {
            field.addEventListener(
                'invalid',
                () => {
                    addFieldError(field);

                    if (formStatus) {
                        formStatus.textContent =
                            'Please complete all required fields correctly.';
                    }
                },
                true
            );

            field.addEventListener('input', () => {
                if (field.checkValidity()) {
                    removeFieldError(field);
                }
            });

            field.addEventListener('change', () => {
                if (field.checkValidity()) {
                    removeFieldError(field);
                }

                if (field.name === 'attendance') {
                    rsvpForm
                        .querySelectorAll(
                            'input[name="attendance"]'
                        )
                        .forEach((radio) => {
                            removeFieldError(radio);
                        });
                }
            });
        }
    );

    rsvpForm?.addEventListener('submit', () => {
        const submitButton = rsvpForm.querySelector(
            'button[type="submit"]'
        );

        if (formStatus) {
            formStatus.textContent =
                'Submitting your RSVP...';
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.setAttribute(
                'aria-disabled',
                'true'
            );

            submitButton.dataset.originalText =
                submitButton.textContent.trim();

            submitButton.textContent = 'Submitting...';
        }

        rsvpForm.classList.add('is-submitting');

        // Do not add preventDefault here.
        // Laravel will receive and process the form normally.
    });

    // Re-enable the button when returning with browser Back/Forward cache.
    window.addEventListener('pageshow', () => {
        if (!rsvpForm) {
            return;
        }

        const submitButton = rsvpForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = false;
            submitButton.removeAttribute('aria-disabled');

            if (submitButton.dataset.originalText) {
                submitButton.textContent =
                    submitButton.dataset.originalText;
            }
        }

        rsvpForm.classList.remove('is-submitting');
    });

    /**
     * ------------------------------------------------------------
     * Persistent background audio
     * ------------------------------------------------------------
     */

    class PersistentAudio {
        constructor({
                        audio,
                        toggle,
                        consent,
                        enterWithMusic,
                        enterWithoutMusic,
                    }) {
            this.audio = audio;
            this.toggle = toggle;
            this.consent = consent;
            this.enterWithMusic = enterWithMusic;
            this.enterWithoutMusic = enterWithoutMusic;

            this.stateKey = 'amjad-amal-audio-state';
            this.enteredKey = 'amjad-amal-site-entered';
            this.saveTimer = null;
            this.shouldBePlaying = false;

            this.initialize();
        }

        initialize() {
            if (!this.audio) {
                this.bindWithoutAudio();
                return;
            }

            this.restoreState();
            this.bindEvents();
        }

        bindWithoutAudio() {
            const enterWebsite = () => {
                this.hideConsent();
            };

            this.enterWithMusic?.addEventListener(
                'click',
                enterWebsite
            );

            this.enterWithoutMusic?.addEventListener(
                'click',
                enterWebsite
            );

            this.toggle?.setAttribute(
                'aria-hidden',
                'true'
            );
        }

        bindEvents() {
            this.enterWithMusic?.addEventListener(
                'click',
                async () => {
                    this.shouldBePlaying = true;
                    this.hideConsent();
                    await this.play();
                }
            );

            this.enterWithoutMusic?.addEventListener(
                'click',
                () => {
                    this.shouldBePlaying = false;
                    this.pause();
                    this.hideConsent();
                }
            );

            this.toggle?.addEventListener(
                'click',
                async () => {
                    if (this.audio.paused) {
                        this.shouldBePlaying = true;
                        await this.play();
                    } else {
                        this.shouldBePlaying = false;
                        this.pause();
                    }
                }
            );

            this.audio.addEventListener('play', () => {
                this.shouldBePlaying = true;
                this.updateToggleUI(false);
                this.saveState();
            });

            this.audio.addEventListener('pause', () => {
                this.updateToggleUI(true);
                this.saveState();
            });

            this.audio.addEventListener(
                'volumechange',
                () => {
                    this.saveState();
                }
            );

            this.audio.addEventListener(
                'timeupdate',
                () => {
                    window.clearTimeout(this.saveTimer);

                    this.saveTimer = window.setTimeout(
                        () => {
                            this.saveState();
                        },
                        500
                    );
                }
            );

            window.addEventListener('beforeunload', () => {
                this.saveState();
            });

            document.addEventListener(
                'visibilitychange',
                () => {
                    this.saveState();
                }
            );
        }

        async play() {
            if (!this.audio) {
                return;
            }

            try {
                await this.audio.play();

                this.shouldBePlaying = true;
                this.updateToggleUI(false);
                this.saveState();
            } catch (error) {
                // The browser may require another user interaction
                // after a page reload.
                this.updateToggleUI(true);
                this.saveState();

                console.info(
                    'Audio playback requires a user interaction.',
                    error
                );
            }
        }

        pause() {
            if (!this.audio) {
                return;
            }

            this.audio.pause();
            this.shouldBePlaying = false;
            this.updateToggleUI(true);
            this.saveState();
        }

        hideConsent() {
            this.consent?.classList.add('is-hidden');
            this.consent?.setAttribute(
                'aria-hidden',
                'true'
            );

            body.classList.remove('is-locked');

            sessionStorage.setItem(
                this.enteredKey,
                '1'
            );
        }

        showConsent() {
            this.consent?.classList.remove('is-hidden');
            this.consent?.setAttribute(
                'aria-hidden',
                'false'
            );

            body.classList.add('is-locked');
        }

        restoreState() {
            const savedState = this.readState();
            const hasEntered =
                sessionStorage.getItem(this.enteredKey) ===
                '1';

            const savedVolume = Number(savedState.volume);

            this.audio.volume =
                Number.isFinite(savedVolume) &&
                savedVolume >= 0 &&
                savedVolume <= 1
                    ? savedVolume
                    : 0.32;

            this.shouldBePlaying =
                savedState.playing === true;

            this.restoreAudioTime(savedState.time);

            if (!hasEntered) {
                this.showConsent();
                this.updateToggleUI(true);
                return;
            }

            this.hideConsent();
            this.updateToggleUI(!this.shouldBePlaying);

            if (this.shouldBePlaying) {
                this.play();

                const unlockAudio = async () => {
                    if (
                        this.shouldBePlaying &&
                        this.audio.paused
                    ) {
                        await this.play();
                    }
                };

                document.addEventListener(
                    'pointerdown',
                    unlockAudio,
                    {
                        once: true,
                    }
                );

                document.addEventListener(
                    'keydown',
                    unlockAudio,
                    {
                        once: true,
                    }
                );
            }
        }

        restoreAudioTime(savedTime) {
            const time = Number(savedTime);

            if (!Number.isFinite(time) || time < 0) {
                return;
            }

            const setTime = () => {
                const duration = this.audio.duration;

                try {
                    this.audio.currentTime =
                        Number.isFinite(duration) &&
                        duration > 0
                            ? time % duration
                            : time;
                } catch (error) {
                    console.info(
                        'Could not restore the saved audio position.',
                        error
                    );
                }
            };

            if (this.audio.readyState >= 1) {
                setTime();
            } else {
                this.audio.addEventListener(
                    'loadedmetadata',
                    setTime,
                    {
                        once: true,
                    }
                );
            }
        }

        saveState() {
            if (!this.audio) {
                return;
            }

            const state = {
                playing: this.shouldBePlaying,
                time: Number.isFinite(
                    this.audio.currentTime
                )
                    ? this.audio.currentTime
                    : 0,
                volume: this.audio.volume,
            };

            try {
                sessionStorage.setItem(
                    this.stateKey,
                    JSON.stringify(state)
                );
            } catch (error) {
                console.info(
                    'Could not save the audio state.',
                    error
                );
            }
        }

        readState() {
            try {
                const savedValue =
                    sessionStorage.getItem(this.stateKey);

                if (!savedValue) {
                    return {
                        playing: false,
                        time: 0,
                        volume: 0.32,
                    };
                }

                return JSON.parse(savedValue);
            } catch (error) {
                return {
                    playing: false,
                    time: 0,
                    volume: 0.32,
                };
            }
        }

        updateToggleUI(isMuted) {
            if (!this.toggle) {
                return;
            }

            this.toggle.classList.toggle(
                'is-muted',
                isMuted
            );

            const label = isMuted
                ? 'Play music'
                : 'Pause music';

            this.toggle.setAttribute(
                'aria-label',
                label
            );

            this.toggle.setAttribute(
                'title',
                label
            );
        }
    }

    new PersistentAudio({
        audio: document.getElementById('backgroundAudio'),
        toggle: document.getElementById('musicToggle'),
        consent: document.getElementById('musicConsent'),
        enterWithMusic: document.getElementById('enterWebsite'),
        enterWithoutMusic: document.getElementById('enterMuted'),
    });
})();
