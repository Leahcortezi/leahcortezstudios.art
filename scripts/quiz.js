class PortfolioQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = {};
        this.questions = [
            {
                id: 1,
                text: "When you're emotionally drained at 2 AM, what calls to your creative soul?",
                options: [
                    { text: "Drawing the dissociative weight behind tired eyes", piece: "anointed-gaze", weight: 3 },
                    { text: "Building altars from family photographs and memory", piece: "abuelas-altar", weight: 3 },
                    { text: "Carving mouths that speak unspoken hungers", piece: "gnaw", weight: 3 },
                    { text: "Wrapping wire around forms until they confess their secrets", piece: "unraveling", weight: 3 },
                    { text: "Creating luminescent creatures from the void", piece: "abyss-bloom", weight: 3 },
                    { text: "Designing cards that make science feel like magic", piece: "playing-cards", weight: 3 },
                    { text: "Breaking typography until it screams the truth", piece: "typographic-interpretation", weight: 3 },
                    { text: "Making posters that question everything", piece: "double-sided-poster", weight: 3 }
                ]
            },
            {
                id: 2,
                text: "Your creative breakdown usually happens because...",
                options: [
                    { text: "You're processing generational trauma through art", piece: "abuelas-altar", weight: 3 },
                    { text: "You're drowning in your own emotional intensity", piece: "anointed-gaze", weight: 3 },
                    { text: "Paradise is burning and you need to paint it", piece: "heaven-on-fire", weight: 3 },
                    { text: "You're caught between two worlds and can't choose", piece: "entre-mundos", weight: 3 },
                    { text: "You found beauty in something everyone else discarded", piece: "collected-remains", weight: 3 },
                    { text: "Your perfectionist standards are impossible to meet", piece: "typographic-interpretation", weight: 3 },
                    { text: "The design brief makes no logical sense", piece: "elements-book", weight: 3 },
                    { text: "You're questioning what symbols actually mean", piece: "reductive-symbols", weight: 3 }
                ]
            },
            {
                id: 3,
                text: "The comment that would devastate you most as an artist:",
                options: [
                    { text: "'Your art is too depressing. Smile more!'", piece: "anointed-gaze", weight: 3 },
                    { text: "'Why can't you just get over your family stuff?'", piece: "abuelas-altar", weight: 3 },
                    { text: "'This looks like something a child could make.'", piece: "heaven-on-fire", weight: 3 },
                    { text: "'I don't get it. What's it supposed to be?'", piece: "abyss-bloom", weight: 3 },
                    { text: "'This is just random junk glued together.'", piece: "collected-remains", weight: 3 },
                    { text: "'The kerning is off by 2 pixels.'", piece: "typographic-interpretation", weight: 3 },
                    { text: "'It's fine, but what does it actually DO?'", piece: "playing-cards", weight: 3 },
                    { text: "'I've seen this exact design on Pinterest.'", piece: "elements-book", weight: 3 }
                ]
            },
            {
                id: 4,
                text: "Your studio ritual involves...",
                options: [
                    { text: "Lighting candles and having imaginary conversations with ancestors", piece: "abuelas-altar", weight: 3 },
                    { text: "Staring at yourself in mirrors until you see someone else", piece: "anointed-gaze", weight: 3 },
                    { text: "Collecting broken things others threw away", piece: "collected-remains", weight: 3 },
                    { text: "Destroying perfectly good materials on purpose", piece: "gnaw", weight: 3 },
                    { text: "Building creatures that shouldn't exist", piece: "abyss-bloom", weight: 3 },
                    { text: "Obsessing over typography until 4 AM", piece: "typographic-interpretation", weight: 3 },
                    { text: "Making educational content feel like rebellion", piece: "playing-cards", weight: 3 },
                    { text: "Turning every assignment into a manifesto", piece: "double-sided-poster", weight: 3 }
                ]
            },
            {
                id: 5,
                text: "People worry about you because...",
                options: [
                    { text: "You spend too much time talking to dead relatives", piece: "abuelas-altar", weight: 3 },
                    { text: "You seem to disappear even when you're right there", piece: "anointed-gaze", weight: 3 },
                    { text: "You find beauty in apocalyptic imagery", piece: "heaven-on-fire", weight: 3 },
                    { text: "You never throw anything away - it might be art", piece: "collected-remains", weight: 3 },
                    { text: "You talk to your sculptures like they're alive", piece: "abyss-bloom", weight: 3 },
                    { text: "You judge their Instagram posts' typography", piece: "typographic-interpretation", weight: 3 },
                    { text: "You make everything unnecessarily complicated", piece: "elements-book", weight: 3 },
                    { text: "You question everything, including this question", piece: "double-sided-poster", weight: 3 }
                ]
            },
            {
                id: 6,
                text: "Your art supplies budget embarrassingly goes toward...",
                options: [
                    { text: "Expensive graphite for those 6-hour drawing sessions", piece: "anointed-gaze", weight: 3 },
                    { text: "Candles, frames, and items that remind you of family", piece: "abuelas-altar", weight: 3 },
                    { text: "Wire, plaster, and tools you'll probably break", piece: "gnaw", weight: 3 },
                    { text: "Iridescent paints that cost more than your rent", piece: "abyss-bloom", weight: 3 },
                    { text: "Adobe subscriptions and the perfect Pantone book", piece: "typographic-interpretation", weight: 3 },
                    { text: "Specialty paper for projects no one will understand", piece: "double-sided-poster", weight: 3 },
                    { text: "Materials to make educational content look cooler", piece: "playing-cards", weight: 3 },
                    { text: "Whatever weird stuff you found in the trash", piece: "collected-remains", weight: 3 }
                ]
            },
            {
                id: 7,
                text: "At art openings, you're the person who...",
                options: [
                    { text: "Hides because people keep asking about your trauma", piece: "abuelas-altar", weight: 3 },
                    { text: "Zones out mid-conversation and stares at the wall", piece: "anointed-gaze", weight: 3 },
                    { text: "Describes their work as 'beautiful chaos' unironically", piece: "heaven-on-fire", weight: 3 },
                    { text: "Gets excited when someone touches the art", piece: "abyss-bloom", weight: 3 },
                    { text: "Explains the typographic choices in excessive detail", piece: "typographic-interpretation", weight: 3 },
                    { text: "Hands out business cards with perfect alignment", piece: "elements-book", weight: 3 },
                    { text: "Starts political debates about design ethics", piece: "double-sided-poster", weight: 3 },
                    { text: "Points out the recycled materials in every piece", piece: "collected-remains", weight: 3 }
                ]
            },
            {
                id: 8,
                text: "Your therapist (if you have one) probably...",
                options: [
                    { text: "Suggests you need to 'process your family dynamics'", piece: "abuelas-altar", weight: 3 },
                    { text: "Asks if you've considered medication for dissociation", piece: "anointed-gaze", weight: 3 },
                    { text: "Worries about your 'apocalyptic ideation'", piece: "heaven-on-fire", weight: 3 },
                    { text: "Questions your 'attachment to broken objects'", piece: "collected-remains", weight: 3 },
                    { text: "Doesn't understand why you anthropomorphize sculptures", piece: "abyss-bloom", weight: 3 },
                    { text: "Thinks your perfectionism is 'maladaptive'", piece: "typographic-interpretation", weight: 3 },
                    { text: "Suggests you're 'intellectualizing your emotions'", piece: "double-sided-poster", weight: 3 },
                    { text: "Admires your ability to 'find order in chaos'", piece: "elements-book", weight: 3 }
                ]
            }
        ];

        this.portfolioData = {
            "anointed-gaze": {
                title: "The Dissociation Devotee",
                subtitle: "Anointed Gaze",
                category: "Personal Work",
                archetype: {
                    essence: "You find beauty in exhaustion and liminal states",
                    medium: "Graphite portraits that capture mental distance",
                    strength: "Drawing emotional weight and disconnection",
                    challenge: "Being fully present while creating"
                },
                description: "You're the artist who finds profound beauty in mental exhaustion. Your art captures those liminal moments when consciousness hovers at the periphery. You understand that burnout has its own strange aesthetics.",
                quote: "I draw the weight of being seen when I can barely see myself.",
                image: "collections/personal/anointed-gaze/images/JPEG/personal6.jpg",
                path: "collections/personal/anointed-gaze/"
            },
            "abuelas-altar": {
                title: "The Ancestral Archivist",
                subtitle: "Abuela's Altar",
                category: "Personal Work",
                archetype: {
                    essence: "You channel family stories through art",
                    medium: "Mixed media altars and memory installations",
                    strength: "Honoring the past while healing the present",
                    challenge: "Balancing reverence with creative freedom"
                },
                description: "You're the keeper of family stories that others want to forget. Your art is a conversation with the past, honoring ancestors while processing generational experiences.",
                quote: "My ancestors speak through my hands when my mouth can't find the words.",
                image: "collections/studio/abuelas-altar/images/JPEG/Studio10.jpg",
                path: "collections/personal/abuelas-altar/"
            },
            "heaven-on-fire": {
                title: "The Apocalypse Aesthete",
                subtitle: "Heaven on Fire",
                category: "Personal Work",
                archetype: {
                    essence: "You find beauty in destruction and transformation",
                    medium: "Fiery paintings of paradise in collapse",
                    strength: "Creating meaning from chaos",
                    challenge: "Finding peace without drama"
                },
                description: "You're the artist who finds paradise in chaos and beauty in collapse. Your work suggests that maybe the end of the world isn't something to fear—maybe it's something to paint.",
                quote: "I paint paradise burning because sometimes heaven needs to start over.",
                image: "collections/personal/heaven-on-fire/images/JPEG/personal7.jpg",
                path: "collections/personal/heaven-on-fire/"
            },
            "entre-mundos": {
                title: "The Liminal Wanderer",
                subtitle: "Entre Mundos",
                category: "Personal Work",
                archetype: {
                    essence: "You navigate between cultures and identities",
                    medium: "Mixed media exploring cultural intersections",
                    strength: "Creating bridges between different worlds",
                    challenge: "Feeling like you belong everywhere and nowhere"
                },
                description: "You exist beautifully between worlds, never fully belonging to just one. Your art captures the eternal immigrant experience—living in the spaces between cultures, languages, and identities.",
                quote: "I live in the hyphen between worlds, and I've learned to call it home.",
                image: "images/logo/logo3.png",
                path: "collections/personal/entre-mundos/"
            },
            "inheritance": {
                title: "The Legacy Liquidator",
                subtitle: "Inheritance",
                category: "Personal Work",
                archetype: {
                    essence: "You transform family patterns through art",
                    medium: "Installations examining generational stories",
                    strength: "Breaking cycles while honoring heritage",
                    challenge: "Evolving beyond family expectations"
                },
                description: "You're the artist who inherited more than you bargained for. Your work unpacks family legacies—the traditions you cherish and the patterns you're desperate to break.",
                quote: "I didn't choose this legacy, but I choose what to do with it.",
                image: "collections/personal/inheritance/images/JPEG/Personal1.jpg",
                path: "collections/personal/inheritance/"
            },
            "gnaw": {
                title: "The Hunger Sculptor",
                subtitle: "Gnaw",
                category: "Studio Work",
                archetype: {
                    essence: "You find meaning in destruction and consumption",
                    medium: "Sculptural forms exploring mouths and erosion",
                    strength: "Carving truth from the act of consuming",
                    challenge: "Explaining why destruction creates meaning"
                },
                description: "You're the artist who carves meaning from the act of consumption. Your work explores the mouth as both destroyer and creator, finding truth in the process of erosion.",
                quote: "I carve mouths that speak the words I can't swallow.",
                image: "collections/studio/gnaw/images/JPEG/Studio6.jpg",
                path: "collections/studio/gnaw/"
            },
            "unraveling": {
                title: "The Wire Whisperer",
                subtitle: "Unraveling",
                category: "Studio Work",
                archetype: {
                    essence: "You transform pressure into physical form",
                    medium: "Wire sculptures that bind and constrain",
                    strength: "Making anxiety sculptural",
                    challenge: "Learning when to let go of control"
                },
                description: "You're the artist who finds poetry in psychological pressure. Your work transforms mental states into physical form, wrapping wire around thoughts until they confess their secrets.",
                quote: "I wrap wire around my thoughts until they tell me the truth.",
                image: "collections/studio/unraveling/images/JPEG/Studio5.jpg",
                path: "collections/studio/unraveling/"
            },
            "abyss-bloom": {
                title: "The Bioluminescent Botanist",
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
                path: "collections/studio/abyss-bloom/"
            },
            "collected-remains": {
                title: "The Ruin Romanticist",
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
                path: "collections/studio/collected-remains/"
            },
            "typographic-interpretation": {
                title: "The Letter Liberator",
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
                path: "collections/design/typographic-interpretation/"
            },
            "playing-cards": {
                title: "The Educational Insurgent",
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
                path: "collections/design/themed-playing-card-design/"
            },
            "elements-book": {
                title: "The Principle Perfectionist",
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
                path: "collections/design/elements-and-principles-book-cover/"
            },
            "double-sided-poster": {
                title: "The Truth Disruptor",
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
                path: "collections/design/double-sided-poster/"
            },
            "reductive-symbols": {
                title: "The Symbol Surgeon",
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
                path: "collections/design/reductive-symbols/"
            }
        };

        this.init();
    }

    init() {
        console.log('🎨 Initializing Portfolio Quiz with Gothic Templates');
        this.bindEvents();
        this.preloadImages();
    }

    preloadImages() {
        // Preload logo
        const logo = new Image();
        logo.src = 'images/logo/logo3.png';
        logo.onload = () => console.log('✨ Logo preloaded for gothic templates');
        
        // Preload portfolio images
        Object.values(this.portfolioData).forEach(data => {
            const img = new Image();
            img.src = data.image;
            img.onload = () => console.log(`🖼️ Preloaded ${data.title} image`);
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
        console.log('🎯 Starting Portfolio Soul Quiz');
        this.showSection('quiz-questions');
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        
        // Update progress
        const progressFill = document.querySelector('.progress-fill');
        const currentQuestionSpan = document.querySelector('#current-question');
        const totalQuestionsSpan = document.querySelector('#total-questions');
        
        if (progressFill) {
            progressFill.style.width = `${((this.currentQuestion + 1) / this.questions.length) * 100}%`;
        }
        if (currentQuestionSpan) {
            currentQuestionSpan.textContent = this.currentQuestion + 1;
        }
        if (totalQuestionsSpan) {
            totalQuestionsSpan.textContent = this.questions.length;
        }
        
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
        console.log('🧮 Calculating quiz results');
        
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
                            <button id="retake-quiz-btn" class="quiz-btn secondary">Take Again</button>
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
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = {};
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

    getTemplateStyle(category) {
        const styles = {
            'Personal Work': 'minimal',
            'Design Work': 'elegant', 
            'Studio Work': 'artistic'
        };
        return styles[category] || 'minimal';
    }

    generateGothicStoryTemplate(ctx, result, img, logo, width, height) {
        console.log('🖤 Creating Spotify-style Gothic Story template');
        
        // Deep gothic gradient background
        const gradient = ctx.createRadialGradient(width/2, height/3, 0, width/2, height/2, height);
        gradient.addColorStop(0, '#1a0d14');
        gradient.addColorStop(0.3, '#2d1b25');
        gradient.addColorStop(0.7, '#7e1c2e');
        gradient.addColorStop(1, '#0a0508');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Add mystical texture overlay with varied opacity
        ctx.globalAlpha = 0.08;
        ctx.fillStyle = '#f7f3f1';
        for (let i = 0; i < 1500; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 2 + 1;
            const alpha = Math.random() * 0.3 + 0.1;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add some burgundy accent particles
        ctx.fillStyle = '#7e1c2e';
        for (let i = 0; i < 300; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 1.5;
            ctx.globalAlpha = Math.random() * 0.2 + 0.05;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        
        // Top section: "Now Viewing" Spotify-style header
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, width, 120);
        
        ctx.font = 'bold 32px "IBM Plex Mono", monospace';
        ctx.fillStyle = '#f7f3f1';
        ctx.textAlign = 'center';
        ctx.fillText('NOW VIEWING', width/2, 50);
        
        ctx.font = '24px "IM Fell English", serif';
        ctx.fillStyle = '#7e1c2e';
        ctx.fillText('Leah Cortez Studios', width/2, 85);
        
        // Main artwork section (large, centered)
        if (img) {
            const imgSize = 700;
            const imgX = (width - imgSize) / 2;
            const imgY = 200;
            
            // Gothic frame with shadow
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            ctx.shadowBlur = 40;
            ctx.shadowOffsetY = 20;
            
            // Ornate frame
            ctx.strokeStyle = '#7e1c2e';
            ctx.lineWidth = 8;
            ctx.strokeRect(imgX - 20, imgY - 20, imgSize + 40, imgSize + 40);
            
            // Inner glow
            ctx.strokeStyle = 'rgba(247, 243, 241, 0.3)';
            ctx.lineWidth = 3;
            ctx.strokeRect(imgX - 10, imgY - 10, imgSize + 20, imgSize + 20);
            
            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;
            
            // Draw image
            this.drawImageCentered(ctx, img, imgX, imgY, imgSize, imgSize);
            
            // Gothic corner ornaments
            ctx.fillStyle = '#f7f3f1';
            this.drawGothicStar(ctx, imgX - 40, imgY - 40, 25);
            this.drawGothicStar(ctx, imgX + imgSize + 40, imgY - 40, 25);
            this.drawGothicStar(ctx, imgX - 40, imgY + imgSize + 40, 25);
            this.drawGothicStar(ctx, imgX + imgSize + 40, imgY + imgSize + 40, 25);
        }
        
        // Bottom section: Spotify-style track info
        const bottomY = height - 400;
        
        // Semi-transparent background for text area
        const textBg = ctx.createLinearGradient(0, bottomY - 50, 0, height);
        textBg.addColorStop(0, 'transparent');
        textBg.addColorStop(0.3, 'rgba(0, 0, 0, 0.8)');
        textBg.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
        ctx.fillStyle = textBg;
        ctx.fillRect(0, bottomY - 50, width, 450);
        
        // Quiz result type (like Spotify artist name)
        ctx.font = 'bold 48px "IM Fell English", serif';
        ctx.fillStyle = '#7e1c2e';
        ctx.textAlign = 'center';
        ctx.fillText('LEAH CORTEZ STUDIOS', width/2, bottomY + 40);
        
        // Featured piece title (like Spotify song title)
        ctx.font = 'bold 84px "Pirata One", cursive';
        ctx.fillStyle = '#f7f3f1';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(126, 28, 46, 0.8)';
        ctx.shadowBlur = 20;
        
        const pieceTitle = result.pieceTitle || result.title;
        const wrappedPieceTitle = this.wrapText(ctx, pieceTitle, width - 120);
        const titleStartY = bottomY + 100;
        wrappedPieceTitle.forEach((line, index) => {
            ctx.fillText(line, width/2, titleStartY + (index * 90));
        });
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Result type subtitle (like Spotify album name)
        const subtitleY = titleStartY + (wrappedPieceTitle.length * 90) + 30;
        ctx.font = 'italic 40px "IM Fell English", serif';
        ctx.fillStyle = '#d4a5a5';
        ctx.textAlign = 'center';
        ctx.fillText(`"${result.title}"`, width/2, subtitleY);
        
        // Category tag
        const categoryY = subtitleY + 50;
        ctx.font = 'bold 32px "IBM Plex Mono", monospace';
        ctx.fillStyle = '#7e1c2e';
        ctx.textAlign = 'center';
        ctx.fillText(result.category.toUpperCase(), width/2, categoryY);
        
        // Quote (like Spotify album info)
        const quoteY = categoryY + 80;
        ctx.font = 'italic 36px "IM Fell English", serif';
        ctx.fillStyle = '#f7f3f1';
        ctx.textAlign = 'center';
        const wrappedQuote = this.wrapText(ctx, `"${result.quote}"`, width - 120);
        wrappedQuote.forEach((line, index) => {
            ctx.fillText(line, width/2, quoteY + (index * 42));
        });
        
        // Bottom branding bar
        ctx.fillStyle = 'rgba(126, 28, 46, 0.9)';
        ctx.fillRect(0, height - 100, width, 100);
        
        // Logo and website
        if (logo) {
            const logoSize = 60;
            ctx.drawImage(logo, 60, height - 80, logoSize, logoSize);
        }
        
        ctx.font = 'bold 28px "IBM Plex Mono", monospace';
        ctx.fillStyle = '#f7f3f1';
        ctx.textAlign = 'left';
        ctx.fillText('LEAHCORTEZSTUDIOS.ART', 140, height - 45);
        
        // Take quiz CTA
        ctx.font = '24px "IM Fell English", serif';
        ctx.fillStyle = '#d4a5a5';
        ctx.textAlign = 'right';
        ctx.fillText('Take the Portfolio Soul Quiz →', width - 60, height - 45);
        
        // Add decorative border
        ctx.strokeStyle = '#7e1c2e';
        ctx.lineWidth = 6;
        ctx.strokeRect(30, 30, width - 60, height - 60);
        
        // Inner decorative border
        ctx.strokeStyle = 'rgba(247, 243, 241, 0.2)';
        ctx.lineWidth = 2;
        ctx.strokeRect(50, 50, width - 100, height - 100);
    }

    drawGothicMinimal(ctx, result, img, logo, width, height) {
        console.log('🖤 Drawing Gothic Minimal template');
        
        // Soft black background
        ctx.fillStyle = '#0e0e0e';
        ctx.fillRect(0, 0, width, height);
        
        // Subtle texture
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = '#f7f3f1';
        for (let i = 0; i < 1000; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 2;
            ctx.fillRect(x, y, size, size);
        }
        ctx.globalAlpha = 1;
        
        // Thin maroon border
        ctx.strokeStyle = '#7e1c2e';
        ctx.lineWidth = 3;
        ctx.strokeRect(60, 60, width - 120, height - 120);
        
        // Inner frame
        ctx.strokeStyle = 'rgba(247, 243, 241, 0.2)';
        ctx.lineWidth = 1;
        ctx.strokeRect(80, 80, width - 160, height - 160);
        
        // Logo placement
        if (logo) {
            const logoSize = 80;
            ctx.drawImage(logo, 100, 100, logoSize, logoSize);
        }
        
        // Gothic star corners
        ctx.fillStyle = '#7e1c2e';
        this.drawGothicStar(ctx, 120, 120, 15);
        this.drawGothicStar(ctx, width - 120, 120, 15);
        this.drawGothicStar(ctx, 120, height - 120, 15);
        this.drawGothicStar(ctx, width - 120, height - 120, 15);
        
        // Title - Pirata One
        ctx.fillStyle = '#f7f3f1';
        ctx.font = 'bold 56px "Pirata One", serif';
        ctx.textAlign = 'center';
        const titleY = 280;
        const wrappedTitle = this.wrapText(ctx, result.title, width - 200);
        wrappedTitle.forEach((line, index) => {
            ctx.fillText(line, width / 2, titleY + (index * 65));
        });
        
        // Playing card aesthetic subtitle
        const subtitleY = titleY + (wrappedTitle.length * 65) + 50;
        ctx.font = 'italic 32px "IM Fell English", serif';
        ctx.fillStyle = '#7e1c2e';
        ctx.fillText('"' + result.category + '"', width / 2, subtitleY);
        
        // Image with gothic frame
        if (img) {
            const imgSize = 400;
            const imgX = (width - imgSize) / 2;
            const imgY = subtitleY + 60;
            
            // Gothic frame
            ctx.strokeStyle = '#7e1c2e';
            ctx.lineWidth = 4;
            ctx.strokeRect(imgX - 10, imgY - 10, imgSize + 20, imgSize + 20);
            
            // Inner shadow effect
            ctx.strokeStyle = 'rgba(126, 28, 46, 0.3)';
            ctx.lineWidth = 2;
            ctx.strokeRect(imgX - 5, imgY - 5, imgSize + 10, imgSize + 10);
            
            this.drawImageCentered(ctx, img, imgX, imgY, imgSize, imgSize);
        }
        
        // Description text
        const descY = height - 300;
        ctx.font = '28px "IM Fell English", serif';
        ctx.fillStyle = '#f7f3f1';
        const wrappedDesc = this.wrapText(ctx, result.description, width - 160);
        wrappedDesc.forEach((line, index) => {
            ctx.fillText(line, width / 2, descY + (index * 35));
        });
        
        // Quote
        const quoteY = height - 180;
        ctx.font = 'italic 24px "IM Fell English", serif';
        ctx.fillStyle = '#7e1c2e';
        ctx.fillText('"' + result.quote + '"', width / 2, quoteY);
        
        // Footer
        const footerY = height - 100;
        ctx.font = 'bold 24px "Pirata One", serif';
        ctx.fillStyle = '#f7f3f1';
        ctx.fillText('LEAH CORTEZ STUDIOS', width / 2, footerY);
        
        ctx.font = '20px "IBM Plex Mono", monospace';
        ctx.fillStyle = '#7e1c2e';
        ctx.fillText('leahcortezstudios.art', width / 2, footerY + 35);
    }

    drawGothicArtistic(ctx, result, img, logo, width, height) {
        console.log('🎨 Drawing Gothic Artistic template');
        
        // Deep burgundy gradient
        const gradient = ctx.createRadialGradient(width/2, height/3, 0, width/2, height/3, height);
        gradient.addColorStop(0, '#4A1B3A');
        gradient.addColorStop(0.6, '#7e1c2e');
        gradient.addColorStop(1, '#2d1b25');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Mystical particles
        ctx.fillStyle = 'rgba(247, 243, 241, 0.1)';
        for (let i = 0; i < 500; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 3;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Sacred geometry
        ctx.strokeStyle = 'rgba(247, 243, 241, 0.15)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            const radius = 150 + (i * 60);
            ctx.beginPath();
            ctx.arc(width/2, height/2, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Title with ethereal glow
        ctx.fillStyle = '#f7f3f1';
        ctx.font = 'bold 58px "Pirata One", serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(126, 28, 46, 0.8)';
        ctx.shadowBlur = 25;
        
        const titleY = 180;
        const wrappedTitle = this.wrapText(ctx, result.title, width - 160);
        wrappedTitle.forEach((line, index) => {
            ctx.fillText(line, width / 2, titleY + (index * 70));
        });
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Category with mystical styling
        const subtitleY = titleY + (wrappedTitle.length * 70) + 50;
        ctx.font = 'italic 36px "IM Fell English", serif';
        ctx.fillStyle = '#f5c6d6';
        ctx.fillText('"The ' + result.category.replace(' Work', '') + '"', width / 2, subtitleY);
        
        // Image with mystical frame
        if (img) {
            const imgSize = 380;
            const imgX = (width - imgSize) / 2;
            const imgY = subtitleY + 80;
            
            // Mystical glow
            ctx.shadowColor = 'rgba(245, 198, 214, 0.5)';
            ctx.shadowBlur = 30;
            ctx.fillStyle = '#f7f3f1';
            ctx.fillRect(imgX - 15, imgY - 15, imgSize + 30, imgSize + 30);
            
            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            
            this.drawImageCentered(ctx, img, imgX, imgY, imgSize, imgSize);
            
            // Mystical corner ornaments
            ctx.fillStyle = '#7e1c2e';
            this.drawGothicStar(ctx, imgX - 25, imgY - 25, 20);
            this.drawGothicStar(ctx, imgX + imgSize + 25, imgY - 25, 20);
            this.drawGothicStar(ctx, imgX - 25, imgY + imgSize + 25, 20);
            this.drawGothicStar(ctx, imgX + imgSize + 25, imgY + imgSize + 25, 20);
        }
        
        // Description
        const descY = height - 240;
        ctx.font = '26px "IM Fell English", serif';
        ctx.fillStyle = '#f7f3f1';
        const wrappedDesc = this.wrapText(ctx, result.description, width - 160);
        wrappedDesc.forEach((line, index) => {
            ctx.fillText(line, width / 2, descY + (index * 32));
        });
        
        // Footer
        const footerY = height - 90;
        ctx.font = 'bold 28px "Pirata One", serif';
        ctx.fillStyle = '#f5c6d6';
        ctx.fillText('LEAH CORTEZ STUDIOS', width / 2, footerY);
        
        ctx.font = '22px "IBM Plex Mono", monospace';
        ctx.fillStyle = '#f7f3f1';
        ctx.fillText('leahcortezstudios.art', width / 2, footerY + 35);
    }

    drawGothicElegant(ctx, result, img, logo, width, height) {
        console.log('✨ Drawing Gothic Elegant template');
        
        // Elegant dusty rose gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#D4A5A5');
        gradient.addColorStop(0.5, '#C09090');
        gradient.addColorStop(1, '#8B6B6B');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Vignette
        const vignette = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
        vignette.addColorStop(0, 'transparent');
        vignette.addColorStop(0.7, 'transparent');
        vignette.addColorStop(1, 'rgba(45, 27, 37, 0.4)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);
        
        // Delicate lace border
        ctx.strokeStyle = 'rgba(45, 27, 37, 0.3)';
        ctx.lineWidth = 2;
        this.drawLaceBorder(ctx, 80, 80, width - 160, height - 160);
        
        // Title with elegant typography
        ctx.fillStyle = '#2d1b25';
        ctx.font = 'bold 54px "Playfair Display", serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(212, 165, 165, 0.6)';
        ctx.shadowBlur = 10;
        
        const titleY = 200;
        const wrappedTitle = this.wrapText(ctx, result.title, width - 200);
        wrappedTitle.forEach((line, index) => {
            ctx.fillText(line, width / 2, titleY + (index * 65));
        });
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Elegant subtitle
        const subtitleY = titleY + (wrappedTitle.length * 65) + 40;
        ctx.font = 'italic 32px "IM Fell English", serif';
        ctx.fillStyle = '#7e1c2e';
        ctx.fillText('"The ' + result.category.replace(' Work', '') + '"', width / 2, subtitleY);
        
        // Image with elegant frame
        if (img) {
            const imgSize = 360;
            const imgX = (width - imgSize) / 2;
            const imgY = subtitleY + 70;
            
            // Elegant shadow
            ctx.shadowColor = 'rgba(45, 27, 37, 0.3)';
            ctx.shadowBlur = 20;
            ctx.fillStyle = '#f7f3f1';
            ctx.fillRect(imgX - 15, imgY - 15, imgSize + 30, imgSize + 30);
            
            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            
            this.drawImageCentered(ctx, img, imgX, imgY, imgSize, imgSize);
            
            // Elegant frame
            ctx.strokeStyle = '#7e1c2e';
            ctx.lineWidth = 3;
            ctx.strokeRect(imgX - 15, imgY - 15, imgSize + 30, imgSize + 30);
        }
        
        // Description
        const descY = height - 280;
        ctx.font = '24px "IM Fell English", serif';
        ctx.fillStyle = '#2d1b25';
        const wrappedDesc = this.wrapText(ctx, result.description, width - 180);
        wrappedDesc.forEach((line, index) => {
            ctx.fillText(line, width / 2, descY + (index * 30));
        });
        
        // Quote
        const quoteY = height - 160;
        ctx.font = 'italic 22px "IM Fell English", serif';
        ctx.fillStyle = '#7e1c2e';
        ctx.fillText('"' + result.quote + '"', width / 2, quoteY);
        
        // Footer
        const footerY = height - 90;
        ctx.font = 'bold 26px "Playfair Display", serif';
        ctx.fillStyle = '#2d1b25';
        ctx.fillText('LEAH CORTEZ STUDIOS', width / 2, footerY);
        
        ctx.font = '20px "IBM Plex Mono", monospace';
        ctx.fillStyle = '#7e1c2e';
        ctx.fillText('leahcortezstudios.art', width / 2, footerY + 30);
    }

    // Helper methods
    drawGothicStar(ctx, x, y, size) {
        const points = 5;
        const outerRadius = size;
        const innerRadius = size * 0.4;
        
        ctx.beginPath();
        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
            const pointX = x + radius * Math.cos(angle);
            const pointY = y + radius * Math.sin(angle);
            
            if (i === 0) {
                ctx.moveTo(pointX, pointY);
            } else {
                ctx.lineTo(pointX, pointY);
            }
        }
        ctx.closePath();
        ctx.fill();
    }

    drawLaceBorder(ctx, x, y, width, height) {
        const scallops = 15;
        const scallop = width / scallops;
        
        // Top border
        ctx.beginPath();
        for (let i = 0; i < scallops; i++) {
            const startX = x + (i * scallop);
            const midX = startX + (scallop / 2);
            const endX = startX + scallop;
            
            if (i === 0) ctx.moveTo(startX, y);
            ctx.quadraticCurveTo(midX, y - 8, endX, y);
        }
        ctx.stroke();
        
        // Bottom border
        ctx.beginPath();
        for (let i = 0; i < scallops; i++) {
            const startX = x + (i * scallop);
            const midX = startX + (scallop / 2);
            const endX = startX + scallop;
            
            if (i === 0) ctx.moveTo(startX, y + height);
            ctx.quadraticCurveTo(midX, y + height + 8, endX, y + height);
        }
        ctx.stroke();
    }

    wrapText(ctx, text, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = ctx.measureText(currentLine + ' ' + word).width;
            if (width < maxWidth) {
                currentLine += ' ' + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }

    drawImageCentered(ctx, img, x, y, width, height) {
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const boxAspect = width / height;
        
        let drawWidth, drawHeight, drawX, drawY;
        
        if (imgAspect > boxAspect) {
            drawHeight = height;
            drawWidth = height * imgAspect;
            drawX = x - (drawWidth - width) / 2;
            drawY = y;
        } else {
            drawWidth = width;
            drawHeight = width / imgAspect;
            drawX = x;
            drawY = y - (drawHeight - height) / 2;
        }
        
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }

    async loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    showShareOptions(canvas, result) {
        console.log('📱 Showing user-friendly share options');
        
        // Create modal with improved share options
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-content">
                <button class="close-modal-btn" aria-label="Close">&times;</button>
                <div class="share-header">
                    <h3>Share Your Creative Match!</h3>
                    <p>Share your "${result.title}" result and inspire others to discover their creative soul.</p>
                </div>
                
                <div class="share-preview">
                    <img src="${canvas.toDataURL()}" alt="Your quiz result preview" class="result-preview-img" />
                </div>
                
                <div class="share-options">
                    <div class="share-section">
                        <h4>📱 Social Media</h4>
                        <div class="social-buttons">
                            <button class="share-btn instagram-btn">
                                <img src="icons/instagram.svg" alt="" width="20" height="20" />
                                <span>Instagram Stories</span>
                            </button>
                            <button class="share-btn facebook-btn">
                                <img src="icons/facebook.svg" alt="" width="20" height="20" />
                                <span>Facebook</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="share-section">
                        <h4>🔗 Quick Share</h4>
                        <div class="quick-share">
                            <button class="share-btn copy-link-btn">
                                <img src="icons/link.svg" alt="" width="18" height="18" />
                                <span>Copy Link</span>
                            </button>
                            <button class="share-btn save-image-btn">
                                <img src="icons/download.svg" alt="" width="18" height="18" />
                                <span>Save Image</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="share-section">
                        <h4>✨ Share Text</h4>
                        <div class="share-text">
                            <textarea readonly class="share-message" rows="3">I just discovered my creative soul match: "${result.title}"! 🎨 Take the Portfolio Soul Quiz at leahcortezstudios.art and find your artistic inspiration!</textarea>
                            <button class="copy-text-btn">Copy Text</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Bind event listeners with improved UX
        modal.querySelector('.instagram-btn').addEventListener('click', () => {
            this.shareToInstagram(canvas, result);
        });
        
        modal.querySelector('.facebook-btn').addEventListener('click', () => {
            this.shareToFacebook(canvas, result);
        });
        
        modal.querySelector('.copy-link-btn').addEventListener('click', () => {
            this.copyShareLink(result);
        });
        
        modal.querySelector('.save-image-btn').addEventListener('click', () => {
            this.saveImage(canvas, result);
        });
        
        modal.querySelector('.copy-text-btn').addEventListener('click', () => {
            this.copyShareText(result);
        });
        
        modal.querySelector('.close-modal-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Show modal with animation
        setTimeout(() => modal.classList.add('active'), 100);
    }

    shareToFacebook(canvas, result) {
        // Save the image first
        canvas.toBlob((blob) => {
            const link = document.createElement('a');
            link.download = `creative-soul-match-${result.title.toLowerCase().replace(/\s+/g, '-')}.png`;
            link.href = canvas.toDataURL();
            link.click();
            
            // Show user-friendly instructions
            setTimeout(() => {
                const shareText = encodeURIComponent(`I just discovered my creative soul match: "${result.title}"! 🎨 Take the Portfolio Soul Quiz at leahcortezstudios.art and find your artistic inspiration!`);
                const shareUrl = encodeURIComponent('https://leahcortezstudios.art/#portfolio-quiz');
                
                // Try to open Facebook share dialog
                const fbWindow = window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`, '_blank', 'width=600,height=500,scrollbars=yes,resizable=yes');
                
                // Show simple, clear instructions
                if (fbWindow) {
                    setTimeout(() => {
                        const modal = document.createElement('div');
                        modal.className = 'instruction-modal';
                        modal.innerHTML = `
                            <div class="instruction-content">
                                <h3>🎉 Image Downloaded!</h3>
                                <p><strong>Facebook sharing made easy:</strong></p>
                                <ol>
                                    <li>In the Facebook window that opened, click <strong>"Add Photo"</strong></li>
                                    <li>Upload your downloaded quiz result image</li>
                                    <li>Add your personal message and share!</li>
                                </ol>
                                <button class="got-it-btn">Got it! ✓</button>
                            </div>
                        `;
                        document.body.appendChild(modal);
                        modal.querySelector('.got-it-btn').addEventListener('click', () => {
                            document.body.removeChild(modal);
                        });
                        setTimeout(() => modal.classList.add('active'), 100);
                    }, 1000);
                }
            }, 300);
        }, 'image/png');
    }

    shareToInstagram(canvas, result) {
        // For Instagram Stories, we'll save the image and provide better instructions
        canvas.toBlob((blob) => {
            const link = document.createElement('a');
            link.download = `gothic-quiz-${result.title.toLowerCase().replace(/\s+/g, '-')}.png`;
            link.href = canvas.toDataURL();
            link.click();
            
            // Show comprehensive Instagram sharing instructions
            setTimeout(() => {
                const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                
                if (isMobile) {
                    // Try to open Instagram app for mobile users
                    const instagramUrl = 'instagram://story-camera';
                    const fallbackUrl = 'https://www.instagram.com/';
                    
                    // Try to open Instagram app
                    const now = new Date().valueOf();
                    setTimeout(() => {
                        if (new Date().valueOf() - now > 100) return;
                        window.location = fallbackUrl;
                    }, 25);
                    window.location = instagramUrl;
                    
                    alert(`📱 Image saved for Instagram Stories!\n\n✨ INSTAGRAM STORIES:\n1. Open Instagram app (should open automatically)\n2. Tap "Your Story" or swipe right from feed\n3. Tap the gallery icon (bottom left)\n4. Select your downloaded gothic quiz image\n5. Add text, stickers, or music if desired\n6. Share to your story! 🖤\n\n📖 INSTAGRAM FEED:\n1. Tap "+" to create new post\n2. Select the downloaded image\n3. Add caption: "I just discovered my creative soul match: ${result.title}! 🖤 Take the Portfolio Soul Quiz at leahcortezstudios.art"\n4. Share your result!`);
                } else {
                    // Desktop instructions
                    alert(`💻 Image saved for Instagram!\n\n📱 TO SHARE ON MOBILE:\n1. Transfer the downloaded image to your phone\n2. Open Instagram app\n3. For Stories: Swipe right → Gallery → Select image\n4. For Feed: Tap "+" → Select image → Add caption\n\n🌐 FROM DESKTOP:\n1. Go to instagram.com\n2. Click "+" to create new post\n3. Upload the downloaded gothic quiz image\n4. Add caption: "I just discovered my creative soul match: ${result.title}! 🖤 Take the Portfolio Soul Quiz at leahcortezstudios.art"\n5. Share your result! 🖤`);
                }
            }, 500);
        }, 'image/png');
    }

    saveImage(canvas, result) {
        const link = document.createElement('a');
        link.download = `portfolio-soul-quiz-${result.title.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL();
        link.click();
    }

    copyShareLink(result) {
        const shareUrl = `https://leahcortezstudios.art/?result=${result.category.toLowerCase().replace(' work', '')}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            // Show success feedback
            const button = document.querySelector('.copy-link-btn');
            const originalHTML = button.innerHTML;
            button.innerHTML = '<img src="icons/link.svg" alt="" width="18" height="18" /><span>Copied! ✓</span>';
            button.style.background = '#28a745';
            button.style.borderColor = '#28a745';
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = '';
                button.style.borderColor = '';
            }, 2000);
        }).catch(() => {
            // Fallback
            alert('Quiz link: ' + shareUrl);
        });
    }

    showSimpleShare(result) {
        const shareText = `I just discovered my creative soul match: ${result.title}! Take the Portfolio Soul Quiz at leahcortezstudios.art`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Portfolio Soul Quiz Result',
                text: shareText,
                url: 'https://leahcortezstudios.art'
            });
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Result text copied to clipboard!');
            });
        }
    }

    copyShareText(result) {
        const shareText = `I just discovered my creative soul match: "${result.title}"! 🎨 Take the Portfolio Soul Quiz at leahcortezstudios.art and find your artistic inspiration!`;
        navigator.clipboard.writeText(shareText).then(() => {
            // Show success feedback
            const button = document.querySelector('.copy-text-btn');
            const originalText = button.textContent;
            button.textContent = 'Copied! ✓';
            button.style.background = '#28a745';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.querySelector('.share-message');
            textArea.select();
            document.execCommand('copy');
            alert('Share text copied to clipboard!');
        });
    }

    saveImage(canvas, result) {
        const link = document.createElement('a');
        link.download = `creative-soul-match-${result.title.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        // Show success feedback
        const button = document.querySelector('.save-image-btn');
        const originalText = button.innerHTML;
        button.innerHTML = '<span>Saved! ✓</span>';
        button.style.background = '#28a745';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }

    resetQuiz() {
        this.currentQuestion = 0;
        this.answers = [];
        this.showSection('quiz-start');
    }

}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Initializing Portfolio Quiz with Gothic Aesthetics');
    new PortfolioQuiz();
});
