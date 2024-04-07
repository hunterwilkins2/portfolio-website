function getUserPreference() {
    const userPreference = localStorage.getItem('theme');
    if (userPreference === 'light') {
        return 'light';
    }
    if (userPreference === 'dark') {
        return 'dark';
    }
    if (matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    return 'dark';
}

document.addEventListener('DOMContentLoaded', () => {
    const preference = getUserPreference();
    const toggle = document.getElementById('dark-mode-toggle');
    toggle.checked = false;
    toggle.addEventListener('change', toggleDarkMode);
    if (preference === 'dark') {
        toggle.checked = true;
        document.body.classList.add('dark');
    }
});

function saveUserPreference(userPreference) {
    localStorage.setItem('theme', userPreference);
}

function toggleDarkMode(event) {
    const preference = !event.target.checked ? 'light' : 'dark';
    saveUserPreference(preference);
    if (preference === 'light') {
        document.body.classList.remove('dark');
    } else {
        document.body.classList.add('dark');
    }
}
