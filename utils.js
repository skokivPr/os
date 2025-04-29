/**
 * Utility functions for Venice Radio Player
 */

// Show toast notification
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${getIconForType(type)}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to container
    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 3000);
}

// Helper to get the appropriate icon for toast type
function getIconForType(type) {
    switch (type) {
        case 'success':
            return 'fa-check-circle';
        case 'error':
            return 'fa-exclamation-circle';
        case 'warning':
            return 'fa-exclamation-triangle';
        case 'info':
        default:
            return 'fa-info-circle';
    }
}

// Format time (for future use with song duration, etc.)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Throttle function to limit how often a function can be called
function throttle(callback, delay = 200) {
    let isThrottled = false;

    return function (...args) {
        if (isThrottled) return;

        isThrottled = true;
        callback.apply(this, args);

        setTimeout(() => {
            isThrottled = false;
        }, delay);
    };
}

// Export utilities to global scope
window.showToast = showToast;
window.formatTime = formatTime;
window.throttle = throttle; 