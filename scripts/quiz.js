/**
 * Portfolio Soul Quiz - Leah Cortez Studio
 * A witty personality quiz that matches visitors with portfolio pieces
 */

class PortfolioQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.scores = {};
        
                // Quiz data with Leah's authentic voice
        this.questions = [
            {
                id: 1,
                text: "The thing that lives rent-free in your mind:",
                answers: [
                    { text: "Random facts you learned at 2 AM", weights: { cards: 3, bookCover: 2, remains: 2, flag: 1 }},
                    { text: "Something your family always says", weights: { inheritance: 3, altar: 3, entre: 2, anointed: 1 }},
                    { text: "A melody that makes you want to create", weights: { bloom: 3, gnaw: 2, unraveling: 2, heaven: 1 }},
                    { text: "Questions that keep you up at night", weights: { poster: 3, heaven: 2, hunch: 2, reductive: 1 }}
                ]
            },
            {
                id: 2,
                text: "Your happy place looks like:",
                answers: [
                    { text: "A cozy corner with books and good lighting", weights: { cards: 3, bookCover: 2, flag: 1, symbols: 1 }},
                    { text: "Anywhere that smells like home cooking", weights: { inheritance: 2, altar: 3, entre: 2, remains: 1 }},
                    { text: "A creative mess that somehow makes sense", weights: { bloom: 3, gnaw: 2, unraveling: 3, altar: 1 }},
                    { text: "A quiet space where your thoughts can wander", weights: { poster: 2, heaven: 2, hunch: 3, anointed: 2 }}
                ]
            },
            {
                id: 3,
                text: "The compliment that would actually make you cry:",
                answers: [
                    { text: "You helped me understand something new", weights: { bookCover: 3, cards: 2, symbols: 2, reductive: 1 }},
                    { text: "You remind me of the best parts of our family", weights: { inheritance: 3, entre: 2, altar: 2, anointed: 1 }},
                    { text: "You changed how I see the world", weights: { heaven: 3, poster: 2, gnaw: 1, hunch: 2 }},
                    { text: "You make me feel less alone in this", weights: { anointed: 3, unraveling: 3, bloom: 2, gnaw: 2 }}
                ]
            },
            {
                id: 4,
                text: "Your friends come to you when they need:",
                answers: [
                    { text: "Someone who remembers all the details", weights: { cards: 2, remains: 3, bookCover: 1, inheritance: 2 }},
                    { text: "A warm hug and your mom's recipe", weights: { altar: 3, inheritance: 2, entre: 2, anointed: 1 }},
                    { text: "Help turning their feelings into something real", weights: { bloom: 3, unraveling: 2, hunch: 2, symbols: 1 }},
                    { text: "Someone who asks the right questions", weights: { poster: 2, heaven: 2, reductive: 1, flag: 2 }}
                ]
            },
            {
                id: 5,
                text: "When you leave this world, you want people to say:",
                answers: [
                    { text: "She was always learning something new", weights: { bookCover: 3, cards: 2, symbols: 1, flag: 1 }},
                    { text: "She loved her people with everything she had", weights: { inheritance: 3, altar: 2, entre: 2, remains: 2 }},
                    { text: "She felt deeply and wasn't afraid to show it", weights: { anointed: 3, gnaw: 3, unraveling: 2, bloom: 2 }},
                    { text: "She made us think about things differently", weights: { poster: 3, heaven: 2, hunch: 2, reductive: 2 }}
                ]
            }
        ];

        // Results data with project information
        this.results = {
            poster: {
                title: "The Almost Right Word",
                subtitle: "The Truth Seeker",
                description: "Like this poster that challenges misinformation, you're drawn to work that questions assumptions and sparks important conversations. You believe design should educate and empower, turning complex issues into clear, compelling visuals.",
                quote: "You create work that makes people think twice about what they believe.",
                image: "collections/design/double-sided-poster/images/Design8.jpg",
                url: "collections/design/double-sided-poster/index-case-study.html"
            },
            cards: {
                title: "Scientific Revolution Playing Cards",
                subtitle: "The Educator",
                description: "Like these cards that bring historical figures to life, you excel at making learning engaging and accessible. You have a gift for research and storytelling, turning complex information into compelling narratives that stick with people.",
                quote: "You make the complex feel approachable and the historical feel relevant.",
                image: "collections/design/themed-playing-card-design/images/Design4.jpg",
                url: "collections/design/themed-playing-card-design/index-case-study.html"
            },
            bookCover: {
                title: "Elements & Principles Book Cover",
                subtitle: "The Systems Thinker",
                description: "Like this cover that bridges traditional design knowledge with contemporary practice, you understand how to build on established foundations while bringing fresh perspectives. You're drawn to structure, methodology, and clear communication.",
                quote: "You excel at organizing complex information into accessible, beautiful systems.",
                image: "collections/design/elements-and-principles-book-cover/images/Design1.jpg",
                url: "collections/design/elements-and-principles-book-cover/index-case-study.html"
            },
            hunch: {
                title: "HUNCH Typographic Interpretation",
                subtitle: "The Intuitive Creator",
                description: "Like this piece that transforms a single word into visual poetry, you trust your creative instincts and can find meaning in unexpected places. You're skilled at distilling concepts into their essential visual form.",
                quote: "You have a gift for seeing possibilities others miss.",
                image: "collections/design/typographic-interpretation/images/Design5.jpg",
                url: "collections/design/typographic-interpretation/index-case-study.html"
            },
            altar: {
                title: "Abuela's Altar",
                subtitle: "The Cultural Storyteller",
                description: "Like this altar that honors family tradition and memory, you understand the power of cultural heritage in creative work. You create pieces that connect past and present, honoring where you come from while building something new.",
                quote: "Your work bridges generations and keeps important stories alive.",
                image: "collections/studio/abuelas-altar/images/JPEG/Studio10.jpg",
                url: "collections/studio/abuelas-altar/index.html"
            },
            inheritance: {
                title: "Inheritance",
                subtitle: "The Personal Narrator",
                description: "Like this deeply personal piece, you're not afraid to draw from your own experiences and emotions in your creative work. You understand that the most powerful art often comes from the most authentic places.",
                quote: "You transform personal experience into universal connection.",
                image: "collections/personal/inheritance/images/JPEG/Personal1.jpg",
                url: "collections/personal/inheritance/index.html"
            },
            heaven: {
                title: "Heaven on Fire",
                subtitle: "The Boundary Pusher",
                description: "Like this piece that questions spiritual assumptions, you're drawn to work that challenges conventional thinking. You're not afraid to explore difficult topics or push against traditional boundaries in your creative practice.",
                quote: "You create work that starts important conversations.",
                image: "collections/personal/heaven-on-fire/images/JPEG/personal7.jpg",
                url: "collections/personal/heaven-on-fire/index.html"
            },
            reductive: {
                title: "Reductive Photo Solutions",
                subtitle: "The Clarity Creator",
                description: "Like this work that strips away the unnecessary to reveal essential meaning, you excel at finding the clearest way to communicate complex ideas. You understand that sometimes less really is more.",
                quote: "You find the signal in the noise and make complex ideas simple.",
                image: "collections/design/reductive-photo-solutions/images/Design6.jpg",
                url: "collections/design/reductive-photo-solutions/index-case-study.html"
            },
            flag: {
                title: "Flag Design",
                subtitle: "The Community Builder",
                description: "Like this flag that represents shared values and identity, you're drawn to projects that bring people together around common causes. You understand how design can build community and create belonging.",
                quote: "Your work helps people find their place in the larger story.",
                image: "collections/design/flag-design/images/Design3.jpg",
                url: "collections/design/flag-design/index-case-study.html"
            },
            entre: {
                title: "Entre Mundos",
                subtitle: "The Bridge Builder",
                description: "Like this piece that explores the space between cultures, you understand the complexity of identity and belonging. You create work that speaks to those who exist between worlds and find strength in that liminal space.",
                quote: "You help others see beauty in complexity and strength in difference.",
                image: "collections/personal/entre-mundos/images/JPEG/Personal8.jpg",
                url: "collections/personal/entre-mundos/index.html"
            },
            anointed: {
                title: "Anointed Gaze",
                subtitle: "The Depth Diver",
                description: "Like this piece that explores dissociation and mental landscapes, you're drawn to the spaces between consciousness and absence. You find beauty in vulnerability and aren't afraid to examine the complex inner world of human experience.",
                quote: "You transform difficult emotions into profound visual poetry.",
                image: "collections/personal/anointed-gaze/images/JPEG/personal6.jpg",
                url: "collections/personal/anointed-gaze/index.html"
            },
            bloom: {
                title: "Abyss Bloom",
                subtitle: "The Organic Innovator",
                description: "Like this sculptural piece that transforms everyday materials into something otherworldly, you see potential in unexpected places. You're drawn to transformation and creating beauty from surprising sources.",
                quote: "You turn the mundane into the magical through creative vision.",
                image: "collections/studio/abyss-bloom/images/JPEG/studio2.jpg",
                url: "collections/studio/abyss-bloom/index.html"
            },
            gnaw: {
                title: "Gnaw",
                subtitle: "The Interior Explorer",
                description: "Like this piece that speaks to hunger and anxiety through subtraction, you understand that sometimes the most powerful art comes from what's taken away rather than what's added. You're not afraid to explore difficult emotions.",
                quote: "You find meaning in the spaces between presence and absence.",
                image: "collections/studio/gnaw/images/JPEG/Studio6.jpg",
                url: "collections/studio/gnaw/index.html"
            },
            unraveling: {
                title: "Unraveling",
                subtitle: "The Emotional Architect",
                description: "Like this wire sculpture that transforms psychological states into physical form, you understand how to give shape to feelings. You're skilled at making the invisible visible through creative interpretation.",
                quote: "You build bridges between the inner world and outer expression.",
                image: "collections/studio/unraveling/images/JPEG/Studio5.jpg",
                url: "collections/studio/unraveling/index.html"
            },
            symbols: {
                title: "Reductive Symbols",
                subtitle: "The Essence Distiller",
                description: "Like this work that reduces complex emotions to their purest visual form, you excel at finding the core truth in complicated situations. You believe in the power of simplicity to communicate profound meaning.",
                quote: "You strip away the noise to reveal the essential truth.",
                image: "collections/design/reductive-symbols/images/design4.jpg",
                url: "collections/design/reductive-symbols/index-case-study.html"
            },
            remains: {
                title: "Collected Remains",
                subtitle: "The Memory Keeper",
                description: "Like this charcoal composition that transforms forgotten objects into meaningful narrative, you understand that every discarded thing has a story worth telling. You find significance in what others might overlook.",
                quote: "You see the extraordinary in the everyday and preserve what matters.",
                image: "collections/studio/collected-remains/images/JPEG/Studio1.jpg",
                url: "collections/studio/collected-remains/index.html"
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.resetQuiz();
    }

    bindEvents() {
        // Start quiz button
        const startBtn = document.getElementById('start-quiz-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startQuiz());
        }

        // Next question button
        const nextBtn = document.getElementById('next-question-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }

        // Retake quiz button
        const retakeBtn = document.getElementById('retake-quiz-btn');
        if (retakeBtn) {
            retakeBtn.addEventListener('click', () => this.resetQuiz());
        }

        // Share result button
        const shareBtn = document.getElementById('share-result-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareResult());
        }
    }

    resetQuiz() {
        this.currentQuestion = 0;
        this.answers = {};
        this.scores = {};
        
        // Reset display
        this.showSection('quiz-start');
        this.updateProgress();
    }

    startQuiz() {
        this.showSection('quiz-questions');
        this.displayQuestion();
        this.updateProgress();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionText = document.getElementById('question-text');
        const answerOptions = document.getElementById('answer-options');
        const nextBtn = document.getElementById('next-question-btn');

        if (questionText) {
            questionText.textContent = question.text;
        }

        if (answerOptions) {
            answerOptions.innerHTML = '';
            
            question.answers.forEach((answer, index) => {
                const option = document.createElement('div');
                option.className = 'answer-option';
                option.textContent = answer.text;
                option.dataset.index = index;
                
                option.addEventListener('click', () => {
                    // Remove selected class from all options
                    answerOptions.querySelectorAll('.answer-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    // Add selected class to clicked option
                    option.classList.add('selected');
                    
                    // Store answer
                    this.answers[question.id] = answer;
                    
                    // Show next button
                    if (nextBtn) {
                        nextBtn.classList.remove('hidden');
                    }
                });
                
                answerOptions.appendChild(option);
            });
        }

        // Hide next button initially
        if (nextBtn) {
            nextBtn.classList.add('hidden');
        }
    }

    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion < this.questions.length) {
            this.displayQuestion();
            this.updateProgress();
        } else {
            this.calculateResults();
            this.showResults();
        }
    }

    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const currentQuestionSpan = document.getElementById('current-question');
        const totalQuestionsSpan = document.getElementById('total-questions');
        
        const progress = ((this.currentQuestion) / this.questions.length) * 100;
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (currentQuestionSpan) {
            currentQuestionSpan.textContent = this.currentQuestion + 1;
        }
        
        if (totalQuestionsSpan) {
            totalQuestionsSpan.textContent = this.questions.length;
        }
    }

    calculateResults() {
        // Reset scores
        Object.keys(this.results).forEach(key => {
            this.scores[key] = 0;
        });

        // Calculate scores based on answers
        Object.values(this.answers).forEach(answer => {
            Object.entries(answer.weights).forEach(([project, weight]) => {
                if (this.scores[project] !== undefined) {
                    this.scores[project] += weight;
                }
            });
        });

        // Find the highest scoring result
        this.topResult = Object.keys(this.scores).reduce((a, b) => 
            this.scores[a] > this.scores[b] ? a : b
        );
    }

    showResults() {
        const result = this.results[this.topResult];
        
        // Update result content
        const resultTitle = document.getElementById('result-title');
        const resultSubtitle = document.getElementById('result-subtitle');
        const resultDescription = document.getElementById('result-description');
        const resultQuote = document.getElementById('result-quote-text');
        const resultImage = document.getElementById('result-project-image');
        const viewProjectBtn = document.getElementById('view-project-btn');

        if (resultTitle) resultTitle.textContent = result.title;
        if (resultSubtitle) resultSubtitle.textContent = result.subtitle;
        if (resultDescription) resultDescription.textContent = result.description;
        if (resultQuote) resultQuote.textContent = result.quote;
        if (resultImage) {
            resultImage.src = result.image;
            resultImage.alt = result.title;
        }
        if (viewProjectBtn) {
            viewProjectBtn.href = result.url;
        }

        this.showSection('quiz-results');
    }

    shareResult() {
        const result = this.results[this.topResult];
        
        // Create Spotify-style share modal with multiple story templates
        this.createSpotifyStyleShareModal(result);
    }

    createSpotifyStyleShareModal(result) {
        const modal = document.createElement('div');
        modal.className = 'spotify-share-modal';
        modal.innerHTML = `
            <div class="spotify-share-content">
                <div class="spotify-share-header">
                    <h3>Share Your Creative Match</h3>
                    <button class="spotify-share-close">&times;</button>
                </div>
                <div class="spotify-share-body">
                    <div class="story-templates">
                        <div class="template-selector">
                            <button class="template-btn active" data-template="minimal">Minimal</button>
                            <button class="template-btn" data-template="artistic">Artistic</button>
                            <button class="template-btn" data-template="bold">Bold</button>
                            <button class="template-btn" data-template="elegant">Elegant</button>
                        </div>
                        <div class="template-preview">
                            <canvas id="story-canvas" width="1080" height="1920"></canvas>
                        </div>
                    </div>
                    <div class="share-options">
                        <button class="spotify-btn download-story">
                            <span class="btn-icon">⬇️</span>
                            Save to Camera Roll
                        </button>
                        <button class="spotify-btn share-instagram">
                            <span class="btn-icon">📸</span>
                            Share to Instagram
                        </button>
                        <div class="more-options">
                            <button class="spotify-btn copy-text">
                                <span class="btn-icon">📋</span>
                                Copy Link
                            </button>
                            <button class="spotify-btn share-more">
                                <span class="btn-icon">📤</span>
                                More Options
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add to page
        document.body.appendChild(modal);

        // Initialize templates
        this.initializeStoryTemplates(modal, result);

        // Add event listeners
        this.addSpotifyShareEventListeners(modal, result);

        // Show modal
        setTimeout(() => modal.classList.add('active'), 10);
    }

    initializeStoryTemplates(modal, result) {
        this.currentTemplate = 'minimal';
        this.templates = {
            minimal: {
                bgColor: '#7e1c2e', // Your signature burgundy
                accentColor: '#f5c6d6', // Your cream pink
                textColor: '#ffffff',
                layout: 'minimal'
            },
            artistic: {
                bgColor: '#2d1b25', // Deep burgundy base
                accentColor: '#f5c6d6', // Your cream pink
                textColor: '#ffffff', // White text for contrast
                layout: 'artistic'
            },
            bold: {
                bgColor: '#1a0d12', // Very deep burgundy (not black)
                accentColor: '#f5c6d6', // Your cream pink
                textColor: '#ffffff',
                layout: 'bold'
            },
            elegant: {
                bgColor: '#faf8f6', // Light cream
                accentColor: '#7e1c2e', // Your burgundy
                textColor: '#2d1b25', // Deep burgundy text
                layout: 'elegant'
            }
        };

        // Generate initial template
        this.generateStoryTemplate(result, this.currentTemplate);
    }

    addSpotifyShareEventListeners(modal, result) {
        const closeBtn = modal.querySelector('.spotify-share-close');
        const templateBtns = modal.querySelectorAll('.template-btn');
        const downloadBtn = modal.querySelector('.download-story');
        const instagramBtn = modal.querySelector('.share-instagram');
        const copyBtn = modal.querySelector('.copy-text');
        const moreBtn = modal.querySelector('.share-more');

        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => document.body.removeChild(modal), 300);
        });

        // Template selection
        templateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                templateBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentTemplate = btn.dataset.template;
                this.generateStoryTemplate(result, this.currentTemplate);
            });
        });

        // Download story
        downloadBtn.addEventListener('click', () => {
            const canvas = modal.querySelector('#story-canvas');
            const link = document.createElement('a');
            link.download = `leah-cortez-${result.title.toLowerCase().replace(/\s+/g, '-')}-story.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // Show feedback
            downloadBtn.innerHTML = '<span class="btn-icon">✅</span>Saved!';
            setTimeout(() => {
                downloadBtn.innerHTML = '<span class="btn-icon">⬇️</span>Save to Camera Roll';
            }, 2000);
        });

        // Instagram share
        instagramBtn.addEventListener('click', () => {
            const canvas = modal.querySelector('#story-canvas');
            canvas.toBlob(blob => {
                if (navigator.share && navigator.canShare({ files: [new File([blob], 'story.png', { type: 'image/png' })] })) {
                    navigator.share({
                        files: [new File([blob], 'story.png', { type: 'image/png' })],
                        title: 'My Creative Match',
                        text: `I got "${result.title}"! Take the quiz at leahcortezstudios.art`
                    });
                } else {
                    // Fallback: open Instagram
                    window.open('https://www.instagram.com/stories/camera/', '_blank');
                }
            });
        });

        // Copy link
        copyBtn.addEventListener('click', () => {
            const shareText = `I got "${result.title}" - ${result.subtitle}! 🎨✨ Take Leah Cortez's Portfolio Soul Quiz: ${window.location.href}`;
            navigator.clipboard.writeText(shareText).then(() => {
                copyBtn.innerHTML = '<span class="btn-icon">✅</span>Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = '<span class="btn-icon">📋</span>Copy Link';
                }, 2000);
            });
        });

        // More options
        moreBtn.addEventListener('click', () => {
            const canvas = modal.querySelector('#story-canvas');
            canvas.toBlob(blob => {
                const file = new File([blob], 'story.png', { type: 'image/png' });
                if (navigator.share) {
                    navigator.share({
                        title: `My Creative Match: ${result.title}`,
                        text: `I discovered I'm "${result.subtitle}"! Take the quiz and find your creative match.`,
                        url: window.location.href,
                        files: [file]
                    });
                }
            });
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeBtn.click();
            }
        });
    }

    async generateStoryTemplate(result, templateName) {
        const template = this.templates[templateName];
        const canvas = document.getElementById('story-canvas');
        const ctx = canvas.getContext('2d');
        
        // Clear canvas first
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = template.bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Helper function to load images with proper error handling
        const loadImage = (src) => {
            return new Promise((resolve) => {
                const image = new Image();
                // Remove crossOrigin to avoid CORS issues on localhost
                // image.crossOrigin = 'anonymous';
                
                image.onload = () => {
                    console.log(`✅ Successfully loaded: ${src}`);
                    console.log(`📐 Image dimensions: ${image.width}x${image.height}`);
                    resolve(image);
                };
                image.onerror = (e) => {
                    console.log(`❌ Failed to load: ${src}`, e);
                    console.log(`🔍 Attempted URL: ${image.src}`);
                    resolve(null);
                };
                
                // Construct proper URL based on current location
                let imageUrl;
                if (src.startsWith('http')) {
                    imageUrl = src;
                } else if (src.startsWith('/')) {
                    imageUrl = window.location.origin + src;
                } else {
                    // Relative path - construct from current location
                    const basePath = window.location.href.replace(/\/[^\/]*$/, '/');
                    imageUrl = basePath + src;
                }
                
                console.log(`🌐 Loading image from: ${imageUrl}`);
                image.src = imageUrl;
            });
        };
        
        // Load both images concurrently
        const [resultImage, logoImage] = await Promise.all([
            loadImage(result.image),
            loadImage('images/logo/logo3.png')
        ]);
        
        console.log('🎨 Images loaded:', { resultImage: !!resultImage, logoImage: !!logoImage });
        console.log('📍 Logo path used:', 'images/logo/logo3.png');
        console.log('📍 Artwork path used:', result.image);
        
        // Draw the template
        this.drawTemplate(ctx, result, template, resultImage, logoImage, canvas.width, canvas.height);
    }

    drawTemplate(ctx, result, template, img, logo, width, height) {
        switch (template.layout) {
            case 'minimal':
                this.drawMinimalTemplate(ctx, result, template, img, logo, width, height);
                break;
            case 'artistic':
                this.drawArtisticTemplate(ctx, result, template, img, logo, width, height);
                break;
            case 'bold':
                this.drawBoldTemplate(ctx, result, template, img, logo, width, height);
                break;
            case 'elegant':
                this.drawElegantTemplate(ctx, result, template, img, logo, width, height);
                break;
            default:
                console.warn('Unknown template layout:', template.layout);
                this.drawMinimalTemplate(ctx, result, template, img, logo, width, height);
        }
    }

    drawMinimalTemplate(ctx, result, template, img, logo, width, height) {
        console.log('🎨✨ Drawing LEAH CORTEZ SIGNATURE minimal template with:', { img: !!img, logo: !!logo, width, height });
        
        // Your signature rich burgundy gradient background - NO GRAY!
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#7e1c2e');   // Your signature burgundy
        gradient.addColorStop(0.4, '#a0274a'); // Richer mid-tone
        gradient.addColorStop(0.7, '#2d1b25'); // Deep burgundy
        gradient.addColorStop(1, '#1a0d12');   // Very deep burgundy (not gray)
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Add luxurious texture overlay
        ctx.fillStyle = '#f5c6d6'; // Your cream pink
        ctx.globalAlpha = 0.03;
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 3 + 1;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        
        // Your signature floating ornamental elements
        ctx.fillStyle = '#f5c6d6'; // Your cream pink
        ctx.globalAlpha = 0.12;
        
        // Large ornamental circles
        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 80 + 40;
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Smaller accent elements
        ctx.globalAlpha = 0.08;
        for (let i = 0; i < 15; i++) {
            ctx.beginPath();
            const x = Math.random() * width;
            const y = Math.random() * height * 0.3; // Top area
            const size = Math.random() * 25 + 10;
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        
        // Studio logo with elegant glow effect
        if (logo) {
            const logoSize = 120;
            const logoX = (width - logoSize) / 2;
            const logoY = 80;
            
            // Glow effect for logo
            ctx.shadowColor = '#f5c6d6';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
            
            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            
            console.log('✨ Logo drawn with glow effect');
        } else {
            // Elegant fallback branding
            ctx.fillStyle = '#f5c6d6';
            ctx.font = 'bold 36px "Pirata One", serif';
            ctx.textAlign = 'center';
            ctx.fillText('LEAH', width / 2, 120);
            ctx.font = 'bold 28px "Pirata One", serif';
            ctx.fillText('CORTEZ', width / 2, 155);
            ctx.font = '18px "IM Fell English", serif';
            ctx.fillText('STUDIO', width / 2, 180);
            console.log('📝 Fallback logo text drawn');
        }
        
        // Project title with your typography
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 52px "Pirata One", serif';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 2;
        this.wrapText(ctx, result.title, width / 2, 280, width - 120, 65);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        
        // Subtitle with elegant styling
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'italic 34px "IM Fell English", serif';
        ctx.fillText(result.subtitle, width / 2, 370);
        
        // Decorative line under subtitle
        ctx.strokeStyle = '#f5c6d6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(width / 2 - 150, 390);
        ctx.lineTo(width / 2 + 150, 390);
        ctx.stroke();
        
        // Main artwork image with ornate frame
        const imgSize = 400;
        const imgX = (width - imgSize) / 2;
        const imgY = 430;
        
        if (img) {
            // Ornate multi-layered frame
            ctx.fillStyle = '#f5c6d6';
            ctx.fillRect(imgX - 25, imgY - 25, imgSize + 50, imgSize + 50);
            
            ctx.fillStyle = '#7e1c2e';
            ctx.fillRect(imgX - 20, imgY - 20, imgSize + 40, imgSize + 40);
            
            ctx.fillStyle = '#f5c6d6';
            ctx.fillRect(imgX - 15, imgY - 15, imgSize + 30, imgSize + 30);
            
            ctx.fillStyle = '#2d1b25';
            ctx.fillRect(imgX - 10, imgY - 10, imgSize + 20, imgSize + 20);
            
            // Draw the artwork
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(imgX, imgY, imgSize, imgSize, 8);
            ctx.clip();
            ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
            ctx.restore();
            
            console.log('🖼️ Artwork image drawn with ornate frame');
        } else {
            // Elegant placeholder with same frame
            ctx.fillStyle = '#f5c6d6';
            ctx.fillRect(imgX - 25, imgY - 25, imgSize + 50, imgSize + 50);
            
            ctx.fillStyle = '#7e1c2e';
            ctx.fillRect(imgX - 20, imgY - 20, imgSize + 40, imgSize + 40);
            
            ctx.fillStyle = '#2d1b25';
            ctx.beginPath();
            ctx.roundRect(imgX, imgY, imgSize, imgSize, 8);
            ctx.fill();
            
            // Placeholder text
            ctx.fillStyle = '#f5c6d6';
            ctx.font = '32px "Pirata One", serif';
            ctx.fillText('PORTFOLIO', width / 2, imgY + imgSize/2 - 15);
            ctx.font = '28px "IM Fell English", serif';
            ctx.fillText('ARTWORK', width / 2, imgY + imgSize/2 + 25);
            
            console.log('📷 Placeholder artwork drawn');
        }
        
        // Description with elegant typography
        ctx.fillStyle = '#ffffff';
        ctx.font = '26px "IM Fell English", serif';
        this.wrapText(ctx, result.description, width / 2, 900, width - 140, 34);
        
        // Quote with ornate styling
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'italic 24px "IM Fell English", serif';
        this.wrapText(ctx, `"${result.quote}"`, width / 2, 1100, width - 160, 32);
        
        // Bottom branding section with elegant styling
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'bold 38px "Pirata One", serif';
        ctx.fillText('LEAH CORTEZ STUDIO', width / 2, height - 200);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '26px "IBM Plex Mono", monospace';
        ctx.fillText('leahcortezstudios.art', width / 2, height - 160);
        
        ctx.fillStyle = 'rgba(245, 198, 214, 0.8)';
        ctx.font = '24px "IM Fell English", serif';
        ctx.fillText('Portfolio Soul Quiz', width / 2, height - 120);
        
        // Final decorative elements
        ctx.strokeStyle = '#f5c6d6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(100, height - 80);
        ctx.lineTo(width - 100, height - 80);
        ctx.stroke();
        
        console.log('✨ LEAH CORTEZ STYLE minimal template complete - rich burgundy with elegant details');
    }

    drawArtisticTemplate(ctx, result, template, img, logo, width, height) {
        // Your brand artistic background with rich burgundy gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#2d1b25'); // Deep burgundy
        gradient.addColorStop(0.5, '#7e1c2e'); // Your signature burgundy
        gradient.addColorStop(1, '#2d1b25'); // Deep burgundy
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Add artistic swirls and patterns with your cream pink
        ctx.fillStyle = '#f5c6d6';
        ctx.globalAlpha = 0.06;
        for (let i = 0; i < 30; i++) {
            ctx.beginPath();
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 150 + 50;
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add flowing lines for artistic feel
        ctx.strokeStyle = '#f5c6d6';
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.1;
        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.moveTo(0, Math.random() * height);
            ctx.bezierCurveTo(
                width * 0.3, Math.random() * height,
                width * 0.7, Math.random() * height,
                width, Math.random() * height
            );
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
        
        // Logo with artistic glow
        if (logo) {
            const logoSize = 100;
            const logoX = width - logoSize - 60;
            const logoY = 60;
            
            ctx.shadowColor = '#f5c6d6';
            ctx.shadowBlur = 25;
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        } else {
            ctx.fillStyle = '#f5c6d6';
            ctx.font = 'bold 28px "Pirata One", serif';
            ctx.textAlign = 'right';
            ctx.fillText('LC', width - 70, 90);
            ctx.font = '16px "IM Fell English", serif';
            ctx.fillText('STUDIO', width - 70, 115);
        }
        
        // Title with artistic typography
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 58px "Pirata One", serif';
        ctx.shadowColor = 'rgba(45, 27, 37, 0.8)';
        ctx.shadowBlur = 12;
        this.wrapText(ctx, result.title, width / 2, 180, width - 100, 70);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'italic 36px "IM Fell English", serif';
        ctx.fillText(result.subtitle, width / 2, 310);
        
        // Artistic decorative elements around title
        ctx.strokeStyle = '#f5c6d6';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.7;
        
        // Decorative flourishes
        ctx.beginPath();
        ctx.arc(width / 2 - 200, 250, 30, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(width / 2 + 200, 250, 30, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.globalAlpha = 1;
        
        // Main artwork with artistic multi-layered frame
        const imgSize = 380;
        const imgX = (width - imgSize) / 2;
        const imgY = 370;
        
        // Create artistic frame layers
        ctx.fillStyle = '#f5c6d6';
        ctx.fillRect(imgX - 20, imgY - 20, imgSize + 40, imgSize + 40);
        
        ctx.fillStyle = 'rgba(45, 27, 37, 0.8)';
        ctx.fillRect(imgX - 15, imgY - 15, imgSize + 30, imgSize + 30);
        
        ctx.fillStyle = '#f5c6d6';
        ctx.fillRect(imgX - 10, imgY - 10, imgSize + 20, imgSize + 20);
        
        if (img) {
            ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
        } else {
            ctx.fillStyle = '#2d1b25';
            ctx.fillRect(imgX, imgY, imgSize, imgSize);
            ctx.fillStyle = '#f5c6d6';
            ctx.font = '30px "Pirata One", serif';
            ctx.fillText('PORTFOLIO', width / 2, imgY + imgSize/2 - 10);
            ctx.font = '26px "IM Fell English", serif';
            ctx.fillText('ARTWORK', width / 2, imgY + imgSize/2 + 25);
        }
        
        // Description with artistic styling
        ctx.fillStyle = '#ffffff';
        ctx.font = '28px "IM Fell English", serif';
        this.wrapText(ctx, result.description, width / 2, 810, width - 120, 36);
        
        // Quote with artistic flourishes
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'italic 26px "IM Fell English", serif';
        this.wrapText(ctx, `"${result.quote}"`, width / 2, 1000, width - 140, 34);
        
        // Artistic branding
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'bold 36px "Pirata One", serif';
        ctx.fillText('LEAH CORTEZ STUDIO', width / 2, height - 180);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '26px "IBM Plex Mono", monospace';
        ctx.fillText('leahcortezstudios.art', width / 2, height - 140);
        
        ctx.fillStyle = 'rgba(245, 198, 214, 0.9)';
        ctx.font = '24px "IM Fell English", serif';
        ctx.fillText('Portfolio Soul Quiz', width / 2, height - 100);
    }

    drawBoldTemplate(ctx, result, template, img, logo, width, height) {
        // Rich deep burgundy background (not pure black)
        ctx.fillStyle = '#1a0d12'; // Very deep burgundy
        ctx.fillRect(0, 0, width, height);
        
        // Bold accent stripe with gradient
        const stripeGradient = ctx.createLinearGradient(0, 150, 0, 270);
        stripeGradient.addColorStop(0, '#f5c6d6'); // Your cream pink
        stripeGradient.addColorStop(0.5, '#7e1c2e'); // Your burgundy
        stripeGradient.addColorStop(1, '#f5c6d6'); // Your cream pink
        ctx.fillStyle = stripeGradient;
        ctx.fillRect(0, 150, width, 120);
        
        // Logo in the accent stripe with fallback
        if (logo) {
            const logoSize = 90;
            const logoX = 70;
            const logoY = 175;
            
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 15;
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        } else {
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 36px "Pirata One", serif';
            ctx.textAlign = 'left';
            ctx.fillText('LEAH', 80, 210);
            ctx.font = 'bold 28px "Pirata One", serif';
            ctx.fillText('CORTEZ', 80, 240);
        }
        
        // Large bold title with your fonts
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 72px "Pirata One", serif';
        ctx.shadowColor = 'rgba(126, 28, 46, 0.8)';
        ctx.shadowBlur = 10;
        this.wrapText(ctx, result.title.toUpperCase(), width / 2, 420, width - 80, 85);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Bold subtitle
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'bold 46px "Pirata One", serif';
        ctx.fillText(result.subtitle.toUpperCase(), width / 2, 540);
        
        // Main artwork image with bold frame
        const imgSize = 380;
        const imgX = (width - imgSize) / 2;
        const imgY = 600;
        
        // Bold multi-layered frame
        ctx.fillStyle = '#f5c6d6';
        ctx.fillRect(imgX - 15, imgY - 15, imgSize + 30, imgSize + 30);
        
        ctx.fillStyle = '#7e1c2e';
        ctx.fillRect(imgX - 10, imgY - 10, imgSize + 20, imgSize + 20);
        
        if (img) {
            ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
            
            // Bold border overlay
            ctx.strokeStyle = '#f5c6d6';
            ctx.lineWidth = 8;
            ctx.strokeRect(imgX, imgY, imgSize, imgSize);
        } else {
            // Bold placeholder
            ctx.fillStyle = '#2d1b25';
            ctx.fillRect(imgX, imgY, imgSize, imgSize);
            ctx.fillStyle = '#f5c6d6';
            ctx.font = 'bold 32px "Pirata One", serif';
            ctx.fillText('PORTFOLIO', width / 2, imgY + imgSize/2 - 10);
            ctx.font = 'bold 28px "Pirata One", serif';
            ctx.fillText('ARTWORK', width / 2, imgY + imgSize/2 + 30);
        }
        
        // Description in bold style
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px "IM Fell English", serif';
        this.wrapText(ctx, result.description, width / 2, 1050, width - 120, 36);
        
        // Bold quote
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'bold italic 26px "IM Fell English", serif';
        this.wrapText(ctx, `"${result.quote}"`, width / 2, 1250, width - 140, 34);
        
        // Bold branding
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'bold 48px "Pirata One", serif';
        ctx.fillText('LEAH CORTEZ', width / 2, height - 200);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px "Pirata One", serif';
        ctx.fillText('STUDIO', width / 2, height - 150);
        
        ctx.font = 'bold 26px "IBM Plex Mono", monospace';
        ctx.fillText('LEAHCORTEZSTUDIOS.ART', width / 2, height - 100);
    }

    drawElegantTemplate(ctx, result, template, img, logo, width, height) {
        // Elegant light cream background
        ctx.fillStyle = '#faf8f6';
        ctx.fillRect(0, 0, width, height);
        
        // Elegant outer border with your burgundy
        ctx.strokeStyle = '#7e1c2e';
        ctx.lineWidth = 12;
        ctx.strokeRect(80, 80, width - 160, height - 160);
        
        // Inner decorative border
        ctx.strokeStyle = '#f5c6d6';
        ctx.lineWidth = 4;
        ctx.strokeRect(110, 110, width - 220, height - 220);
        
        // Innermost accent line
        ctx.strokeStyle = '#7e1c2e';
        ctx.lineWidth = 2;
        ctx.strokeRect(130, 130, width - 260, height - 260);
        
        // Logo at top center with elegant styling
        if (logo) {
            const logoSize = 120;
            const logoX = (width - logoSize) / 2;
            const logoY = 150;
            
            // Subtle shadow for elegance
            ctx.shadowColor = 'rgba(126, 28, 46, 0.2)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetY = 2;
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;
        } else {
            ctx.fillStyle = '#7e1c2e';
            ctx.font = 'bold 32px "Pirata One", serif';
            ctx.textAlign = 'center';
            ctx.fillText('LEAH CORTEZ', width / 2, 190);
            ctx.font = '22px "IM Fell English", serif';
            ctx.fillText('STUDIO', width / 2, 220);
        }
        
        // Elegant typography with your fonts
        ctx.textAlign = 'center';
        ctx.fillStyle = '#2d1b25';
        ctx.font = '54px "Pirata One", serif';
        this.wrapText(ctx, result.title, width / 2, 320, width - 240, 65);
        
        ctx.fillStyle = '#7e1c2e';
        ctx.font = 'italic 38px "IM Fell English", serif';
        ctx.fillText(result.subtitle, width / 2, 420);
        
        // Elegant decorative flourishes
        ctx.strokeStyle = '#f5c6d6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(width / 2 - 180, 450);
        ctx.lineTo(width / 2 + 180, 450);
        ctx.stroke();
        
        // Small decorative circles
        ctx.fillStyle = '#7e1c2e';
        ctx.beginPath();
        ctx.arc(width / 2 - 190, 450, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(width / 2 + 190, 450, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Main artwork with elegant multi-layered frame
        const imgSize = 380;
        const imgX = (width - imgSize) / 2;
        const imgY = 490;
        
        if (img) {
            // Elegant layered frame
            ctx.strokeStyle = '#7e1c2e';
            ctx.lineWidth = 12;
            ctx.strokeRect(imgX - 25, imgY - 25, imgSize + 50, imgSize + 50);
            
            ctx.strokeStyle = '#f5c6d6';
            ctx.lineWidth = 8;
            ctx.strokeRect(imgX - 18, imgY - 18, imgSize + 36, imgSize + 36);
            
            ctx.strokeStyle = '#7e1c2e';
            ctx.lineWidth = 4;
            ctx.strokeRect(imgX - 12, imgY - 12, imgSize + 24, imgSize + 24);
            
            ctx.strokeStyle = '#2d1b25';
            ctx.lineWidth = 2;
            ctx.strokeRect(imgX - 6, imgY - 6, imgSize + 12, imgSize + 12);
            
            ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
        } else {
            // Elegant placeholder frame
            ctx.strokeStyle = '#7e1c2e';
            ctx.lineWidth = 12;
            ctx.strokeRect(imgX - 25, imgY - 25, imgSize + 50, imgSize + 50);
            
            ctx.fillStyle = '#f5c6d6';
            ctx.fillRect(imgX, imgY, imgSize, imgSize);
            
            ctx.fillStyle = '#7e1c2e';
            ctx.font = '32px "Pirata One", serif';
            ctx.fillText('PORTFOLIO', width / 2, imgY + imgSize/2 - 15);
            ctx.font = '28px "IM Fell English", serif';
            ctx.fillText('ARTWORK', width / 2, imgY + imgSize/2 + 25);
        }
        
        // Description in elegant typography
        ctx.fillStyle = '#2d1b25';
        ctx.font = '30px "IM Fell English", serif';
        this.wrapText(ctx, result.description, width / 2, 940, width - 200, 38);
        
        // Quote in elegant italic style
        ctx.fillStyle = '#7e1c2e';
        ctx.font = 'italic 26px "IM Fell English", serif';
        this.wrapText(ctx, `"${result.quote}"`, width / 2, 1190, width - 220, 34);
        
        // Elegant branding section
        ctx.fillStyle = '#2d1b25';
        ctx.font = '38px "Pirata One", serif';
        ctx.fillText('LEAH CORTEZ STUDIO', width / 2, height - 220);
        
        ctx.fillStyle = '#7e1c2e';
        ctx.font = 'italic 26px "IM Fell English", serif';
        ctx.fillText('Portfolio Soul Quiz', width / 2, height - 180);
        
        ctx.fillStyle = 'rgba(45, 27, 37, 0.8)';
        ctx.font = '24px "IBM Plex Mono", monospace';
        ctx.fillText('leahcortezstudios.art', width / 2, height - 140);
        
        // Final elegant decorative line
        ctx.strokeStyle = '#f5c6d6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(200, height - 110);
        ctx.lineTo(width - 200, height - 110);
        ctx.stroke();
    }

    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let currentY = y;

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, x, currentY);
                line = words[n] + ' ';
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, currentY);
    }

    showSection(sectionClass) {
        // Hide all sections
        const sections = ['quiz-start', 'quiz-questions', 'quiz-results'];
        sections.forEach(section => {
            const element = document.querySelector(`.${section}`);
            if (element) {
                element.classList.remove('active');
                element.classList.add('hidden');
            }
        });

        // Show target section
        const targetSection = document.querySelector(`.${sectionClass}`);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');
        }
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioQuiz();
});
