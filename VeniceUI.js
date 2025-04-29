// VeniceUI Component Library with Debug Logging
console.log('Loading VeniceUI.js');

// Define component templates
const templates = {
    // Full Page Radio Player component template
    fullPageRadioPlayer: `
        <div class="radio-player-container">
            <div class="player-header">
                <h1>Radio Player</h1>
                <button class="close-btn" onclick="togglePasswordModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="player-main">
                <div class="now-playing-container">
                    <div class="now-playing-label">Now Playing:</div>
                    <div id="nowPlaying" class="now-playing-info">Select a station</div>
                </div>
                
                <div class="equalizer-container">
                    <div id="equalizer" class="equalizer">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                </div>
                
                <div class="station-buttons">
                    <button id="station1" class="station-btn" data-index="0">Meloradio</button>
                    <button id="station2" class="station-btn" data-index="1">RMF FM</button>
                    <button id="station3" class="station-btn" data-index="2">Radio ZET</button>
                    <button id="station4" class="station-btn" data-index="3">Polskie Radio</button>
                </div>
                
                <div class="player-controls">
                    <button id="prevButton" class="control-button prev-button">
                        <i class="fas fa-step-backward"></i>
                    </button>
                    <button id="playPauseBtn" class="control-button play-button">
                        <i class="fas fa-play"></i>
                    </button>
                    <button id="nextButton" class="control-button next-button">
                        <i class="fas fa-step-forward"></i>
                    </button>
                </div>
                
                <div class="volume-container">
                    <i class="fas fa-volume-down"></i>
                    <input type="range" id="volumeSlider" min="0" max="100" value="75" class="volume-slider-large">
                    <i class="fas fa-volume-up"></i>
                </div>
            </div>
            
            <audio id="radioPlayer"></audio>
        </div>
    `,

    // Dashboard component template
    dashboard: `
        <div class="dashboard-container">
            <div class="dashboard-header">
                <h1>Venice Dashboard</h1>
            </div>
            
            <div class="dashboard-content">
                <div class="dashboard-card">
                    <div class="card-icon">
                        <i class="fas fa-music"></i>
                    </div>
                    <div class="card-content">
                        <h3>Radio Player</h3>
                        <p>Open the full radio player</p>
                        <button class="primary-btn" onclick="{onPasswordClick}">Open Player</button>
                    </div>
                </div>
                
                <!-- Additional dashboard cards can be added here -->
            </div>
        </div>
    `
};

// Create the VeniceUI object directly on window
window.VeniceUI = {
    // Full Page Radio Player component
    FullPageRadioPlayer: function (props) {
        console.log('VeniceUI.FullPageRadioPlayer called with props:', props);
        return `
            <div class="radio-player-container">
                <div class="player-header">
                    <h1>Radio Player</h1>
                    <button class="close-btn" onclick="togglePasswordModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="player-main">
                    <div class="now-playing-container">
                        <div class="now-playing-label">Now Playing:</div>
                        <div id="nowPlaying" class="now-playing-info">Select a station</div>
                    </div>
                    
                    <div class="equalizer-container">
                        <div id="equalizer" class="equalizer">
                            <div class="bar"></div>
                            <div class="bar"></div>
                            <div class="bar"></div>
                            <div class="bar"></div>
                            <div class="bar"></div>
                        </div>
                    </div>
                    
                    <div class="station-buttons">
                        <button id="station1" class="station-btn" data-index="0">Meloradio</button>
                        <button id="station2" class="station-btn" data-index="1">RMF FM</button>
                        <button id="station3" class="station-btn" data-index="2">Radio ZET</button>
                        <button id="station4" class="station-btn" data-index="3">Polskie Radio</button>
                    </div>
                    
                    <div class="player-controls">
                        <button id="prevButton" class="control-button prev-button">
                            <i class="fas fa-step-backward"></i>
                        </button>
                        <button id="playPauseBtn" class="control-button play-button">
                            <i class="fas fa-play"></i>
                        </button>
                        <button id="nextButton" class="control-button next-button">
                            <i class="fas fa-step-forward"></i>
                        </button>
                    </div>
                    
                    <div class="volume-container">
                        <i class="fas fa-volume-down"></i>
                        <input type="range" id="volumeSlider" min="0" max="100" value="75" class="volume-slider-large">
                        <i class="fas fa-volume-up"></i>
                    </div>
                </div>
                
                <audio id="radioPlayer"></audio>
            </div>
        `;
    },

    // Dashboard component
    Dashboard: function (props) {
        console.log('VeniceUI.Dashboard called with props:', props);
        let html = `
            <div class="dashboard-container">
                <div class="dashboard-header">
                    <h1>Venice Dashboard</h1>
                </div>
                
                <div class="dashboard-content">
                    <div class="dashboard-card">
                        <div class="card-icon">
                            <i class="fas fa-music"></i>
                        </div>
                        <div class="card-content">
                            <h3>Radio Player</h3>
                            <p>Open the full radio player</p>
                            <button class="primary-btn" onclick="${props.onPasswordClick}">Open Player</button>
                        </div>
                    </div>
                    
                    <!-- Additional dashboard cards can be added here -->
                </div>
            </div>
        `;
        return html;
    }
};

// Log to verify the object was created correctly
console.log('VeniceUI created with properties:', Object.keys(window.VeniceUI));
console.log('FullPageRadioPlayer type:', typeof window.VeniceUI.FullPageRadioPlayer); 