if (typeof console !== 'undefined') {
    console.log("🔄 Quiz.js loaded - Version 1754411000 - Trademarked Archetype Personalities  !");
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
                { text: "Making something beautiful from chaos", piece: "heaven-on-fire", weight: 3 },
                { text: "Inventing playful, weird creatures or forms", piece: "abyss-bloom", weight: 3 },
                { text: "Organizing or refining visual details", piece: "typographic-interpretation", weight: 3 }
            ]
            },
            {
            id: 2,
            text: "Your creative process usually involves...",
            options: [
                { text: "Exploring family history and personal narratives", piece: "abuelas-altar", weight: 3 },
                { text: "Embracing destruction as part of creation", piece: "gnaw", weight: 3 },
                { text: "Finding beauty in discarded or overlooked things", piece: "collected-remains", weight: 3 },
                { text: "Turning chaos into systems or games", piece: "playing-cards", weight: 3 },
                { text: "Stripping ideas down to their essence", piece: "reductive-symbols", weight: 3 }
            ]
            },
            {
            id: 3,
            text: "The critique that would hurt you most:",
            options: [
                { text: "Your work is too heavy or melancholic", piece: "anointed-gaze", weight: 3 },
                { text: "You're stuck in the past", piece: "inheritance", weight: 3 },
                { text: "Your work lacks structure or focus", piece: "heaven-on-fire", weight: 3 },
                { text: "Your ideas are too weird or childish", piece: "abyss-bloom", weight: 3 },
                { text: "Your design is too minimal or cold", piece: "reductive-symbols", weight: 3 }
            ]
            },
            {
            id: 4,
            text: "Your ideal creative practice includes...",
            options: [
                { text: "Deconstructing and rebuilding concepts", piece: "gnaw", weight: 3 },
                { text: "Repetitive, meditative processes", piece: "unraveling", weight: 3 },
                { text: "Refining details until they're perfect", piece: "typographic-interpretation", weight: 3 },
                { text: "Making playful, conceptual work", piece: "elements-book", weight: 3 },
                { text: "Transforming trash into treasure", piece: "collected-remains", weight: 3 }
            ]
            },
            {
            id: 5,
            text: "People describe your artistic personality as...",
            options: [
                { text: "Someone who sees potential everywhere", piece: "collected-remains", weight: 3 },
                { text: "A perfectionist who sweats the details", piece: "elements-book", weight: 3 },
                { text: "An activist who uses art to make statements", piece: "double-sided-poster", weight: 3 },
                { text: "A theorist who loves discussing technique", piece: "typographic-interpretation", weight: 3 },
                { text: "A dreamer who makes the uncanny beautiful", piece: "abyss-bloom", weight: 3 }
            ]
            },
            {
            id: 6,
            text: "Your creative tools tend to be...",
            options: [
                { text: "Whatever makes learning and teaching engaging", piece: "playing-cards", weight: 3 },
                { text: "Unconventional materials and found objects", piece: "collected-remains", weight: 3 },
                { text: "Traditional tools used in innovative ways", piece: "gnaw", weight: 3 },
                { text: "Wire, thread, or things you can twist and bind", piece: "unraveling", weight: 3 },
                { text: "Pens, rulers, and grids for perfect layouts", piece: "typographic-interpretation", weight: 3 }
            ]
            },
            {
            id: 7,
            text: "In creative communities, you're known as...",
            options: [
                { text: "The one who brings social consciousness to conversations", piece: "double-sided-poster", weight: 3 },
                { text: "The storyteller who explains the 'why' behind materials", piece: "collected-remains", weight: 3 },
                { text: "The theory enthusiast who loves discussing technique", piece: "typographic-interpretation", weight: 3 },
                { text: "The playful experimenter who tries everything", piece: "elements-book", weight: 3 },
                { text: "The one who makes the weird seem wonderful", piece: "abyss-bloom", weight: 3 }
            ]
            },
            {
            id: 8,
            text: "Your biggest creative challenge is...",
            options: [
                { text: "Perfectionism that prevents you from finishing", piece: "elements-book", weight: 3 },
                { text: "Getting emotionally attached to every piece", piece: "anointed-gaze", weight: 3 },
                { text: "Letting go of what you can't preserve", piece: "abuelas-altar", weight: 3 },
                { text: "Balancing spontaneity with intentional design", piece: "reductive-symbols", weight: 3 },
                { text: "Not overcomplicating your ideas", piece: "playing-cards", weight: 3 }
            ]
            },
            {
            id: 9,
            text: "When creatively blocked, you usually...",
            options: [
                { text: "Take something apart to understand it better", piece: "unraveling", weight: 3 },
                { text: "Strip away elements until the essence remains", piece: "reductive-symbols", weight: 3 },
                { text: "Turn complex problems into simple, playful solutions", piece: "playing-cards", weight: 3 },
                { text: "Make something just for yourself, no audience", piece: "anointed-gaze", weight: 3 },
                { text: "Start with a random object and see where it leads", piece: "collected-remains", weight: 3 }
            ]
            },
            {
            id: 10,
            text: "Your dream workspace would be...",
            options: [
                { text: "A place where you can experiment and get messy", piece: "gnaw", weight: 3 },
                { text: "A clean, minimal space that promotes focus", piece: "reductive-symbols", weight: 3 },
                { text: "Somewhere filled with meaningful objects and memories", piece: "inheritance", weight: 3 },
                { text: "A studio with lots of reference books and tools", piece: "typographic-interpretation", weight: 3 },
                { text: "A cozy nook for sketching and reflection", piece: "anointed-gaze", weight: 3 }
            ]
            },
            {
            id: 11,
            text: "The themes that fascinate you explore...",
            options: [
                { text: "What we inherit from previous generations", piece: "inheritance", weight: 3 },
                { text: "The hidden stories in everyday objects", piece: "collected-remains", weight: 3 },
                { text: "How much you can communicate with less", piece: "reductive-symbols", weight: 3 },
                { text: "The intersection of play and meaning", piece: "elements-book", weight: 3 },
                { text: "How design can challenge the status quo", piece: "double-sided-poster", weight: 3 }
            ]
            },
            {
            id: 12,
            text: "Your creative philosophy centers on...",
            options: [
                { text: "Understanding and transforming generational patterns", piece: "inheritance", weight: 3 },
                { text: "Finding beauty through deconstruction and rebuilding", piece: "gnaw", weight: 3 },
                { text: "Believing that simplicity can hold profound meaning", piece: "reductive-symbols", weight: 3 },
                { text: "Using design as a tool for activism", piece: "double-sided-poster", weight: 3 },
                { text: "Letting intuition and emotion guide your work", piece: "anointed-gaze", weight: 3 }
            ]
            },
            {
            id: 13,
            text: "The medium that speaks to your soul involves...",
            options: [
                { text: "Materials with personal or cultural significance", piece: "inheritance", weight: 3 },
                { text: "Flexible materials you can manipulate and bind", piece: "unraveling", weight: 3 },
                { text: "Clean, essential elements that communicate clearly", piece: "reductive-symbols", weight: 3 },
                { text: "Bold type and expressive layouts", piece: "typographic-interpretation", weight: 3 },
                { text: "Assemblages of found or discarded objects", piece: "collected-remains", weight: 3 }
            ]
            }
        ];

        this.portfolioData = {
            "anointed-gaze": {
            title: "The Sleepless Sketcher",
            subtitle: "Anointed Gaze",
            category: "Personal Work",
            archetype: {
                essence: "You draw until your hands cramp and your brain floats.",
                medium: "Charcoal, graphite, and endless sketchbooks",
                strength: "Emotional rawness and obsessive observation",
                challenge: "Knowing when to rest and let go"
            },
            description: "You're the artist who journals breakdowns in gesture lines. Eyes haunt your pages, and your sketchbook is a confessional. You process everything through drawing — even when you should probably be sleeping.",
            quote: "I draw until the world blurs and my feelings sharpen.",
            image: "collections/personal/anointed-gaze/images/JPEG/personal6.jpg",
            path: "collections/personal/anointed-gaze/index.html"
            },
            "abuelas-altar": {
            title: "The Memory Keeper",
            subtitle: "Abuela's Altar",
            category: "Personal Work",
            archetype: {
                essence: "You archive family stories through objects and space.",
                medium: "Altars, candles, and sacred assemblages",
                strength: "Turning grief into ritual and reverence",
                challenge: "Letting go of what you can’t preserve"
            },
            description: "You're the artist who lights candles before critiques — metaphorically and literally. You transform loss into sacred space, and every object is a vessel for memory.",
            quote: "I build altars so my ancestors always have a seat at the table.",
            image: "collections/studio/abuelas-altar/images/JPEG/Studio10.jpg",
            path: "collections/personal/abuelas-altar/index.html"
            },
            "heaven-on-fire": {
            title: "The Beautiful Catastrophist",
            subtitle: "Heaven on Fire",
            category: "Personal Work",
            archetype: {
                essence: "You paint like the world is ending and that's the point.",
                medium: "Fiery paintings, chaos, and color",
                strength: "Making destruction look delicate",
                challenge: "Finding peace without the drama"
            },
            description: "You're the artist who thrives in chaos and emotional combustion. You make apocalypse look poetic, and your brushwork is a controlled explosion.",
            quote: "I set paradise on fire just to see what grows back.",
            image: "collections/personal/heaven-on-fire/images/JPEG/personal7.jpg",
            path: "collections/personal/heaven-on-fire/index.html"
            },
            "inheritance": {
            title: "The Generational Theorist",
            subtitle: "Inheritance",
            category: "Personal Work",
            archetype: {
                essence: "You make art to unpack everything you were handed.",
                medium: "Installations, threads, and symbol-heavy portraits",
                strength: "Breaking cycles with insight and empathy",
                challenge: "Not letting the past define your future"
            },
            description: "You're the artist who thinks in bloodlines and family patterns. You turn inherited silence into visual language, and every piece is a footnote to your story.",
            quote: "I unravel what I inherit, one thread at a time.",
            image: "collections/personal/inheritance/images/JPEG/Personal1.jpg",
            path: "collections/personal/inheritance/index.html"
            },
            "gnaw": {
            title: "The Raw Materialist",
            subtitle: "Gnaw",
            category: "Studio Work",
            archetype: {
                essence: "You carve until the piece bleeds.",
                medium: "Sculpture, teeth, and eroded forms",
                strength: "Revealing what hides beneath the surface",
                challenge: "Knowing when to stop digging"
            },
            description: "You're the artist who thinks teeth are underused as symbols. You love mess, form, and the truth that comes from destruction.",
            quote: "I carve until the material tells me its secrets.",
            image: "collections/studio/gnaw/images/JPEG/Studio6.jpg",
            path: "collections/studio/gnaw/index.html"
            },
            "unraveling": {
            title: "The Emotional Engineer",
            subtitle: "Unraveling",
            category: "Studio Work",
            archetype: {
                essence: "You use wire and tension to process your inner chaos.",
                medium: "Wire, knots, and sculpted anxiety",
                strength: "Turning structure into therapy",
                challenge: "Letting go of control"
            },
            description: "You're the artist who sculpts thoughts directly. You believe structure is healing, and every twist of wire is a step toward clarity.",
            quote: "I bind my worries until they become something beautiful.",
            image: "collections/studio/unraveling/images/JPEG/Studio5.jpg",
            path: "collections/studio/unraveling/index.html"
            },
            "abyss-bloom": {
            title: "The Weird Creature Kid",
            subtitle: "Abyss Bloom",
            category: "Studio Work",
            archetype: {
                essence: "You make beautiful things that shouldn’t exist.",
                medium: "Glowing, gooey, bioluminescent sculptures",
                strength: "Turning nightmares into pets",
                challenge: "Letting your creatures live outside the shadows"
            },
            description: "You're the artist who loves soft horror and biology. You invent glowing organisms and make the uncanny adorable.",
            quote: "I grow impossible flowers in the dark corners of my mind.",
            image: "collections/studio/abyss-bloom/images/JPEG/studio2.jpg",
            path: "collections/studio/abyss-bloom/index.html"
            },
            "collected-remains": {
            title: "The Trash Archaeologist",
            subtitle: "Collected Remains",
            category: "Studio Work",
            archetype: {
                essence: "You hoard with purpose.",
                medium: "Assemblages of abandoned things",
                strength: "Seeing potential in the discarded",
                challenge: "Not keeping everything that whispers to you"
            },
            description: "You're the artist whose workbench is a spiritual junk drawer. You turn trash into storytelling devices and believe every ruin has a secret.",
            quote: "I collect what others abandon because every object has a past.",
            image: "collections/studio/collected-remains/images/JPEG/Studio1.jpg",
            path: "collections/studio/collected-remains/index.html"
            },
            "typographic-interpretation": {
            title: "The Kerning Critic",
            subtitle: "Typographic Interpretation",
            category: "Design Work",
            archetype: {
                essence: "You can spot bad tracking from across the room.",
                medium: "Expressive, rule-breaking typography",
                strength: "Making fonts feel things",
                challenge: "Letting go of perfection"
            },
            description: "You're the designer who judges every menu and poster. You’d die for hierarchy, and you believe letters have souls.",
            quote: "I free letters from their cages and watch them dance.",
            image: "collections/design/typographic-interpretation/images/design5.jpg",
            path: "collections/design/typographic-interpretation/index-case-study.html"
            },
            "playing-cards": {
            title: "The Organized Chaos Theorist",
            subtitle: "Scientific Revolution Playing Cards",
            category: "Design Work",
            archetype: {
                essence: "You have 17 tabs open, and they’re all research.",
                medium: "Educational design disguised as entertainment",
                strength: "Making rules just to break them beautifully",
                challenge: "Finishing before the next big idea hits"
            },
            description: "You're the designer who thinks in categories, color codes, and revolution timelines. You smuggle knowledge inside beautiful experiences.",
            quote: "I turn chaos into systems and systems into play.",
            image: "collections/design/themed-playing-card-design/images/design1-2.jpg",
            path: "collections/design/themed-playing-card-design/index-case-study.html"
            },
            "elements-book": {
            title: "The Conceptual Clown",
            subtitle: "Elements & Principles Book Cover",
            category: "Design Work",
            archetype: {
                essence: "You make things that are funny, sad, and secretly deep.",
                medium: "Playful visuals with serious commentary",
                strength: "Balancing cute and weird",
                challenge: "Not hiding meaning behind the joke"
            },
            description: "You're the designer who sneaks big ideas into playful packages. You live for the line between silly and profound.",
            quote: "I use whimsy to say what seriousness can’t.",
            image: "collections/design/elements-and-principles-book-cover/images/Design1.jpg",
            path: "collections/design/elements-and-principles-book-cover/index-case-study.html"
            },
            "double-sided-poster": {
            title: "The Design Vigilante",
            subtitle: "Double-Sided Poster",
            category: "Design Work",
            archetype: {
                essence: "You use posters to fight injustice.",
                medium: "Bold, activist typography",
                strength: "Disrupting and informing with design",
                challenge: "Finding subtlety without losing impact"
            },
            description: "You're the person who actually reads theory — and then yells it in bold type. Your work doesn’t just communicate, it interrogates.",
            quote: "I break typography so it can shout uncomfortable truths.",
            image: "collections/design/double-sided-poster/images/Design8.jpg",
            path: "collections/design/double-sided-poster/index-case-study.html"
            },
            "reductive-symbols": {
            title: "The Shape Whisperer",
            subtitle: "Reductive Symbols",
            category: "Design Work",
            archetype: {
                essence: "You strip everything down to what matters.",
                medium: "Minimal symbols with maximum impact",
                strength: "Speaking in icons, not paragraphs",
                challenge: "Knowing when less becomes too little"
            },
            description: "You're the designer who believes less is more (and more is annoying). You perform surgery on meaning until only the essential remains.",
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
