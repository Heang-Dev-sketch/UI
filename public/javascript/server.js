        // --- DATA ---
        // Simulating a backend database with JavaScript objects

        const userProgress = {
            points: 250,
            level: 2,
            completedLessons: new Set(['html-1']),
            badges: new Set(['html-beginner']),
        };

        const badges = {
            'html-beginner': { name: 'HTML Novice', icon: '🔰', description: 'Completed your first HTML lesson.' },
            'html-coder': { name: 'HTML Coder', icon: '💻', description: 'Mastered the basics of HTML.' },
            'css-stylist': { name: 'CSS Stylist', icon: '🎨', description: 'Styled your first CSS components.' },
            'js-scripter': { name: 'JS Scripter', icon: '📜', description: 'Brought a page to life with JavaScript.' },
            'quiz-master': { name: 'Quiz Master', icon: '🧠', description: 'Aced 5 quizzes in a row.' },
            'mktg-guru': { name: 'Marketing Guru', icon: '📈', description: 'Completed your first marketing lesson.' }
        };

        const courses = {
            html: {
                title: 'HTML Fundamentals',
                description: 'Learn the building blocks of the web. Start your journey with HTML.',
                color: 'bg-red-500',
                lessons: [
                    {
                        id: 'html-1',
                        title: 'Your First Web Page',
                        content: `<p>Welcome to HTML! HTML stands for HyperText Markup Language. It's the standard for creating web pages.</p>
                                  <p>The basic structure of an HTML page includes a <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, and <code>&lt;body&gt;</code> tag.</p>
                                  <p>Let's start by creating a simple heading. Use the <code>&lt;h1&gt;</code> tag in the HTML editor below and click 'Run Code'.</p>`,
                        initialCode: {
                            html: `<!-- Your code here -->\n<h1>Hello, World!</h1>`,
                            css: `body {\n  font-family: sans-serif;\n  text-align: center;\n}`,
                            js: `console.log("Welcome to SkillSpark!");`
                        },
                        quiz: [
                            {
                                question: "What does HTML stand for?",
                                options: ["HyperText Markup Language", "High-Level Text Machine Language", "Hyperlink and Text Markup Language"],
                                answer: 0
                            }
                        ],
                        reward: { points: 50, badge: 'html-beginner' }
                    },
                     {
                        id: 'html-2',
                        title: 'Lists and Links',
                        content: `<p>Lists are great for organizing information. There are two main types: unordered lists (<code>&lt;ul&gt;</code>) for bullet points and ordered lists (<code>&lt;ol&gt;</code>) for numbered items. Each item is an <code>&lt;li&gt;</code>.</p>
                                  <p>Links, or anchor tags (<code>&lt;a&gt;</code>), connect your pages. The <code>href</code> attribute defines the destination.</p>
                                  <p>Try creating a list of your favorite websites with links to them.</p>`,
                        initialCode: {
                            html: `<h2>My Favorite Sites</h2>\n<ul>\n  <li><a href="https://google.com">Google</a></li>\n</ul>`,
                            css: `a {\n  color: #4f46e5;\n  text-decoration: none;\n}\na:hover{\n text-decoration: underline;\n}`,
                            js: ``
                        },
                        quiz: [
                            {
                                question: "Which tag is used for a numbered list?",
                                options: ["<ul>", "<li>", "<ol>"],
                                answer: 2
                            },
                             {
                                question: "What attribute specifies the URL for a link?",
                                options: ["src", "href", "link"],
                                answer: 1
                            }
                        ],
                        reward: { points: 75, badge: 'html-coder' }
                    },
                ]
            },
            css: {
                title: 'CSS Styling',
                description: 'Bring your web pages to life with colors, fonts, and layouts.',
                color: 'bg-blue-500',
                lessons: [
                    {
                        id: 'css-1',
                        title: 'Selectors and Colors',
                        content: `<p>CSS (Cascading Style Sheets) is used to style your HTML. You can select elements by their tag name, class, or ID.</p>
                                  <p>Let's change the color of the heading. In the CSS editor, select the <code>h1</code> tag and give it a <code>color</code> property, like <code>color: dodgerblue;</code>.</p>`,
                        initialCode: {
                            html: `<h1>Style Me!</h1>\n<p>This is a paragraph.</p>`,
                            css: `h1 {\n  /* Your CSS here */\n  color: tomato;\n}`,
                            js: ``
                        },
                        quiz: [
                             {
                                question: "How do you select an element with id 'header'?",
                                options: [".header", "#header", "header"],
                                answer: 1
                            }
                        ],
                        reward: { points: 50, badge: 'css-stylist' }
                    }
                ]
            },
            marketing: {
                title: 'Digital Marketing 101',
                description: 'Learn SEO, social media, and content strategy to boost online presence.',
                color: 'bg-green-500',
                lessons: [
                    {
                        id: 'mktg-1',
                        title: 'What is SEO?',
                        content: `<p>SEO stands for <strong>Search Engine Optimization</strong>. It's the process of improving your site to increase its visibility for relevant searches.</p>
                                  <p>Better visibility in search results, like Google, can drive more traffic to your website. Key components include <code>keywords</code>, <code>on-page SEO</code>, and <code>backlinks</code>.</p>
                                  <p>In the editor below, try listing some keywords for a local coffee shop.</p>`,
                        initialCode: {
                            html: `<h2>Coffee Shop Keywords</h2>\n<ul>\n  <li>best coffee near me</li>\n</ul>`,
                            css: `/* Not applicable for this lesson */`,
                            js: `/* Not applicable for this lesson */`
                        },
                        quiz: [
                             {
                                question: "What is the primary goal of SEO?",
                                options: ["To make a website look prettier.", "To increase a site's visibility in search engines.", "To sell products directly from a search page."],
                                answer: 1
                            }
                        ],
                        reward: { points: 60, badge: 'mktg-guru' }
                    }
                ]
            }
        };

        // --- GEMINI API INTEGRATION ---
        const API_KEY = "AIzaSyAnp_aC5CXuAofssUHAZwPb6bLU3Jju9nU";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;
        
        async function callGemini(prompt, retries = 3, delay = 1000) {
            try {
                const payload = {
                    contents: [{ parts: [{ text: prompt }] }],
                };
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                return result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a response. Please try again.";
            } catch (error) {
                console.error("Gemini API call failed:", error);
                if (retries > 0) {
                    // Exponential backoff
                    await new Promise(res => setTimeout(res, delay));
                    return callGemini(prompt, retries - 1, delay * 2);
                }
                return "An error occurred while contacting the AI. Please check the console for details.";
            }
        }

        // --- MODAL LOGIC ---
        const modal = document.getElementById('ai-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const closeModalBtn = document.getElementById('close-modal-btn');

        function showModal(title) {
            modalTitle.textContent = title;
            modalBody.innerHTML = `<div class="flex justify-center items-center h-24"><div class="loading-spinner"></div></div>`;
            modal.classList.add('visible');
        }

        function updateModalContent(content) {
            modalBody.innerHTML = `<div class="prose">${content.replace(/\n/g, '<br>')}</div>`;
        }

        function hideModal() {
            modal.classList.remove('visible');
        }

        closeModalBtn.addEventListener('click', hideModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });


        // --- STATE & ROUTING ---
        const mainContent = document.getElementById('main-content');

        document.addEventListener('DOMContentLoaded', () => {
            renderDashboard();
            
            document.getElementById('home-link').addEventListener('click', (e) => { e.preventDefault(); renderDashboard(); });
            document.getElementById('dashboard-link').addEventListener('click', (e) => { e.preventDefault(); renderDashboard(); });
            document.getElementById('progress-link').addEventListener('click', (e) => { e.preventDefault(); renderProgress(); });
        });

        function clearContent() {
            mainContent.innerHTML = '';
        }
        
        function animateContent(element) {
            element.classList.add('page-enter');
        }

        // --- RENDER FUNCTIONS ---

        function renderDashboard() {
            clearContent();
            const dashboardEl = document.createElement('div');
            
            // User progress summary
            const pointsNeeded = (userProgress.level * 200);
            const progressPercent = Math.min(100, Math.floor((userProgress.points / pointsNeeded) * 100));

            dashboardEl.innerHTML = `
                <div class="bg-white p-6 rounded-xl shadow-lg mb-8 border-l-4 border-indigo-500">
                    <h2 class="text-2xl font-bold text-gray-800">Welcome Back!</h2>
                    <p class="text-gray-500 mb-4">Let's pick up where you left off.</p>
                    <div class="flex items-center space-x-4">
                        <div class="text-center">
                            <p class="text-3xl font-bold text-indigo-600">${userProgress.points}</p>
                            <p class="text-sm text-gray-500">Points</p>
                        </div>
                        <div class="text-center">
                            <p class="text-3xl font-bold text-pink-500">${userProgress.level}</p>
                            <p class="text-sm text-gray-500">Level</p>
                        </div>
                    </div>
                    <div class="mt-4">
                         <p class="text-sm font-semibold text-gray-600 mb-1">Level Progress (${progressPercent}%)</p>
                         <div class="w-full bg-gray-200 rounded-full h-4">
                            <div class="bg-gradient-to-r from-indigo-500 to-pink-500 h-4 rounded-full progress-bar-inner" style="width: ${progressPercent}%"></div>
                         </div>
                    </div>
                </div>
                <h3 class="text-3xl font-bold mb-6 gradient-text">Available Courses</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${Object.entries(courses).map(([courseId, course]) => `
                        <div class="course-card ${course.color} text-white p-6 rounded-xl shadow-lg flex flex-col justify-between cursor-pointer" data-course-id="${courseId}">
                            <div>
                                <h4 class="text-2xl font-bold mb-2">${course.title}</h4>
                                <p class="opacity-90">${course.description}</p>
                            </div>
                            <button class="mt-4 bg-white text-gray-800 font-bold py-2 px-4 rounded-lg self-start hover:bg-gray-200 transition duration-300">Start Learning</button>
                        </div>
                    `).join('')}
                </div>
            `;
            mainContent.appendChild(dashboardEl);
            animateContent(dashboardEl);
            
            // Add event listeners to course cards
            dashboardEl.querySelectorAll('.course-card').forEach(card => {
                card.addEventListener('click', () => {
                    const courseId = card.dataset.courseId;
                    renderLesson(courseId, 0); // Start with the first lesson
                });
            });
        }
        
        function renderLesson(courseId, lessonIndex) {
            clearContent();
            const course = courses[courseId];
            const lesson = course.lessons[lessonIndex];
            const isCompleted = userProgress.completedLessons.has(lesson.id);

            const lessonEl = document.createElement('div');
            lessonEl.innerHTML = `
                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                             <h2 class="text-3xl font-bold text-gray-800">${lesson.title}</h2>
                             <p class="text-indigo-600 font-semibold">${course.title}</p>
                        </div>
                        ${isCompleted ? `<span class="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Completed</span>` : ''}
                    </div>

                    <!-- Lesson Content -->
                    <div id="lesson-prose" class="prose max-w-none text-gray-600 mb-6">
                        ${lesson.content}
                    </div>
                    <button id="explain-selection-btn" class="mb-8 bg-purple-100 text-purple-700 font-semibold py-2 px-4 rounded-lg hover:bg-purple-200 transition duration-300 hidden">
                        ✨ Explain Selection
                    </button>

                    <!-- Live Editor -->
                    <div class="bg-gray-100 p-4 rounded-lg">
                         <div class="flex justify-between items-center mb-4">
                            <h3 class="text-xl font-bold text-gray-700">Live Practice Editor</h3>
                            <button id="ask-sparky-btn" class="bg-amber-400 text-amber-900 font-bold py-2 px-4 rounded-lg hover:bg-amber-500 transition duration-300">✨ Ask Sparky for a Hint</button>
                        </div>
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- Code Panes -->
                            <div>
                                <div class="relative mb-4">
                                    <span class="code-editor-label">HTML</span>
                                    <textarea id="html-editor" class="code-editor w-full">${lesson.initialCode.html}</textarea>
                                </div>
                                <div class="relative mb-4">
                                     <span class="code-editor-label">CSS</span>
                                    <textarea id="css-editor" class="code-editor w-full">${lesson.initialCode.css}</textarea>
                                </div>
                                 <div class="relative">
                                     <span class="code-editor-label">JS</span>
                                    <textarea id="js-editor" class="code-editor w-full">${lesson.initialCode.js}</textarea>
                                </div>
                            </div>
                            <!-- Preview Pane -->
                            <div>
                                <iframe id="preview-frame" class="w-full h-full bg-white rounded-lg border-2 border-gray-300 min-h-[490px]"></iframe>
                            </div>
                        </div>
                        <button id="run-code-btn" class="mt-4 w-full lg:w-auto bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center space-x-2">
                             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                             <span>Run Code</span>
                        </button>
                    </div>

                    <!-- Quiz Section -->
                    <div id="quiz-container" class="mt-10 pt-6 border-t border-gray-200">
                       <h3 class="text-2xl font-bold mb-4 gradient-text">Knowledge Check</h3>
                       <div id="quiz-items-wrapper">
                           ${lesson.quiz.map((q, index) => `
                               <div class="quiz-item mb-6" data-quiz-index="${index}">
                                   <p class="font-semibold mb-3 text-gray-700">${index + 1}. ${q.question}</p>
                                   <div class="space-y-2">
                                       ${q.options.map((opt, optIndex) => `
                                           <button class="quiz-option block w-full text-left p-3 border-2 border-gray-300 rounded-lg hover:bg-indigo-50 hover:border-indigo-400 transition" data-option-index="${optIndex}">
                                               ${opt}
                                           </button>
                                       `).join('')}
                                   </div>
                                    <div class="explanation-placeholder mt-2"></div>
                               </div>
                           `).join('')}
                       </div>
                       <button id="submit-quiz-btn" class="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled>Submit Quiz</button>
                       <div id="quiz-feedback" class="mt-4"></div>
                    </div>
                    
                    <!-- Navigation -->
                    <div class="flex justify-between mt-8">
                        ${lessonIndex > 0 ? `<button id="prev-lesson-btn" class="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">Previous</button>` : '<div></div>'}
                        ${lessonIndex < course.lessons.length - 1 ? `<button id="next-lesson-btn" class="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">Next Lesson</button>`: '<div></div>'}
                    </div>
                </div>
            `;
            mainContent.appendChild(lessonEl);
            animateContent(lessonEl);
            
            // --- Lesson Logic ---
            const runCodeBtn = document.getElementById('run-code-btn');
            const previewFrame = document.getElementById('preview-frame');
            
            function updatePreview() {
                const html = document.getElementById('html-editor').value;
                const css = document.getElementById('css-editor').value;
                const js = document.getElementById('js-editor').value;
                const source = `
                    <html>
                        <head><style>${css}</style></head>
                        <body>
                            ${html}
                            <script>${js}<\/script>
                        </body>
                    </html>
                `;
                previewFrame.srcdoc = source;
            }
            
            runCodeBtn.addEventListener('click', updatePreview);
            updatePreview(); // Initial run
            
            // --- GEMINI FEATURE EVENT LISTENERS ---
            document.getElementById('ask-sparky-btn').addEventListener('click', async () => {
                const htmlCode = document.getElementById('html-editor').value;
                const cssCode = document.getElementById('css-editor').value;
                const jsCode = document.getElementById('js-editor').value;

                showModal("Asking Sparky for a hint...");

                const prompt = `You are a friendly and encouraging coding tutor for beginners named Sparky. A student is working on a lesson titled "${lesson.title}".
                
                Lesson content:
                ${lesson.content.replace(/<[^>]*>/g, ' ')}

                Student's code:
                HTML:
                ${htmlCode}
                CSS:
                ${cssCode}
                JS:
                ${jsCode}

                Based on their code and the lesson, provide a simple, short (2-3 sentences) hint to help them solve the exercise. Do NOT give the direct answer. Be encouraging.`;

                const response = await callGemini(prompt);
                updateModalContent(response);
            });
            
            const lessonProse = document.getElementById('lesson-prose');
            const explainBtn = document.getElementById('explain-selection-btn');
            
            lessonProse.addEventListener('mouseup', () => {
                const selection = window.getSelection().toString().trim();
                if (selection.length > 10) { // Only show for reasonable selections
                    explainBtn.classList.remove('hidden');
                } else {
                    explainBtn.classList.add('hidden');
                }
            });

             explainBtn.addEventListener('click', async () => {
                const selection = window.getSelection().toString().trim();
                if (selection) {
                    showModal(`Explaining "${selection}"...`);
                    const prompt = `You are an expert teacher. Explain the following concept from a web development lesson in a simple and clear way for a beginner: "${selection}". Keep it concise.`;
                    const response = await callGemini(prompt);
                    updateModalContent(response);
                }
                explainBtn.classList.add('hidden');
            });


            // Quiz interaction
            const quizContainer = document.getElementById('quiz-container');
            const submitBtn = document.getElementById('submit-quiz-btn');
            const userAnswers = new Array(lesson.quiz.length).fill(null);

            quizContainer.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', () => {
                    const quizItem = option.closest('.quiz-item');
                    const quizIndex = parseInt(quizItem.dataset.quizIndex);
                    const optionIndex = parseInt(option.dataset.optionIndex);
                    
                    userAnswers[quizIndex] = optionIndex;
                    
                    // Update visuals
                    quizItem.querySelectorAll('.quiz-option').forEach(btn => btn.classList.remove('selected'));
                    option.classList.add('selected');
                    
                    // Enable submit button if all questions answered
                    if (userAnswers.every(answer => answer !== null)) {
                        submitBtn.disabled = false;
                    }
                });
            });

            submitBtn.addEventListener('click', () => {
                let correctCount = 0;
                lesson.quiz.forEach((q, index) => {
                    const selectedOptionIndex = userAnswers[index];
                    const quizItem = quizContainer.querySelector(`[data-quiz-index="${index}"]`);
                    const options = quizItem.querySelectorAll('.quiz-option');
                    
                    options.forEach(opt => opt.disabled = true); // Disable after submitting

                    if(selectedOptionIndex === q.answer) {
                        correctCount++;
                        options[selectedOptionIndex].classList.add('correct');
                    } else {
                        options[selectedOptionIndex].classList.add('incorrect');
                        options[q.answer].classList.add('correct'); // Show correct answer
                        
                        // Add AI explanation button for incorrect answers
                        const placeholder = quizItem.querySelector('.explanation-placeholder');
                        const explainButton = document.createElement('button');
                        explainButton.className = 'bg-blue-100 text-blue-700 font-semibold py-1 px-3 rounded-lg hover:bg-blue-200 transition duration-300 text-sm';
                        explainButton.innerHTML = '✨ Explain Answer';
                        explainButton.onclick = async () => {
                            showModal("Getting an explanation...");
                            const prompt = `You are a helpful teacher. A student answered a quiz question incorrectly. The question was: "${q.question}". They chose "${q.options[selectedOptionIndex]}", but the correct answer was "${q.options[q.answer]}". Please explain why the correct answer is right in a simple, brief paragraph.`;
                            const response = await callGemini(prompt);
                            updateModalContent(response);
                        };
                        placeholder.appendChild(explainButton);
                    }
                });
                
                const feedbackEl = document.getElementById('quiz-feedback');
                if (correctCount === lesson.quiz.length) {
                    feedbackEl.innerHTML = `<p class="text-green-600 font-bold text-lg">Congratulations! You passed! You've earned ${lesson.reward.points} points.</p>`;
                    if (!userProgress.completedLessons.has(lesson.id)) {
                        userProgress.points += lesson.reward.points;
                        if (lesson.reward.badge) {
                            userProgress.badges.add(lesson.reward.badge);
                        }
                        userProgress.completedLessons.add(lesson.id);
                        checkLevelUp();
                    }
                } else {
                     feedbackEl.innerHTML = `<p class="text-red-600 font-bold text-lg">Not quite! You got ${correctCount}/${lesson.quiz.length} correct. Review the lesson and try again.</p>`;
                }
                submitBtn.style.display = 'none'; // Hide after submission
            });
            
            // Lesson navigation
            const prevBtn = document.getElementById('prev-lesson-btn');
            const nextBtn = document.getElementById('next-lesson-btn');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => renderLesson(courseId, lessonIndex - 1));
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', () => renderLesson(courseId, lessonIndex + 1));
            }
        }
        
        function renderProgress() {
            clearContent();
            const progressEl = document.createElement('div');

            progressEl.innerHTML = `
                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <h2 class="text-3xl font-bold mb-2 gradient-text">My Progress</h2>
                    <p class="text-gray-500 mb-6">Here's a summary of your awesome learning journey.</p>
                    
                    <!-- Stats Grid -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
                        <div class="bg-indigo-50 p-4 rounded-lg">
                            <p class="text-3xl font-bold text-indigo-600">${userProgress.level}</p>
                            <p class="text-sm font-semibold text-gray-600">Current Level</p>
                        </div>
                        <div class="bg-pink-50 p-4 rounded-lg">
                            <p class="text-3xl font-bold text-pink-600">${userProgress.points}</p>
                            <p class="text-sm font-semibold text-gray-600">Total Points</p>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <p class="text-3xl font-bold text-green-600">${userProgress.completedLessons.size}</p>
                            <p class="text-sm font-semibold text-gray-600">Lessons Done</p>
                        </div>
                        <div class="bg-yellow-50 p-4 rounded-lg">
                            <p class="text-3xl font-bold text-yellow-600">${userProgress.badges.size}</p>
                            <p class="text-sm font-semibold text-gray-600">Badges Earned</p>
                        </div>
                    </div>
                    
                    <!-- Badges Section -->
                    <h3 class="text-2xl font-bold mb-4 text-gray-800">Your Badge Collection</h3>
                    <div class="flex flex-wrap gap-6">
                        ${[...userProgress.badges].map(badgeId => {
                            const badge = badges[badgeId];
                            return `
                            <div class="text-center group">
                                <div class="badge bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center text-5xl shadow-md mb-2 border-4 border-white group-hover:border-yellow-400">
                                    ${badge.icon}
                                </div>
                                <p class="font-bold text-gray-700">${badge.name}</p>
                                <p class="text-xs text-gray-500">${badge.description}</p>
                            </div>`
                        }).join('')}
                         ${Object.keys(badges).filter(b => !userProgress.badges.has(b)).map(badgeId => {
                            const badge = badges[badgeId];
                            return `
                            <div class="text-center group opacity-40">
                                <div class="badge bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center text-5xl shadow-inner mb-2 border-4 border-white">
                                    <span class="text-gray-400">?</span>
                                </div>
                                <p class="font-bold text-gray-500">${badge.name}</p>
                            </div>`
                        }).join('')}
                    </div>
                </div>
            `;
            mainContent.appendChild(progressEl);
            animateContent(progressEl);
        }

        function checkLevelUp() {
            const pointsForNextLevel = userProgress.level * 200;
            if (userProgress.points >= pointsForNextLevel) {
                userProgress.level++;
                // In a real app, you'd show a celebration modal!
                console.log(`Leveled up to Level ${userProgress.level}!`);
            }
        }
