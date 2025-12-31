if (typeof console !== 'undefined') {
    console.log("🔄 Quiz.js loaded - Version 2025.2 - Fixed Scoring!");
}

class PortfolioQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = {}; // Initialize scores object
        
        // === REWRITTEN QUESTIONS - Better categorization ===
        this.questions = [
            {
            id: 1,
            text: "Pick the mood that speaks to you most:",
            options: [
                { text: "Grief, memory, and honoring those who came before", pieces: ["abuelas-altar", "inheritance", "reliquary-heart"] },
                { text: "Rage, critique, and challenging power structures", pieces: ["the-unholy-gaze", "double-sided-poster", "endangered-species"] },
                { text: "Chaos, transformation, and embracing the messy", pieces: ["unbecoming", "heaven-on-fire", "abyss-bloom"] },
                { text: "Quiet observation and finding beauty in small things", pieces: ["feathers-along-bend", "the-living-room", "anointed-gaze"] }
            ]
            },
            {
            id: 2,
            text: "What medium calls to you?",
            options: [
                { text: "Printmaking - etching, carving, ink, pressure", pieces: ["the-unholy-gaze", "unbecoming", "reliquary-heart", "the-living-room"] },
                { text: "Drawing & illustration - charcoal, pencil, direct marks", pieces: ["abuelas-altar", "anointed-gaze", "inheritance", "heaven-on-fire"] },
                { text: "Sculpture & mixed media - physical materials, 3D forms", pieces: ["abyss-bloom", "feathers-along-bend", "gnaw"] },
                { text: "Graphic design - typography, layout, visual communication", pieces: ["endangered-species", "double-sided-poster", "insane-grain", "typographic-interpretation"] }
            ]
            },
            {
            id: 3,
            text: "Which theme resonates with you?",
            options: [
                { text: "Feminist critique and reclaiming power", pieces: ["the-unholy-gaze", "inheritance", "anointed-gaze"] },
                { text: "Family, ancestors, and cultural roots", pieces: ["abuelas-altar", "inheritance", "the-living-room"] },
                { text: "Mental health and emotional processing", pieces: ["unbecoming", "anointed-gaze", "heaven-on-fire"] },
                { text: "Environmental and social activism", pieces: ["endangered-species", "double-sided-poster", "the-unholy-gaze"] },
                { text: "Spirituality, ritual, and sacred imagery", pieces: ["reliquary-heart", "abuelas-altar", "the-unholy-gaze"] }
            ]
            },
            {
            id: 4,
            text: "How do you want your work to make people feel?",
            options: [
                { text: "Uncomfortable - confronted with hard truths", pieces: ["the-unholy-gaze", "unbecoming", "double-sided-poster"] },
                { text: "Emotional - connected to their own memories", pieces: ["abuelas-altar", "inheritance", "the-living-room"] },
                { text: "Curious - drawn in by texture and detail", pieces: ["feathers-along-bend", "abyss-bloom", "reliquary-heart"] },
                { text: "Inspired - moved to think or act differently", pieces: ["endangered-species", "heaven-on-fire", "anointed-gaze"] }
            ]
            },
            {
            id: 5,
            text: "What drives your creative practice?",
            options: [
                { text: "Challenging systems that harm people", pieces: ["the-unholy-gaze", "endangered-species", "double-sided-poster"] },
                { text: "Processing my own emotions and experiences", pieces: ["unbecoming", "anointed-gaze", "heaven-on-fire"] },
                { text: "Preserving stories and honoring the past", pieces: ["abuelas-altar", "inheritance", "reliquary-heart", "the-living-room"] },
                { text: "Exploring materials and physical making", pieces: ["feathers-along-bend", "abyss-bloom", "gnaw"] }
            ]
            }
        ];

        // === UPDATED ARCHETYPE RESULTS WITH RELATABLE DESCRIPTIONS ===
        this.portfolioData = {
            "anointed-gaze": {
            title: "The Sleepless Sketcher",
            subtitle: "Anointed Gaze",
            category: "Personal Work",
            personality: {
                vibe: "3AM creative energy with emotional intensity",
                tools: "Sketchbooks, charcoal, and existential dread",
                superpower: "Turning feelings into powerful line work",
                kryptonite: "People asking 'are you okay?' after seeing your art"
            },
            description: "You're the artist who draws at 3am when you can't sleep because your brain won't shut up. You keep a sketchbook by your bed and probably have charcoal under your fingernails more often than not. People always ask if you're okay after seeing your work, and honestly, you're never quite sure how to answer that.",
            quote: "I draw until I disassociate. And then I draw that too.",
            image: "collections/illustration/anointed-gaze/images/JPEG/personal6.jpg",
            path: "collections/illustration/anointed-gaze/index.html"
            },
            "abuelas-altar": {
            title: "The Sentimental Shrine Builder",
            subtitle: "Abuela's Altar",
            category: "Personal Work",
            personality: {
                vibe: "Nostalgic collector with spiritual energy",
                tools: "Found objects, family heirlooms, and meaningful junk",
                superpower: "Turning random stuff into emotional altars",
                kryptonite: "Minimalists who want to 'declutter' your space"
            },
            description: "You're the artist who saves everything because 'it might be useful for a project someday.' Your studio is part art space, part museum of random family artifacts. You take photos of old objects at thrift stores even when you don't buy them, just in case you need reference material later.",
            quote: "Is it trash or an emotional relic? Yes.",
            image: "collections/illustration/abuelas-altar/images/jpeg/personal16.jpeg",
            path: "collections/illustration/abuelas-altar/index.html"
            },
            "heaven-on-fire": {
            title: "The Beautiful Catastrophist",
            subtitle: "Heaven on Fire",
            category: "Personal Work",
            personality: {
                vibe: "Big emotions, bigger paint splatters",
                tools: "Every color that exists, preferably at once",
                superpower: "Making dramatic chaos look absolutely stunning",
                kryptonite: "Anyone who suggests you 'tone it down'"
            },
            description: "You're the artist who goes big or goes home. You've never made anything described as 'subtle' and you're fine with that. Your workspace is covered in paint splatters, your clothes are permanently stained, and you've definitely gotten noise complaints from neighbors. When people say your art is 'a lot,' you take it as a compliment.",
            quote: "If it's not dramatic, I'm not interested.",
            image: "collections/illustration/heaven-on-fire/images/JPEG/personal4.jpg",
            path: "collections/illustration/heaven-on-fire/index.html"
            },
            "inheritance": {
            title: "The Generational Theorist",
            subtitle: "Inheritance",
            category: "Personal Work",
            personality: {
                vibe: "Deep thinker with family therapy vibes",
                tools: "Old photos, cultural artifacts, and emotional baggage",
                superpower: "Making personal trauma relatable to literally everyone",
                kryptonite: "Small talk at family gatherings"
            },
            description: "You're the artist who turns every family dinner into an impromptu therapy session about identity and culture. You have strong opinions about whose stories get told in museums and probably write long Instagram captions. You've definitely made your relatives uncomfortable by asking them to pose for your 'art project about heritage.'",
            quote: "I turned my generational trauma into a design concept.",
            image: "collections/illustration/inheritance/images/JPEG/personal2.jpg",
            path: "collections/illustration/inheritance/index.html"
            },
            "gnaw": {
            title: "The Raw Materialist",
            subtitle: "Gnaw",
            category: "Studio Work",
            personality: {
                vibe: "Hands-on creator who feels textures deeply",
                tools: "Anything rough, broken, or ready to be transformed",
                superpower: "Making beautiful destruction look intentional",
                kryptonite: "People who say 'don't touch the art'"
            },
            description: "You're the artist who can't walk past interesting textures without touching them. You collect wood scraps, interesting rocks, and fabric samples 'just because.' Your hands are always slightly roughed up from your latest project, and you've definitely injured yourself in the name of art more than once.",
            quote: "I sanded it down to the bone and then kept going.",
            image: "collections/illustration/gnaw/images/JPEG/personal13.jpg",
            path: "collections/illustration/gnaw/index.html"
            },
            "unraveling": {
            title: "The Emotional Engineer",
            subtitle: "Unraveling",
            category: "Studio Work",
            personality: {
                vibe: "Organized chaos with anxious perfectionist energy",
                tools: "Wire, thread, and all your unresolved feelings",
                superpower: "Turning mental tangles into physical art",
                kryptonite: "People who try to 'fix' your perfectly imperfect system"
            },
            description: "You're the artist who has a very specific organizational system that looks like chaos to everyone else. You know exactly which pile of supplies you need, and god help anyone who tries to 'clean up' your space. You probably have anxiety about your anxiety, and you channel all of that energy into intricate, obsessive work.",
            quote: "If I can't untangle my thoughts, I'll just twist them into art.",
            image: "collections/illustration/unraveling/images/JPEG/personal7.jpg",
            path: "collections/illustration/unraveling/index.html"
            },
            "abyss-bloom": {
            title: "The Weird Creature Kid",
            subtitle: "Abyss Bloom",
            category: "Studio Work",
            personality: {
                vibe: "Delightfully disturbing with wholesome monster energy",
                tools: "Unconventional materials and nightmare fuel",
                superpower: "Making the unsettling somehow adorable",
                kryptonite: "People who ask 'but what is it supposed to be?'"
            },
            description: "You're the artist who makes things that make people say 'what the hell is that?' and you live for that reaction. You're probably the person who had an 'interesting' senior thesis that made your professors very nervous. You collect weird materials and your browser history is concerning but purely for artistic research.",
            quote: "This one has four limbs and trauma. I love them.",
            image: "collections/illustration/abyss-bloom/images/JPEG/personal1.jpg",
            path: "collections/illustration/abyss-bloom/index.html"
            },
            "typographic-interpretation": {
            title: "The Kerning Critic",
            subtitle: "Typographic Interpretation",
            category: "Design Work",
            personality: {
                vibe: "Type nerd with strong opinions about spacing",
                tools: "Fonts, grids, and design rules you actually follow",
                superpower: "Making letters communicate emotions",
                kryptonite: "Comic Sans and people who don't understand why kerning matters"
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
            personality: {
                vibe: "Research rabbit-hole enthusiast with project ADD",
                tools: "47 browser tabs, color-coded everything, and excessive coffee",
                superpower: "Turning information overload into clever design systems",
                kryptonite: "Deadlines and people who want 'just a simple version'"
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
            personality: {
                vibe: "Secretly serious artist hiding behind bright colors and jokes",
                tools: "Visual puns, inappropriate color combinations, and hidden meanings",
                superpower: "Making people laugh before hitting them with deep thoughts",
                kryptonite: "People who take your work at face value and miss the point"
            },
            description: "You're the artist who makes serious art but can't take yourself too seriously. You're the person cracking jokes in art class while making smart points about the world. You use bright colors to discuss dark topics, and you've mastered the art of making people laugh until they suddenly realize they're having deep thoughts.",
            quote: "Yes, it's silly. No, I'm not explaining it.",
            image: "collections/design/elements-and-principles-book-cover/images/Design1.jpg",
            path: "collections/design/elements-and-principles-book-cover/index-case-study.html"
            },
            "double-sided-poster": {
            title: "The Design Vigilante",
            subtitle: "Double-Sided Poster",
            category: "Design Work",
            personality: {
                vibe: "Social justice warrior with design skills and zero chill",
                tools: "Bold fonts, strong opinions, and righteous anger",
                superpower: "Making people care about things through good design",
                kryptonite: "Apathetic people and 'keep politics out of art' comments"
            },
            description: "You're the artist who makes protest signs for fun and gets genuinely angry about social issues. Your Instagram stories are 50% art, 50% political rants. You've definitely gotten into arguments about whether art should always have a message, and you think 'art for art's sake' is a cop-out.",
            quote: "This typeface is yelling for a reason.",
            image: "collections/design/double-sided-poster/images/Design8.jpg",
            path: "collections/design/double-sided-poster/index-case-study.html"
            },
            "reductive-symbols": {
            title: "The Shape Whisperer",
            subtitle: "Reductive Symbols",
            category: "Design Work",
            personality: {
                vibe: "Minimalist perfectionist who believes less is always more",
                tools: "Clean lines, negative space, and extreme restraint",
                superpower: "Saying everything with almost nothing",
                kryptonite: "People who want to 'add just one more thing'"
            },
            description: "You're the artist who believes that if you need more than three elements, you're trying too hard. You spend hours perfecting the placement of a single line. Your friends think your workspace is suspiciously clean, and you get genuinely upset when people add unnecessary decorations to things.",
            quote: "I reduced the concept to a single pixel. You're welcome.",
            image: "collections/design/reductive-symbols/images/design4.jpg",
            path: "collections/design/reductive-symbols/index-case-study.html"
            },
            "endangered-species": {
            title: "The Conservation Communicator",
            subtitle: "Endangered Species Poster",
            category: "Design Work",
            personality: {
                vibe: "Activist designer with urgent deadlines (because the planet is literally on fire)",
                tools: "Bold graphics, scientific data, and guilt-inducing imagery",
                superpower: "Making people care about causes through beautiful design",
                kryptonite: "Climate deniers and 'but is it too political?' feedback"
            },
            description: "You're the artist who thinks good design should make the world better. You get genuinely emotional about environmental issues and channel that into powerful visual advocacy. You've probably had arguments with people who think 'design should just look nice' and you low-key judge brands that don't care about sustainability.",
            quote: "This poster will haunt you until you donate.",
            image: "collections/design/endangered-species-poster/images/Disappearing Species Poster.jpg",
            path: "collections/design/endangered-species-poster/index.html"
            },
            "insane-grain": {
            title: "The Strategic Rebrander",
            subtitle: "Insane Grain Packaging",
            category: "Design Work",
            personality: {
                vibe: "Commercial designer who knows how to sell ideas (and snacks)",
                tools: "Brand strategy, trend research, and consumer psychology",
                superpower: "Making boring products look irresistible",
                kryptonite: "Clients who ignore your brilliant concepts and choose the safe option"
            },
            description: "You're the artist who secretly loves the challenge of making mundane products exciting. You understand that design is about solving problems, not just making things pretty. You follow packaging trends religiously, analyze grocery store shelves for fun, and have strong opinions about what makes a brand successful.",
            quote: "I can make whole grain sexy. Watch me.",
            image: "collections/design/insane-grain-packaging/images/Snack Packaging.jpg",
            path: "collections/design/insane-grain-packaging/index.html"
            },
            "feathers-along-bend": {
            title: "The Curious Collector",
            subtitle: "Feathers Along the Bend",
            category: "Objects",
            personality: {
                vibe: "Nature-obsessed artist with cabinet of curiosities energy",
                tools: "Found natural objects, preservation techniques, and delicate hands",
                superpower: "Turning ephemeral moments into lasting art",
                kryptonite: "People who don't understand why you brought home a dead bird"
            },
            description: "You're the artist who stops mid-hike to photograph interesting leaves. You have a collection of feathers, bones, and other natural treasures that your friends find either fascinating or deeply concerning. You understand that nature is the original artist and your job is just to present it thoughtfully.",
            quote: "I found these by the river. Now they're immortal.",
            image: "collections/objects/feathers-along-the-bend/images/studio8.jpg",
            path: "collections/objects/feathers-along-the-bend/index.html"
            },
            "zine": {
            title: "The Cultural Chaos Chronicler",
            subtitle: "Contemporary Contexts Zine",
            category: "Design Work",
            personality: {
                vibe: "Independent publisher with DIY punk energy and Latin roots",
                tools: "Color overload, stapler, and cultural references",
                superpower: "Making cultural chaos look intentional and beautiful",
                kryptonite: "People who want you to 'simplify the design'"
            },
            description: "You're the artist who thinks zines are the perfect medium because you can make whatever you want without asking permission. You're inspired by your culture and aren't afraid to let it show loudly. You probably quote your favorite artists in your work and believe design is about accumulating energy, not following rules.",
            quote: "Design is the accumulation of energy in an object.",
            image: "collections/design/contemporary-contexts-zine/zine1.jpg",
            path: "collections/design/contemporary-contexts-zine/index.html"
            },
            "mag": {
            title: "The Editorial Provocateur",
            subtitle: "Editorial Spread",
            category: "Design Work",
            personality: {
                vibe: "Magazine designer with bold opinions and bolder layouts",
                tools: "Typography, white space, and cultural commentary",
                superpower: "Making text and image work together like they're in love",
                kryptonite: "Boring articles that give you nothing to work with"
            },
            description: "You're the artist who makes editorial spreads that people actually stop to read. You understand that layout is storytelling, and you're not afraid to break the grid when it serves the message. You judge magazines by their typography and probably have strong opinions about which publications 'get it.'",
            quote: "This spread speaks louder than the article.",
            image: "collections/design/editorial-spread/1.jpg",
            path: "collections/design/editorial-spread/index.html"
            },
            "reliquary-heart": {
            title: "The Sacred Keeper",
            subtitle: "Reliquary Heart",
            category: "Printmaking",
            personality: {
                vibe: "Spiritual artist who turns grief into sacred objects",
                tools: "Printmaking tools, symbolism, and ancestral reverence",
                superpower: "Making loss tangible and beautiful",
                kryptonite: "People who say 'it's just a print'"
            },
            description: "You're the artist who believes in making shrines for feelings. You understand that printmaking is about repetition and ritual, and every pull from the press is a small ceremony. You collect religious imagery not for decoration but for the stories they carry, and you know how to make ordinary hearts feel holy.",
            quote: "I printed this heart 100 times until it felt sacred.",
            image: "collections/printmaking/reliquary-heart/reliquary-heart.jpg",
            path: "collections/printmaking/reliquary-heart/index.html"
            },
            "the-living-room": {
            title: "The Domestic Archaeologist",
            subtitle: "The Living Room",
            category: "Printmaking",
            personality: {
                vibe: "Memory keeper with nostalgic home vibes",
                tools: "Printmaking press, found textures, and emotional architecture",
                superpower: "Turning rooms into time capsules",
                kryptonite: "People who think spaces are 'just spaces'"
            },
            description: "You're the artist who knows that rooms hold memories like books hold stories. You pay attention to the texture of wallpaper, the pattern of tile, the weight of furniture. You understand that printmaking captures a moment in time, and you're documenting the spaces that shaped you before they disappear.",
            quote: "This room remembers everything we forgot.",
            image: "collections/printmaking/the-living-room/the-living-room.jpg",
            path: "collections/printmaking/the-living-room/index.html"
            },
            "unbecoming": {
            title: "The Metamorphosis Witness",
            subtitle: "Unbecoming",
            category: "Printmaking",
            personality: {
                vibe: "Transformation artist with poetic decay energy",
                tools: "Layered prints, texture building, and controlled chaos",
                superpower: "Finding beauty in things falling apart",
                kryptonite: "People who need everything to stay 'finished' and 'perfect'"
            },
            description: "You're the artist who understands that unraveling is part of the process. You know that printmaking layers and builds, and sometimes the most honest work comes from letting go of control. You're comfortable with imperfection because you've learned that transformation is rarely neat.",
            quote: "I'm not falling apart. I'm unbecoming what I was.",
            image: "collections/printmaking/unbecoming/Unbecoming.jpg",
            path: "collections/printmaking/unbecoming/index.html"
            },
            "the-unholy-gaze": {
            title: "The Sacred Subversive",
            subtitle: "The Unholy Gaze",
            category: "Printmaking",
            personality: {
                vibe: "Feminist critic with religious trauma and aquatint skills",
                tools: "Etching plates, acid baths, and righteous anger",
                superpower: "Making the church uncomfortable with its own imagery",
                kryptonite: "People who say 'you're reading too much into it'"
            },
            description: "You're the artist who grew up in church and has complicated feelings about it. You understand that religious imagery is powerful—and you're not afraid to reclaim it. You make work that questions who gets to be holy and who gets judged, and you know that the softest tones can carry the sharpest critiques.",
            quote: "They called me unholy. So I made it my aesthetic.",
            image: "collections/printmaking/The Unholy Gaze.jpg",
            path: "collections/printmaking/the-unholy-gaze/index.html"
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
                <button class="option-btn quiz-btn" data-index="${index}">
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
        const index = button.dataset.index;
        const question = this.questions[this.currentQuestion];
        const selectedOption = question.options[index];

        // Store answer
        this.answers.push(selectedOption);

        // Add scores to all pieces in this option (weighted by position)
        if (selectedOption.pieces) {
            selectedOption.pieces.forEach((piece, i) => {
                if (!this.scores[piece]) {
                    this.scores[piece] = 0;
                }
                // First piece gets 3 points, second gets 2, third gets 1
                const weight = Math.max(3 - i, 1);
                this.scores[piece] += weight;
            });
        }

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
                        <img src="/${result.image}" alt="${result.title}" loading="lazy" onerror="this.style.display='none';" />
                    </div>
                    <div class="result-text">
                        <h2 class="result-title">${result.title}</h2>
                        <h3 class="result-subtitle">${result.subtitle}</h3>
                        <div class="personality-summary">
                            <div class="personality-trait">
                                <strong>Your Vibe:</strong> ${result.personality.vibe}
                            </div>
                            <div class="personality-trait">
                                <strong>Your Tools:</strong> ${result.personality.tools}
                            </div>
                            <div class="personality-trait">
                                <strong>Your Superpower:</strong> ${result.personality.superpower}
                            </div>
                            <div class="personality-trait">
                                <strong>Your Kryptonite:</strong> ${result.personality.kryptonite}
                            </div>
                        </div>
                        <p class="result-description">${result.description}</p>
                        <blockquote class="result-quote">"${result.quote}"</blockquote>
                        
                        <div class="result-actions">
                            <a href="/${result.path}" class="quiz-btn primary">View Piece</a>
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
