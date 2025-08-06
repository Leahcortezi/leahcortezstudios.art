if (typeof console !== 'undefined') {
    console.log("🔄 Quiz.js loaded - Version 1754411000 - Updated 5-Question Quiz with Better UX !");
}

class PortfolioQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = {}; // Initialize scores object
        
        // === UPDATED QUESTIONS WITH 5 MAIN ARCHETYPES ===
        this.questions = [
            {
            id: 1,
            text: "What's your biggest art pet peeve?",
            options: [
                { text: "Losing your best file version because 'FinalFinal_V2_REAL.zip' wasn't the real one.", piece: "typographic-interpretation", weight: 3 }, // Perfectionist
                { text: "Someone watching you draw and saying: 'Draw me!'", piece: "anointed-gaze", weight: 3 }, // Emotional Alchemist
                { text: "People touching your work without asking.", piece: "collected-remains", weight: 3 }, // Chaotic Creator
                { text: "'It's just a font, right?' No, it's 3 hours of research and 47 iterations.", piece: "double-sided-poster", weight: 3 }, // Activist Artist
                { text: "When people ask what medium you used and get confused by your 12-part answer.", piece: "elements-book", weight: 3 } // Restless Experimenter
            ]
            },
            {
            id: 2,
            text: "How do you start a new piece?",
            options: [
                { text: "Sketches, research, color studies, then more sketches.", piece: "typographic-interpretation", weight: 3 }, // Perfectionist
                { text: "Wait for the feeling to hit, then follow where it leads.", piece: "inheritance", weight: 3 }, // Emotional Alchemist
                { text: "Grab whatever's nearby and see what happens.", piece: "gnaw", weight: 3 }, // Chaotic Creator
                { text: "Find the story that needs telling, then figure out how.", piece: "double-sided-poster", weight: 3 }, // Activist Artist
                { text: "Try that technique I saw on TikTok at 2am.", piece: "abyss-bloom", weight: 3 } // Restless Experimenter
            ]
            },
            {
            id: 3,
            text: "What critique comment would ruin your whole week?",
            options: [
                { text: "It just doesn't pop.", piece: "reductive-symbols", weight: 3 }, // Perfectionist
                { text: "This is so dark. What does it even mean?", piece: "inheritance", weight: 3 }, // Emotional Alchemist
                { text: "My kid could do that.", piece: "collected-remains", weight: 3 }, // Chaotic Creator
                { text: "Maybe try something more commercial.", piece: "double-sided-poster", weight: 3 }, // Activist Artist
                { text: "Why didn't you just use AI?", piece: "playing-cards", weight: 3 } // Restless Experimenter
            ]
            },
            {
            id: 4,
            text: "What is art's purpose?",
            options: [
                { text: "To communicate ideas clearly and systematically.", piece: "reductive-symbols", weight: 3 }, // Perfectionist
                { text: "To help process and explore emotions safely.", piece: "anointed-gaze", weight: 3 }, // Emotional Alchemist
                { text: "To celebrate the beauty of process and imperfection.", piece: "gnaw", weight: 3 }, // Chaotic Creator
                { text: "To spread important messages and change minds.", piece: "heaven-on-fire", weight: 3 }, // Activist Artist
                { text: "To push boundaries and explore what's possible.", piece: "unraveling", weight: 3 } // Restless Experimenter
            ]
            },
            {
            id: 5,
            text: "When you scroll through art online, what makes you actually stop and save it?",
            options: [
                { text: "Clean lines and perfect composition that makes you want to reorganize your entire life.", piece: "reductive-symbols", weight: 3 }, // Perfectionist
                { text: "Something raw that hits you right in the feelings before you even know what it is.", piece: "anointed-gaze", weight: 3 }, // Emotional Alchemist
                { text: "Messy, layered pieces where you discover new details every time you look.", piece: "gnaw", weight: 3 }, // Chaotic Creator
                { text: "Bold work that makes a statement and doesn't care who's uncomfortable.", piece: "double-sided-poster", weight: 3 }, // Activist Artist
                { text: "Weird experimental stuff that makes you go down a 2-hour rabbit hole.", piece: "abyss-bloom", weight: 3 } // Restless Experimenter
            ]
            }
        ];

        // === UPDATED ARCHETYPE RESULTS WITH RELATABLE DESCRIPTIONS ===
        this.portfolioData = {
            "anointed-gaze": {
            title: "The Sleepless Sketcher",
            subtitle: "Anointed Gaze",
            category: "Personal Work",
            archetype: {
                essence: "You sketch like you're possessed. Emotional? Maybe. Haunted? Definitely.",
                medium: "Charcoal. Pencil. Crying on the page.",
                strength: "Catching feelings through line work.",
                challenge: "Not every drawing has to be a breakdown."
            },
            description: "You're the artist who pours your soul onto paper. You're drawn to work that feels raw and honest—the kind of art that makes you stop breathing for a second because it captures exactly what you've been feeling but couldn't put into words. Your own work tends to be deeply personal, often created during late nights when emotions run high.",
            quote: "I draw until I disassociate. And then I draw that too.",
            image: "collections/personal/anointed-gaze/images/JPEG/personal6.jpg",
            path: "collections/personal/anointed-gaze/index.html"
            },
            "abuelas-altar": {
            title: "The Sentimental Shrine Builder",
            subtitle: "Abuela's Altar",
            category: "Personal Work",
            archetype: {
                essence: "Your studio smells like old candles, and you treat every found object like it has a soul.",
                medium: "Candles, rosaries, and inherited buttons.",
                strength: "Turning nostalgia into sacred art.",
                challenge: "You can't keep every single object (even if it's cute)."
            },
            description: "You're the artist who sees stories in everything—old photographs, family heirlooms, forgotten objects. You're drawn to art that honors memory and tradition. You love pieces that feel like they hold someone's history, and your own work often incorporates meaningful objects that others might overlook.",
            quote: "Is it trash or an emotional relic? Yes.",
            image: "collections/studio/abuelas-altar/images/JPEG/Studio10.jpg",
            path: "collections/personal/abuelas-altar/index.html"
            },
            "heaven-on-fire": {
            title: "The Beautiful Catastrophist",
            subtitle: "Heaven on Fire",
            category: "Personal Work",
            archetype: {
                essence: "You paint like you're trying to win an emotional apocalypse.",
                medium: "Fiery brushstrokes and paint that gets everywhere.",
                strength: "Making chaos look gorgeous.",
                challenge: "Sometimes you need a break from intensity."
            },
            description: "You're the artist who finds beauty in intensity and isn't afraid to go big. You're drawn to bold, dramatic work that makes people feel something—whether that's awe, discomfort, or pure emotion. You love art that takes risks and refuses to be ignored, and your own work tends to be equally unapologetic.",
            quote: "If it's not dramatic, I'm not interested.",
            image: "collections/personal/heaven-on-fire/images/JPEG/personal7.jpg",
            path: "collections/personal/heaven-on-fire/index.html"
            },
            "inheritance": {
            title: "The Generational Theorist",
            subtitle: "Inheritance",
            category: "Personal Work",
            archetype: {
                essence: "You make art like a therapist with a glue stick.",
                medium: "Yarn, old photos, family secrets.",
                strength: "Turning identity crises into installations.",
                challenge: "Not everything has to be that deep… probably."
            },
            description: "You're the artist who can't help but dig deeper. You're fascinated by work that explores identity, culture, and the complicated layers of who we are. You love art that tells stories about heritage and belonging, and your own work often examines the complex relationships between past and present.",
            quote: "I turned my generational trauma into a design concept.",
            image: "collections/personal/inheritance/images/JPEG/Personal1.jpg",
            path: "collections/personal/inheritance/index.html"
            },
            "gnaw": {
            title: "The Raw Materialist",
            subtitle: "Gnaw",
            category: "Studio Work",
            archetype: {
                essence: "You carve, shred, and rip your way to the truth.",
                medium: "Anything breakable, bendable, or biteable.",
                strength: "Making destruction look intentional.",
                challenge: "Knowing when to stop before everything breaks."
            },
            description: "You're the artist who needs to work with your hands. You're drawn to art that shows the process—the marks, the texture, the evidence of struggle. You love pieces that feel tactile and real, and you probably can't resist touching sculptures even when you're not supposed to. Your own work is physical and honest.",
            quote: "I sanded it down to the bone and then kept going.",
            image: "collections/studio/gnaw/images/JPEG/Studio6.jpg",
            path: "collections/studio/gnaw/index.html"
            },
            "unraveling": {
            title: "The Emotional Engineer",
            subtitle: "Unraveling",
            category: "Studio Work",
            archetype: {
                essence: "You sculpt your anxiety into wire, knots, and small controlled messes.",
                medium: "Wire, thread, unresolved feelings.",
                strength: "Making chaos look organized.",
                challenge: "You might be overthinking this."
            },
            description: "You're the artist who finds order in chaos. You're drawn to art that feels like controlled complexity—pieces that seem intricate but have an underlying logic. You love work that makes you look closer and discover hidden patterns. Your own art tends to be methodical, even when dealing with emotional subjects.",
            quote: "If I can't untangle my thoughts, I'll just twist them into art.",
            image: "collections/studio/unraveling/images/JPEG/Studio5.jpg",
            path: "collections/studio/unraveling/index.html"
            },
            "abyss-bloom": {
            title: "The Weird Creature Kid",
            subtitle: "Abyss Bloom",
            category: "Studio Work",
            archetype: {
                essence: "You make squishy little monsters and call it art.",
                medium: "Glowing goo, sad eyes, body horror lite™.",
                strength: "Turning nightmares into adoptable pets.",
                challenge: "People keep asking if you're okay (you are)."
            },
            description: "You're the artist who loves the weird and wonderful. You're drawn to art that makes people do a double-take—pieces that are slightly unsettling but oddly charming. You appreciate work that pushes boundaries and makes you question what art can be. Your own creations tend to be experimental and delightfully strange.",
            quote: "This one has four limbs and trauma. I love them.",
            image: "collections/studio/abyss-bloom/images/JPEG/studio2.jpg",
            path: "collections/studio/abyss-bloom/index.html"
            },
            "collected-remains": {
            title: "The Trash Archaeologist",
            subtitle: "Collected Remains",
            category: "Studio Work",
            archetype: {
                essence: "You collect weird little objects 'for a project.'",
                medium: "Broken things with emotional potential.",
                strength: "Finding magic in literal garbage.",
                challenge: "Your workspace is a danger zone."
            },
            description: "You're the artist who sees potential everywhere. You're drawn to art made from unexpected materials—found objects, recycled materials, things that have stories. You love pieces that transform the mundane into something meaningful. Your own work probably involves a lot of collecting and your studio is full of 'future art supplies.'",
            quote: "It's not hoarding if it's conceptual.",
            image: "collections/studio/collected-remains/images/JPEG/Studio1.jpg",
            path: "collections/studio/collected-remains/index.html"
            },
            "typographic-interpretation": {
            title: "The Kerning Critic",
            subtitle: "Typographic Interpretation",
            category: "Design Work",
            archetype: {
                essence: "You see fonts the way some people see auras.",
                medium: "Grids, rulers, and passive-aggressive typefaces.",
                strength: "Making letters feel things.",
                challenge: "Perfectionism in places no one notices but you."
            },
            description: "You're the artist who believes the details matter most. You're drawn to clean, purposeful design where every element has a reason for being there. You love work that shows restraint and precision. You probably have strong opinions about fonts and can spot bad kerning from across the room. Your own work is polished and intentional.",
            quote: "This font pairing is giving me a migraine.",
            image: "collections/design/typographic-interpretation/images/design5.jpg",
            path: "collections/design/typographic-interpretation/index-case-study.html"
            },
            "playing-cards": {
            title: "The Organized Chaos Theorist",
            subtitle: "Scientific Revolution Playing Cards",
            category: "Design Work",
            archetype: {
                essence: "You have 14 sketchbooks, 37 tabs open, and one very specific system that only you understand.",
                medium: "Color codes, timelines, trivia.",
                strength: "Turning chaos into clever structure.",
                challenge: "You start 10 projects for every 1 you finish."
            },
            description: "You're the artist who loves complex projects with lots of moving parts. You're drawn to work that's both educational and beautiful—pieces that teach you something while also being visually engaging. You love clever concepts and systematic thinking. Your own projects tend to be research-heavy and carefully planned.",
            quote: "This deck is about science, but also about me winning.",
            image: "collections/design/themed-playing-card-design/images/design1-2.jpg",
            path: "collections/design/themed-playing-card-design/index-case-study.html"
            },
            "elements-book": {
            title: "The Conceptual Clown",
            subtitle: "Elements & Principles Book Cover",
            category: "Design Work",
            archetype: {
                essence: "You love to make people laugh—then immediately regret it by hitting them with deep meaning.",
                medium: "Bright colors, visual puns, chaotic joy.",
                strength: "Making people feel things after they laugh.",
                challenge: "Hiding behind the joke a little too well."
            },
            description: "You're the artist who uses humor to explore deeper ideas. You're drawn to work that's playful but smart—pieces that make you smile and then make you think. You love art that doesn't take itself too seriously but still has something important to say. Your own work probably makes people laugh before it makes them reflect.",
            quote: "Yes, it's silly. No, I'm not explaining it.",
            image: "collections/design/elements-and-principles-book-cover/images/Design1.jpg",
            path: "collections/design/elements-and-principles-book-cover/index-case-study.html"
            },
            "double-sided-poster": {
            title: "The Design Vigilante",
            subtitle: "Double-Sided Poster",
            category: "Design Work",
            archetype: {
                essence: "You make protest posters for fun.",
                medium: "Bold type, strong opinions, minimal chill.",
                strength: "Making people read and feel things.",
                challenge: "Subtlety is not your thing (and that's fine)."
            },
            description: "You're the artist who believes art should change things. You're drawn to work with strong messages and bold visuals—pieces that aren't afraid to take a stand. You love art that provokes discussion and challenges the status quo. Your own work probably makes people uncomfortable in the best way possible.",
            quote: "This typeface is yelling for a reason.",
            image: "collections/design/double-sided-poster/images/Design8.jpg",
            path: "collections/design/double-sided-poster/index-case-study.html"
            },
            "reductive-symbols": {
            title: "The Shape Whisperer",
            subtitle: "Reductive Symbols",
            category: "Design Work",
            archetype: {
                essence: "You believe less is more, and more is… annoying.",
                medium: "Grids, dots, shapes that whisper deep things.",
                strength: "Maximum meaning, minimum fluff.",
                challenge: "People don't always 'get it' (they're wrong)."
            },
            description: "You're the artist who finds power in simplicity. You're drawn to minimal work that says a lot with very little—clean lines, strategic use of space, subtle but meaningful choices. You appreciate when every element serves a purpose. Your own work is probably elegant and spare, focused on essential elements rather than decoration.",
            quote: "I reduced the concept to a single pixel. You're welcome.",
            image: "collections/design/reductive-symbols/images/design4.jpg",
            path: "collections/design/reductive-symbols/index-case-study.html"
            }
        };

        this.init();
        this.validateQuizData();
    }

    validateQuizData() {
        // Check all descriptions start with "You're the"
        let invalidDescriptions = [];
        Object.entries(this.portfolioData).forEach(([key, data]) => {
            if (!data.description.startsWith("You're the")) {
                invalidDescriptions.push(`${key}: ${data.description.substring(0, 50)}...`);
            }
        });
        
        if (invalidDescriptions.length > 0) {
            console.error('❌ Found piece descriptions instead of archetype descriptions:', invalidDescriptions);
        } else {
            console.log("✅ All descriptions are archetype-focused!");
        }
        
        // Count total pieces
        console.log(`📊 Quiz has ${Object.keys(this.portfolioData).length} possible results`);
        
        // Check for entre-mundos
        if (this.portfolioData['entre-mundos']) {
            console.error('❌ entre-mundos still found in quiz data!');
        } else {
            console.log("✅ entre-mundos successfully removed");
        }
    }

    init() {
        this.bindEvents();
        this.preloadImages();
    }

    preloadImages() {
        // Preload logo
        const logo = new Image();
        logo.src = 'images/logo/logo3.png';
        logo.onload = () => console.log("✅ Logo preloaded");
        
        // Preload portfolio images
        Object.values(this.portfolioData).forEach(data => {
            const img = new Image();
            img.src = data.image;
            img.onload = () => console.log(`✅ Image preloaded: ${data.title}`);
        });
    }

    bindEvents() {
        // Start quiz button
        const startButton = document.querySelector('#start-quiz-btn');
        if (startButton) {
            startButton.addEventListener('click', () => this.startQuiz());
        }

        // Next question button
        const nextButton = document.querySelector('#next-question-btn');
        if (nextButton) {
            nextButton.addEventListener('click', () => this.nextQuestion());
        }

        // Retake quiz button
        const retakeButton = document.querySelector('#retake-quiz-btn');
        if (retakeButton) {
            retakeButton.addEventListener('click', () => this.resetQuiz());
        }
    }

    startQuiz() {
        console.log("🎯 Starting quiz...");
        this.resetProgress();
        this.showSection('quiz-questions');
        this.displayQuestion();
    }

    resetProgress() {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = '0%';
        }
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        
        // Update progress with smooth animation
        this.updateProgress();
        
        // Update question text
        const questionText = document.querySelector('#question-text');
        if (questionText) {
            questionText.textContent = question.text;
        }
        
        // Update answer options
        const answerOptions = document.querySelector('#answer-options');
        if (answerOptions) {
            answerOptions.innerHTML = question.options.map((option, index) => `
                <button class="option-btn quiz-btn" data-piece="${option.piece}" data-index="${index}">
                    ${option.text}
                </button>
            `).join('');

            // Bind option buttons
            const optionButtons = answerOptions.querySelectorAll('.option-btn');
            optionButtons.forEach(button => {
                button.addEventListener('click', (e) => this.selectAnswer(e));
            });
        }
    }

    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const currentQuestionSpan = document.querySelector('#current-question');
        const totalQuestionsSpan = document.querySelector('#total-questions');
        
        const currentQuestionNumber = this.currentQuestion + 1;
        const totalQuestions = this.questions.length;
        const progressPercentage = (currentQuestionNumber / totalQuestions) * 100;
        
        // Update progress bar with smooth animation
        if (progressFill) {
            // Add a subtle pause before updating for visual appeal
            setTimeout(() => {
                progressFill.style.width = `${progressPercentage}%`;
                
                // Add a pulsing effect when progress updates
                progressFill.style.animationDuration = '1s';
                setTimeout(() => {
                    progressFill.style.animationDuration = '2s';
                }, 1000);
            }, 100);
        }
        
        // Update progress text
        if (currentQuestionSpan) {
            currentQuestionSpan.textContent = currentQuestionNumber;
        }
        if (totalQuestionsSpan) {
            totalQuestionsSpan.textContent = totalQuestions;
        }

        // Log progress for debugging
        console.log(`📈 Progress: ${currentQuestionNumber}/${totalQuestions} (${progressPercentage.toFixed(1)}%)`);
    }

    selectAnswer(event) {
        const button = event.target;
        const piece = button.dataset.piece;

        // Store answer as piece reference
        this.answers.push(piece);

        // Add score to the corresponding portfolio piece
        if (!this.scores[piece]) {
            this.scores[piece] = 0;
        }
        this.scores[piece]++;

        // Visual feedback
        button.classList.add('selected');
        
        setTimeout(() => {
            if (this.currentQuestion < this.questions.length - 1) {
                this.currentQuestion++;
                this.displayQuestion();
            } else {
                this.calculateResult();
            }
        }, 500);
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.displayQuestion();
        }
    }

    calculateResult() {
        console.log("🧮 Calculating quiz result...");
        console.log("📊 Final scores:", this.scores);
        
        // Find the piece with the highest score
        let winningPiece = null;
        let highestScore = 0;
        
        for (const [piece, score] of Object.entries(this.scores)) {
            if (score > highestScore) {
                highestScore = score;
                winningPiece = piece;
            }
        }
        
        // If no clear winner, pick a random piece from those answered
        if (!winningPiece && this.answers.length > 0) {
            winningPiece = this.answers[Math.floor(Math.random() * this.answers.length)];
        }

        const result = this.portfolioData[winningPiece];
        console.log(`🎯 Result: ${result.title} (${winningPiece})`);
        
        this.displayResult(result);
    }

    displayResult(result) {
        console.log(`🎨 Displaying result: ${result.title}`);
        console.log(`📝 Description: ${result.description}`);
        this.showSection('quiz-results');
        
        const resultContainer = document.querySelector('.result-container');
        if (resultContainer) {
            resultContainer.innerHTML = `
                <div class="result-content">
                    <div class="result-image">
                        <img src="${result.image}" alt="${result.title}" loading="lazy" onerror="this.style.display='none';" />
                    </div>
                    <div class="result-text">
                        <h2 class="result-title">${result.title}</h2>
                        <h3 class="result-subtitle">${result.subtitle}</h3>
                        <div class="archetype-summary">
                            <div class="archetype-trait">
                                <strong>Essence:</strong> ${result.archetype.essence}
                            </div>
                            <div class="archetype-trait">
                                <strong>Medium:</strong> ${result.archetype.medium}
                            </div>
                            <div class="archetype-trait">
                                <strong>Strength:</strong> ${result.archetype.strength}
                            </div>
                            <div class="archetype-trait">
                                <strong>Challenge:</strong> ${result.archetype.challenge}
                            </div>
                        </div>
                        <p class="result-description">${result.description}</p>
                        <blockquote class="result-quote">"${result.quote}"</blockquote>
                        
                        <div class="result-actions">
                            <a href="${result.path}" class="quiz-btn primary">View Piece</a>
                            <button id="retake-quiz-btn" class="quiz-btn secondary">Retake Quiz</button>
                        </div>
                    </div>
                </div>
            `;

            // Bind retake button
            const retakeButton = resultContainer.querySelector('#retake-quiz-btn');
            if (retakeButton) {
                retakeButton.addEventListener('click', () => this.resetQuiz());
            }
        }
    }

    resetQuiz() {
        console.log("🔄 Resetting quiz...");
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = {};
        this.resetProgress();
        this.showSection('quiz-start');
    }

    showSection(sectionClass) {
        // Hide all quiz sections
        document.querySelectorAll('.quiz-start, .quiz-questions, .quiz-results').forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
        });
        
        // Show the requested section
        const targetSection = document.querySelector(`.${sectionClass}`);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');
        }
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Initializing Portfolio Quiz...");
    new PortfolioQuiz();
});
