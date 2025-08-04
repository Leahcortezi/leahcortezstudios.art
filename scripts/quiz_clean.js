class PortfolioQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.questions = [
            {
                id: 1,
                text: "Which creative process resonates most deeply with your soul?",
                options: [
                    { text: "Exploring raw emotions through personal narratives", category: "personal", weight: 3 },
                    { text: "Mastering traditional design principles and techniques", category: "design", weight: 3 },
                    { text: "Experimenting with mixed media and found objects", category: "studio", weight: 3 },
                    { text: "Creating through digital platforms and modern tools", category: "design", weight: 2 }
                ]
            },
            {
                id: 2,
                text: "What inspires your creative vision most?",
                options: [
                    { text: "Family heritage and cultural memories", category: "personal", weight: 3 },
                    { text: "Clean lines and purposeful functionality", category: "design", weight: 3 },
                    { text: "Textures, decay, and the beauty in brokenness", category: "studio", weight: 3 },
                    { text: "Contemporary trends and fresh perspectives", category: "design", weight: 2 }
                ]
            },
            {
                id: 3,
                text: "How do you prefer to work through creative challenges?",
                options: [
                    { text: "Deep introspection and emotional processing", category: "personal", weight: 3 },
                    { text: "Systematic research and structured problem-solving", category: "design", weight: 3 },
                    { text: "Intuitive experimentation with materials", category: "studio", weight: 3 },
                    { text: "Collaborative brainstorming and feedback", category: "design", weight: 2 }
                ]
            },
            {
                id: 4,
                text: "Which artistic elements speak to you most?",
                options: [
                    { text: "Symbolic imagery and metaphorical depth", category: "personal", weight: 3 },
                    { text: "Typography and compositional balance", category: "design", weight: 3 },
                    { text: "Natural forms and organic textures", category: "studio", weight: 3 },
                    { text: "Bold colors and contemporary aesthetics", category: "design", weight: 2 }
                ]
            },
            {
                id: 5,
                text: "What role does art play in your life?",
                options: [
                    { text: "A pathway to healing and self-discovery", category: "personal", weight: 3 },
                    { text: "A tool for communication and problem-solving", category: "design", weight: 3 },
                    { text: "A meditation on life's transient beauty", category: "studio", weight: 3 },
                    { text: "A way to stay current and professionally relevant", category: "design", weight: 1 }
                ]
            }
        ];

        this.portfolioData = {
            personal: {
                title: "The Emotional Alchemist",
                subtitle: "Personal Collection",
                category: "Personal Work",
                description: "You are drawn to art that transforms pain into beauty, exploring themes of heritage, identity, and spiritual awakening. Your creative soul finds meaning in the intimate and the sacred.",
                quote: "Through vulnerability, we find our greatest strength.",
                image: "collections/personal/abuelas-altar/images/altar-main.jpg",
                works: [
                    { name: "Abuela's Altar", path: "collections/personal/abuelas-altar/" },
                    { name: "Anointed Gaze", path: "collections/personal/anointed-gaze/" },
                    { name: "Drilled Into Memory", path: "collections/personal/drilled-into-memory/" },
                    { name: "Entre Mundos", path: "collections/personal/entre-mundos/" },
                    { name: "Heaven on Fire", path: "collections/personal/heaven-on-fire/" },
                    { name: "Inheritance", path: "collections/personal/inheritance/" }
                ]
            },
            design: {
                title: "The Visual Architect",
                subtitle: "Design Collection",
                category: "Design Work",
                description: "You appreciate the power of strategic design and purposeful aesthetics. Your creative mind values clarity, function, and the art of visual communication.",
                quote: "Great design whispers while poor design shouts.",
                image: "collections/design/typographic-interpretation/images/typo-main.jpg",
                works: [
                    { name: "Typographic Interpretation", path: "collections/design/typographic-interpretation/" },
                    { name: "Elements & Principles Book", path: "collections/design/elements-and-principles-book-cover/" },
                    { name: "Flag Design", path: "collections/design/flag-design/" },
                    { name: "Letter as Form", path: "collections/design/letter-as-form/" },
                    { name: "Reductive Photo Solutions", path: "collections/design/reductive-photo-solutions/" },
                    { name: "Playing Card Design", path: "collections/design/themed-playing-card-design/" }
                ]
            },
            studio: {
                title: "The Material Mystic",
                subtitle: "Studio Collection",
                category: "Studio Work",
                description: "You are drawn to the alchemy of materials and the poetry found in decay and transformation. Your artistic spirit finds beauty in the overlooked and discarded.",
                quote: "In breaking, we discover what we're truly made of.",
                image: "collections/studio/abyss-bloom/images/abyss-main.jpg",
                works: [
                    { name: "Abyss Bloom", path: "collections/studio/abyss-bloom/" },
                    { name: "Artificial Meadow", path: "collections/studio/artificial-meadow/" },
                    { name: "Collected Remains", path: "collections/studio/collected-remains/" },
                    { name: "Feathers Along the Bend", path: "collections/studio/feathers-along-the-bend/" },
                    { name: "Shadows in Repetition", path: "collections/studio/shadows-in-repetition/" },
                    { name: "Weight of Light", path: "collections/studio/weight-of-light/" }
                ]
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
                        <button class="option-btn" data-category="${option.category}" data-weight="${option.weight}" data-index="${index}">
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
        const category = button.dataset.category;
        const weight = parseInt(button.dataset.weight);

        // Store answer
        this.answers.push({ category, weight });

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
        
        // Tally scores by category
        const scores = { personal: 0, design: 0, studio: 0 };
        this.answers.forEach(answer => {
            scores[answer.category] += answer.weight;
        });

        // Find highest scoring category
        const winningCategory = Object.keys(scores).reduce((a, b) => 
            scores[a] > scores[b] ? a : b
        );

        const result = this.portfolioData[winningCategory];
        console.log(`🎯 Result: ${result.title} (${winningCategory})`);
        
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
                    <button class="explore-collection-btn" data-collection="${result.category.toLowerCase().replace(' work', '')}">
                        Explore Collection
                    </button>
                </div>
                <div class="portfolio-preview">
                    <h3>Your Recommended Works:</h3>
                    <div class="works-grid">
                        ${result.works.map(work => `
                            <a href="${work.path}" class="work-card">
                                <span>${work.name}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;

            // Bind result action buttons
            const shareButton = resultContainer.querySelector('.share-result-btn');
            if (shareButton) {
                shareButton.addEventListener('click', () => this.shareResult(result));
            }

            const exploreButton = resultContainer.querySelector('.explore-collection-btn');
            if (exploreButton) {
                exploreButton.addEventListener('click', (e) => {
                    const collection = e.target.dataset.collection;
                    window.location.href = `collections/${collection}/`;
                });
            }
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
        console.log('📱 Showing share options with social media icons');
        
        // Create modal with share options
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-content">
                <h3>Share Your Gothic Result</h3>
                <div class="canvas-preview">
                    <img src="${canvas.toDataURL()}" alt="Result Preview" />
                </div>
                <div class="share-buttons">
                    <button class="share-facebook-btn social-share-btn">
                        <img src="icons/facebook.svg" alt="Facebook" width="24" height="24" />
                        <span>Share on Facebook</span>
                    </button>
                    <button class="share-instagram-btn social-share-btn">
                        <img src="icons/instagram.svg" alt="Instagram" width="24" height="24" />
                        <span>Share to Instagram Stories</span>
                    </button>
                    <button class="save-image-btn">
                        <img src="icons/download.svg" alt="Download" width="20" height="20" />
                        <span>Save Image</span>
                    </button>
                    <button class="copy-link-btn">
                        <img src="icons/link.svg" alt="Link" width="20" height="20" />
                        <span>Copy Link</span>
                    </button>
                </div>
                <button class="close-modal-btn">×</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Bind share button events
        modal.querySelector('.share-facebook-btn').addEventListener('click', () => {
            this.shareToFacebook(canvas, result);
        });
        
        modal.querySelector('.share-instagram-btn').addEventListener('click', () => {
            this.shareToInstagram(canvas, result);
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
            formData.append('image', blob, 'gothic-quiz-result.png');
            formData.append('message', `I just discovered my creative soul match: ${result.title}! 🖤 Take the Portfolio Soul Quiz at leahcortezstudios.art`);
            
            // Open Facebook share dialog
            const shareText = encodeURIComponent(`I just discovered my creative soul match: ${result.title}! 🖤 Take the Portfolio Soul Quiz at leahcortezstudios.art`);
            const shareUrl = encodeURIComponent('https://leahcortezstudios.art/#portfolio-quiz');
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&t=${shareText}`, '_blank', 'width=600,height=400');
        }, 'image/png');
    }

    shareToInstagram(canvas, result) {
        // For Instagram Stories, we'll save the image and show instructions
        canvas.toBlob((blob) => {
            const link = document.createElement('a');
            link.download = `gothic-quiz-${result.title.toLowerCase().replace(/\s+/g, '-')}.png`;
            link.href = canvas.toDataURL();
            link.click();
            
            // Show Instagram sharing instructions
            setTimeout(() => {
                alert(`Image saved! 📱 To share to Instagram Stories:\n\n1. Open Instagram app\n2. Tap "Your Story" or swipe right\n3. Select the downloaded image\n4. Add any additional text or stickers\n5. Share your gothic quiz result! 🖤`);
                
                // Also try to open Instagram if on mobile
                if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    window.open('instagram://story-camera', '_blank');
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
