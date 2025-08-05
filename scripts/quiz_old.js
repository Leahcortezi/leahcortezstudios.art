if (typeof console !== 'undefined') {
    console.log("🔄 Quiz.js loaded - Version 1754402500 - Universal artist archetypes!");
}

class PortfolioQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = {}; // Initialize scores object
        
        this.questions = [
            {
                id: 1,
                text: "When you're emotionally drained, what calls to your creative soul?",
                options: [
                    { text: "Creating something deeply personal and introspective", piece: "anointed-gaze", weight: 3 },
                    { text: "Working with symbols and spiritual imagery", piece: "abuelas-altar", weight: 3 },
                    { text: "Making something beautiful from chaos", piece: "abyss-bloom", weight: 3 }
                ]
            },
            {
                id: 2,
                text: "Your creative process usually involves...",
                options: [
                    { text: "Exploring family history and personal narratives", piece: "abuelas-altar", weight: 3 },
                    { text: "Embracing destruction as part of creation", piece: "heaven-on-fire", weight: 3 },
                    { text: "Finding beauty in discarded or overlooked things", piece: "collected-remains", weight: 3 }
                ]
            },
            {
                id: 3,
                text: "The critique that would hurt you most:",
                options: [
                    { text: "Your work is too heavy or melancholic", piece: "anointed-gaze", weight: 3 },
                    { text: "You're stuck in the past", piece: "inheritance", weight: 3 },
                    { text: "Your work lacks structure or focus", piece: "heaven-on-fire", weight: 3 }
                ]
            },
            {
                id: 4,
                text: "Your ideal creative practice includes...",
                options: [
                    { text: "Deconstructing and rebuilding concepts", piece: "gnaw", weight: 3 },
                    { text: "Repetitive, meditative processes", piece: "unraveling", weight: 3 },
                    { text: "Refining details until they're perfect", piece: "typographic-interpretation", weight: 3 }
                ]
            },
            {
                id: 5,
                text: "People describe your artistic personality as...",
                options: [
                    { text: "Someone who sees potential everywhere", piece: "collected-remains", weight: 3 },
                    { text: "A perfectionist who sweats the details", piece: "elements-book", weight: 3 },
                    { text: "An activist who uses art to make statements", piece: "double-sided-poster", weight: 3 }
                ]
            },
            {
                id: 6,
                text: "Your creative tools tend to be...",
                options: [
                    { text: "Whatever makes learning and teaching engaging", piece: "playing-cards", weight: 3 },
                    { text: "Unconventional materials and found objects", piece: "collected-remains", weight: 3 },
                    { text: "Traditional tools used in innovative ways", piece: "gnaw", weight: 3 }
                ]
            },
            {
                id: 7,
                text: "In creative communities, you're known as...",
                options: [
                    { text: "The one who brings social consciousness to conversations", piece: "double-sided-poster", weight: 3 },
                    { text: "The storyteller who explains the 'why' behind materials", piece: "collected-remains", weight: 3 },
                    { text: "The theory enthusiast who loves discussing technique", piece: "typographic-interpretation", weight: 3 }
                ]
            },
            {
                id: 8,
                text: "Your biggest creative challenge is...",
                options: [
                    { text: "Perfectionism that prevents you from finishing", piece: "elements-book", weight: 3 },
                    { text: "Getting emotionally attached to every piece", piece: "collected-remains", weight: 3 },
                    { text: "Balancing spontaneity with intentional design", piece: "reductive-symbols", weight: 3 }
                ]
            },
            {
                id: 9,
                text: "When creatively blocked, you usually...",
                options: [
                    { text: "Take something apart to understand it better", piece: "unraveling", weight: 3 },
                    { text: "Strip away elements until the essence remains", piece: "reductive-symbols", weight: 3 },
                    { text: "Turn complex problems into simple, playful solutions", piece: "playing-cards", weight: 3 }
                ]
            },
            {
                id: 10,
                text: "Your dream workspace would be...",
                options: [
                    { text: "A place where you can experiment and get messy", piece: "unraveling", weight: 3 },
                    { text: "A clean, minimal space that promotes focus", piece: "reductive-symbols", weight: 3 },
                    { text: "Somewhere filled with meaningful objects and memories", piece: "inheritance", weight: 3 }
                ]
            },
            {
                id: 11,
                text: "The themes that fascinate you explore...",
                options: [
                    { text: "What we inherit from previous generations", piece: "inheritance", weight: 3 },
                    { text: "The hidden stories in everyday objects", piece: "unraveling", weight: 3 },
                    { text: "How much you can communicate with less", piece: "reductive-symbols", weight: 3 }
                ]
            },
            {
                id: 12,
                text: "Your creative philosophy centers on...",
                options: [
                    { text: "Understanding and transforming generational patterns", piece: "inheritance", weight: 3 },
                    { text: "Finding beauty through deconstruction and rebuilding", piece: "unraveling", weight: 3 },
                    { text: "Believing that simplicity can hold profound meaning", piece: "reductive-symbols", weight: 3 }
                ]
            },
            {
                id: 13,
                text: "The medium that speaks to your soul involves...",
                options: [
                    { text: "Materials with personal or cultural significance", piece: "inheritance", weight: 3 },
                    { text: "Flexible materials you can manipulate and bind", piece: "unraveling", weight: 3 },
                    { text: "Clean, essential elements that communicate clearly", piece: "reductive-symbols", weight: 3 }
                ]
            }
        ];

        this.portfolioData = {
            "anointed-gaze": {
                title: "The Storyteller",
                subtitle: "Anointed Gaze",
                category: "Personal Work",
                archetype: {
                    essence: "You find beauty in exhaustion and liminal states",
                    medium: "Graphite portraits that capture mental distance",
                    strength: "Drawing emotional weight and disconnection",
                    challenge: "Being fully present while creating"
                },
                description: "You're the artist who finds poetry in exhaustion. Your work captures the beauty of liminal states—the space between sleeping and waking, presence and absence.",
                quote: "I draw the weight of being seen when I can barely see myself.",
                image: "collections/personal/anointed-gaze/images/JPEG/personal6.jpg",
                path: "collections/personal/anointed-gaze/index.html"
            },
            "abuelas-altar": {
                title: "The Healer",
                subtitle: "Abuela's Altar",
                category: "Personal Work",
                archetype: {
                    essence: "You channel family stories through art",
                    medium: "Mixed media altars and memory installations",
                    strength: "Honoring the past while healing the present",
                    challenge: "Balancing reverence with creative freedom"
                },
                description: "You're the artist who transforms family trauma into sacred ritual. Your work creates altars where ancestors can speak and wounds can finally heal.",
                quote: "My ancestors speak through my hands when my mouth can't find the words.",
                image: "collections/studio/abuelas-altar/images/JPEG/Studio10.jpg",
                path: "collections/personal/abuelas-altar/index.html"
            },
            "heaven-on-fire": {
                title: "The Performer",
                subtitle: "Heaven on Fire",
                category: "Personal Work",
                archetype: {
                    essence: "You find beauty in destruction and transformation",
                    medium: "Fiery paintings of paradise in collapse",
                    strength: "Creating meaning from chaos",
                    challenge: "Finding peace without drama"
                },
                description: "You're the artist who finds beauty in apocalypse. Your work celebrates destruction as necessary for rebirth—sometimes paradise needs to burn before it can bloom again.",
                quote: "I paint paradise burning because sometimes heaven needs to start over.",
                image: "collections/personal/heaven-on-fire/images/JPEG/personal7.jpg",
                path: "collections/personal/heaven-on-fire/index.html"
            },
            "inheritance": {
                title: "The Researcher",
                subtitle: "Inheritance",
                category: "Personal Work",
                archetype: {
                    essence: "You transform family patterns through art",
                    medium: "Installations examining generational stories",
                    strength: "Breaking cycles while honoring heritage",
                    challenge: "Evolving beyond family expectations"
                },
                description: "You're the artist who transforms generational patterns into art. Your work examines what you've inherited and what you choose to pass on—or break forever.",
                quote: "I didn't choose this legacy, but I choose what to do with it.",
                image: "collections/personal/inheritance/images/JPEG/Personal1.jpg",
                path: "collections/personal/inheritance/index.html"
            },
            "gnaw": {
                title: "The Builder",
                subtitle: "Gnaw",
                category: "Studio Work",
                archetype: {
                    essence: "You find meaning in destruction and consumption",
                    medium: "Sculptural forms exploring mouths and erosion",
                    strength: "Carving truth from the act of consuming",
                    challenge: "Explaining why destruction creates meaning"
                },
                description: "You're the artist who finds meaning in destruction. Your work explores the mouth as both creator and destroyer—carving truth from the act of consuming.",
                quote: "I carve mouths that speak the words I can't swallow.",
                image: "collections/studio/gnaw/images/JPEG/Studio6.jpg",
                path: "collections/studio/gnaw/index.html"
            },
            "unraveling": {
                title: "The Explorer",
                subtitle: "Unraveling",
                category: "Studio Work",
                archetype: {
                    essence: "You transform pressure into physical form",
                    medium: "Wire sculptures that bind and constrain",
                    strength: "Making anxiety sculptural",
                    challenge: "Learning when to let go of control"
                },
                description: "You're the artist who makes anxiety sculptural. Your work transforms psychological pressure into physical form—binding, wrapping, constraining until the truth emerges.",
                quote: "I wrap wire around my thoughts until they tell me the truth.",
                image: "collections/studio/unraveling/images/JPEG/Studio5.jpg",
                path: "collections/studio/unraveling/index.html"
            },
            "abyss-bloom": {
                title: "The Visionary",
                subtitle: "Abyss Bloom",
                category: "Studio Work",
                archetype: {
                    essence: "You create beauty from darkness",
                    medium: "Glowing sculptures of impossible organisms",
                    strength: "Growing light from the deepest shadows",
                    challenge: "Accepting that not everything needs to be categorized"
                },
                description: "You're the artist who births creatures that shouldn't exist but absolutely must. Your work creates beautiful organisms that glow with their own impossible light.",
                quote: "I grow impossible flowers in the dark spaces of imagination.",
                image: "collections/studio/abyss-bloom/images/JPEG/studio2.jpg",
                path: "collections/studio/abyss-bloom/index.html"
            },
            "collected-remains": {
                title: "The Magpie",
                subtitle: "Collected Remains",
                category: "Studio Work",
                archetype: {
                    essence: "You find stories in discarded objects",
                    medium: "Assemblages of abandoned things",
                    strength: "Seeing potential in what others discard",
                    challenge: "Not hoarding everything that speaks to you"
                },
                description: "You're the artist who sees potential in what others discard. Your work is an archaeology of abandonment, finding beauty in the broken and meaning in the forgotten.",
                quote: "I collect what others abandon because every ruin has a story to tell.",
                image: "collections/studio/collected-remains/images/JPEG/Studio1.jpg",
                path: "collections/studio/collected-remains/index.html"
            },
            "typographic-interpretation": {
                title: "The Technician",
                subtitle: "Typographic Interpretation",
                category: "Design Work",
                archetype: {
                    essence: "You make letters feel emotions",
                    medium: "Typography pushed beyond expected behaviors",
                    strength: "Breaking typographic rules meaningfully",
                    challenge: "Perfectionism that slows down creativity"
                },
                description: "You're the designer who believes letters have souls. Your work pushes typography beyond communication into pure emotion, making fonts feel feelings.",
                quote: "I free letters from their expected behaviors and watch them dance.",
                image: "collections/design/typographic-interpretation/images/design5.jpg",
                path: "collections/design/typographic-interpretation/index-case-study.html"
            },
            "playing-cards": {
                title: "The Designer",
                subtitle: "Scientific Revolution Playing Cards",
                category: "Design Work",
                archetype: {
                    essence: "You make learning feel like play",
                    medium: "Educational design disguised as entertainment",
                    strength: "Smuggling knowledge inside beautiful experiences",
                    challenge: "Not being too clever for your own good"
                },
                description: "You're the designer who makes learning feel like rebellion. Your work transforms boring educational content into something people actually want to engage with.",
                quote: "I smuggle education inside beautiful, playful experiences.",
                image: "collections/design/themed-playing-card-design/images/design1-2.jpg",
                path: "collections/design/themed-playing-card-design/index-case-study.html"
            },
            "elements-book": {
                title: "The Technician",
                subtitle: "Elements & Principles Book Cover",
                category: "Design Work",
                archetype: {
                    essence: "You find zen in fundamental principles",
                    medium: "Clean design that honors the basics",
                    strength: "Making fundamentals feel fresh",
                    challenge: "Perfectionism that can become paralysis"
                },
                description: "You're the designer who finds zen in fundamental principles. Your work demonstrates that mastery comes from understanding the basics so deeply that you can make them sing.",
                quote: "I make the fundamentals feel fundamental again.",
                image: "collections/design/elements-and-principles-book-cover/images/Design1.jpg",
                path: "collections/design/elements-and-principles-book-cover/index-case-study.html"
            },
            "double-sided-poster": {
                title: "The Activist",
                subtitle: "Double-Sided Poster",
                category: "Design Work",
                archetype: {
                    essence: "You use design as activism",
                    medium: "Typography that questions everything",
                    strength: "Making uncomfortable truths visible",
                    challenge: "Finding subtlety without losing impact"
                },
                description: "You're the designer who uses typography as a weapon against complacency. Your work doesn't just communicate—it interrogates, questions, and occasionally shouts.",
                quote: "I break typography so it can tell uncomfortable truths.",
                image: "collections/design/double-sided-poster/images/Design8.jpg",
                path: "collections/design/double-sided-poster/index-case-study.html"
            },
            "reductive-symbols": {
                title: "The Outsider",
                subtitle: "Reductive Symbols",
                category: "Design Work",
                archetype: {
                    essence: "You distill complex ideas to their essence",
                    medium: "Minimal symbols with maximum impact",
                    strength: "Cutting away everything unnecessary",
                    challenge: "Knowing when simple becomes too simple"
                },
                description: "You're the designer who performs surgery on meaning itself. Your work strips away everything unnecessary until only the essential remains.",
                quote: "I cut away everything except what absolutely must remain.",
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
