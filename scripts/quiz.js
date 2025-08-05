class PortfolioQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
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
                description: "You're the artist who finds profound beauty in mental exhaustion. Your art captures those liminal moments when consciousness hovers at the periphery, when being present becomes a choice rather than a given. You understand that burnout has its own strange aesthetics, and dissociation is just another medium to master.",
                quote: "I draw the weight of being seen when I can barely see myself.",
                image: "collections/personal/anointed-gaze/images/anointed-main.jpg",
                path: "collections/personal/anointed-gaze/"
            },
            "abuelas-altar": {
                title: "The Ancestral Archivist",
                subtitle: "Abuela's Altar",
                category: "Personal Work", 
                description: "You're the keeper of family stories that others want to forget. Your art is a séance with the past, a conversation with ghosts who have too much to say. You understand that healing generational trauma is a full-contact sport, and your canvas bears the bruises of beautiful, necessary work.",
                quote: "My ancestors speak through my hands when my mouth can't find the words.",
                image: "collections/personal/abuelas-altar/images/altar-main.jpg",
                path: "collections/personal/abuelas-altar/"
            },
            "heaven-on-fire": {
                title: "The Apocalypse Aesthete",
                subtitle: "Heaven on Fire",
                category: "Personal Work",
                description: "You're the artist who finds paradise in chaos and beauty in collapse. Your work suggests that maybe the end of the world isn't something to fear—maybe it's something to paint. You understand that transformation requires destruction, and you're not afraid to light the match.",
                quote: "I paint paradise burning because sometimes heaven needs to start over.",
                image: "collections/personal/heaven-on-fire/images/heaven-main.jpg",
                path: "collections/personal/heaven-on-fire/"
            },
            "entre-mundos": {
                title: "The Liminal Wanderer",
                subtitle: "Entre Mundos",
                category: "Personal Work",
                description: "You exist beautifully between worlds, never fully belonging to just one. Your art captures the eternal immigrant experience—the profound loneliness and unexpected freedom of living in the spaces between cultures, languages, and identities. You've made homelessness into an art form.",
                quote: "I live in the hyphen between worlds, and I've learned to call it home.",
                image: "collections/personal/entre-mundos/images/mundos-main.jpg",
                path: "collections/personal/entre-mundos/"
            },
            "inheritance": {
                title: "The Legacy Liquidator",
                subtitle: "Inheritance",
                category: "Personal Work",
                description: "You're the artist who inherited more than you bargained for. Your work unpacks the beautiful burden of family legacies—the traditions you cherish, the patterns you're desperate to break, and the stories you're still learning to tell. You understand that inheritance isn't just about money or objects.",
                quote: "I didn't choose this legacy, but I choose what to do with it.",
                image: "collections/personal/inheritance/images/inheritance-main.jpg",
                path: "collections/personal/inheritance/"
            },
            "gnaw": {
                title: "The Hunger Sculptor",
                subtitle: "Gnaw",
                category: "Studio Work",
                description: "You're the artist who carves meaning from the act of consumption. Your work explores the mouth as both destroyer and creator, the space where language lives and dies. You understand that sometimes you have to destroy something completely to discover what it's really made of.",
                quote: "I carve mouths that speak the words I can't swallow.",
                image: "collections/studio/gnaw/images/JPEG/Studio6.jpg",
                path: "collections/studio/gnaw/"
            },
            "unraveling": {
                title: "The Wire Whisperer",
                subtitle: "Unraveling",
                category: "Studio Work",
                description: "You're the artist who finds poetry in psychological pressure. Your work transforms mental states into physical form, wrapping wire around thoughts until they confess their secrets. You understand that sometimes the act of falling apart is the only way to discover what holds you together.",
                quote: "I wrap wire around my thoughts until they tell me the truth.",
                image: "collections/studio/unraveling/images/JPEG/Studio5.jpg",
                path: "collections/studio/unraveling/"
            },
            "abyss-bloom": {
                title: "The Bioluminescent Botanist",
                subtitle: "Abyss Bloom",
                category: "Studio Work",
                description: "You're the artist who births creatures that shouldn't exist but absolutely must. Your work lives in the uncanny valley between nature and nightmare, creating beautiful organisms that glow with their own impossible light. You understand that the most profound beauty often comes from the deepest darkness.",
                quote: "I grow impossible flowers in the dark spaces of imagination.",
                image: "collections/studio/abyss-bloom/images/abyss-main.jpg",
                path: "collections/studio/abyss-bloom/"
            },
            "collected-remains": {
                title: "The Ruin Romanticist",
                subtitle: "Collected Remains",
                category: "Studio Work",
                description: "You're the artist who sees potential in what others discard. Your work is an archaeology of abandonment, finding beauty in the broken and meaning in the discarded. You understand that sometimes the most honest stories are told by objects that have been left behind.",
                quote: "I collect what others abandon because every ruin has a story to tell.",
                image: "collections/studio/collected-remains/images/remains-main.jpg",
                path: "collections/studio/collected-remains/"
            },
            "feathers-along-the-bend": {
                title: "The Current Catcher",
                subtitle: "Feathers Along the Bend",
                category: "Studio Work",
                description: "You're the artist who finds significance in things that drift. Your work captures the poetry of objects caught in motion, suspended between destinations. You understand that sometimes the most important moments happen in the spaces between intention and accident.",
                quote: "I catch the things that float between where they've been and where they're going.",
                image: "collections/studio/feathers-along-the-bend/images/feathers-main.jpg",
                path: "collections/studio/feathers-along-the-bend/"
            },
            "typographic-interpretation": {
                title: "The Letter Liberator",
                subtitle: "Typographic Interpretation",
                category: "Design Work",
                description: "You're the designer who believes letters have souls. Your work pushes typography beyond communication into pure emotion, making fonts feel feelings and kerning carry weight. You understand that sometimes breaking the rules is the only way to make them meaningful.",
                quote: "I free letters from their expected behaviors and watch them dance.",
                image: "collections/design/typographic-interpretation/images/typo-main.jpg",
                path: "collections/design/typographic-interpretation/"
            },
            "playing-cards": {
                title: "The Educational Insurgent",
                subtitle: "Scientific Revolution Playing Cards",
                category: "Design Work",
                description: "You're the designer who makes learning feel like rebellion. Your work transforms boring educational content into something people actually want to engage with. You understand that the best way to teach someone something is to make them forget they're being taught.",
                quote: "I smuggle education inside beautiful, playful experiences.",
                image: "collections/design/themed-playing-card-design/images/cards-main.jpg",
                path: "collections/design/themed-playing-card-design/"
            },
            "elements-book": {
                title: "The Principle Perfectionist",
                subtitle: "Elements & Principles Book Cover",
                category: "Design Work",
                description: "You're the designer who finds zen in fundamental principles. Your work demonstrates that mastery comes from understanding the basics so deeply that you can make them sing. You understand that constraints aren't limitations—they're the scaffolding that lets creativity soar.",
                quote: "I make the fundamentals feel fundamental again.",
                image: "collections/design/elements-and-principles-book-cover/images/book-main.jpg",
                path: "collections/design/elements-and-principles-book-cover/"
            },
            "double-sided-poster": {
                title: "The Truth Disruptor",
                subtitle: "Double-Sided Poster",
                category: "Design Work",
                description: "You're the designer who uses typography as a weapon against complacency. Your work doesn't just communicate—it interrogates, questions, and occasionally shouts. You understand that good design should comfort the disturbed and disturb the comfortable.",
                quote: "I break typography so it can tell uncomfortable truths.",
                image: "collections/design/double-sided-poster/images/poster-main.jpg",
                path: "collections/design/double-sided-poster/"
            },
            "reductive-symbols": {
                title: "The Symbol Surgeon",
                subtitle: "Reductive Symbols",
                category: "Design Work",
                description: "You're the designer who performs surgery on meaning itself. Your work strips away everything unnecessary until only the essential remains, creating symbols that carry maximum impact with minimum means. You understand that sometimes saying less means everything.",
                quote: "I cut away everything except what absolutely must remain.",
                image: "collections/design/reductive-symbols/images/symbols-main.jpg",
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
        const startButton = document.querySelector('.start-quiz-btn');
        if (startButton) {
            startButton.addEventListener('click', () => this.startQuiz());
        }

        // Next question button
        const nextButton = document.querySelector('.next-question-btn');
        if (nextButton) {
            nextButton.addEventListener('click', () => this.nextQuestion());
        }

        // Retake quiz button
        const retakeButton = document.querySelector('.retake-quiz-btn');
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
        const questionContainer = document.querySelector('.question-container');
        
        if (questionContainer) {
            questionContainer.innerHTML = `
                <div class="question-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((this.currentQuestion + 1) / this.questions.length) * 100}%"></div>
                    </div>
                    <span class="progress-text">Question ${this.currentQuestion + 1} of ${this.questions.length}</span>
                </div>
                <h2 class="question-text">${question.text}</h2>
                <div class="options-container">
                    ${question.options.map((option, index) => `
                        <button class="option-btn" data-piece="${option.piece}" data-weight="${option.weight}" data-index="${index}">
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
            `;

            // Bind option buttons
            const optionButtons = questionContainer.querySelectorAll('.option-btn');
            optionButtons.forEach(button => {
                button.addEventListener('click', (e) => this.selectAnswer(e));
            });
        }
    }

    selectAnswer(event) {
        const button = event.target;
        const piece = button.dataset.piece;
        const weight = parseInt(button.dataset.weight);

        // Store answer
        this.answers.push({ piece, weight });

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
        
        // Tally scores by piece
        const scores = {};
        this.answers.forEach(answer => {
            if (!scores[answer.piece]) {
                scores[answer.piece] = 0;
            }
            scores[answer.piece] += answer.weight;
        });

        // Find highest scoring piece
        const winningPiece = Object.keys(scores).reduce((a, b) => 
            scores[a] > scores[b] ? a : b
        );

        const result = this.portfolioData[winningPiece];
        console.log(`🎯 Result: ${result.title} (${winningPiece})`);
        
        this.displayResult(result);
    }

    displayResult(result) {
        this.showSection('quiz-results');
        
        const resultContainer = document.querySelector('.result-container');
        if (resultContainer) {
            resultContainer.innerHTML = `
                <div class="result-header">
                    <h2 class="result-title">${result.title}</h2>
                    <p class="result-subtitle">${result.subtitle}</p>
                </div>
                <div class="result-content">
                    <div class="result-image">
                        <img src="${result.image}" alt="${result.title}" />
                    </div>
                    <div class="result-description">
                        <p>${result.description}</p>
                        <blockquote>"${result.quote}"</blockquote>
                    </div>
                </div>
                <div class="result-actions">
                    <button class="share-result-btn">Share Your Result</button>
                    <button class="explore-piece-btn" onclick="window.location.href='${result.path}'">
                        View This Piece
                    </button>
                </div>
                <div class="portfolio-preview">
                    <h3>You Are Most Like:</h3>
                    <div class="piece-highlight">
                        <a href="${result.path}" class="piece-card-large">
                            <img src="${result.image}" alt="${result.subtitle}" loading="lazy">
                            <div class="piece-info">
                                <h4>${result.subtitle}</h4>
                                <p>${result.category}</p>
                            </div>
                        </a>
                    </div>
                </div>
            `;

            // Bind result action buttons
            const shareButton = resultContainer.querySelector('.share-result-btn');
            if (shareButton) {
                shareButton.addEventListener('click', () => this.shareResult(result));
            }

            // The explore button now uses inline onclick for simplicity
        }
    }

    async shareResult(result) {
        console.log('📱 Generating gothic share template');
        
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Gothic template dimensions (3:4 aspect ratio for social media)
            const width = 1080;
            const height = 1440;
            canvas.width = width;
            canvas.height = height;
            
            // Load images
            const [img, logo] = await Promise.all([
                this.loadImage(result.image),
                this.loadImage('images/logo/logo3.png')
            ]);
            
            // Generate template based on category
            const templateStyle = this.getTemplateStyle(result.category);
            this.generateGothicTemplate(ctx, result, templateStyle, img, logo, width, height);
            
            // Share options
            this.showShareOptions(canvas, result);
            
        } catch (error) {
            console.error('Error generating share template:', error);
            this.showSimpleShare(result);
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

    generateGothicTemplate(ctx, result, template, img, logo, width, height) {
        console.log(`🎨 Drawing Gothic ${template} template`);
        
        switch (template) {
            case 'minimal':
                this.drawGothicMinimal(ctx, result, img, logo, width, height);
                break;
            case 'artistic':
                this.drawGothicArtistic(ctx, result, img, logo, width, height);
                break;
            case 'elegant':
                this.drawGothicElegant(ctx, result, img, logo, width, height);
                break;
            default:
                this.drawGothicMinimal(ctx, result, img, logo, width, height);
        }
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
        console.log('📱 Showing share options');
        
        // Create modal with share options
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-content">
                <h3>Share Your Result</h3>
                <div class="canvas-preview">
                    <img src="${canvas.toDataURL()}" alt="Result Preview" />
                </div>
                <div class="share-buttons">
                    <button class="share-facebook-btn">Post to Facebook</button>
                    <button class="save-image-btn">Save Image</button>
                    <button class="copy-link-btn">Copy Link</button>
                </div>
                <button class="close-modal-btn">×</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Bind share button events
        modal.querySelector('.share-facebook-btn').addEventListener('click', () => {
            this.shareToFacebook(canvas, result);
        });
        
        modal.querySelector('.save-image-btn').addEventListener('click', () => {
            this.saveImage(canvas, result);
        });
        
        modal.querySelector('.copy-link-btn').addEventListener('click', () => {
            this.copyShareLink(result);
        });
        
        modal.querySelector('.close-modal-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Show modal
        setTimeout(() => modal.classList.add('active'), 100);
    }

    shareToFacebook(canvas, result) {
        canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append('image', blob, 'quiz-result.png');
            formData.append('message', `I just discovered my creative soul match: ${result.title}! Take the Portfolio Soul Quiz at leahcortezstudios.art`);
            
            // This would typically send to a server endpoint that handles Facebook posting
            // For now, we'll open Facebook share dialog with text
            const shareText = encodeURIComponent(`I just discovered my creative soul match: ${result.title}! Take the Portfolio Soul Quiz at leahcortezstudios.art`);
            const shareUrl = encodeURIComponent('https://leahcortezstudios.art');
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&t=${shareText}`, '_blank', 'width=600,height=400');
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
            alert('Share link copied to clipboard!');
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

    resetQuiz() {
        this.currentQuestion = 0;
        this.answers = [];
        this.showSection('quiz-start');
    }

    showSection(sectionClass) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show the requested section
        const targetSection = document.querySelector(`.${sectionClass}`);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Initializing Portfolio Quiz with Gothic Aesthetics');
    new PortfolioQuiz();
});
