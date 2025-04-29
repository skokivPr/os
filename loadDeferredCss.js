// Deferred CSS Loader - handles loading of CSS with data-defer="true" attribute
document.addEventListener('DOMContentLoaded', function () {
    console.log('Deferred CSS loader initialized');

    // Find all stylesheet links with data-defer="true"
    const deferredStylesheets = document.querySelectorAll('link[rel="stylesheet"][data-defer="true"]');

    // For each deferred stylesheet
    deferredStylesheets.forEach(function (stylesheet) {
        // Get the URL but don't load it yet
        const href = stylesheet.getAttribute('href');

        // Temporarily disable this stylesheet by setting rel to "preload"
        stylesheet.setAttribute('rel', 'preload');
        stylesheet.setAttribute('as', 'style');

        // Add onload handler to ensure the stylesheet is processed correctly
        // when it gets re-enabled
        stylesheet.setAttribute('onload', 'this.onload=null;this.rel="stylesheet"');

        console.log('Deferred CSS:', href);
    });

    // Load deferred stylesheets after page is fully loaded
    window.addEventListener('load', function () {
        console.log('Page loaded, activating deferred stylesheets');

        // Short delay to prioritize other critical resources
        setTimeout(function () {
            deferredStylesheets.forEach(function (stylesheet) {
                // Re-enable the stylesheet by setting rel back to "stylesheet"
                stylesheet.setAttribute('rel', 'stylesheet');
            });
        }, 100);
    });
}); 