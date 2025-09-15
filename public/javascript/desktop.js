// --- Hamburger Menu Logic ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));


// --- "Run Code" Button Logic ---
const runButtons = document.querySelectorAll('.run-btn');

runButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Find the <pre><code> block that is a sibling of the button
        const codeBlock = button.previousElementSibling;
        if (codeBlock && codeBlock.tagName === 'PRE') {
            const code = codeBlock.querySelector('code').innerText;
            
            // Create a full HTML document string
            // This is a simple template. For CSS examples, it includes a <style> tag.
            const fullHtml = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Code Output</title>
                    <style>
                        body { font-family: sans-serif; padding: 1rem; }
                        /* This block will contain CSS code if it's a CSS example */
                    </style>
                </head>
                <body>
                    ${code}
                </body>
                </html>
            `;
            
            // Open a new window and write the code to it
            const newWindow = window.open();
            newWindow.document.open();
            newWindow.document.write(fullHtml);
            newWindow.document.close();
        }
    });
});