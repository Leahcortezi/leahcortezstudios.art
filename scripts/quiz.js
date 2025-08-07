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
                { text: "Art that's overly simple - like someone just splashed paint and called it deep.", piece: "reductive-symbols", weight: 3 }, // Values technical skill/complexity
                { text: "Art that's just pretty to look at but has zero emotional depth or meaning.", piece: "inheritance", weight: 3 }, // Needs emotional substance
                { text: "Perfectly polished art that feels soulless - where's the human touch?", piece: "gnaw", weight: 3 }, // Values authenticity/rawness
                { text: "Art that ignores real world problems and stays in its safe little bubble.", piece: "double-sided-poster", weight: 3 }, // Wants social relevance
                { text: "Art that's exactly like everything else - no originality or risk-taking.", piece: "abyss-bloom", weight: 3 } // Values uniqueness/innovation
            ]
            },
            {
            id: 2,
            text: "How do you usually create?",
            options: [
                { text: "Plan everything out first - sketches, references, color swatches, the works.", piece: "typographic-interpretation", weight: 3 }, // Methodical planner
                { text: "Start when inspiration strikes and let my emotions guide the process.", piece: "inheritance", weight: 3 }, // Intuitive emotional creator
                { text: "Jump in with whatever's around and figure it out as I go.", piece: "gnaw", weight: 3 }, // Spontaneous experimenter
                { text: "Find something I care about deeply, then find the best way to express it.", piece: "double-sided-poster", weight: 3 }, // Message-driven
                { text: "Try new techniques constantly - tutorials, experiments, happy accidents.", piece: "abyss-bloom", weight: 3 } // Technique explorer
            ]
            },
            {
            id: 3,
            text: "What feedback would hurt your feelings the most?",
            options: [
                { text: "\"It's not quite there yet\" - when you thought it was perfect.", piece: "reductive-symbols", weight: 3 }, // Perfectionist
                { text: "\"I don't get it\" - when it means everything to you.", piece: "inheritance", weight: 3 }, // Personal expression
                { text: "\"It looks unfinished\" - but that's exactly how you wanted it.", piece: "collected-remains", weight: 3 }, // Process-focused
                { text: "\"It's pretty but what's the point?\" - missing the whole message.", piece: "double-sided-poster", weight: 3 }, // Purpose-driven
                { text: "\"Weird for the sake of being weird\" - when you're genuinely exploring.", piece: "playing-cards", weight: 3 } // Experimental
            ]
            },
            {
            id: 4,
            text: "Why do you make art?",
            options: [
                { text: "To master my craft and create something technically beautiful.", piece: "reductive-symbols", weight: 3 }, // Skill mastery
                { text: "To process my feelings and connect with others who feel the same.", piece: "anointed-gaze", weight: 3 }, // Emotional processing
                { text: "To celebrate the beauty in everyday chaos and imperfection.", piece: "gnaw", weight: 3 }, // Finding beauty in process
                { text: "To say something important that needs to be heard.", piece: "heaven-on-fire", weight: 3 }, // Message delivery
                { text: "To explore possibilities and see what happens when I try new things.", piece: "unraveling", weight: 3 } // Exploration/discovery
            ]
            },
            {
            id: 5,
            text: "What draws you to a piece of art?",
            options: [
                { text: "Incredible skill and craftsmanship that makes you wonder 'how did they do that?'", piece: "reductive-symbols", weight: 3 }, // Technical appreciation
                { text: "Something that hits you emotionally before you even understand why.", piece: "anointed-gaze", weight: 3 }, // Emotional connection
                { text: "Pieces with layers and textures you want to touch and explore forever.", piece: "gnaw", weight: 3 }, // Tactile/process interest
                { text: "Bold work that makes a statement and sparks important conversations.", piece: "double-sided-poster", weight: 3 }, // Impact-focused
                { text: "Unique, experimental pieces that make you see things differently.", piece: "abyss-bloom", weight: 3 } // Innovation appreciation
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
            description: "You're the artist who draws at 3am when you can't sleep because your brain won't shut up. You keep a sketchbook by your bed and probably have charcoal under your fingernails more often than not. People always ask if you're okay after seeing your work, and honestly, you're never quite sure how to answer that.",
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
            description: "You're the artist who saves everything because 'it might be useful for a project someday.' Your studio is part art space, part museum of random family artifacts. You take photos of old objects at thrift stores even when you don't buy them, just in case you need reference material later.",
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
            description: "You're the artist who goes big or goes home. You've never made anything described as 'subtle' and you're fine with that. Your workspace is covered in paint splatters, your clothes are permanently stained, and you've definitely gotten noise complaints from neighbors. When people say your art is 'a lot,' you take it as a compliment.",
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
            description: "You're the artist who turns every family dinner into an impromptu therapy session about identity and culture. You have strong opinions about representation in museums and probably write long Instagram captions. You've definitely made your relatives uncomfortable by asking them to pose for 'artistic documentation.'",
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
            description: "You're the artist who can't walk past interesting textures without touching them. You collect wood scraps, interesting rocks, and fabric samples 'just because.' Your hands are always slightly roughed up from your latest project, and you've definitely injured yourself in the name of art more than once.",
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
            description: "You're the artist who has a very specific organizational system that looks like chaos to everyone else. You know exactly which pile of supplies you need, and god help anyone who tries to 'clean up' your space. You probably have anxiety about your anxiety, and you channel all of that energy into intricate, obsessive work.",
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
            description: "You're the artist who makes things that make people say 'what the hell is that?' and you live for that reaction. You're probably the person who had an 'interesting' senior thesis that made your professors very nervous. You collect weird materials and your browser history is concerning but purely for artistic research.",
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
            description: "You're the artist who dumpster dives for supplies and calls it 'urban archaeology.' Your car is full of random objects you found that might become art someday. You've definitely had to explain to security guards that yes, you really do need that broken shopping cart for a sculpture.",
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
            description: "You're the artist who spends 20 minutes adjusting the spacing between two words. You have strong opinions about Comic Sans and you're not afraid to share them. People think you're being picky, but you know that good design is invisible—and bad design makes you physically uncomfortable.",
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
            description: "You're the artist who has 47 browser tabs open for research and three different notebooks for the same project. You start ambitious projects with elaborate systems, get distracted by even more ambitious projects, and somehow manage to finish them all through pure stubborn determination and excessive coffee.",
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
            description: "You're the artist who makes serious art but can't take yourself too seriously. You're the person cracking jokes in critique while making profound points about society. You use bright colors to discuss dark topics, and you've mastered the art of making people laugh until they suddenly realize they're having deep thoughts.",
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
            description: "You're the artist who makes protest signs for fun and gets genuinely angry about social issues. Your Instagram stories are 50% art, 50% political rants. You've definitely gotten into arguments about art's responsibility to society, and you think 'art for art's sake' is a cop-out.",
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
            description: "You're the artist who believes that if you need more than three elements, you're trying too hard. You spend hours perfecting the placement of a single line. Your friends think your workspace is suspiciously clean, and you get genuinely upset when people add unnecessary decorations to things.",
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
