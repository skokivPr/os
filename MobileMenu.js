const MobileMenu = ({ isOpen, toggleMenu, children }) => {
    return (
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
            <div className="mobile-menu-content">
                {children}
            </div>
        </div>
    );
};

MobileMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}; 