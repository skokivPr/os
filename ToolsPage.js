// Import Addons component
const { Addons } = window;

// Tools data organized by numbered categories
const allTools = {
    "1": [
        { name: 'IMGPRO', icon: 'fas fa-image', color: 'var(--success)', link: 'https://imgpro.carrd.co' },
        { name: 'IMGADD', icon: 'fas fa-camera', color: 'var(--warning)', link: 'https://imgadd.carrd.co' },
        { name: 'TEXTIMG', icon: 'fas fa-file-image', color: 'var(--warning)', link: 'https://textimg.carrd.co' },
        { name: 'ZOOMFRAME', icon: 'fas fa-search-plus', color: 'var(--info)', link: 'https://zoomframe.carrd.co' },
        { name: 'Pixlr BG Remove', icon: 'fas fa-eraser', color: 'var(--purple)', link: 'https://pixlr.com/pl/remove-background' },
        { name: 'StockSnap', icon: 'fas fa-images', color: 'var(--highlight-blue)', link: 'https://stocksnap.io' },
        { name: 'Pixabay', icon: 'fas fa-photo-video', color: 'var(--success)', link: 'https://pixabay.com' },
        { name: 'Canva', icon: 'fas fa-palette', color: 'var(--info)', link: 'https://www.canva.com/pl_pl' },
        { name: 'Unsplash', icon: 'fas fa-camera-retro', color: 'var(--highlight-blue)', link: 'https://unsplash.com' },
        { name: 'Pexels', icon: 'fas fa-images', color: 'var(--success)', link: 'https://www.pexels.com/pl-pl' },
        { name: 'Fotor', icon: 'fas fa-photo-film', color: 'var(--warning)', link: 'https://www.fotor.com' },
        { name: 'Shots.so', icon: 'fas fa-mobile-screen', color: 'var(--purple)', link: 'https://shots.so' },
        { name: 'DeviantArt', icon: 'fab fa-deviantart', color: 'var(--highlight-orange)', link: 'https://www.deviantart.com' },
    ],
    "2": [
        { name: 'TOOLSDEV', icon: 'fas fa-tools', color: 'var(--info)', link: 'https://toolsdev.carrd.co' },
        { name: 'LIVECODE', icon: 'fas fa-code', color: 'var(--danger)', link: 'https://livecode.carrd.co' },
        { name: 'EDYTORVS', icon: 'fas fa-edit', color: 'var(--info)', link: 'https://edytor.carrd.co' },
        { name: 'MARKDOWN', icon: 'fas fa-file-alt', color: 'var(--warning)', link: 'https://mdcode.carrd.co' },
        { name: 'MOTABLE', icon: 'fas fa-table', color: 'var(--info)', link: 'https://mdtable.carrd.co' },
        { name: 'INCSVDEV', icon: 'fas fa-file-csv', color: 'var(--success)', link: 'https://incsvdev.carrd.co' },
        { name: 'WEBTOOLS', icon: 'fas fa-globe', color: 'var(--highlight-orange)', link: 'https://webtoolsdev.carrd.co' },
        { name: 'GitHub', icon: 'fab fa-github', color: 'var(--purple)', link: 'https://github.com' },
        { name: 'JSDelivr', icon: 'fas fa-bolt', color: 'var(--highlight-orange)', link: 'https://www.jsdelivr.com/github' },
        { name: 'W5E', icon: 'fas fa-triangle-exclamation fa-lg', color: 'var(--danger)', link: 'https://w5e.carrd.co' },
        { name: 'jQuery UI', icon: 'fab fa-js', color: 'var(--highlight-blue)', link: 'https://jqueryui.com' },
        { name: 'jQuery Scripts', icon: 'fab fa-js-square', color: 'var(--highlight-blue)', link: 'https://www.jqueryscript.net' },
        { name: 'CodePen', icon: 'fab fa-codepen', color: 'var(--warning)', link: 'https://codepen.io/pen' },
        { name: 'CodePen Trending', icon: 'fab fa-codepen', color: 'var(--highlight-blue)', link: 'https://codepen.io/trending' },
        { name: 'JSFiddle', icon: 'fas fa-code', color: 'var(--info)', link: 'https://jsfiddle.net' },
        { name: 'W3Schools', icon: 'fas fa-graduation-cap', color: 'var(--success)', link: 'https://www.w3schools.com' },
        { name: 'OneCompiler', icon: 'fas fa-laptop-code', color: 'var(--warning)', link: 'https://onecompiler.com/html' },
        { name: 'FreeCodez', icon: 'fas fa-code', color: 'var(--danger)', link: 'https://freecodez.com/create/html' },
        { name: 'IT-Tools', icon: 'fas fa-toolbox', color: 'var(--highlight-blue)', link: 'https://it-tools.tech' },
        { name: 'AllInOne Tools', icon: 'fas fa-tools', color: 'var(--purple)', link: 'https://allinone.tools' },
    ],
    "3": [
        { name: 'ARKUSZ', icon: 'fas fa-table', color: 'var(--success)', link: 'https://arkusz.carrd.co' },
        { name: 'CODENOTE', icon: 'fas fa-sticky-note', color: 'var(--highlight-blue)', link: 'https://codenote.carrd.co' },
        { name: 'TEXTMOD', icon: 'fas fa-font', color: 'var(--warning)', link: 'https://modifier.carrd.co' },
        { name: 'EDYTORTXT', icon: 'fas fa-file-word', color: 'var(--info)', link: 'https://edytortxt.carrd.co' },
        { name: 'TXTPRO', icon: 'fas fa-file-alt', color: 'var(--purple)', link: 'https://txtpro.carrd.co' },
        { name: 'Imperavi', icon: 'fas fa-pen-fancy', color: 'var(--danger)', link: 'https://imperavi.com' },
        { name: 'README.so', icon: 'fas fa-book', color: 'var(--highlight-blue)', link: 'https://readme.so/editor' },
        { name: 'Cool Symbols', icon: 'fas fa-icons', color: 'var(--highlight-orange)', link: 'https://coolsymbol.com' },
        { name: 'Whiteboard', icon: 'fas fa-chalkboard', color: 'var(--info)', link: 'https://www.tutorialspoint.com/whiteboard.htm' },
    ],
    "4": [
        { name: 'PANEL', icon: 'fas fa-columns', color: 'var(--danger)', link: 'https://logowanie.carrd.co/' },
        { name: 'TASKDAY', icon: 'fas fa-calendar-day', color: 'var(--purple)', link: 'https://taskday.carrd.co' },
        { name: 'W5OS', icon: 'fas fa-cube', color: 'var(--highlight-orange)', link: 'https://w5os.carrd.co' },
        { name: 'LazyWeb', icon: 'fas fa-rocket', color: 'var(--highlight-blue)', link: 'https://app.lazyweb.rocks' },
    ],
    "5": [
        { name: 'TOOLSLINK', icon: 'fas fa-link', color: 'var(--success)', link: 'https://toolslink.carrd.co' },
        { name: 'TOOLSLINK1', icon: 'fas fa-external-link-alt', color: 'var(--success)', link: 'https://toolslinki.carrd.co' },
        { name: 'HTML Cheatsheet', icon: 'fab fa-html5', color: 'var(--danger)', link: 'https://htmlcheatsheet.com' },
        { name: 'Free Code Tools', icon: 'fas fa-code', color: 'var(--highlight-blue)', link: 'https://freecodetools.org' },
        { name: 'Free Frontend', icon: 'fas fa-laptop-code', color: 'var(--info)', link: 'https://freefrontend.com' },
        { name: 'CodeHim', icon: 'fas fa-code', color: 'var(--purple)', link: 'https://www.codehim.com' },
    ],
    "6": [
        { name: 'W5UI', icon: 'fas fa-desktop', color: 'var(--danger)', link: 'https://w5ui.carrd.co' },
        { name: 'UNIVERSAL', icon: 'fas fa-play', color: 'var(--highlight-orange)', link: 'https://uniwersalplay.carrd.co' },
        { name: 'UIverse', icon: 'fas fa-th', color: 'var(--highlight-blue)', link: 'https://uiverse.io/elements' },
        { name: 'Animista', icon: 'fas fa-film', color: 'var(--warning)', link: 'https://animista.net' },
        { name: 'Phosphor Icons', icon: 'fas fa-icons', color: 'var(--success)', link: 'https://phosphoricons.com' },
        { name: 'CSS Box Shadow', icon: 'fas fa-square', color: 'var(--highlight-blue)', link: 'https://www.minimamente.com/cssboxshadow' },
        { name: 'CSS Portal', icon: 'fab fa-css3-alt', color: 'var(--highlight-blue)', link: 'https://www.cssportal.com' },
        { name: 'Angry Tools', icon: 'fas fa-hammer', color: 'var(--danger)', link: 'https://angrytools.com' },
        { name: 'CodeMyUI', icon: 'fas fa-paint-brush', color: 'var(--purple)', link: 'https://codemyui.com' },
        { name: 'Neumorphism.io', icon: 'fas fa-square', color: 'var(--warning)', link: 'https://neumorphism.io/#e0e0e0' },
        { name: 'Neumorphic Design', icon: 'fas fa-layer-group', color: 'var(--highlight-blue)', link: 'https://neumorphic.design' },
        { name: 'CSS Scan Shadows', icon: 'fas fa-clone', color: 'var(--highlight-orange)', link: 'https://getcssscan.com/css-box-shadow-examples' },
        { name: 'CSS 3D Buttons', icon: 'fas fa-cube', color: 'var(--success)', link: 'https://csspro.com/css-3d-buttons' },
        { name: 'CSS Gradients', icon: 'fas fa-fill-drip', color: 'var(--info)', link: 'https://csspro.com/css-gradients' },
        { name: 'Buttons Generator', icon: 'fas fa-toggle-on', color: 'var(--warning)', link: 'https://markodenic.com/tools/buttons-generator' },
        { name: 'Glassmorphism', icon: 'fas fa-glass-martini', color: 'var(--highlight-blue)', link: 'https://markodenic.com/tools/glassmorphism-css-generator' },
        { name: 'Web Gradients', icon: 'fas fa-paint-roller', color: 'var(--purple)', link: 'https://webgradients.com' },
        { name: 'Shadow Palette', icon: 'fas fa-moon', color: 'var(--warning)', link: 'https://www.joshwcomeau.com/shadow-palette' },
        { name: 'Nav Generator', icon: 'fas fa-bars', color: 'var(--info)', link: 'https://wweb.dev/resources/navigation-generator' },
        { name: 'Hover Effects', icon: 'fas fa-hand-pointer', color: 'var(--highlight-orange)', link: 'https://wweb.dev/resources/creative-hover-effects' },
        { name: 'Poco Loco', icon: 'fas fa-wind', color: 'var(--success)', link: 'https://pocoloco.io' },
        { name: 'Transparent Textures', icon: 'fas fa-chess-board', color: 'var(--highlight-blue)', link: 'https://www.transparenttextures.com' },
        { name: 'Trianglify', icon: 'fas fa-shapes', color: 'var(--warning)', link: 'https://trianglify.io' },
        { name: 'Naker.io', icon: 'fas fa-cubes', color: 'var(--purple)', link: 'http://back.naker.io' },
        { name: 'Gradient Animator', icon: 'fas fa-palette', color: 'var(--danger)', link: 'https://www.gradient-animator.com' },
        { name: 'Glass UI', icon: 'fas fa-border-style', color: 'var(--highlight-blue)', link: 'https://www.toptal.com/developers/css3maker/examples/border-glass-ui' },
        { name: 'Scrollbar App', icon: 'fas fa-scroll', color: 'var(--success)', link: 'https://scrollbar.app' },
        { name: 'UI Buttons', icon: 'fas fa-toggle-on', color: 'var(--info)', link: 'https://ui-buttons.web.app' },
        { name: 'Glass Morphism', icon: 'fas fa-glasses', color: 'var(--purple)', link: 'https://www.diablodesign.eu/generator/Glass-Morphism-Generator' },
        { name: '3D Book', icon: 'fas fa-book', color: 'var(--highlight-orange)', link: 'https://scastiel.dev/3dbook' },
        { name: 'Flexer', icon: 'fas fa-grip-horizontal', color: 'var(--highlight-blue)', link: 'https://www.flexer.dev' },
        { name: 'GGradient', icon: 'fas fa-brush', color: 'var(--success)', link: 'https://ggradient.com' },
        { name: 'Box Shadows', icon: 'fas fa-square-full', color: 'var(--purple)', link: 'https://boxshadows.xyz' },
        { name: 'Animated BG', icon: 'fas fa-film', color: 'var(--warning)', link: 'https://wweb.dev/resources/animated-css-background-generator' },
        { name: 'Tint Mint', icon: 'fas fa-palette', color: 'var(--highlight-orange)', link: 'https://tintmint.net' },
        { name: 'Bootstrap Icons', icon: 'fab fa-bootstrap', color: 'var(--purple)', link: 'https://icons.getbootstrap.com/#install' },
        { name: 'Tabler Icons', icon: 'fas fa-icons', color: 'var(--info)', link: 'https://tablericons.com' },
        { name: 'JS.org Icons', icon: 'fas fa-icons', color: 'var(--highlight-orange)', link: 'https://icones.js.org' },
        { name: 'Materialize CSS', icon: 'fas fa-layer-group', color: 'var(--highlight-blue)', link: 'https://materializecss.com' },
    ],
    "7": [
        { name: 'Tools Nue', icon: 'fas fa-wrench', color: 'var(--info)', link: 'https://toolsnue.carrd.co' },
        { name: 'Tools Nue Dev', icon: 'fas fa-code-branch', color: 'var(--info)', link: 'https://toolsnuedev.carrd.co' },
        { name: 'Sites W5', icon: 'fas fa-sitemap', color: 'var(--success)', link: 'https://sitesw5.carrd.co' },
        { name: 'Trumbowyg Editor', icon: 'fas fa-edit', color: 'var(--purple)', link: 'https://alex-d.github.io/Trumbowyg' },
        { name: 'Table Org', icon: 'fas fa-table', color: 'var(--info)', link: 'https://tableorg.carrd.co' },
        { name: 'Three.js', icon: 'fas fa-cubes', color: 'var(--highlight-blue)', link: 'https://threejs.org' },
        { name: 'fullPage.js', icon: 'fas fa-pager', color: 'var(--highlight-orange)', link: 'https://alvarotrigo.com/fullPage' },
        { name: 'UIkit', icon: 'fas fa-layer-group', color: 'var(--success)', link: 'https://getuikit.com/docs/introduction' },
        { name: 'UI Panel', icon: 'fas fa-window-maximize', color: 'var(--purple)', link: 'https://uipanel.carrd.co' },
        { name: 'Sumo Paint', icon: 'fas fa-paint-brush', color: 'var(--warning)', link: 'https://paint.sumo.app/?lang=pl' },
        { name: 'FastWebSR', icon: 'fas fa-tachometer-alt', color: 'var(--danger)', link: 'https://fastwebsr.carrd.co' },
        { name: 'Web Dev CRD', icon: 'fas fa-globe', color: 'var(--info)', link: 'https://webdev.crd.co' },
        { name: 'Penpot Design', icon: 'fas fa-drafting-compass', color: 'var(--pink)', link: 'https://design.penpot.app/#/auth/login' },
        { name: 'Pranx', icon: 'fas fa-laugh-squint', color: 'var(--warning)', link: 'https://pranx.com' },
        { name: 'Figma', icon: 'fab fa-figma', color: 'var(--purple)', link: 'https://www.figma.com' },
        { name: 'Webflow Templates', icon: 'fas fa-window-restore', color: 'var(--highlight-blue)', link: 'https://webflow.com/templates' },
        { name: 'Codrops', icon: 'fas fa-code', color: 'var(--highlight-orange)', link: 'https://tympanus.net/codrops' },
        { name: 'Xmple Wallpaper', icon: 'fas fa-image', color: 'var(--success)', link: 'https://xmple.com/wallpaper' },
        { name: 'iFrame Demo', icon: 'fas fa-window-maximize', color: 'var(--info)', link: 'https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_element_iframe' },
    ]
};

