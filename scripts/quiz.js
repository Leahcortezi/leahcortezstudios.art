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
        console.log('🎨✨ Drawing SOCIAL MEDIA optimized minimal template');
        
        // Instagram-optimized gradient background
        const gradient = ctx.createRadialGradient(width/2, height/3, 0, width/2, height/3, height);
        gradient.addColorStop(0, '#a0274a');   // Lighter burgundy center
        gradient.addColorStop(0.3, '#7e1c2e'); // Your signature burgundy
        gradient.addColorStop(0.7, '#2d1b25'); // Deep burgundy
        gradient.addColorStop(1, '#0d0608');   // Nearly black edges
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Add subtle grain texture for premium social media look
        ctx.globalAlpha = 0.03;
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 1000; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            ctx.fillRect(x, y, 1, 1);
        }
        ctx.globalAlpha = 1;
        
        // Social media friendly floating elements - more structured
        ctx.fillStyle = '#f5c6d6';
        ctx.globalAlpha = 0.08;
        
        // Corner accent elements for visual balance
        const corners = [
            { x: width * 0.15, y: height * 0.15 },
            { x: width * 0.85, y: height * 0.15 },
            { x: width * 0.15, y: height * 0.85 },
            { x: width * 0.85, y: height * 0.85 }
        ];
        
        corners.forEach(corner => {
            ctx.beginPath();
            ctx.arc(corner.x, corner.y, 60, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(corner.x + 30, corner.y - 30, 25, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        
        // Logo positioned for social media - top left for brand recognition
        if (logo) {
            const logoSize = 100;
            const logoX = 80;
            const logoY = 80;
            
            // Premium glow effect
            ctx.shadowColor = '#f5c6d6';
            ctx.shadowBlur = 25;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 5;
            
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;
            
            console.log('✨ Logo positioned for social media impact');
        } else {
            ctx.fillStyle = '#f5c6d6';
            ctx.font = 'bold 32px "Pirata One", serif';
            ctx.textAlign = 'left';
            ctx.fillText('LEAH CORTEZ', 80, 140);
            ctx.font = '20px "IM Fell English", serif';
            ctx.fillText('STUDIO', 80, 170);
        }
        
        // Social media optimized title - larger and more impactful
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 64px "Pirata One", serif';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 3;
        this.wrapText(ctx, result.title, width / 2, 280, width - 120, 75);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        
        // Subtitle with social media appeal
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'italic 38px "IM Fell English", serif';
        ctx.fillText(result.subtitle, width / 2, 380);
        
        // Modern decorative line
        const lineGradient = ctx.createLinearGradient(width/2 - 200, 410, width/2 + 200, 410);
        lineGradient.addColorStop(0, 'transparent');
        lineGradient.addColorStop(0.2, '#f5c6d6');
        lineGradient.addColorStop(0.5, '#ffffff');
        lineGradient.addColorStop(0.8, '#f5c6d6');
        lineGradient.addColorStop(1, 'transparent');
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(width / 2 - 200, 410);
        ctx.lineTo(width / 2 + 200, 410);
        ctx.stroke();
        
        // Artwork image optimized for social media engagement
        const imgSize = 450; // Larger for more impact
        const imgX = (width - imgSize) / 2;
        const imgY = 450;
        
        if (img) {
            // Instagram-style frame with rounded corners and shadow
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 30;
            ctx.shadowOffsetY = 15;
            
            // Outer glow frame
            ctx.fillStyle = '#f5c6d6';
            ctx.beginPath();
            ctx.roundRect(imgX - 20, imgY - 20, imgSize + 40, imgSize + 40, 25);
            ctx.fill();
            
            // Inner frame
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.roundRect(imgX - 10, imgY - 10, imgSize + 20, imgSize + 20, 20);
            ctx.fill();
            
            // Image with rounded corners
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(imgX, imgY, imgSize, imgSize, 15);
            ctx.clip();
            ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
            ctx.restore();
            
            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;
            
            console.log('🖼️ Social media optimized artwork frame');
        } else {
            // Modern placeholder
            ctx.fillStyle = '#2d1b25';
            ctx.beginPath();
            ctx.roundRect(imgX, imgY, imgSize, imgSize, 15);
            ctx.fill();
            
            ctx.fillStyle = '#f5c6d6';
            ctx.font = '36px "Pirata One", serif';
            ctx.fillText('PORTFOLIO', width / 2, imgY + imgSize/2 - 15);
            ctx.font = '32px "IM Fell English", serif';
            ctx.fillText('ARTWORK', width / 2, imgY + imgSize/2 + 25);
        }
        
        // Description with better social media readability
        ctx.fillStyle = '#ffffff';
        ctx.font = '28px "IM Fell English", serif';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 5;
        this.wrapText(ctx, this.truncateText(result.description, 120), width / 2, 980, width - 120, 36);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Quote optimized for social sharing
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'italic 26px "IM Fell English", serif';
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = 3;
        this.wrapText(ctx, `"${this.truncateText(result.quote, 80)}"`, width / 2, 1150, width - 140, 34);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Social media optimized branding section
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'bold 42px "Pirata One", serif';
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 8;
        ctx.fillText('LEAH CORTEZ STUDIO', width / 2, height - 220);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px "IBM Plex Mono", monospace';
        ctx.fillText('LEAHCORTEZSTUDIOS.ART', width / 2, height - 180);
        
        ctx.fillStyle = 'rgba(245, 198, 214, 0.9)';
        ctx.font = '26px "IM Fell English", serif';
        ctx.fillText('Portfolio Soul Quiz', width / 2, height - 140);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Social media call-to-action
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '22px "IBM Plex Mono", monospace';
        ctx.fillText('Take the quiz • Find your creative match', width / 2, height - 100);
        
        // Final premium touch - subtle border
        ctx.strokeStyle = 'rgba(245, 198, 214, 0.3)';
        ctx.lineWidth = 8;
        ctx.strokeRect(4, 4, width - 8, height - 8);
        
        console.log('✨ Social media optimized minimal template complete');
    }

    drawArtisticTemplate(ctx, result, template, img, logo, width, height) {
        console.log('🎨 Drawing SOCIAL MEDIA artistic template');
        
        // Social media optimized artistic gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#2d1b25');
        gradient.addColorStop(0.3, '#7e1c2e');
        gradient.addColorStop(0.7, '#a0274a');
        gradient.addColorStop(1, '#2d1b25');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Dynamic artistic elements optimized for engagement
        ctx.fillStyle = '#f5c6d6';
        ctx.globalAlpha = 0.08;
        
        // Flowing artistic shapes
        for (let i = 0; i < 20; i++) {
            ctx.beginPath();
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 120 + 60;
            
            // Create organic shapes
            ctx.ellipse(x, y, size, size * 0.6, Math.random() * Math.PI, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Artistic flowing lines for visual interest
        ctx.strokeStyle = '#f5c6d6';
        ctx.lineWidth = 4;
        ctx.globalAlpha = 0.12;
        
        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            const startX = Math.random() * width;
            const startY = Math.random() * height;
            const cp1X = Math.random() * width;
            const cp1Y = Math.random() * height;
            const cp2X = Math.random() * width;
            const cp2Y = Math.random() * height;
            const endX = Math.random() * width;
            const endY = Math.random() * height;
            
            ctx.moveTo(startX, startY);
            ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
        
        // Logo positioned for social media engagement
        if (logo) {
            const logoSize = 110;
            const logoX = width - logoSize - 80;
            const logoY = 80;
            
            // Artistic glow effect
            ctx.shadowColor = '#f5c6d6';
            ctx.shadowBlur = 30;
            ctx.shadowOffsetX = -5;
            ctx.shadowOffsetY = 5;
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        } else {
            ctx.fillStyle = '#f5c6d6';
            ctx.font = 'bold 32px "Pirata One", serif';
            ctx.textAlign = 'right';
            ctx.fillText('LEAH', width - 80, 110);
            ctx.font = '20px "IM Fell English", serif';
            ctx.fillText('CORTEZ STUDIO', width - 80, 140);
        }
        
        // Social media optimized title
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 68px "Pirata One", serif';
        ctx.shadowColor = 'rgba(45, 27, 37, 0.8)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 8;
        this.wrapText(ctx, result.title, width / 2, 200, width - 120, 80);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        
        // Subtitle with artistic flair
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'italic 40px "IM Fell English", serif';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 8;
        ctx.fillText(result.subtitle, width / 2, 340);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Artistic decorative flourishes around title
        ctx.strokeStyle = '#f5c6d6';
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.6;
        
        // Left flourish
        ctx.beginPath();
        ctx.arc(width / 2 - 250, 270, 40, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(width / 2 - 280, 300, 20, 0, Math.PI * 2);
        ctx.stroke();
        
        // Right flourish
        ctx.beginPath();
        ctx.arc(width / 2 + 250, 270, 40, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(width / 2 + 280, 300, 20, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.globalAlpha = 1;
        
        // Main artwork with Instagram-style artistic frame
        const imgSize = 420;
        const imgX = (width - imgSize) / 2;
        const imgY = 400;
        
        // Multi-layered artistic frame with shadows
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 25;
        ctx.shadowOffsetY = 12;
        
        // Outer artistic frame
        ctx.fillStyle = '#f5c6d6';
        ctx.beginPath();
        ctx.roundRect(imgX - 25, imgY - 25, imgSize + 50, imgSize + 50, 30);
        ctx.fill();
        
        // Middle frame
        ctx.fillStyle = 'rgba(45, 27, 37, 0.9)';
        ctx.beginPath();
        ctx.roundRect(imgX - 15, imgY - 15, imgSize + 30, imgSize + 30, 25);
        ctx.fill();
        
        // Inner frame
        ctx.fillStyle = '#f5c6d6';
        ctx.beginPath();
        ctx.roundRect(imgX - 8, imgY - 8, imgSize + 16, imgSize + 16, 20);
        ctx.fill();
        
        if (img) {
            // Clip and draw image
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(imgX, imgY, imgSize, imgSize, 15);
            ctx.clip();
            ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
            ctx.restore();
        } else {
            ctx.fillStyle = '#2d1b25';
            ctx.beginPath();
            ctx.roundRect(imgX, imgY, imgSize, imgSize, 15);
            ctx.fill();
            
            ctx.fillStyle = '#f5c6d6';
            ctx.font = '34px "Pirata One", serif';
            ctx.fillText('PORTFOLIO', width / 2, imgY + imgSize/2 - 15);
            ctx.font = '30px "IM Fell English", serif';
            ctx.fillText('ARTWORK', width / 2, imgY + imgSize/2 + 25);
        }
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        
        // Description optimized for social media
        ctx.fillStyle = '#ffffff';
        ctx.font = '30px "IM Fell English", serif';
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = 5;
        this.wrapText(ctx, this.truncateText(result.description, 100), width / 2, 890, width - 140, 38);
        
        // Quote with artistic styling
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'italic 28px "IM Fell English", serif';
        this.wrapText(ctx, `"${this.truncateText(result.quote, 70)}"`, width / 2, 1050, width - 160, 36);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Social media branding
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'bold 40px "Pirata One", serif';
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 10;
        ctx.fillText('LEAH CORTEZ STUDIO', width / 2, height - 200);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px "IBM Plex Mono", monospace';
        ctx.fillText('LEAHCORTEZSTUDIOS.ART', width / 2, height - 160);
        
        ctx.fillStyle = 'rgba(245, 198, 214, 0.9)';
        ctx.font = '26px "IM Fell English", serif';
        ctx.fillText('Portfolio Soul Quiz', width / 2, height - 120);
        
        // Call to action
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '22px "IBM Plex Mono", monospace';
        ctx.fillText('Discover your creative match', width / 2, height - 85);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        console.log('✨ Social media artistic template complete');
    }

    drawBoldTemplate(ctx, result, template, img, logo, width, height) {
        console.log('🎨 Drawing SOCIAL MEDIA bold template');
        
        // High-contrast background for social media impact
        const bgGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, height/2);
        bgGradient.addColorStop(0, '#1a0d12');
        bgGradient.addColorStop(0.6, '#0d0608');
        bgGradient.addColorStop(1, '#000000');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, width, height);
        
        // Bold geometric accent elements for social media
        ctx.fillStyle = '#f5c6d6';
        ctx.globalAlpha = 0.1;
        
        // Dynamic geometric shapes
        const shapes = [
            { x: width * 0.1, y: height * 0.2, size: 100 },
            { x: width * 0.9, y: height * 0.3, size: 80 },
            { x: width * 0.15, y: height * 0.8, size: 120 },
            { x: width * 0.85, y: height * 0.7, size: 90 }
        ];
        
        shapes.forEach(shape => {
            ctx.fillRect(shape.x - shape.size/2, shape.y - shape.size/2, shape.size, shape.size);
            ctx.beginPath();
            ctx.arc(shape.x + 60, shape.y - 60, shape.size * 0.3, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        
        // Bold accent stripe with enhanced gradient
        const stripeGradient = ctx.createLinearGradient(0, 150, 0, 300);
        stripeGradient.addColorStop(0, '#f5c6d6');
        stripeGradient.addColorStop(0.2, '#ffffff');
        stripeGradient.addColorStop(0.5, '#7e1c2e');
        stripeGradient.addColorStop(0.8, '#ffffff');
        stripeGradient.addColorStop(1, '#f5c6d6');
        ctx.fillStyle = stripeGradient;
        ctx.fillRect(0, 150, width, 150);
        
        // Logo in the accent stripe
        if (logo) {
            const logoSize = 100;
            const logoX = 100;
            const logoY = 175;
            
            // Bold shadow for logo
            ctx.shadowColor = '#000000';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 8;
            ctx.shadowOffsetY = 8;
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        } else {
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 40px "Pirata One", serif';
            ctx.textAlign = 'left';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 3;
            ctx.fillText('LEAH', 100, 220);
            ctx.font = 'bold 32px "Pirata One", serif';
            ctx.fillText('CORTEZ', 100, 260);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        }
        
        // Large impactful title for social media
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 80px "Pirata One", serif';
        ctx.shadowColor = 'rgba(126, 28, 46, 0.8)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 8;
        this.wrapText(ctx, result.title.toUpperCase(), width / 2, 450, width - 100, 90);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        
        // Bold subtitle
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'bold 50px "Pirata One", serif';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 10;
        ctx.fillText(result.subtitle.toUpperCase(), width / 2, 580);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Main artwork with bold Instagram-style frame
        const imgSize = 400;
        const imgX = (width - imgSize) / 2;
        const imgY = 630;
        
        // Bold multi-layered frame with dramatic shadows
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 15;
        
        // Outer bold frame
        ctx.fillStyle = '#f5c6d6';
        ctx.fillRect(imgX - 20, imgY - 20, imgSize + 40, imgSize + 40);
        
        // Inner frame
        ctx.fillStyle = '#7e1c2e';
        ctx.fillRect(imgX - 12, imgY - 12, imgSize + 24, imgSize + 24);
        
        // White inner border
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(imgX - 6, imgY - 6, imgSize + 12, imgSize + 12);
        
        if (img) {
            ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
            
            // Bold border overlay
            ctx.strokeStyle = '#f5c6d6';
            ctx.lineWidth = 6;
            ctx.strokeRect(imgX, imgY, imgSize, imgSize);
        } else {
            ctx.fillStyle = '#1a0d12';
            ctx.fillRect(imgX, imgY, imgSize, imgSize);
            ctx.fillStyle = '#f5c6d6';
            ctx.font = 'bold 36px "Pirata One", serif';
            ctx.fillText('PORTFOLIO', width / 2, imgY + imgSize/2 - 15);
            ctx.font = 'bold 32px "Pirata One", serif';
            ctx.fillText('ARTWORK', width / 2, imgY + imgSize/2 + 25);
        }
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        
        // Description in bold style
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px "IM Fell English", serif';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 8;
        this.wrapText(ctx, this.truncateText(result.description, 90), width / 2, 1100, width - 140, 40);
        
        // Bold quote
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'bold italic 30px "IM Fell English", serif';
        this.wrapText(ctx, `"${this.truncateText(result.quote, 60)}"`, width / 2, 1280, width - 160, 38);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Bold social media branding
        ctx.fillStyle = '#f5c6d6';
        ctx.font = 'bold 52px "Pirata One", serif';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 12;
        ctx.fillText('LEAH CORTEZ', width / 2, height - 220);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px "Pirata One", serif';
        ctx.fillText('STUDIO', width / 2, height - 170);
        
        ctx.font = 'bold 28px "IBM Plex Mono", monospace';
        ctx.fillText('LEAHCORTEZSTUDIOS.ART', width / 2, height - 130);
        
        // Social media call to action
        ctx.fillStyle = 'rgba(245, 198, 214, 0.9)';
        ctx.font = '24px "IBM Plex Mono", monospace';
        ctx.fillText('TAKE THE QUIZ • FIND YOUR MATCH', width / 2, height - 90);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        console.log('💥 Social media bold template complete');
    }

    drawElegantTemplate(ctx, result, template, img, logo, width, height) {
        console.log('🎨 Drawing SOCIAL MEDIA elegant template');
        
        // Sophisticated background for social media elegance
        const bgGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, height/2);
        bgGradient.addColorStop(0, '#ffffff');
        bgGradient.addColorStop(0.7, '#faf8f6');
        bgGradient.addColorStop(1, '#f5f2f0');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, width, height);
        
        // Subtle elegant texture
        ctx.fillStyle = '#7e1c2e';
        ctx.globalAlpha = 0.02;
        for (let i = 0; i < 500; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            ctx.fillRect(x, y, 1, 1);
        }
        ctx.globalAlpha = 1;
        
        // Elegant outer border with premium feel
        ctx.strokeStyle = '#7e1c2e';
        ctx.lineWidth = 15;
        ctx.strokeRect(60, 60, width - 120, height - 120);
        
        // Inner decorative borders
        ctx.strokeStyle = '#f5c6d6';
        ctx.lineWidth = 6;
        ctx.strokeRect(90, 90, width - 180, height - 180);
        
        ctx.strokeStyle = '#7e1c2e';
        ctx.lineWidth = 3;
        ctx.strokeRect(110, 110, width - 220, height - 220);
        
        // Corner decorative elements
        const cornerSize = 40;
        const corners = [
            { x: 60, y: 60 },
            { x: width - 60, y: 60 },
            { x: 60, y: height - 60 },
            { x: width - 60, y: height - 60 }
        ];
        
        ctx.fillStyle = '#f5c6d6';
        corners.forEach(corner => {
            ctx.beginPath();
            ctx.arc(corner.x, corner.y, 20, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Logo with elegant positioning
        if (logo) {
            const logoSize = 130;
            const logoX = (width - logoSize) / 2;
            const logoY = 140;
            
            // Elegant shadow
            ctx.shadowColor = 'rgba(126, 28, 46, 0.3)';
            ctx.shadowBlur = 15;
            ctx.shadowOffsetY = 8;
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;
        } else {
            ctx.fillStyle = '#7e1c2e';
            ctx.font = 'bold 36px "Pirata One", serif';
            ctx.textAlign = 'center';
            ctx.fillText('LEAH CORTEZ', width / 2, 200);
            ctx.font = '26px "IM Fell English", serif';
            ctx.fillText('STUDIO', width / 2, 235);
        }
        
        // Elegant typography optimized for social media
        ctx.textAlign = 'center';
        ctx.fillStyle = '#2d1b25';
        ctx.font = '58px "Pirata One", serif';
        ctx.shadowColor = 'rgba(126, 28, 46, 0.1)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;
        this.wrapText(ctx, result.title, width / 2, 340, width - 260, 70);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.fillStyle = '#7e1c2e';
        ctx.font = 'italic 42px "IM Fell English", serif';
        ctx.fillText(result.subtitle, width / 2, 450);
        
        // Elegant decorative flourishes
        ctx.strokeStyle = '#f5c6d6';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(width / 2 - 220, 480);
        ctx.lineTo(width / 2 + 220, 480);
        ctx.stroke();
        
        // Decorative elements
        ctx.fillStyle = '#7e1c2e';
        ctx.beginPath();
        ctx.arc(width / 2 - 240, 480, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(width / 2 + 240, 480, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Small accent flourishes
        ctx.strokeStyle = '#f5c6d6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(width / 2 - 260, 480, 15, 0, Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(width / 2 + 260, 480, 15, 0, Math.PI);
        ctx.stroke();
        
        // Main artwork with sophisticated frame
        const imgSize = 400;
        const imgX = (width - imgSize) / 2;
        const imgY = 520;
        
        if (img) {
            // Elegant shadow for the entire frame
            ctx.shadowColor = 'rgba(126, 28, 46, 0.2)';
            ctx.shadowBlur = 25;
            ctx.shadowOffsetY = 15;
            
            // Outer elegant frame
            ctx.strokeStyle = '#7e1c2e';
            ctx.lineWidth = 15;
            ctx.strokeRect(imgX - 30, imgY - 30, imgSize + 60, imgSize + 60);
            
            // Middle frame
            ctx.strokeStyle = '#f5c6d6';
            ctx.lineWidth = 10;
            ctx.strokeRect(imgX - 20, imgY - 20, imgSize + 40, imgSize + 40);
            
            // Inner frame
            ctx.strokeStyle = '#7e1c2e';
            ctx.lineWidth = 6;
            ctx.strokeRect(imgX - 12, imgY - 12, imgSize + 24, imgSize + 24);
            
            // Finest inner border
            ctx.strokeStyle = '#2d1b25';
            ctx.lineWidth = 3;
            ctx.strokeRect(imgX - 6, imgY - 6, imgSize + 12, imgSize + 12);
            
            // Draw image with rounded corners
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(imgX, imgY, imgSize, imgSize, 8);
            ctx.clip();
            ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
            ctx.restore();
            
            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;
        } else {
            // Elegant placeholder
            ctx.fillStyle = '#f5c6d6';
            ctx.fillRect(imgX, imgY, imgSize, imgSize);
            
            ctx.fillStyle = '#7e1c2e';
            ctx.font = '36px "Pirata One", serif';
            ctx.fillText('PORTFOLIO', width / 2, imgY + imgSize/2 - 15);
            ctx.font = '32px "IM Fell English", serif';
            ctx.fillText('ARTWORK', width / 2, imgY + imgSize/2 + 25);
        }
        
        // Description in elegant typography
        ctx.fillStyle = '#2d1b25';
        ctx.font = '32px "IM Fell English", serif';
        this.wrapText(ctx, this.truncateText(result.description, 110), width / 2, 990, width - 220, 40);
        
        // Quote in elegant italic style
        ctx.fillStyle = '#7e1c2e';
        ctx.font = 'italic 28px "IM Fell English", serif';
        this.wrapText(ctx, `"${this.truncateText(result.quote, 80)}"`, width / 2, 1180, width - 240, 36);
        
        // Elegant branding section
        ctx.fillStyle = '#2d1b25';
        ctx.font = '42px "Pirata One", serif';
        ctx.fillText('LEAH CORTEZ STUDIO', width / 2, height - 240);
        
        ctx.fillStyle = '#7e1c2e';
        ctx.font = 'italic 30px "IM Fell English", serif';
        ctx.fillText('Portfolio Soul Quiz', width / 2, height - 200);
        
        ctx.fillStyle = 'rgba(45, 27, 37, 0.8)';
        ctx.font = '26px "IBM Plex Mono", monospace';
        ctx.fillText('leahcortezstudios.art', width / 2, height - 160);
        
        // Elegant call to action
        ctx.fillStyle = 'rgba(126, 28, 46, 0.7)';
        ctx.font = 'italic 24px "IM Fell English", serif';
        ctx.fillText('Discover your creative essence', width / 2, height - 120);
        
        // Final elegant decorative line
        ctx.strokeStyle = '#f5c6d6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(200, height - 90);
        ctx.lineTo(width - 200, height - 90);
        ctx.stroke();
        
        console.log('✨ Social media elegant template complete');
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

    // Helper function to truncate text for social media
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
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
