// Dark mode switch
function toggleDarkMode() {
    const body = document.body;
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    if (body.getAttribute('data-bs-theme') === 'light') {
        body.setAttribute('data-bs-theme', 'dark');
        darkModeSwitch.checked = true;
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-bs-theme', 'light');
        darkModeSwitch.checked = false;
        localStorage.setItem('theme', 'light');
    }
}

// Event listener for dark mode switch
document.getElementById('darkModeSwitch').addEventListener('change', toggleDarkMode);