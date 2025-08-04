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
        
        // Create Instagram story-style image
        this.generateShareImage(result).then(imageDataUrl => {
            if (navigator.share && navigator.canShare) {
                // Try to share with image for supported platforms
                fetch(imageDataUrl)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], 'leah-cortez-quiz-result.png', { type: 'image/png' });
                        
                        if (navigator.canShare({ files: [file] })) {
                            navigator.share({
                                title: `I got "${result.title}" - ${result.subtitle}`,
                                text: `I just took Leah Cortez's Portfolio Soul Quiz and discovered I'm "${result.subtitle}"! 🎨✨ Take the quiz and find your creative match.`,
                                url: window.location.href,
                                files: [file]
                            });
                        } else {
                            // Fall back to text sharing
                            this.fallbackShare(result, imageDataUrl);
                        }
                    })
                    .catch(() => this.fallbackShare(result, imageDataUrl));
            } else {
                this.fallbackShare(result, imageDataUrl);
            }
        });
    }

    fallbackShare(result, imageDataUrl) {
        // Create a download link for the image
        const link = document.createElement('a');
        link.download = 'leah-cortez-quiz-result.png';
        link.href = imageDataUrl;
        
        // Create share modal
        const modal = this.createShareModal(result, imageDataUrl);
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => modal.classList.add('active'), 10);
    }

    createShareModal(result, imageDataUrl) {
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-content">
                <div class="share-modal-header">
                    <h3>Share Your Result</h3>
                    <button class="share-modal-close">&times;</button>
                </div>
                <div class="share-modal-body">
                    <div class="share-preview">
                        <img src="${imageDataUrl}" alt="Your quiz result" class="share-image-preview">
                    </div>
                    <p class="share-caption">I got "${result.title}" - ${result.subtitle}! 🎨✨<br>
                    Take Leah Cortez's Portfolio Soul Quiz: ${window.location.href}</p>
                    <div class="share-actions">
                        <button class="share-btn download-btn">
                            <span class="btn-icon">⬇️</span>
                            Download Image
                        </button>
                        <button class="share-btn copy-btn">
                            <span class="btn-icon">📋</span>
                            Copy Text
                        </button>
                        <div class="share-social">
                            <a href="https://www.instagram.com/stories/camera/" target="_blank" class="social-share-btn instagram">
                                <span class="btn-icon">📸</span>
                                Instagram Story
                            </a>
                            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="social-share-btn facebook">
                                <span class="btn-icon">📘</span>
                                Facebook
                            </a>
                            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`I got "${result.title}" - ${result.subtitle}! Take Leah Cortez's Portfolio Soul Quiz:`)}&url=${encodeURIComponent(window.location.href)}" target="_blank" class="social-share-btn twitter">
                                <span class="btn-icon">🐦</span>
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        const closeBtn = modal.querySelector('.share-modal-close');
        const downloadBtn = modal.querySelector('.download-btn');
        const copyBtn = modal.querySelector('.copy-btn');

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => document.body.removeChild(modal), 300);
        });

        downloadBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = 'leah-cortez-quiz-result.png';
            link.href = imageDataUrl;
            link.click();
        });

        copyBtn.addEventListener('click', () => {
            const shareText = `I got "${result.title}" - ${result.subtitle}! 🎨✨ Take Leah Cortez's Portfolio Soul Quiz and find your creative match: ${window.location.href}`;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(shareText);
                copyBtn.innerHTML = '<span class="btn-icon">✅</span>Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = '<span class="btn-icon">📋</span>Copy Text';
                }, 2000);
            }
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeBtn.click();
            }
        });

        return modal;
    }

    async generateShareImage(result) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Instagram story dimensions (9:16 aspect ratio)
            canvas.width = 1080;
            canvas.height = 1920;
            
            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#1a1a1a');
            gradient.addColorStop(0.5, '#2d1b25');
            gradient.addColorStop(1, '#1a1a1a');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add subtle pattern overlay
            ctx.fillStyle = 'rgba(126, 28, 46, 0.03)';
            for (let i = 0; i < 20; i++) {
                ctx.beginPath();
                ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 100 + 50, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Load and draw the result image
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                // Draw artwork image (centered, maintaining aspect ratio)
                const imageSize = 400;
                const imageX = (canvas.width - imageSize) / 2;
                const imageY = 300;
                
                // Add border around image
                ctx.fillStyle = '#7e1c2e';
                ctx.fillRect(imageX - 10, imageY - 10, imageSize + 20, imageSize + 20);
                
                // Draw image
                ctx.drawImage(img, imageX, imageY, imageSize, imageSize);
                
                // Add text content
                this.addTextToCanvas(ctx, result, canvas.width, canvas.height);
                
                resolve(canvas.toDataURL('image/png'));
            };
            
            img.onerror = () => {
                // If image fails to load, create without it
                this.addTextToCanvas(ctx, result, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/png'));
            };
            
            img.src = result.image;
        });
    }

    addTextToCanvas(ctx, result, width, height) {
        // Set text properties
        ctx.textAlign = 'center';
        ctx.fillStyle = '#f5c6d6';
        
        // Main title
        ctx.font = 'bold 72px serif';
        this.wrapText(ctx, result.title, width / 2, 200, width - 100, 80);
        
        // Subtitle
        ctx.font = 'italic 48px serif';
        ctx.fillStyle = '#7e1c2e';
        ctx.fillText(result.subtitle, width / 2, 260);
        
        // Quote
        ctx.font = '36px serif';
        ctx.fillStyle = '#f5c6d6';
        this.wrapText(ctx, `"${result.quote}"`, width / 2, 800, width - 120, 50);
        
        // Site branding
        ctx.font = 'bold 42px serif';
        ctx.fillStyle = '#7e1c2e';
        ctx.fillText('LEAH CORTEZ STUDIO', width / 2, height - 200);
        
        // URL
        ctx.font = '32px monospace';
        ctx.fillStyle = '#f5c6d6';
        ctx.fillText('leahcortezstudios.art', width / 2, height - 150);
        
        // Call to action
        ctx.font = 'italic 36px serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Take the quiz and find your creative match', width / 2, height - 80);
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
