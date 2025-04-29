(function () {
    // --- New Image Preloading and Buffering ---
    const BUFFER_SIZE = 3;
    let imageBuffer = [];
    let isFillingBuffer = false;

    // Function to preload images
    function preloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (err) => {
                console.error(`Error loading image: ${url}`, err);
                reject(err);
            };
            img.src = url;
        });
    }

    // Function to get random image URL (using a slightly larger size for better quality)
    function getRandomImageUrl() {
        // Using a timestamp and random number to try and bypass potential caching issues with picsum
        const timestamp = Date.now();
        const random = Math.random();
        return `https://picsum.photos/1920/1080?random=${timestamp}${random}&blur=1`;
    }

    // Fill buffer
    async function fillBuffer() {
        if (isFillingBuffer) return; // Prevent concurrent fills
        isFillingBuffer = true;
        while (imageBuffer.length < BUFFER_SIZE) {
            const url = getRandomImageUrl();
            try {
                const img = await preloadImage(url);
                if (!imageBuffer.some(existingImg => existingImg.src === img.src)) {
                    imageBuffer.push(img);
                } else {
                    console.log('Duplicate image found, skipping:', img.src);
                }
            } catch (error) {
                console.error('Error preloading image for buffer:', error);
                // Optionally, add a small delay before retrying to avoid hammering the service
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        isFillingBuffer = false;
    }

    // --- Original Layer Setup (Adapted) ---
    const backgroundLayer1 = document.createElement('div');

    const layerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
        transition: 'opacity 1.5s linear',
        willChange: 'opacity'
    };


    Object.assign(backgroundLayer1.style, layerStyle);

    document.body.appendChild(backgroundLayer1);

    let currentImage = null; // Will hold the current Image object
    let isTransitioning = false; // Keep for fade in/out logic

    // Renamed from getMaskColor
    function getBackgroundStyle() {
        const isDark = document.body.classList.contains('dark-theme');
        // Re-added color property, retrieved from CSS variable or fallback
        const color = getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim() || (isDark ? '#000000' : '#FFFFFF');
        return {
            color: color,
            baseOpacity: isDark ? '0.85' : '0.75'
        };
    }

    // --- Combined Update and Transition Logic ---

    // Updates the single layer instantly (e.g., for theme change or initial setup)
    // Simplified - no longer needs bgLayer parameter
    function updateLayerInstantly(imageObj) {
        const { color, baseOpacity } = getBackgroundStyle(); // Get color and opacity

        // Temporarily disable transitions
        const originalBgTransition = backgroundLayer1.style.transition;
        backgroundLayer1.style.transition = 'none';

        backgroundLayer1.style.backgroundImage = `url('${imageObj.src}')`;
        backgroundLayer1.style.backgroundColor = color; // Apply theme color as background tint
        backgroundLayer1.style.opacity = baseOpacity;

        // Force reflow/repaint to apply changes immediately
        // eslint-disable-next-line no-unused-expressions
        backgroundLayer1.offsetHeight;

        // Restore transitions
        backgroundLayer1.style.transition = originalBgTransition;
    }



    // --- Theme and Resize Handling ---
    function handleThemeChange() {
        if (currentImage && !isTransitioning) {
            // Instantly update the *current* visible layer's opacity and background color tint
            // Only update if not currently fading, otherwise let the fade complete
            updateLayerInstantly(currentImage); // Use updated function
        } else if (currentImage) {
            // If transitioning, just update the target color for the fade-in
            const { color } = getBackgroundStyle();
            backgroundLayer1.style.backgroundColor = color;
        }
        // No need to update nextLayer anymore
    }

    // Debounced theme change listener
    let themeChangeTimeout;
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                clearTimeout(themeChangeTimeout);
                themeChangeTimeout = setTimeout(handleThemeChange, 100); // Debounce
            }
        });
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });



    // --- Initialization ---
    async function initializeBackgrounds() {
        await fillBuffer(); // Fill the buffer initially

        if (imageBuffer.length > 0) {
            currentImage = imageBuffer.shift(); // Get the first image
            updateLayerInstantly(currentImage); // Set initial background instantly (opacity and tint)

            // No need to set up backgroundLayer2

            // Start the interval timer to change background
            // setInterval(changeBackgroundImage, 10000); // Change every 10 seconds

            // Start filling buffer again for subsequent changes
            fillBuffer();
        } else {
            console.error('Failed to initialize background: Buffer is empty after initial fill attempt.');
            // Optionally display a default solid color background by setting it on the first layer
            const { color } = getBackgroundStyle(); // Only need color for fallback
            backgroundLayer1.style.backgroundImage = 'none'; // Remove any potential image
            backgroundLayer1.style.backgroundColor = color; // Use theme color as fallback
            backgroundLayer1.style.opacity = '1'; // Use full opacity for solid color
        }
    }

    // Expose necessary functions if needed, though interval handles changes now
    window.backgroundUtils = {
        getCurrentImage: () => currentImage ? currentImage.src : null,
        getBufferStatus: () => ({ size: imageBuffer.length, capacity: BUFFER_SIZE }),
        // forceChange might be less useful now or need adjustment depending on desired behavior during transition
        // forceChange: () => { ... }
    };

    // Start the process
    initializeBackgrounds();

})();

