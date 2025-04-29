// Background Changer
const setRandomBackground = () => {
    const bgGradients = ['bg-gradient-1', 'bg-gradient-2', 'bg-gradient-3', 'bg-gradient-4', 'bg-gradient-5'];
    const randomIndex = Math.floor(Math.random() * bgGradients.length);
    const selectedGradient = bgGradients[randomIndex];

    // Remove any existing bg classes
    document.body.classList.remove(...bgGradients);

    // Add the new background class
    document.body.classList.add(selectedGradient);

    // Save the current background preference
    localStorage.setItem('currentBackground', selectedGradient);
};
