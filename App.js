// Width Controller Component
const WidthController = ({
    initialWidth = 1200,
    minWidth = 900,
    maxWidth = 1600,
    step = 50,
    label = 'Width:',
    onChange,
    className = 'width-controller',
    showValue = true,
    unit = 'px'
}) => {
    const [width, setWidth] = React.useState(initialWidth);

    React.useEffect(() => {
        // Update parent state only when width changes
        if (onChange && width !== initialWidth) {
            onChange(width);
        }
    }, [width, onChange]);

    // Update local state if initialWidth prop changes from parent
    React.useEffect(() => {
        setWidth(initialWidth);
    }, [initialWidth]);


    const handleWidthChange = (e) => {
        setWidth(Number(e.target.value));
    };

    return (
        <div className={className}>
            <label htmlFor="width-range">{label}</label>
            <input
                type="range"
                id="width-range"
                min={minWidth}
                max={maxWidth}
                step={step}
                value={width}
                onChange={handleWidthChange}
            />
            {showValue && <span>{width}{unit}</span>}
        </div>
    );
};

// Add PropTypes for WidthController
WidthController.propTypes = {
    initialWidth: PropTypes.number,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    step: PropTypes.number,
    label: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    showValue: PropTypes.bool,
    unit: PropTypes.string
};

