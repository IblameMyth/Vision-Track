document.addEventListener('DOMContentLoaded', () => {
    // View Switcher (Login <-> Sign Up)
    const loginView = document.getElementById('login-view');
    const signupView = document.getElementById('signup-view');
    const toSignupBtn = document.getElementById('to-signup');
    const toLoginBtn = document.getElementById('to-login');

    toSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginView.classList.remove('active');
        signupView.classList.add('active');
    });

    toLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signupView.classList.remove('active');
        loginView.classList.add('active');
    });

    // Toggle Password Visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling.previousElementSibling; // targets input tag
            const isPassword = input.getAttribute('type') === 'password';
            input.setAttribute('type', isPassword ? 'text' : 'password');
        });
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const formSection = document.querySelector('.form-section');

    themeToggle.addEventListener('click', () => {
        const currentTheme = formSection.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            formSection.removeAttribute('data-theme');
        } else {
            formSection.setAttribute('data-theme', 'dark');
        }
    });

    // Form Validation Example
    const forms = [document.getElementById('login-form'), document.getElementById('signup-form')];

    forms.forEach(form => {
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const inputs = form.querySelectorAll('input[required]');

            inputs.forEach(input => {
                const group = input.parentElement;
                if (!input.value.trim()) {
                    group.classList.add('error');
                    isValid = false;
                } else {
                    group.classList.remove('error');
                }
            });

            if (isValid) {
                alert('Form submitted successfully!');
            }
        });
    });
});