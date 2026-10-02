// Function to handle Safe Mode
function initSafeMode() {
    const toggle = document.querySelector('.accessibility-toggle');
    const body = document.body;

    if (!toggle) {
        console.log("Safe Mode button not found in DOM yet.");
        return;
    }

    // Check localStorage on load
    if (localStorage.getItem('theme-safe-mode') === 'enabled') {
        body.classList.add('safe-mode');
        toggle.innerText = "[ ENABLE_VISUAL_EFFECTS ]";
    }

    toggle.addEventListener('click', () => {
        body.classList.toggle('safe-mode');
        
        if (body.classList.contains('safe-mode')) {
            localStorage.setItem('theme-safe-mode', 'enabled');
            toggle.innerText = "[ ENABLE_VISUAL_EFFECTS ]";
        } else {
            localStorage.setItem('theme-safe-mode', 'disabled');
            toggle.innerText = "[ DISABLE_VISUAL_EFFECTS ]";
        }
    });
}

// Run the function after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("Terminal scripts initialized.");
    initSafeMode();
    // ... put your [ COPY ] button code here too ...
});