// Function to apply theme parameters to the document
function applyTheme(themeParams) {
    const root = document.documentElement;
    root.style.setProperty('--bg-color', themeParams.bg_color || '#ffffff');
    root.style.setProperty('--text-color', themeParams.text_color || '#000000');
}

// Wait for the Telegram Web Apps API to be ready
Telegram.WebApp.onEvent('themeChanged', () => {
    const themeParams = Telegram.WebApp.themeParams;
    applyTheme(themeParams);
});

// Initial theme application
const themeParams = Telegram.WebApp.themeParams;
applyTheme(themeParams);

// Expand the web app to full size
Telegram.WebApp.expand();
