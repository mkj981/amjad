(() => {
    'use strict';

    const body = document.body;

    const guestName =
        body.dataset.guestName?.trim() || 'Our Guest';

    const attendance =
        body.dataset.attendance === 'no' ? 'no' : 'yes';

    const downloadButton =
        document.getElementById('downloadCard');

    const downloadStatus =
        document.getElementById('downloadStatus');

    const backgroundAudio =
        document.getElementById('backgroundAudio');

    const musicToggle =
        document.getElementById('musicToggle');

    const audioStateKey = 'amjad-amal-audio-state';

    /**
     * ------------------------------------------------------------
     * Download card as PNG
     * ------------------------------------------------------------
     */

    const downloadThankYouCard = () => {
        const canvas = document.createElement('canvas');

        canvas.width = 1080;
        canvas.height = 1350;

        const context = canvas.getContext('2d');

        if (!context) {
            throw new Error('Canvas is not supported.');
        }

        drawCard(context, canvas.width, canvas.height);

        const safeGuestName = guestName
            .replace(/[^a-z0-9]+/gi, '-')
            .replace(/^-+|-+$/g, '')
            .toLowerCase();

        const fileName = safeGuestName
            ? `amjad-amal-thank-you-${safeGuestName}.png`
            : 'amjad-amal-thank-you.png';

        const link = document.createElement('a');

        link.download = fileName;
        link.href = canvas.toDataURL('image/png', 1);
        link.click();
    };

    const drawCard = (context, width, height) => {
        const colors = {
            background: '#fbf7f0',
            burgundy: '#641f2a',
            burgundyDark: '#3d1119',
            wine: '#7b2635',
            gold: '#b08a52',
            goldLight: '#d5bc91',
            muted: '#766963',
        };

        context.fillStyle = colors.background;
        context.fillRect(0, 0, width, height);

        drawTexture(context, width, height, colors);
        drawBorders(context, width, height, colors);

        drawFloralDecoration(
            context,
            40,
            40,
            1,
            colors
        );

        context.save();
        context.translate(width, height);
        context.rotate(Math.PI);

        drawFloralDecoration(
            context,
            40,
            40,
            1,
            colors
        );

        context.restore();

        context.textAlign = 'center';
        context.textBaseline = 'middle';

        drawSpacedText(
            context,
            'WITH LOVE AND GRATITUDE',
            width / 2,
            185,
            7,
            '24px Georgia',
            colors.gold
        );

        context.fillStyle = colors.burgundy;
        context.font = '110px Georgia';
        context.fillText('A', width / 2 - 105, 325);

        context.fillStyle = colors.gold;
        context.font = 'italic 48px Georgia';
        context.fillText('&', width / 2, 325);

        context.fillStyle = colors.burgundy;
        context.font = '110px Georgia';
        context.fillText('A', width / 2 + 105, 325);

        context.fillStyle = colors.burgundy;
        context.font = 'italic 42px Georgia';
        context.fillText('Amjad & Amal', width / 2, 430);

        drawDivider(
            context,
            width / 2,
            500,
            370,
            colors
        );

        context.fillStyle = colors.gold;
        context.font = 'italic 44px Georgia';
        context.fillText('Thank You', width / 2, 585);

        drawGuestName(
            context,
            guestName,
            width / 2,
            690,
            800,
            colors.burgundy
        );

        const message =
            attendance === 'yes'
                ? 'We are honored to celebrate our special day with you.'
                : 'Thank you for your warm wishes. You will be missed.';

        drawWrappedText(
            context,
            message,
            width / 2,
            805,
            650,
            46,
            '32px Georgia',
            colors.muted
        );

        drawDate(context, width / 2, 1010, colors);

        drawSpacedText(
            context,
            'EXIT VENUE',
            width / 2,
            1175,
            8,
            '23px Arial',
            colors.gold
        );
    };

    const drawTexture = (
        context,
        width,
        height,
        colors
    ) => {
        context.save();

        context.globalAlpha = 0.07;
        context.strokeStyle = colors.goldLight;
        context.lineWidth = 1;

        for (let x = 0; x <= width; x += 35) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, height);
            context.stroke();
        }

        for (let y = 0; y <= height; y += 35) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(width, y);
            context.stroke();
        }

        context.restore();
    };

    const drawBorders = (
        context,
        width,
        height,
        colors
    ) => {
        context.save();

        context.strokeStyle = colors.gold;
        context.lineWidth = 3;
        context.strokeRect(50, 50, width - 100, height - 100);

        context.globalAlpha = 0.45;
        context.lineWidth = 1.5;
        context.strokeRect(68, 68, width - 136, height - 136);

        context.restore();
    };

    const drawFloralDecoration = (
        context,
        x,
        y,
        scale,
        colors
    ) => {
        context.save();

        context.translate(x, y);
        context.scale(scale, scale);
        context.rotate(-0.28);

        drawPetal(context, 75, 55, 85, 160, -0.15, colors.burgundy);
        drawPetal(context, 40, 105, 75, 135, -0.75, colors.wine);
        drawPetal(context, 125, 100, 68, 125, 0.62, colors.burgundy);
        drawPetal(context, 110, 22, 52, 105, 0.3, colors.gold);
        drawPetal(context, 110, 155, 48, 100, -0.35, colors.goldLight);

        context.restore();
    };

    const drawPetal = (
        context,
        x,
        y,
        width,
        height,
        rotation,
        color
    ) => {
        context.save();

        context.translate(x, y);
        context.rotate(rotation);

        context.beginPath();
        context.moveTo(0, -height / 2);

        context.bezierCurveTo(
            width / 2,
            -height / 4,
            width / 2,
            height / 4,
            0,
            height / 2
        );

        context.bezierCurveTo(
            -width / 2,
            height / 4,
            -width / 2,
            -height / 4,
            0,
            -height / 2
        );

        context.closePath();

        context.fillStyle = color;
        context.fill();

        context.restore();
    };

    const drawDivider = (
        context,
        centerX,
        y,
        totalWidth,
        colors
    ) => {
        const gap = 38;
        const lineWidth = (totalWidth - gap) / 2;

        context.save();

        context.strokeStyle = colors.goldLight;
        context.lineWidth = 2;

        context.beginPath();
        context.moveTo(centerX - totalWidth / 2, y);
        context.lineTo(centerX - gap / 2, y);
        context.stroke();

        context.beginPath();
        context.moveTo(centerX + gap / 2, y);
        context.lineTo(centerX + totalWidth / 2, y);
        context.stroke();

        context.translate(centerX, y);
        context.rotate(Math.PI / 4);

        context.fillStyle = colors.gold;
        context.fillRect(-7, -7, 14, 14);

        context.restore();
    };

    const drawGuestName = (
        context,
        text,
        x,
        y,
        maxWidth,
        color
    ) => {
        let fontSize = 82;

        context.fillStyle = color;

        while (fontSize > 42) {
            context.font = `${fontSize}px Georgia`;

            if (context.measureText(text).width <= maxWidth) {
                break;
            }

            fontSize -= 2;
        }

        const lines = splitTextToLines(
            context,
            text,
            maxWidth,
            2
        );

        const lineHeight = fontSize * 1.05;
        const startY =
            y - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) => {
            context.fillText(
                line,
                x,
                startY + index * lineHeight
            );
        });
    };

    const drawWrappedText = (
        context,
        text,
        x,
        y,
        maxWidth,
        lineHeight,
        font,
        color
    ) => {
        context.font = font;
        context.fillStyle = color;

        const lines = splitTextToLines(
            context,
            text,
            maxWidth,
            3
        );

        lines.forEach((line, index) => {
            context.fillText(
                line,
                x,
                y + index * lineHeight
            );
        });
    };

    const splitTextToLines = (
        context,
        text,
        maxWidth,
        maxLines
    ) => {
        const words = text.trim().split(/\s+/);
        const lines = [];
        let currentLine = '';

        words.forEach((word) => {
            const testLine = currentLine
                ? `${currentLine} ${word}`
                : word;

            if (
                context.measureText(testLine).width <= maxWidth
            ) {
                currentLine = testLine;
                return;
            }

            if (currentLine) {
                lines.push(currentLine);
            }

            currentLine = word;
        });

        if (currentLine) {
            lines.push(currentLine);
        }

        if (lines.length <= maxLines) {
            return lines;
        }

        const visibleLines = lines.slice(0, maxLines);

        visibleLines[maxLines - 1] =
            visibleLines[maxLines - 1].replace(/[.,]*$/, '') +
            '…';

        return visibleLines;
    };

    const drawDate = (
        context,
        centerX,
        y,
        colors
    ) => {
        context.save();

        context.fillStyle = colors.burgundyDark;
        context.font = '25px Georgia';
        context.fillText('SATURDAY', centerX - 210, y);

        context.strokeStyle = colors.goldLight;
        context.lineWidth = 2;

        context.beginPath();
        context.moveTo(centerX - 85, y - 45);
        context.lineTo(centerX - 85, y + 45);
        context.stroke();

        context.beginPath();
        context.moveTo(centerX + 85, y - 45);
        context.lineTo(centerX + 85, y + 45);
        context.stroke();

        context.fillStyle = colors.burgundy;
        context.font = '76px Georgia';
        context.fillText('22', centerX, y);

        context.fillStyle = colors.burgundyDark;
        context.font = '25px Georgia';
        context.fillText('AUGUST 2026', centerX + 220, y);

        context.restore();
    };

    const drawSpacedText = (
        context,
        text,
        centerX,
        y,
        letterSpacing,
        font,
        color
    ) => {
        context.save();

        context.font = font;
        context.fillStyle = color;

        const characters = Array.from(text);

        const charactersWidth = characters.reduce(
            (total, character) =>
                total + context.measureText(character).width,
            0
        );

        const totalWidth =
            charactersWidth +
            letterSpacing * (characters.length - 1);

        let currentX = centerX - totalWidth / 2;

        characters.forEach((character) => {
            const characterWidth =
                context.measureText(character).width;

            context.fillText(
                character,
                currentX + characterWidth / 2,
                y
            );

            currentX += characterWidth + letterSpacing;
        });

        context.restore();
    };

    downloadButton?.addEventListener('click', () => {
        downloadButton.disabled = true;
        downloadButton.textContent = 'Creating Your Card...';

        if (downloadStatus) {
            downloadStatus.textContent =
                'Preparing your personalized image...';
        }

        window.setTimeout(() => {
            try {
                downloadThankYouCard();

                if (downloadStatus) {
                    downloadStatus.textContent =
                        'Your card has been downloaded successfully.';
                }
            } catch (error) {
                console.error(error);

                if (downloadStatus) {
                    downloadStatus.textContent =
                        'The image could not be created. Please try again.';
                }
            } finally {
                downloadButton.disabled = false;
                downloadButton.textContent =
                    'Download Your Card';
            }
        }, 100);
    });

    /**
     * ------------------------------------------------------------
     * Continue background music
     * ------------------------------------------------------------
     */

    const readAudioState = () => {
        try {
            const storedState =
                sessionStorage.getItem(audioStateKey);

            return storedState
                ? JSON.parse(storedState)
                : {
                    playing: false,
                    time: 0,
                    volume: 0.32,
                };
        } catch {
            return {
                playing: false,
                time: 0,
                volume: 0.32,
            };
        }
    };

    const saveAudioState = () => {
        if (!backgroundAudio) {
            return;
        }

        const state = {
            playing: !backgroundAudio.paused,
            time: Number.isFinite(
                backgroundAudio.currentTime
            )
                ? backgroundAudio.currentTime
                : 0,
            volume: backgroundAudio.volume,
        };

        sessionStorage.setItem(
            audioStateKey,
            JSON.stringify(state)
        );
    };

    const updateMusicButton = () => {
        if (!musicToggle || !backgroundAudio) {
            return;
        }

        const isMuted = backgroundAudio.paused;

        musicToggle.classList.toggle(
            'is-muted',
            isMuted
        );

        musicToggle.setAttribute(
            'aria-label',
            isMuted ? 'Play music' : 'Pause music'
        );

        musicToggle.setAttribute(
            'title',
            isMuted ? 'Play music' : 'Pause music'
        );
    };

    const restoreAudio = () => {
        if (!backgroundAudio) {
            return;
        }

        const state = readAudioState();

        backgroundAudio.volume =
            Number.isFinite(Number(state.volume))
                ? Number(state.volume)
                : 0.32;

        const restoreTime = () => {
            const savedTime = Number(state.time);

            if (!Number.isFinite(savedTime)) {
                return;
            }

            if (
                Number.isFinite(backgroundAudio.duration) &&
                backgroundAudio.duration > 0
            ) {
                backgroundAudio.currentTime =
                    savedTime % backgroundAudio.duration;
            } else {
                backgroundAudio.currentTime = savedTime;
            }
        };

        if (backgroundAudio.readyState >= 1) {
            restoreTime();
        } else {
            backgroundAudio.addEventListener(
                'loadedmetadata',
                restoreTime,
                {
                    once: true,
                }
            );
        }

        if (state.playing === true) {
            backgroundAudio
                .play()
                .catch(() => {
                    updateMusicButton();
                });
        }

        updateMusicButton();
    };

    musicToggle?.addEventListener('click', async () => {
        if (!backgroundAudio) {
            return;
        }

        if (backgroundAudio.paused) {
            try {
                await backgroundAudio.play();
            } catch (error) {
                console.info(
                    'Audio playback requires user interaction.',
                    error
                );
            }
        } else {
            backgroundAudio.pause();
        }

        saveAudioState();
        updateMusicButton();
    });

    backgroundAudio?.addEventListener(
        'play',
        updateMusicButton
    );

    backgroundAudio?.addEventListener(
        'pause',
        updateMusicButton
    );

    backgroundAudio?.addEventListener(
        'timeupdate',
        saveAudioState
    );

    window.addEventListener(
        'beforeunload',
        saveAudioState
    );

    restoreAudio();
})();
