// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {

    // ==================================================================
    // 1. Theme Switcher Logic (Yuno Light <-> Asta Dark)
    // ==================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const rootElement = document.documentElement; // <html> element

    // Apply saved theme on page load or default to 'light' (Yuno)
    const savedTheme = localStorage.getItem('theme') || 'light';
    rootElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent accidental form submission
            
            const currentTheme = rootElement.getAttribute('data-theme');
            const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';

            // Apply theme and save preference
            rootElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    } else {
        console.warn('Theme toggle button (#theme-toggle) not found on this page.');
    }

    // ==================================================================
    // 2. View Switcher Logic (Login <-> Sign Up)
    // ==================================================================
    const loginView = document.getElementById('login-view');
    const signupView = document.getElementById('signup-view');
    const toSignupBtn = document.getElementById('to-signup');
    const toLoginBtn = document.getElementById('to-login');

    function showSignup() {
        if (loginView && signupView) {
            loginView.classList.remove('active');
            signupView.classList.add('active');
        }
    }

    function showLogin() {
        if (loginView && signupView) {
            signupView.classList.remove('active');
            loginView.classList.add('active');
        }
    }

    // Handle hash links (e.g. arriving via login.html#signup)
    if (window.location.hash === '#signup') {
        showSignup();
    }

    if (toSignupBtn) {
        toSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showSignup();
        });
    }

    if (toLoginBtn) {
        toLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLogin();
        });
    }

    // ==================================================================
    // 3. Password Visibility Toggle
    // ==================================================================
    const passwordToggles = document.querySelectorAll('.toggle-password');
    passwordToggles.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const input = button.parentElement.querySelector('input');
            if (input) {
                const isPassword = input.getAttribute('type') === 'password';
                input.setAttribute('type', isPassword ? 'text' : 'password');
            }
        });
    });
});