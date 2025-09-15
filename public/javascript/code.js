 // Get references to DOM elements
        const htmlCode = document.getElementById('html-code');
        const cssCode = document.getElementById('css-code');
        const previewPanel = document.getElementById('preview-panel');
        const runButton = document.getElementById('run-button');
        const resetButton = document.getElementById('reset-button');
        const hamburgerButton = document.getElementById('hamburger-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        // Dark Mode Elements
        const darkModeToggles = document.querySelectorAll('.dark-mode-toggle');
        const sunIcons = document.querySelectorAll('.sun-icon');
        const moonIcons = document.querySelectorAll('.moon-icon');

        // Initial placeholder code
        const initialHtml = `<!-- Welcome to CodeLab! -->
<h1>Hello, World!</h1>
<p>This is your interactive code editor.</p>
<button class="my-button">Click Me</button>
`;
        const initialCss = `body {
    font-family: sans-serif;
    padding: 20px;
    background-color: #f0f4f8;
    color: #333;
}

h1 {
    color: #4A5568; /* A nice gray */
}

.my-button {
    background-color: #4f46e5; /* Indigo */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.my-button:hover {
    background-color: #4338ca;
}`;

        // Set initial code in textareas
        htmlCode.value = initialHtml;
        cssCode.value = initialCss;
        
        /**
         * Updates the live preview iframe with the user's code.
         */
        function runCode() {
            const html = htmlCode.value;
            const css = cssCode.value;

            const previewDocument = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <style>
                        ${css}
                    </style>
                </head>
                <body>
                    ${html}
                </body>
                </html>
            `;
            
            // Using srcdoc is a secure way to inject content into an iframe
            previewPanel.srcdoc = previewDocument;
        }

        /**
         * Clears all code from the editors and the preview.
         */
        function resetCode() {
            htmlCode.value = '';
            cssCode.value = '';
            previewPanel.srcdoc = ''; // Clear the preview
        }
        
        /**
         * Toggles the visibility of the mobile navigation menu with animation.
         */
        function toggleMobileMenu() {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0', '-translate-y-2');
                }, 10);
            } else {
                mobileMenu.classList.add('opacity-0', '-translate-y-2');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        }

        // --- Dark Mode Logic ---
        const enableDarkMode = () => {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            sunIcons.forEach(icon => icon.classList.add('hidden'));
            moonIcons.forEach(icon => icon.classList.remove('hidden'));
        };

        const disableDarkMode = () => {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            sunIcons.forEach(icon => icon.classList.remove('hidden'));
            moonIcons.forEach(icon => icon.classList.add('hidden'));
        };

        // Check for saved theme preference or system preference
        const userTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (userTheme === 'dark' || (!userTheme && systemPrefersDark)) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }

        // Add event listeners
        runButton.addEventListener('click', runCode);
        resetButton.addEventListener('click', resetCode);
        hamburgerButton.addEventListener('click', toggleMobileMenu);
        darkModeToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                if (document.documentElement.classList.contains('dark')) {
                    disableDarkMode();
                } else {
                    enableDarkMode();
                }
            });
        });

        // Run the code on initial page load
        runCode();