// Filter tools to exclude carrd.co links
const filterNonCarrdLinks = (toolsObj) => {
    const filteredTools = {};

    Object.keys(toolsObj).forEach(category => {
        const filteredCategory = toolsObj[category].filter(item =>
            !item.link || !item.link.includes('carrd.co')
        );

        if (filteredCategory.length > 0) {
            filteredTools[category] = filteredCategory;
        }
    });

    return filteredTools;
};

// Create filtered tools object
const tools = filterNonCarrdLinks(allTools);

// Make tools available globally
window.tools = tools;

// Theme Context - Defined here to be accessible by components below and potentially by App.js if loaded first.
const ThemeContext = React.createContext(null);

// Inject CSS for disabling transitions during theme switch
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
.disable-theme-transition *, .disable-theme-transition *::before, .disable-theme-transition *::after {
    transition: none !important;
    animation: none !important;
}`;
    document.head.appendChild(style);

    // Add URL preview tooltip styles
    const tooltipStyle = document.createElement('style');
    tooltipStyle.textContent = `
.url-preview {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 6px 12px;
    z-index: 100;
    font-size: 12px;
    white-space: nowrap;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.url-preview::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid var(--border-color);
}

.url-preview::after {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid var(--bg-secondary);
}

.link-item {
    position: relative;
}
`;
    document.head.appendChild(tooltipStyle);
}

// Define localStorage key for settings
const SETTINGS_KEY = 'dashboardAppSettings';

// Helper function to load settings
const loadSettings = () => {
    try {
        const savedSettings = localStorage.getItem(SETTINGS_KEY);
        if (savedSettings) {
            // Ensure new settings have defaults if loading old data
            const parsed = JSON.parse(savedSettings);
            return {
                isDarkTheme: parsed.isDarkTheme !== undefined ? parsed.isDarkTheme : true,
                zoomLevel: parsed.zoomLevel || 'medium', // Renamed from uiScale
                dashboardWidth: parsed.dashboardWidth || 1200,
                isAnimationEnabled: parsed.isAnimationEnabled !== undefined ? parsed.isAnimationEnabled : true
            };
        }
    } catch (error) {
        console.error("Error loading settings from localStorage:", error);
    }
    // Return default settings if nothing saved or error occurs
    return { isDarkTheme: true, zoomLevel: 'medium', dashboardWidth: 1200, isAnimationEnabled: true }; // Renamed key in default
};

// Helper function to save settings
const saveSettings = (settings) => {
    try {
        // Make sure all expected keys are present before saving
        const settingsToSave = {
            isDarkTheme: settings.isDarkTheme,
            zoomLevel: settings.zoomLevel, // Renamed from uiScale
            dashboardWidth: settings.dashboardWidth,
            isAnimationEnabled: settings.isAnimationEnabled
        };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsToSave));
    } catch (error) {
        console.error("Error saving settings to localStorage:", error);
    }
};

const ThemeProvider = ({ children }) => {
    // Load initial theme from settings or use default
    const [isDarkTheme, setIsDarkTheme] = React.useState(() => {
        const savedSettings = loadSettings();
        return savedSettings.isDarkTheme; // Default is handled in loadSettings
    });

    // Apply theme class to body on mount and when theme changes, disabling transitions briefly
    React.useEffect(() => {
        document.body.classList.add('disable-theme-transition');
        document.body.classList.toggle('light-theme', !isDarkTheme);
        document.body.classList.toggle('dark-theme', isDarkTheme);
        const timeoutId = setTimeout(() => {
            document.body.classList.remove('disable-theme-transition');
        }, 0);
        return () => clearTimeout(timeoutId);
    }, [isDarkTheme]);

    const toggleTheme = React.useCallback(() => {
        setIsDarkTheme(prev => {
            const newThemeState = !prev;
            // Save the new theme setting along with other settings
            const currentSettings = loadSettings();
            saveSettings({ ...currentSettings, isDarkTheme: newThemeState });
            return newThemeState;
        });
    }, []);

    // Memoize the context value so it doesn't change on every render
    const contextValue = React.useMemo(() => ({ isDarkTheme, toggleTheme }), [isDarkTheme, toggleTheme]);

    return (
        // Provide both state and toggle function
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};

// Helper Hook for Icon Styles
const useIconStyle = (color, isHovered) => {
    const colorVarName = color.replace('var(', '').replace(')', '');
    const shadowVar = `var(--box-shadow${colorVarName.replace('--', '-')})`;

    const style = React.useMemo(() => {
        if (isHovered) {
            return {
                backgroundColor: color,
                boxShadow: `0 6px 20px ${color}, 0 0 30px ${color}, 0 0 50px ${color}`
            };
        }
        return {
            backgroundColor: color,
            boxShadow: shadowVar
        };
    }, [isHovered, color, shadowVar]);

    return style;
};

// Link Icon Component
const LinkIcon = React.memo(({ color, icon }) => {
    const style = {
        backgroundColor: color,
        boxShadow: `0 4px 12px ${color}, 0 0 20px ${color}80`
    };

    return (
        <div className="link-icon" style={style}>
            <i className={icon}></i>
            <div className="link-icon-light icon-glow" style={{ backgroundColor: color }}></div>
        </div>
    );
});

LinkIcon.propTypes = {
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

// Link Item Component with URL Preview
const LinkItem = React.memo(({ name, icon, color, link }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [showPreview, setShowPreview] = React.useState(false);
    const colorVarName = color.replace('var(', '').replace(')', '');
    const iconStyle = useIconStyle(color, isHovered);
    const previewRef = React.useRef(null);

    // Timer for delayed preview show/hide
    const timerRef = React.useRef(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        // Show preview after a short delay
        timerRef.current = setTimeout(() => {
            setShowPreview(true);
        }, 400); // 400ms delay before showing preview
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Clear timeout if it exists
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        setShowPreview(false);
    };

    const handleClick = (e) => {
        if (link) {
            e.preventDefault();
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    // Format the link URL for display
    const getDisplayUrl = (url) => {
        if (!url) return "";
        try {
            // Remove protocol
            let displayUrl = url.replace(/^https?:\/\//, '');
            // Truncate if too long
            if (displayUrl.length > 30) {
                displayUrl = displayUrl.substring(0, 27) + '...';
            }
            return displayUrl;
        } catch (error) {
            return url;
        }
    };

    return (
        <button
            type="button"
            className="link-item hover-lift transition-all"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-color={colorVarName.replace('--', '')}
            onClick={handleClick}
            style={{ cursor: link ? 'pointer' : 'default' }}
            aria-label={`Open ${name}`}
        >
            <div className="link-icon" style={iconStyle}>
                <i className={icon} aria-hidden="true"></i>
                <div className="link-icon-light icon-glow" style={{ backgroundColor: color }}></div>
            </div>
            <div className="link-name">{name}</div>

            {/* URL Preview Tooltip */}
            {showPreview && link && (
                <div
                    className="url-preview"
                    ref={previewRef}
                    style={{ opacity: showPreview ? 1 : 0 }}
                >
                    <i className="fas fa-external-link-alt" style={{ marginRight: '6px' }}></i>
                    {getDisplayUrl(link)}
                </div>
            )}
        </button>
    );
});

LinkItem.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    link: PropTypes.string
};

// Column of Links Component
const LinksColumn = React.memo(({ items }) => (
    <div className="links-column">
        {items.map((item) => (
            <LinkItem
                key={item.name || item.link}
                name={item.name}
                icon={item.icon}
                color={item.color}
                link={item.link}
            />
        ))}
    </div>
));

LinksColumn.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        link: PropTypes.string
    })).isRequired
};

// Header Component
const Header = ({ openModal }) => {
    // Use the ThemeContext provided by App.js's ThemeProvider
    const themeContextValue = React.useContext(ThemeContext);
    if (!themeContextValue) {
        // Handle case where context is not yet available (optional, depends on loading order)
        console.warn("ThemeContext not found in Header. Check script loading order.");
        // Provide default values or return null/loading state
        return null; // Or a loading indicator
    }
    const { isDarkTheme, toggleTheme } = themeContextValue;
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Removed the bgAnimationsDisabled state logic as it wasn't used in the return statement below.
    // If needed, it can be re-added.

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo">
                <span className="logo-icon">
                    <i className="fas fa-cube"></i>
                </span>
                <span className="logo-text">VeniceOS</span>
            </div>

            <div className="user-controls">
                <button className="control-btn" onClick={toggleTheme} title="Toggle theme">
                    <i className={isDarkTheme ? "fas fa-sun" : "fas fa-moon"}></i>
                </button>
                <button className="control-btn" onClick={openModal} title="Open Modal">
                    <i className="fas fa-plus"></i>
                </button>
                {/* Removed unused Search, Notifications, and User Avatar buttons for simplicity */}
                {/* Add them back if needed */}
            </div>
        </header>
    );
};

Header.propTypes = {
    openModal: PropTypes.func.isRequired
};

// Footer Component
const Footer = React.memo(() => {
    return (
        <footer className="dashboard-footer">
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} <span style={{ background: 'linear-gradient(90deg, #4A90E2, #67B26F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600 }}><i className="fas fa-cube"></i> VeniceOS</span>. All rights reserved.</p>
                <div className="footer-legal">
                    <button type="button" className="link-button">Privacy Policy</button>
                    <button type="button" className="link-button">Terms of Service</button>
                </div>
            </div>
        </footer>
    );
});

// Tool Card Component
const ToolCard = React.memo(({ title, description, icon, color, link }) => (
    <div className="tool-card" style={{ borderColor: color }}>
        <div className="tool-icon" style={{ backgroundColor: color }}>
            <i className={icon}></i>
        </div>
        <div className="tool-content">
            <h3 className="tool-title">{title}</h3>
            <p className="tool-description">{description}</p>
        </div>
        <a href={link} className="tool-link">
            <i className="fas fa-arrow-right"></i>
        </a>
    </div>
));

ToolCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
};

// Export components (Make sure to export the new Dashboard component)
window.VeniceUI = {
    ThemeContext,
    ThemeProvider,
    useIconStyle,
    LinkIcon,
    LinkItem,
    LinksColumn,
    Header,
    Footer,
    ToolCard,
    ToolItem,
    SharedNavBar,
    Dashboard,
    PasswordModal
};

// ToolsGrid Component - Displays a grid of tools organized by category
const ToolsGrid = React.memo(() => {
    // Category names mapping for display - with improved naming
    const categoryNames = {
        "1": "Images & Media",
        "2": "Development",
        "3": "Text & Content",
        "4": "Projects",
        "5": "Links & Resources",
        "6": "UI & Design",
        "7": "Libraries & Tools"
    };

    // Create categorized tools object for display
    const displayToolsByCategory = {};

    // Organize tools by their display category names
    Object.keys(tools).forEach(numCategory => {
        const categoryName = categoryNames[numCategory] || "Other";
        if (!displayToolsByCategory[categoryName]) {
            displayToolsByCategory[categoryName] = [];
        }
        displayToolsByCategory[categoryName] = [
            ...displayToolsByCategory[categoryName],
            ...tools[numCategory]
        ];
    });

    // Custom category order (most important first)
    const categoryOrder = [
        "Development",
        "UI & Design",
        "Images & Media",
        "Text & Content",
        "Libraries & Tools",
        "Projects",
        "Links & Resources",
        "Other"
    ];

    // Sort categories based on predefined order
    const sortedCategories = Object.keys(displayToolsByCategory).sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);

        // If both categories are in the order list, sort by order
        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
        }
        // If only one is in the list, prioritize the one in the list
        else if (indexA !== -1) {
            return -1;
        }
        else if (indexB !== -1) {
            return 1;
        }
        // If neither is in the list, sort alphabetically
        return a.localeCompare(b);
    });

    // State for the active category
    const [activeCategory, setActiveCategory] = React.useState(() => {
        return sortedCategories.length > 0 ? sortedCategories[0] : "";
    });

    // Function to handle category selection
    const handleCategoryClick = (categoryName) => {
        setActiveCategory(categoryName);
    };

    // Helper function to get category icon
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Images & Media': return 'fas fa-image';
            case 'Development': return 'fas fa-code';
            case 'Text & Content': return 'fas fa-font';
            case 'Projects': return 'fas fa-project-diagram';
            case 'Links & Resources': return 'fas fa-link';
            case 'UI & Design': return 'fas fa-desktop';
            case 'Libraries & Tools': return 'fas fa-tools';
            default: return 'fas fa-folder';
        }
    };

    // If no categories exist after filtering, return null
    if (Object.keys(displayToolsByCategory).length === 0) {
        return null;
    }

    // Sort tools within each category alphabetically by name
    Object.keys(displayToolsByCategory).forEach(category => {
        displayToolsByCategory[category].sort((a, b) => a.name.localeCompare(b.name));
    });

    return (
        <div className="tools-grid-container fade-in">
            <h2 className="section-title">External Development Tools</h2>

            {/* Category navigation buttons */}
            <div className="category-nav">
                {sortedCategories.map(categoryName => (
                    <button
                        key={categoryName}
                        onClick={() => handleCategoryClick(categoryName)}
                        className={`category-nav-button ${activeCategory === categoryName ? 'active' : ''}`}
                    >
                        <i className={getCategoryIcon(categoryName)}></i>
                        {categoryName}
                    </button>
                ))}
            </div>

            {/* Display tools for the active category */}
            <div className="tool-category active-category-content">
                {displayToolsByCategory[activeCategory] && (
                    <div className="tool-items" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
                        {displayToolsByCategory[activeCategory].map((tool, index) => (
                            <LinkItem
                                key={`${activeCategory}-${index}`}
                                name={tool.name}
                                icon={tool.icon}
                                color={tool.color}
                                link={tool.link}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});

// Add components to window.VeniceUI
window.VeniceUI.ToolsGrid = ToolsGrid;

// Initialize rendering when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Check if root element exists
        const rootElement = document.getElementById('root');
        if (!rootElement) {
            console.error("Element o id 'root' nie został znaleziony");
            return;
        }

        // Use createRoot instead of ReactDOM.render
        const root = ReactDOM.createRoot(rootElement);
        root.render(React.createElement(ToolsGrid, null));
        console.log("ToolsGrid został pomyślnie wyrenderowany z ToolsPage.js");
    } catch (error) {
        console.error("Błąd podczas renderowania z ToolsPage.js:", error);
    }
});

// Tool Item Component
const ToolItem = React.memo(({ name, status }) => {
    const getIconColor = () => {
        switch (status) {
            case 'check':
                return 'var(--success)';
            case 'warning':
                return 'var(--danger)';
            case 'calendar':
                return 'var(--danger)';
            case 'upload':
                return 'var(--warning)';
            case 'code':
                return 'var(--info)';
            case 'next':
                return 'var(--purple)';
            case 'camera':
                return 'var(--warning)';
            case 'minus':
                return 'var(--info)';
            case 'user':
                return 'var(--danger)';
            case 'bolt':
                return 'var(--danger)';
            case 'globe':
                return 'var(--warning)';
            case 'text':
                return 'var(--info)';
            case 'star':
                return 'var(--warning)';
            case 'file':
                return 'var(--info)';
            default:
                return 'var(--success)';
        }
    };

    const getIconClass = () => {
        switch (status) {
            case 'check':
                return 'fas fa-check';
            case 'warning':
                return 'fas fa-exclamation';
            case 'calendar':
                return 'fas fa-calendar';
            case 'upload':
                return 'fas fa-cloud-upload-alt';
            case 'code':
                return 'fas fa-code';
            case 'next':
                return 'fas fa-chevron-right';
            case 'camera':
                return 'fas fa-camera';
            case 'minus':
                return 'fas fa-minus';
            case 'user':
                return 'fas fa-user';
            case 'bolt':
                return 'fas fa-bolt';
            case 'globe':
                return 'fas fa-globe';
            case 'text':
                return 'fas fa-font';
            case 'star':
                return 'fas fa-star';
            case 'file':
                return 'fas fa-file-alt';
            default:
                return 'fas fa-check';
        }
    };

    const [isHovered, setIsHovered] = React.useState(false);
    const color = getIconColor();
    const colorVarName = color.replace('var(', '').replace(')', '');
    // Use the shared hook for icon style
    const iconStyle = useIconStyle(color, isHovered);

    return (
        <button
            type="button"
            className="link-item hover-lift transition-all"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-color={colorVarName.replace('--', '')}
        >
            <div className="link-icon" style={iconStyle}>
                <i className={getIconClass()}></i>
                <div className="link-icon-light icon-glow" style={{ backgroundColor: color }}></div>
            </div>
            <div className="link-name">{name}</div>
        </button>
    );
});

ToolItem.propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired // Consider a more specific PropTypes.oneOf if statuses are fixed
};

// Shared Navigation Bar Component
const SharedNavBar = () => {
    const currentPath = window.location.pathname;
    // Use the ThemeContext provided by App.js's ThemeProvider
    const themeContextValue = React.useContext(ThemeContext);
    // Do not render theme toggle if context is not available
    const canToggleTheme = !!themeContextValue;
    const { isDarkTheme, toggleTheme } = themeContextValue || {}; // Provide defaults if context is missing


    return (
        <nav className="shared-nav">
            <div className="nav-container">
                <div className="nav-brand">
                    <i className="fas fa-cube"></i>
                    <span>VeniceOS</span>
                </div>
                <ul className="nav-list">
                    <li>
                        <a
                            href="index.html" // Assuming index.html is the home page
                            className={`nav-link ${currentPath.includes('index.html') || currentPath === '/' ? 'active' : ''}`}
                        >
                            <i className="fas fa-home"></i>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="tools.html"
                            className={`nav-link ${currentPath.includes('tools.html') ? 'active' : ''}`}
                        >
                            <i className="fas fa-tools"></i>
                            <span>Tools</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="inne.html" // Assuming there's an 'inne.html' page
                            className={`nav-link ${currentPath.includes('inne.html') ? 'active' : ''}`}
                        >
                            <i className="fas fa-th-large"></i>
                            <span>Inne</span>
                        </a>
                    </li>
                </ul>
                {canToggleTheme && (
                    <div className="nav-controls">
                        <button className="theme-toggle control-btn" onClick={toggleTheme} title="Toggle theme">
                            {/* Use the same icon logic as Header */}
                            <i className={isDarkTheme ? "fas fa-sun" : "fas fa-moon"}></i>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

// New Dashboard Component based on provided HTML
const Dashboard = React.memo(() => {
    return (
        <section className="dashboard" id="dashboard">
            <div className="page-wrapper">
                <div className="main-wrapper">
                    <div className="section">
                        <div className="glow-circle"></div>
                        <div className="particles" id="particles"></div>
                        <div className="glow-line"></div>
                        <div className="bg"></div>
                    </div>
                </div>
            </div>
            {/* Date and Time */}
            <div className="datetime-bar">
                <div className="date">Sunday, 13 April 2025</div> {/* Placeholder: Consider making dynamic */}
                <div className="time">
                    15:55:14 {/* Placeholder: Consider making dynamic */}
                </div>
                <div className="notification-icons">
                    <button className="icon-button">
                        <i className="fas fa-bell"></i>
                    </button>
                    <button className="icon-button">
                        <i className="fas fa-hourglass-half"></i>
                    </button>
                </div>
            </div>

            {/* Dashboard Links Section */}
            <div className="dashboard-section">
                <div className="dashboard-container">
                    <div className="link-grid">
                        <div className="placeholder-links">
                            <p>Dashboard links will be loaded here</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

// Add the new PasswordModal component below Dashboard
const PasswordModal = React.memo(({ isOpen, onClose, onSubmit }) => {
    const [password, setPassword] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(password);
        }
        setPassword(''); // Clear password after submission
        onClose(); // Close the modal
    };

    const handleCancel = () => {
        setPassword(''); // Clear password on cancel
        onClose();
    };

    // Use the existing Modal component
    return (
        <Modal isOpen={isOpen} onClose={handleCancel} title="Enter Password">
            <form onSubmit={handleSubmit} className="password-modal-form">
                <div className="modal-body">

                </div>
                <div className="modal-footer">

                </div>
            </form>
        </Modal>
    );
});

PasswordModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func // Optional callback for when password is submitted
};

// LinkItem component for DashboardLinks
const DashboardLinkItem = React.memo(({ name, icon, color, link }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const colorVarName = color.replace('var(', '').replace(')', '');

    // Use the shared hook for icon style
    const iconStyle = useIconStyle(color, isHovered);

    // Handle click to open link in new tab
    const handleClick = (e) => {
        if (link) {
            e.preventDefault();
            window.open(link, '_blank', 'noopener,noreferrer');
        };
    };

    return (
        <button
            type="button"
            className="link-item"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-color={colorVarName.replace('--', '')}
            onClick={handleClick}
            style={{ cursor: link ? 'pointer' : 'default' }}
            aria-label={`Open ${name}`}
        >
            <div className="link-icon" style={iconStyle}>
                <i className={icon} aria-hidden="true"></i>
                <div className="link-icon-light icon-glow" style={{ backgroundColor: color }}></div>
            </div>
            <div className="link-name">{name}</div>
        </button>
    );
});

DashboardLinkItem.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    link: PropTypes.string
};

// DashboardLinks Component - Displays the main dashboard links
const DashboardLinks = React.memo(() => {
    // Import tools data
    // (We already have access to the tools variable in this file)

    // Define tools organized by categories
    const toolsByCategory = tools || {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
        "7": []
    };

    // Category names mapping for display
    const categoryNames = {
        "1": "Image",
        "2": "Development",
        "3": "Text",
        "4": "Projects",
        "5": "Links",
        "6": "Interface",
        "7": "More"
    };

    // State for the active category
    const [activeCategory, setActiveCategory] = React.useState(Object.keys(toolsByCategory)[0]);

    // Function to handle category selection
    const handleCategoryClick = (categoryName) => {
        setActiveCategory(categoryName);
    };

    // Function to get the icon for each category
    const getCategoryIcon = (category) => {
        switch (category) {
            case '1': return 'fas fa-image';
            case '2': return 'fas fa-code';
            case '3': return 'fas fa-font';
            case '4': return 'fas fa-project-diagram';
            case '5': return 'fas fa-link';
            case '6': return 'fas fa-desktop';
            case '7': return 'fas fa-ellipsis-h';
            default: return 'fas fa-folder';
        };
    };

    return (
        <div className="dashboard-links fade-in">
            <h2 className="section-title">VeniceOS Tech Tools</h2>
            <div className="category-nav">
                {Object.keys(toolsByCategory).map(categoryId => (
                    <button
                        key={categoryId}
                        onClick={() => handleCategoryClick(categoryId)}
                        className={`login-btn ${activeCategory === categoryId ? 'active' : ''}`}
                    >
                        <i className={getCategoryIcon(categoryId)}></i>
                        {categoryNames[categoryId]}
                    </button>
                ))}
            </div>
            <div className="tool-category">
                {toolsByCategory[activeCategory] && (
                    <div className="tool-items" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                        {toolsByCategory[activeCategory].map(tool => (
                            <DashboardLinkItem
                                key={tool.name}
                                name={tool.name}
                                icon={tool.icon}
                                color={tool.color}
                                link={tool.link}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});

// ToolLink Component - Used to display tool links with icons
const ToolLink = React.memo(({ name, icon, color, link }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const colorVarName = color.replace('var(', '').replace(')', '');

    // Use the shared hook for icon style
    const iconStyle = useIconStyle(color, isHovered);

    // Handle click to open link in new tab


    return (
        <button
            type="button"
            className="link-item hover-lift transition-all"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-color={colorVarName.replace('--', '')}
            onClick={handleClick}
            style={{ cursor: link ? 'pointer' : 'default' }}
            aria-label={`Open ${name}`}
        >
            <div className="link-icon" style={iconStyle}>
                <i className={icon} aria-hidden="true"></i>
                <div className="link-icon-light icon-glow" style={{ backgroundColor: color }}></div>
            </div>
            <div className="link-name">{name}</div>
        </button>
    );
});

// Add PropTypes validation for ToolLink
ToolLink.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    link: PropTypes.string
};

// Add components to window.VeniceUI
window.VeniceUI.DashboardLinks = DashboardLinks;
window.VeniceUI.ToolLink = ToolLink;








