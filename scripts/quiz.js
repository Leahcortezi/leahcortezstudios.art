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
                bgColor: '#111111',
                accentColor: '#f5c6d6',
                textColor: '#ffffff',
                layout: 'centered'
            },
            artistic: {
                bgColor: '#2d1b25',
                accentColor: '#7e1c2e',
                textColor: '#f5c6d6',
                layout: 'artistic'
            },
            bold: {
                bgColor: '#000000',
                accentColor: '#f5c6d6',
                textColor: '#ffffff',
                layout: 'bold'
            },
            elegant: {
                bgColor: '#faf8f6',
                accentColor: '#7e1c2e',
                textColor: '#2d1b25',
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
                image.crossOrigin = 'anonymous';
                image.onload = () => {
                    console.log(`Successfully loaded: ${src}`);
                    resolve(image);
                };
                image.onerror = (e) => {
                    console.log(`Failed to load: ${src}`, e);
                    resolve(null);
                };
                // Use absolute path for images
                if (src.startsWith('images/') || src.startsWith('collections/')) {
                    image.src = window.location.origin + window.location.pathname.replace('index.html', '') + src;
                } else {
                    image.src = src;
                }
            });
        };
        
        // Load both images concurrently
        const [resultImage, logoImage] = await Promise.all([
            loadImage(result.image),
            loadImage('images/logo/logo1.png')
        ]);
        
        console.log('Images loaded:', { resultImage: !!resultImage, logoImage: !!logoImage });
        
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
        }
    }

    drawMinimalTemplate(ctx, result, template, img, logo, width, height) {
        console.log('Drawing minimal template with:', { img: !!img, logo: !!logo, width, height });
        
        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, template.bgColor);
        gradient.addColorStop(1, '#0a0a0a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Add some texture/pattern
        ctx.fillStyle = template.accentColor + '08';
        for (let i = 0; i < 20; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 80 + 20, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Logo at top - always draw even if image fails
        if (logo) {
            const logoSize = 100;
            const logoX = (width - logoSize) / 2;
            const logoY = 60;
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
        } else {
            // Fallback logo text
            ctx.fillStyle = template.accentColor;
            ctx.font = 'bold 32px serif';
            ctx.textAlign = 'center';
            ctx.fillText('LEAH CORTEZ', width / 2, 100);
            ctx.font = '24px serif';
            ctx.fillText('STUDIO', width / 2, 130);
        }
        
        // Title
        ctx.textAlign = 'center';
        ctx.fillStyle = template.textColor;
        ctx.font = 'bold 48px serif';
        this.wrapText(ctx, result.title, width / 2, 220, width - 100, 55);
        
        // Subtitle
        ctx.fillStyle = template.accentColor;
        ctx.font = 'italic 32px serif';
        ctx.fillText(result.subtitle, width / 2, 320);
        
        // Main artwork image in center - always draw something
        const imgSize = 380;
        const imgX = (width - imgSize) / 2;
        const imgY = 380;
        
        if (img) {
            // Draw the actual artwork image
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(imgX, imgY, imgSize, imgSize, 15);
            ctx.clip();
            ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
            ctx.restore();
            
            // Image border
            ctx.strokeStyle = template.accentColor;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.roundRect(imgX, imgY, imgSize, imgSize, 15);
            ctx.stroke();
        } else {
            // Fallback placeholder with border
            ctx.fillStyle = template.bgColor;
            ctx.beginPath();
            ctx.roundRect(imgX, imgY, imgSize, imgSize, 15);
            ctx.fill();
            
            ctx.strokeStyle = template.accentColor;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.roundRect(imgX, imgY, imgSize, imgSize, 15);
            ctx.stroke();
            
            // Placeholder text
            ctx.fillStyle = template.accentColor;
            ctx.font = '28px serif';
            ctx.fillText('ARTWORK', width / 2, imgY + imgSize/2 - 10);
            ctx.font = '24px serif';
            ctx.fillText('IMAGE', width / 2, imgY + imgSize/2 + 20);
        }
        
        // Description below image
        ctx.fillStyle = template.textColor;
        ctx.font = '24px serif';
        this.wrapText(ctx, result.description, width / 2, 820, width - 120, 30);
        
        // Quote
        ctx.fillStyle = template.accentColor + 'CC';
        ctx.font = 'italic 22px serif';
        this.wrapText(ctx, `"${result.quote}"`, width / 2, 1000, width - 140, 28);
        
        // Bottom branding section
        ctx.fillStyle = template.accentColor;
        ctx.font = 'bold 32px monospace';
        ctx.fillText('LEAH CORTEZ STUDIO', width / 2, height - 180);
        
        ctx.fillStyle = template.textColor;
        ctx.font = '24px monospace';
        ctx.fillText('leahcortezstudios.art', width / 2, height - 140);
        
        ctx.fillStyle = template.textColor + '80';
        ctx.font = '20px monospace';
        ctx.fillText('Portfolio Soul Quiz', width / 2, height - 100);
        
        console.log('Minimal template drawing complete');
    }

    drawArtisticTemplate(ctx, result, template, img, logo, width, height) {
        // Background with pattern
        ctx.fillStyle = template.bgColor;
        ctx.fillRect(0, 0, width, height);
        
        // Add artistic elements
        ctx.fillStyle = template.accentColor + '15';
        for (let i = 0; i < 25; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 120 + 40, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Logo at top corner with fallback
        if (logo) {
            const logoSize = 80;
            ctx.drawImage(logo, width - logoSize - 40, 40, logoSize, logoSize);
        } else {
            ctx.fillStyle = template.accentColor;
            ctx.font = 'bold 24px serif';
            ctx.textAlign = 'right';
            ctx.fillText('LC', width - 50, 70);
        }
        
        // Title and subtitle at top
        ctx.textAlign = 'center';
        ctx.fillStyle = template.textColor;
        ctx.font = 'bold 56px serif';
        this.wrapText(ctx, result.title, width / 2, 160, width - 80, 65);
        
        ctx.fillStyle = template.accentColor;
        ctx.font = 'italic 38px serif';
        ctx.fillText(result.subtitle, width / 2, 280);
        
        // Main artwork image with artistic frame
        const imgSize = 360;
        const imgX = (width - imgSize) / 2;
        const imgY = 340;
        
        // Artistic multi-layered frame
        ctx.fillStyle = template.accentColor;
        ctx.fillRect(imgX - 15, imgY - 15, imgSize + 30, imgSize + 30);
        
        ctx.fillStyle = template.textColor + '30';
        ctx.fillRect(imgX - 10, imgY - 10, imgSize + 20, imgSize + 20);
        
        ctx.fillStyle = template.accentColor;
        ctx.fillRect(imgX - 5, imgY - 5, imgSize + 10, imgSize + 10);
        
        if (img) {
            ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
        } else {
            // Artistic placeholder
            ctx.fillStyle = template.bgColor;
            ctx.fillRect(imgX, imgY, imgSize, imgSize);
            ctx.fillStyle = template.accentColor;
            ctx.font = '24px serif';
            ctx.fillText('ARTWORK', width / 2, imgY + imgSize/2);
        }
        
        // Description
        ctx.fillStyle = template.textColor;
        ctx.font = '26px serif';
        this.wrapText(ctx, result.description, width / 2, 760, width - 100, 32);
        
        // Quote with artistic styling
        ctx.fillStyle = template.accentColor + 'CC';
        ctx.font = 'italic 24px serif';
        this.wrapText(ctx, `"${result.quote}"`, width / 2, 950, width - 120, 30);
        
        // Branding
        ctx.fillStyle = template.accentColor;
        ctx.font = 'bold 34px serif';
        ctx.fillText('LEAH CORTEZ STUDIO', width / 2, height - 140);
        
        ctx.fillStyle = template.textColor;
        ctx.font = '24px serif';
        ctx.fillText('leahcortezstudios.art', width / 2, height - 100);
    }

    drawBoldTemplate(ctx, result, template, img, logo, width, height) {
        // Bold black background
        ctx.fillStyle = template.bgColor;
        ctx.fillRect(0, 0, width, height);
        
        // Bold accent stripe
        ctx.fillStyle = template.accentColor;
        ctx.fillRect(0, 150, width, 120);
        
        // Logo in the accent stripe with fallback
        if (logo) {
            const logoSize = 80;
            const logoX = 50;
            const logoY = 180;
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
        } else {
            ctx.fillStyle = template.textColor;
            ctx.font = 'bold 32px serif';
            ctx.textAlign = 'left';
            ctx.fillText('LC STUDIO', 60, 220);
        }
        
        // Large bold title
        ctx.textAlign = 'center';
        ctx.fillStyle = template.textColor;
        ctx.font = 'bold 70px serif';
        this.wrapText(ctx, result.title.toUpperCase(), width / 2, 400, width - 60, 80);
        
        // Subtitle
        ctx.fillStyle = template.accentColor;
        ctx.font = 'bold 44px serif';
        ctx.fillText(result.subtitle.toUpperCase(), width / 2, 520);
        
        // Main artwork image with image fallback
        const imgSize = 380;
        const imgX = (width - imgSize) / 2;
        const imgY = 600;
        
        // Bold square frame
        ctx.fillStyle = template.accentColor;
        ctx.fillRect(imgX - 10, imgY - 10, imgSize + 20, imgSize + 20);
        
        if (img) {
            ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
            
            // Bold border
            ctx.strokeStyle = template.textColor;
            ctx.lineWidth = 6;
            ctx.strokeRect(imgX, imgY, imgSize, imgSize);
        } else {
            // Bold placeholder
            ctx.fillStyle = template.bgColor;
            ctx.fillRect(imgX, imgY, imgSize, imgSize);
            ctx.fillStyle = template.accentColor;
            ctx.font = 'bold 28px serif';
            ctx.fillText('ARTWORK', width / 2, imgY + imgSize/2);
        }
        
        // Description in bold style
        ctx.fillStyle = template.textColor;
        ctx.font = 'bold 26px serif';
        this.wrapText(ctx, result.description, width / 2, 1050, width - 100, 32);
        
        // Quote
        ctx.fillStyle = template.accentColor;
        ctx.font = 'bold italic 24px serif';
        this.wrapText(ctx, `"${result.quote}"`, width / 2, 1250, width - 120, 30);
        
        // Bold branding
        ctx.fillStyle = template.accentColor;
        ctx.font = 'bold 44px serif';
        ctx.fillText('LEAH CORTEZ', width / 2, height - 180);
        
        ctx.fillStyle = template.textColor;
        ctx.font = 'bold 28px serif';
        ctx.fillText('PORTFOLIO QUIZ', width / 2, height - 130);
        
        ctx.font = 'bold 24px serif';
        ctx.fillText('LEAHCORTEZSTUDIOS.ART', width / 2, height - 90);
    }

    drawElegantTemplate(ctx, result, template, img, logo, width, height) {
        // Elegant light background
        ctx.fillStyle = template.bgColor;
        ctx.fillRect(0, 0, width, height);
        
        // Elegant outer border
        ctx.strokeStyle = template.accentColor;
        ctx.lineWidth = 8;
        ctx.strokeRect(60, 60, width - 120, height - 120);
        
        // Inner decorative border
        ctx.strokeStyle = template.accentColor + '60';
        ctx.lineWidth = 2;
        ctx.strokeRect(100, 100, width - 200, height - 200);
        
        // Logo at top center with fallback
        if (logo) {
            const logoSize = 100;
            const logoX = (width - logoSize) / 2;
            const logoY = 120;
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
        } else {
            ctx.fillStyle = template.accentColor;
            ctx.font = 'bold 28px serif';
            ctx.textAlign = 'center';
            ctx.fillText('LC', width / 2, 150);
        }
        
        // Elegant typography
        ctx.textAlign = 'center';
        ctx.fillStyle = template.textColor;
        ctx.font = '52px serif';
        this.wrapText(ctx, result.title, width / 2, 280, width - 200, 60);
        
        ctx.fillStyle = template.accentColor;
        ctx.font = 'italic 36px serif';
        ctx.fillText(result.subtitle, width / 2, 380);
        
        // Main artwork image with elegant frame
        if (img) {
            const imgSize = 380;
            const imgX = (width - imgSize) / 2;
            const imgY = 450;
            
            // Elegant multi-layered frame
            ctx.strokeStyle = template.accentColor;
            ctx.lineWidth = 8;
            ctx.strokeRect(imgX - 20, imgY - 20, imgSize + 40, imgSize + 40);
            
            ctx.strokeStyle = template.accentColor + '80';
            ctx.lineWidth = 4;
            ctx.strokeRect(imgX - 10, imgY - 10, imgSize + 20, imgSize + 20);
            
            ctx.strokeStyle = template.accentColor + '40';
            ctx.lineWidth = 2;
            ctx.strokeRect(imgX - 5, imgY - 5, imgSize + 10, imgSize + 10);
            
            ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
        }
        
        // Description in elegant typography
        ctx.fillStyle = template.textColor;
        ctx.font = '28px serif';
        this.wrapText(ctx, result.description, width / 2, 900, width - 160, 34);
        
        // Quote in elegant italic style
        ctx.fillStyle = template.accentColor;
        ctx.font = 'italic 24px serif';
        this.wrapText(ctx, `"${result.quote}"`, width / 2, 1150, width - 180, 30);
        
        // Elegant branding
        ctx.fillStyle = template.textColor;
        ctx.font = '34px serif';
        ctx.fillText('LEAH CORTEZ STUDIO', width / 2, height - 200);
        
        ctx.fillStyle = template.accentColor;
        ctx.font = 'italic 24px serif';
        ctx.fillText('Portfolio Soul Quiz', width / 2, height - 160);
        
        ctx.fillStyle = template.textColor + '80';
        ctx.font = '22px serif';
        ctx.fillText('leahcortezstudios.art', width / 2, height - 120);
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
