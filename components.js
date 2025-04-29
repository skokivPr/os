// Import Addons component
const { Addons } = window;

// Import VeniceUI components if available
const { FullPageRadioPlayer } = window.VeniceUI || {};

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

// Link Item Component
const LinkItem = React.memo(({ name, icon, color, link }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const colorVarName = color.replace('var(', '').replace(')', '');
    const iconStyle = useIconStyle(color, isHovered);

    const handleClick = (e) => {
        if (link) {
            e.preventDefault();
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

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

// Dashboard Links Component
const DashboardLinks = React.memo(() => {
    // Original dashboard items
    const allDashboardItems = [
        [
            { name: 'CODE EDITOR', icon: 'fas fa-code', color: 'var(--highlight-blue)', link: 'https://livecode.carrd.co', target: '_blank' },
            { name: 'IMAGE TOOLS', icon: 'fas fa-image', color: 'var(--success)', link: 'https://imgpro.carrd.co', target: '_blank' },
            { name: 'TOOLS DEV', icon: 'fas fa-terminal', color: 'var(--danger)', link: 'https://toolsdev.carrd.co', target: '_blank' },
            { name: 'W5 EDITOR', icon: 'fas fa-plug', color: 'var(--purple)', link: 'https://w5editor.carrd.co', target: '_blank' },
        ],
        [
            { name: 'MD CODE', icon: 'fas fa-file-alt', color: 'var(--info)', link: 'https://mdcode.carrd.co', target: '_blank' },
            { name: 'MODIFIER', icon: 'fab fa-css3-alt', color: 'var(--highlight-orange)', link: 'https://modifier.carrd.co', target: '_blank' },
            { name: 'W5UI', icon: 'fas fa-palette', color: 'var(--warning)', link: 'https://w5ui.carrd.co', target: '_blank' },
            { name: 'CODENOTE', icon: 'fas fa-search', color: 'var(--pink)', link: 'https://codenote.carrd.co', target: '_blank' },
        ],
        [
            { name: 'ARKUSZ', icon: 'fas fa-database', color: 'var(--success)', link: 'https://arkusz.carrd.co', target: '_blank' },
            { name: 'CSV DEV', icon: 'fas fa-code-branch', color: 'var(--info)', link: 'https://incsv.carrd.co', target: '_blank' },
            { name: 'EDYTOR', icon: 'fas fa-box-open', color: 'var(--purple)', link: 'https://edytor.carrd.co', target: '_blank' },
            { name: 'ZOOMFRAME', icon: 'fas fa-mobile-alt', color: 'var(--warning)', link: 'https://zoomframe.carrd.co', target: '_blank' },
        ],
    ];

    const allBottomItems = [
        [
            { name: 'TEXT EDITOR', icon: 'fas fa-file-alt', color: 'var(--highlight-blue)', link: 'https://edytortxt.carrd.co', target: '_blank' },
            { name: 'TEXT PRO', icon: 'fas fa-font', color: 'var(--success)', link: 'https://txtpro.carrd.co', target: '_blank' },
            { name: 'TEXT TO IMAGE', icon: 'fas fa-image', color: 'var(--danger)', link: 'https://textimg.carrd.co', target: '_blank' },
            { name: 'TOOLS LINK', icon: 'fas fa-link', color: 'var(--purple)', link: 'https://toolslinki.carrd.co', target: '_blank' },
        ],
        [
            { name: 'MD TABLE', icon: 'fas fa-table', color: 'var(--info)', link: 'https://mdtable.carrd.co', target: '_blank' },
            { name: 'CSV DEV', icon: 'fas fa-file-csv', color: 'var(--highlight-orange)', link: 'https://incsvdev.carrd.co', target: '_blank' },
            { name: 'WEB TOOLS', icon: 'fas fa-tools', color: 'var(--warning)', link: 'https://webtoolsdev.carrd.co', target: '_blank' },
            { name: 'TASK DAY', icon: 'fas fa-tasks', color: 'var(--pink)', link: 'https://taskday.carrd.co', target: '_blank' },
        ],
        [
            { name: 'PROJECT DEV', icon: 'fas fa-project-diagram', color: 'var(--success)', link: 'https://projectdev.carrd.co', target: '_blank' },
            { name: 'TOOLS NUE', icon: 'fas fa-wrench', color: 'var(--info)', link: 'https://toolsnue.carrd.co', target: '_blank' },
            { name: 'TOOLS NUE DEV', icon: 'fas fa-cogs', color: 'var(--purple)', link: 'https://toolsnuedev.carrd.co', target: '_blank' },
            { name: 'SITES W5', icon: 'fas fa-globe', color: 'var(--warning)', link: 'https://sitesw5.carrd.co', target: '_blank' },
        ],
    ];

    // Filter items to include only carrd.co links
    const filterCarrdLinks = (items) => {
        return items.map(column =>
            column.filter(item => item.link && item.link.includes('carrd.co'))
        ).filter(column => column.length > 0);
    };

    const dashboardItems = filterCarrdLinks(allDashboardItems);
    const bottomItems = filterCarrdLinks(allBottomItems);

    return (
        <div className="dashboard-links fade-in">
            <h2 className="section-title">Carrd.co Links</h2>
            <div className="links-container">
                {dashboardItems.map((column, index) => (
                    <LinksColumn
                        key={`dashboard-col-${index}`}
                        items={column}
                    />
                ))}
            </div>
            <div className="links-container bottom-links">
                {bottomItems.map((column, index) => (
                    <LinksColumn
                        key={`bottom-col-${index}`}
                        items={column}
                    />
                ))}
            </div>
        </div>
    );
});

// Other - links
const otherLinks = [
    [
    ]
];

const OtherLinks = React.memo(() => {
    return (
        <div className="other-links fade-in">
            <h2 className="section-title">Other Links</h2>
            <div className="links-container">
                {otherLinks.map((column) => (
                    <LinksColumn
                        key={`other-col-${column[0].name}`}
                        items={column}
                    />
                ))}
            </div>
        </div>
    );
});

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

// Tools Links Component - Separate links specifically for the tools page
const ToolsLinks = React.memo(() => {
    const allToolsPageLinks = [
        [
            { name: 'CODE EDITOR', icon: 'fas fa-code', color: 'var(--highlight-blue)', link: 'https://codeeditor.carrd.co', target: '_blank' },
            { name: 'IMAGE TOOLS', icon: 'fas fa-image', color: 'var(--success)', link: 'https://imagetools.carrd.co', target: '_blank' },
            { name: 'DEV CONSOLE', icon: 'fas fa-terminal', color: 'var(--danger)', link: 'https://devconsole.carrd.co', target: '_blank' },
            { name: 'API TESTER', icon: 'fas fa-plug', color: 'var(--purple)', link: 'https://apitester.carrd.co', target: '_blank' },
        ],
        [
            { name: 'MARKDOWN PRO', icon: 'fas fa-file-alt', color: 'var(--info)', link: 'https://markdownpro.carrd.co', target: '_blank' },
            { name: 'CSS GENERATOR', icon: 'fab fa-css3-alt', color: 'var(--highlight-orange)', link: 'https://cssgenerator.carrd.co', target: '_blank' },
            { name: 'COLOR PICKER', icon: 'fas fa-palette', color: 'var(--warning)', link: 'https://colorpicker.carrd.co', target: '_blank' },
            { name: 'REGEX TESTER', icon: 'fas fa-search', color: 'var(--pink)', link: 'https://regextester.carrd.co', target: '_blank' },
        ],
        [
            { name: 'SQL FORMATTER', icon: 'fas fa-database', color: 'var(--success)', link: 'https://sqlformatter.carrd.co', target: '_blank' },
            { name: 'JSON VALIDATOR', icon: 'fas fa-code-branch', color: 'var(--info)', link: 'https://jsonvalidator.carrd.co', target: '_blank' },
            { name: 'SANDBOX', icon: 'fas fa-box-open', color: 'var(--purple)', link: 'https://devsandbox.carrd.co', target: '_blank' },
            { name: 'RESPONSIVE TEST', icon: 'fas fa-mobile-alt', color: 'var(--warning)', link: 'https://responsivetest.carrd.co', target: '_blank' },
        ],
    ];

    // Filter items to include only carrd.co links (reusing function from DashboardLinks)
    const filterCarrdLinks = (items) => {
        return items.map(column =>
            column.filter(item => item.link && item.link.includes('carrd.co'))
        ).filter(column => column.length > 0);
    };

    const toolsPageLinks = filterCarrdLinks(allToolsPageLinks);

    return (
        <div className="tools-links fade-in">
            <h2 className="section-title">Carrd.co Developer Resources</h2>
            <div className="links-container">
                {toolsPageLinks.map((column, index) => (
                    <LinksColumn key={`tools-col-${index}`} items={column} />
                ))}
            </div>
        </div>
    );
});

// Tools Grid Component
const ToolsGrid = React.memo(() => {
    const allToolsByCategory = {
        "Image": [
            { name: 'IMGPRO', icon: 'fas fa-image', color: 'var(--success)', link: 'https://imgpro.carrd.co', target: '_blank' },
            { name: 'IMGADD', icon: 'fas fa-camera', color: 'var(--warning)', link: 'https://imgadd.carrd.co', target: '_blank' },
            { name: 'TEXTIMG', icon: 'fas fa-file-image', color: 'var(--warning)', link: 'https://textimg.carrd.co', target: '_blank' },
            { name: 'ZOOMFRAME', icon: 'fas fa-search-plus', color: 'var(--info)', link: 'https://zoomframe.carrd.co', target: '_blank' },
        ],
        "Development": [
            { name: 'TOOLSDEV', icon: 'fas fa-tools', color: 'var(--info)', link: 'https://toolsdev.carrd.co', target: '_blank' },
            { name: 'LIVECODE', icon: 'fas fa-code', color: 'var(--danger)', link: 'https://livecode.carrd.co', target: '_blank' },
            { name: 'EDYTORVS', icon: 'fas fa-edit', color: 'var(--info)', link: 'https://edytor.carrd.co', target: '_blank' },
            { name: 'MARKDOWN', icon: 'fas fa-file-alt', color: 'var(--warning)', link: 'https://mdcode.carrd.co', target: '_blank' },
            { name: 'MOTABLE', icon: 'fas fa-table', color: 'var(--info)', link: 'https://mdtable.carrd.co', target: '_blank' },
            { name: 'INCSVDEV', icon: 'fas fa-file-csv', color: 'var(--danger)', link: 'https://incsvdev.carrd.co', target: '_blank' },
            { name: 'WEBTOOLS', icon: 'fas fa-globe', color: 'var(--highlight-orange)', link: 'https://webtoolsdev.carrd.co', target: '_blank' },
        ],
        "Text": [
            { name: 'ARKUSZ', icon: 'fas fa-table', color: 'var(--success)', link: 'https://arkusz.carrd.co', target: '_blank' },
            { name: 'CODENOTE', icon: 'fas fa-sticky-note', color: 'var(--highlight-blue)', link: 'https://codenote.carrd.co', target: '_blank' },
            { name: 'TEXTMOD', icon: 'fas fa-font', color: 'var(--warning)', link: 'https://modifier.carrd.co', target: '_blank' },
            { name: 'EDYTORTXT', icon: 'fas fa-file-word', color: 'var(--info)', link: 'https://edytortxt.carrd.co', target: '_blank' },
            { name: 'TXTPRO', icon: 'fas fa-file-alt', color: 'var(--purple)', link: 'https://txtpro.carrd.co', target: '_blank' },
        ],
        "Projects": [
            { name: 'PROJECTVIEW', icon: 'fas fa-eye', color: 'var(--purple)', link: 'https://projectview.carrd.co', target: '_blank' },
            { name: 'PANEL', icon: 'fas fa-columns', color: 'var(--purple)', link: 'https://logowanie.carrd.co/', target: '_blank' },
            { name: 'TASKDAY', icon: 'fas fa-calendar-day', color: 'var(--purple)', link: 'https://taskday.carrd.co', target: '_blank' },
            { name: 'PROJECTDEV', icon: 'fas fa-project-diagram', color: 'var(--success)', link: 'https://projectdev.carrd.co', target: '_blank' }
        ],
        "Links": [
            { name: 'TOOLSLINK', icon: 'fas fa-link', color: 'var(--success)', link: 'https://toolslink.carrd.co', target: '_blank' },
            { name: 'TOOLSLINK1', icon: 'fas fa-external-link-alt', color: 'var(--success)', link: 'https://toolslinki.carrd.co', target: '_blank' },
        ],
        "Interface": [
            { name: 'W5UI', icon: 'fas fa-desktop', color: 'var(--danger)', link: 'https://w5ui.carrd.co', target: '_blank' },
            { name: 'UNIVERSAL', icon: 'fas fa-play', color: 'var(--highlight-orange)', link: 'https://uniwersalplay.carrd.co', target: '_blank' },
        ],
        "More": [
            { name: 'Tools Nue', icon: 'fas fa-wrench', color: 'var(--info)', link: 'https://toolsnue.carrd.co', target: '_blank' },
            { name: 'Tools Nue Dev', icon: 'fas fa-code-branch', color: 'var(--info)', link: 'https://toolsnuedev.carrd.co', target: '_blank' },
            { name: 'Sites W5', icon: 'fas fa-sitemap', color: 'var(--success)', link: 'https://sitesw5.carrd.co', target: '_blank' },
            { name: 'Trumbowyg Editor', icon: 'fas fa-edit', color: 'var(--purple)', link: 'https://alex-d.github.io/Trumbowyg', target: '_blank' },
            { name: 'Table Org', icon: 'fas fa-table', color: 'var(--info)', link: 'https://tableorg.carrd.co', target: '_blank' },
            { name: 'Three.js', icon: 'fas fa-cubes', color: 'var(--highlight-blue)', link: 'https://threejs.org', target: '_blank' },
            { name: 'fullPage.js', icon: 'fas fa-pager', color: 'var(--highlight-orange)', link: 'https://alvarotrigo.com/fullPage', target: '_blank' },
            { name: 'UIkit', icon: 'fas fa-layer-group', color: 'var(--success)', link: 'https://getuikit.com/docs/introduction', target: '_blank' },
            { name: 'UI Panel', icon: 'fas fa-window-maximize', color: 'var(--purple)', link: 'https://uipanel.carrd.co', target: '_blank' },
            { name: 'Sumo Paint', icon: 'fas fa-paint-brush', color: 'var(--warning)', link: 'https://paint.sumo.app/?lang=pl', target: '_blank' },
            { name: 'FastWebSR', icon: 'fas fa-tachometer-alt', color: 'var(--danger)', link: 'https://fastwebsr.carrd.co', target: '_blank' },
            { name: 'Web Dev CRD', icon: 'fas fa-globe', color: 'var(--info)', link: 'https://webdev.crd.co', target: '_blank' },
            { name: 'CSS Portal', icon: 'fab fa-css3-alt', color: 'var(--highlight-blue)', link: 'https://www.cssportal.com', target: '_blank' },
            { name: 'Penpot Design', icon: 'fas fa-drafting-compass', color: 'var(--pink)', link: 'https://design.penpot.app/#/auth/login', target: '_blank' }
        ]
    };

    // Filter carrd.co links only
    const toolsByCategory = {};
    Object.keys(allToolsByCategory).forEach(category => {
        const filteredLinks = allToolsByCategory[category].filter(item =>
            item.link && item.link.includes('carrd.co')
        );
        if (filteredLinks.length > 0) {
            toolsByCategory[category] = filteredLinks;
        }
    });

    // State to track the active category
    const [activeCategory, setActiveCategory] = React.useState(Object.keys(toolsByCategory)[0] || '');

    // Function to handle category button click
    const handleCategoryClick = (categoryName) => {
        setActiveCategory(categoryName);
    };

    // Helper function to get category icon
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Image': return 'fas fa-image';
            case 'Development': return 'fas fa-code';
            case 'Text': return 'fas fa-font';
            case 'Projects': return 'fas fa-project-diagram';
            case 'Links': return 'fas fa-link';
            case 'Interface': return 'fas fa-desktop';
            case 'More': return 'fas fa-ellipsis-h';
            default: return 'fas fa-folder';
        }
    };

    // If no categories with carrd.co links exist, return null
    if (Object.keys(toolsByCategory).length === 0) {
        return null;
    }

    return (
        <div className="tools-grid-container fade-in">
            <h2 className="section-title">Carrd.co Narzędzia według kategorii</h2>

            {/* Przyciski nawigacji kategorii */}
            <div className="category-nav">
                {Object.keys(toolsByCategory).map(categoryName => (
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
                {toolsByCategory[activeCategory] && (
                    <div className="tool-items" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                        {toolsByCategory[activeCategory].map(link => (
                            <LinkItem key={link.name || link.link} {...link} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
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
                        <DashboardLinks />
                    </div>
                </div>
            </div>
        </section>
    );
});

// Add the new PasswordModal component below Dashboard

// Password Modal Component
const PasswordModal = React.memo(({ isOpen, onClose, onSubmit, title = "Enter Password", message = "Please enter your password to continue." }) => {
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!password.trim()) {
            setError('Password cannot be empty');
            return;
        }
        onSubmit(password);
        setPassword('');
    };

    const handleChange = (e) => {
        setPassword(e.target.value);
        if (error) setError('');
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="password"
                                value={password}
                                onChange={handleChange}
                                placeholder="Password"
                                className={error ? "error" : ""}
                            />
                            {error && <div className="error-message">{error}</div>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
});


PasswordModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired, // Required callback for when password is submitted
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};



// Export components (Make sure to export the new components)
window.VeniceUI = {
    ThemeContext,
    ThemeProvider,
    useIconStyle,
    LinkIcon,
    LinkItem,
    LinksColumn,
    DashboardLinks,
    OtherLinks,
    Header,
    Footer,
    ToolCard,
    ToolsGrid,
    ToolItem,
    SharedNavBar,
    Dashboard,
    PasswordModal,
    ToolsLinks
};