// Settings Panel Component - Returns only the content for the modal
const SettingsPanel = ({
    dashboardWidth = 1200,
    onWidthChange,
    zoomLevel = 'medium',
    onZoomLevelChange
}) => {

    // Viewport options
    const viewportOptions = [
        { id: 'desktop', name: 'Desktop', icon: 'fas fa-desktop', width: 1200 },
        { id: 'tablet', name: 'Tablet', icon: 'fas fa-tablet-alt', width: 900 }
    ];

    // Local state for zoom level
    const [selectedZoomLevel, setSelectedZoomLevel] = React.useState(zoomLevel);

    // Update parent state only when local state actually changes
    React.useEffect(() => {
        if (selectedZoomLevel !== zoomLevel && onZoomLevelChange) {
            onZoomLevelChange(selectedZoomLevel);
        }
    }, [selectedZoomLevel, zoomLevel, onZoomLevelChange]);

    // Update local state if zoomLevel prop changes from parent
    React.useEffect(() => {
        setSelectedZoomLevel(zoomLevel);
    }, [zoomLevel]);

    // Handle viewport preset selection
    const handleViewportSelect = (width) => {
        if (onWidthChange) {
            onWidthChange(width);
        }
    };

    // Reset settings
    const handleReset = () => {
        console.log("Resetting settings...");
        if (onWidthChange) onWidthChange(1200);
        if (onZoomLevelChange) onZoomLevelChange('medium'); // Reset zoom level
    };

    // Return only the inner content for the modal body and footer
    return (
        <React.Fragment>
            <div className="modal-body settings-modal-body">
                <section className="modal-section">
                    <h4 className="section-heading">Layout</h4>
                    <div className="setting-item">
                        <div className="setting-label">Dashboard Width</div>
                        <div className="setting-control">
                            <WidthController
                                initialWidth={dashboardWidth}
                                minWidth={480}
                                maxWidth={2000}
                                step={10}
                                onChange={onWidthChange}
                                className="width-controller"
                            />
                        </div>
                    </div>
                    <div className="setting-item">
                        <div className="setting-label">Browser Badges</div>
                        <div className="setting-control link-items">
                            {viewportOptions.map(option => (
                                <button
                                    key={option.id}
                                    className={`viewport-button ${dashboardWidth === option.width ? 'active' : ''}`}
                                    onClick={() => handleViewportSelect(option.width)}
                                    title={`${option.name} (${option.width}px)`}
                                >
                                    <i className={option.icon}></i>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <div className="modal-footer">
                <button className="cancel-btn-n modal-close  " onClick={handleReset} title="Reset">
                    <i className="fas fa-undo"></i>
                </button>
            </div>
        </React.Fragment>
    );
};

// SettingsPanel PropTypes (Updated)
SettingsPanel.propTypes = {
    dashboardWidth: PropTypes.number,
    onWidthChange: PropTypes.func,
    zoomLevel: PropTypes.string,
    onZoomLevelChange: PropTypes.func
};

// Define wallpapers (replace URLs with your actual paths/URLs)
const wallpapers = [
    'https://source.unsplash.com/random/1920x1080?nature,water',
    'https://source.unsplash.com/random/1920x1080?nature,forest',
    'https://source.unsplash.com/random/1920x1080?nature,mountain',
    'https://source.unsplash.com/random/1920x1080?city,night',
    'https://source.unsplash.com/random/1920x1080?space,stars',
    'https://source.unsplash.com/random/1920x1080?abstract,color',
    'https://source.unsplash.com/random/1920x1080?technology,code',
    'https://source.unsplash.com/random/1920x1080?minimalist,white',
    'https://source.unsplash.com/random/1920x1080?texture,pattern',
    'https://source.unsplash.com/random/1920x1080?ocean,beach'
];

// Inject CSS for custom wallpaper class and CSS variable
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
  .custom-wallpaper {
    background-image: var(--bg-url) !important;
    background-size: cover !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
    background-attachment: fixed !important;
  }
`;
    document.head.appendChild(style);
}

// App Component
const App = () => {
    // Load settings from localStorage or use defaults
    const initialSettings = React.useMemo(() => loadSettings(), []);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isAddonsModalOpen, setIsAddonsModalOpen] = React.useState(false);
    const [isSettingsPanelOpen, setIsSettingsPanelOpen] = React.useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [lastMinute, setLastMinute] = React.useState(date.getMinutes());
    const [showMinuteEffect, setShowMinuteEffect] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    // Use ThemeContext which now handles its own state loading/saving
    const { isDarkTheme, toggleTheme } = React.useContext(ThemeContext);

    // Initialize states from loaded settings - use zoomLevel now
    const [zoomLevel, setZoomLevel] = React.useState(initialSettings.zoomLevel);
    const [dashboardWidth, setDashboardWidth] = React.useState(initialSettings.dashboardWidth);
    const [isAnimationEnabled,] = React.useState(initialSettings.isAnimationEnabled);

    // Add state for selected wallpaper
    const [selectedWallpaper, setSelectedWallpaper] = React.useState(
        () => localStorage.getItem('selectedWallpaper') || wallpapers[0]
    );

    // Zoom multipliers mapping (renamed from uiScaleMultipliers)
    const zoomMultipliers = {
        'small': 0.9,
        'medium': 1,
        'large': 1.1
    };

    // Function to toggle password modal
    const togglePasswordModal = () => {
        setIsPasswordModalOpen(!isPasswordModalOpen);
    };

    // Function to handle password submission
    const handlePasswordSubmit = (password) => {
        console.log("Password submitted:", password);
        // Add your password verification logic here
    };

    // Update time using setInterval (once per second)
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            const newDate = new Date();
            setDate(newDate);

            // Check for minute change to trigger effect
            if (newDate.getMinutes() !== lastMinute) {
                setLastMinute(newDate.getMinutes());
                setShowMinuteEffect(true);
                setTimeout(() => setShowMinuteEffect(false), 1000);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [lastMinute]);

    // Function to toggle settings panel
    const toggleSettingsPanel = () => {
        setIsSettingsPanelOpen(!isSettingsPanelOpen);
    };

    // Apply zoom multiplier to the root element
    React.useEffect(() => {
        const multiplier = zoomMultipliers[zoomLevel] || 1;
        document.documentElement.style.setProperty('--zoom-multiplier', multiplier);
    }, [zoomLevel]);

    // Add/Remove class for disabling animations
    React.useEffect(() => {
        const appElement = document.querySelector('.app');
        if (appElement) {
            if (isAnimationEnabled) {
                appElement.classList.remove('animations-disabled');
            } else {
                appElement.classList.add('animations-disabled');
            }
        }
    }, [isAnimationEnabled]);

    // Function to handle wallpaper change: update only CSS var and persist
    const handleWallpaperChange = React.useCallback((wallpaperUrl) => {
        setSelectedWallpaper(prev => {
            if (prev === wallpaperUrl) return prev;
            // Update CSS variable for background
            document.documentElement.style.setProperty('--bg-url', `url('${wallpaperUrl}')`);
            // Persist asynchronously
            if (window.requestIdleCallback) {
                window.requestIdleCallback(() => localStorage.setItem('selectedWallpaper', wallpaperUrl));
            } else {
                setTimeout(() => localStorage.setItem('selectedWallpaper', wallpaperUrl), 200);
            }
            return wallpaperUrl;
        });
    }, []);

    // On mount: hide any legacy background layer and add custom wallpaper class
    React.useEffect(() => {
        const bgLayer1 = document.querySelector('body > div[style*="z-index: -1"]');
        if (bgLayer1) {
            bgLayer1.style.backgroundImage = '';
            bgLayer1.style.opacity = '0';
            bgLayer1.style.pointerEvents = 'none';
        }
        // Activate CSS-based wallpaper
        document.body.classList.add('custom-wallpaper');
        document.documentElement.style.setProperty('--bg-url', `url('${selectedWallpaper}')`);
    }, []);

    // useEffect to save settings whenever relevant states change (selectedWallpaper persisted in handler)
    React.useEffect(() => {
        const settingsToSave = {
            isDarkTheme: isDarkTheme,
            zoomLevel,
            dashboardWidth,
            isAnimationEnabled,
            // selectedWallpaper is saved in its own effect via localStorage
        };
        saveSettings(settingsToSave);
    }, [isDarkTheme, zoomLevel, dashboardWidth, isAnimationEnabled]);

    // Function to toggle mobile menu
    const handleToggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close mobile menu on resize if screen is larger
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    const rawDate = date.toLocaleDateString('pl-PL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const formattedDate = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return (
        <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'} ${!isAnimationEnabled ? 'animations-disabled' : ''}`}>
            <header className={`header ${isMobileMenuOpen ? 'menu-open' : ''}`}>
                <div className="logo">
                    <span className="logo-icon">
                        <i className="fas fa-cube"></i>
                    </span>
                    <span className="logo-text">VeniceOS</span>
                </div>
                <div className="user-controls">
                    <button className="control-btn" title="Toggle theme" onClick={toggleTheme}>
                        <i className={`fas fa-${isDarkTheme ? 'sun' : 'moon'}`}></i>
                    </button>
                    <button className="mobile-menu-toggle" title="Toggle menu" onClick={handleToggleMobileMenu}>
                        <i className={`fas fa-${isMobileMenuOpen ? 'times' : 'bars'}`}></i>
                    </button>
                    <div className="dropdown desktop-only">
                        <button className="control-btn" title="Addons" onClick={() => setIsAddonsModalOpen(true)}>
                            <i className="fas fa-puzzle-piece"></i>
                        </button>
                    </div>
                    <button className="control-btn desktop-only" title="Open Modal" onClick={() => setIsModalOpen(true)}>
                        <i className="fas fa-window-maximize"></i>
                    </button>
                </div>
            </header>

            <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={handleToggleMobileMenu}>
                <div className="mobile-menu-header">
                    <h2>Menu</h2>
                </div>
                <div className="mobile-nav-links">
                    <button className="mobile-nav-item" onClick={() => { setIsModalOpen(true); handleToggleMobileMenu(); }}>
                        <i className="fas fa-window-maximize"></i>
                        <span>Login Form</span>
                    </button>
                    <button className="mobile-nav-item" onClick={() => { setIsAddonsModalOpen(true); handleToggleMobileMenu(); }}>
                        <i className="fas fa-puzzle-piece"></i>
                        <span>Dodatki</span>
                    </button>
                    <button className="mobile-nav-item" onClick={() => window.open('https://w5e.carrd.co/', '_blank')}>
                        <i className="fas fa-triangle-exclamation"></i>
                        <span>Na Ewakuacje</span>
                    </button>
                </div>
            </MobileMenu>

            <main className="dashboard">
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Login Form">
                    <iframe
                        src="login.html"
                        className="modal-iframe"
                        title="Login Form"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </Modal>
                <Modal isOpen={isAddonsModalOpen} onClose={() => setIsAddonsModalOpen(false)} title="Dodatki">
                    <Addons />
                </Modal>

                <Modal isOpen={isSettingsPanelOpen} onClose={toggleSettingsPanel} title="Settings" wallpapers={wallpapers} selectedWallpaper={selectedWallpaper} onWallpaperChange={handleWallpaperChange}>
                    <SettingsPanel
                        dashboardWidth={dashboardWidth}
                        onWidthChange={setDashboardWidth}
                        zoomLevel={zoomLevel}
                        onZoomLevelChange={setZoomLevel}
                    />
                </Modal>

                <PasswordModal
                    isOpen={isPasswordModalOpen}
                    onClose={togglePasswordModal}
                    onSubmit={handlePasswordSubmit}
                />

                <div className="dashboard-container" style={{ maxWidth: `${dashboardWidth}px` }}>
                    <div className="date-time-display">
                        <div className="date-display">
                            <i className="fas fa-calendar-alt"></i>
                            <span id="current-date">{formattedDate}</span>
                        </div>
                        <div className="digital-clock-container">
                            <div className={`time-display ${showMinuteEffect ? 'minute-change' : ''}`}>
                                <div className="time-text">{hours}:{minutes}:{seconds}</div>
                                <div className="time-controls">
                                    <button
                                        className="time-control-btn"
                                        title="Settings"
                                        onClick={toggleSettingsPanel}
                                    >
                                        <i className="fas fa-cog fa-lg"></i>
                                    </button>
                                    <button className="time-control-btn" title="Password" onClick={togglePasswordModal}>
                                        <i className="fas fa-lock fa-lg"></i>
                                    </button>
                                    <button className="time-control-btn" title="Folder">
                                        <i className="fas fa-folder fa-lg"></i>
                                    </button>
                                    <button className="time-control-btn" title="Na Ewakuacjie" onClick={() => window.open('https://w5e.carrd.co/', '_blank')}>
                                        <i className="fas fa-triangle-exclamation fa-lg "></i>
                                    </button>
                                    <div id="login-button-container" style={{ display: 'inline-block' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-content">
                        <DashboardLinks />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

// Assume ThemeProvider, LEDDigit, DashboardLinks, Footer, Modal, Addons, MobileMenu are defined elsewhere or globally

// Render the App component (ensure ThemeProvider wraps App if context is used heavily)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
); 