class PortfolioQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.questions = [
            {
                id: 1,
                text: "When you're feeling overwhelmed, what calls to you most?",
                options: [
                    { text: "Creating something meaningful from my pain", category: "personal", weight: 3 },
                    { text: "Organizing my thoughts through clear, structured design", category: "design", weight: 3 },
                    { text: "Working with my hands, letting intuition guide me", category: "studio", weight: 3 },
                    { text: "Finding inspiration through others' creative work", category: "design", weight: 2 }
                ]
            },
            {
                id: 2,
                text: "What kind of story do you feel most drawn to tell?",
                options: [
                    { text: "The untold stories of my ancestors and heritage", category: "personal", weight: 3 },
                    { text: "Clear messages that help people understand complex ideas", category: "design", weight: 3 },
                    { text: "The hidden beauty in forgotten or broken things", category: "studio", weight: 3 },
                    { text: "Fresh perspectives on familiar concepts", category: "design", weight: 2 }
                ]
            },
            {
                id: 3,
                text: "When you create, where does your deepest satisfaction come from?",
                options: [
                    { text: "Transforming personal wounds into something healing", category: "personal", weight: 3 },
                    { text: "Solving problems elegantly through thoughtful design", category: "design", weight: 3 },
                    { text: "Discovering unexpected beauty through experimentation", category: "studio", weight: 3 },
                    { text: "Building skills and staying current with trends", category: "design", weight: 2 }
                ]
            },
            {
                id: 4,
                text: "What draws your eye and captures your heart?",
                options: [
                    { text: "Sacred objects and symbols that carry deep meaning", category: "personal", weight: 3 },
                    { text: "Clean, intentional compositions that communicate clearly", category: "design", weight: 3 },
                    { text: "Raw textures and the patina of time and wear", category: "studio", weight: 3 },
                    { text: "Vibrant colors and contemporary visual language", category: "design", weight: 2 }
                ]
            },
            {
                id: 5,
                text: "How do you hope your creative work impacts others?",
                options: [
                    { text: "Helps them feel less alone in their struggles", category: "personal", weight: 3 },
                    { text: "Makes their daily experiences more beautiful and functional", category: "design", weight: 3 },
                    { text: "Opens their eyes to beauty they hadn't noticed before", category: "studio", weight: 3 },
                    { text: "Keeps them informed about current creative directions", category: "design", weight: 1 }
                ]
            }
        ];

        this.portfolioData = {
            personal: {
                title: "The Emotional Alchemist",
                subtitle: "Personal Collection",
                category: "Personal Work",
                pieceTitle: "Inheritance", // Featured piece name
                description: "You are drawn to art that transforms pain into beauty, exploring themes of heritage, identity, and spiritual awakening. Your creative soul finds meaning in the intimate and the sacred.",
                quote: "Through vulnerability, we find our greatest strength.",
                image: "collections/personal/inheritance/images/JPEG/Personal1.jpg",
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
                pieceTitle: "Typographic Interpretation", // Featured piece name
                description: "You appreciate the power of strategic design and purposeful aesthetics. Your creative mind values clarity, function, and the art of visual communication.",
                quote: "Great design whispers while poor design shouts.",
                image: "collections/design/typographic-interpretation/images/design5.jpg",
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
                pieceTitle: "Abyss Bloom", // Featured piece name
                description: "You are drawn to the alchemy of materials and the poetry found in decay and transformation. Your artistic spirit finds beauty in the overlooked and discarded.",
                quote: "In breaking, we discover what we're truly made of.",
                image: "collections/studio/abyss-bloom/images/JPEG/studio2.jpg",
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
                <button class="option-btn quiz-btn" data-category="${option.category}" data-weight="${option.weight}" data-index="${index}">
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
        
        // Update the existing HTML elements
        const resultTitle = document.querySelector('#result-title');
        const resultSubtitle = document.querySelector('#result-subtitle');
        const resultDescription = document.querySelector('#result-description');
        const resultQuote = document.querySelector('#result-quote-text');
        const resultImage = document.querySelector('#result-project-image');
        const viewProjectBtn = document.querySelector('#view-project-btn');
        const retakeQuizBtn = document.querySelector('#retake-quiz-btn');
        
        if (resultTitle) resultTitle.textContent = result.title;
        if (resultSubtitle) resultSubtitle.textContent = result.subtitle;
        if (resultDescription) resultDescription.textContent = result.description;
        if (resultQuote) resultQuote.textContent = `"${result.quote}"`;
        if (resultImage) {
            resultImage.src = result.image;
            resultImage.alt = result.title;
        }
        
        if (viewProjectBtn) {
            // Link to the first work in the collection
            const firstWork = result.works[0];
            if (firstWork) {
                viewProjectBtn.href = firstWork.path;
            }
        }
        
        // Bind event listeners
        if (retakeQuizBtn) {
            retakeQuizBtn.addEventListener('click', () => this.resetQuiz());
        }
    }

    resetQuiz() {
        this.currentQuestion = 0;
        this.answers = [];
        this.showSection('quiz-start');
    }

    showSection(sectionClass) {
        
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Instagram Stories dimensions (9:16 aspect ratio)
            const width = 1080;
            const height = 1920;
            canvas.width = width;
            canvas.height = height;
            
            // Load images
            const [img, logo] = await Promise.all([
                this.loadImage(result.image),
                this.loadImage('images/logo/logo3.png')
            ]);
            
            // Generate Spotify-style gothic template
            this.generateGothicStoryTemplate(ctx, result, img, logo, width, height);
            
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

    showSection(sectionClass) {
        // Hide all quiz sections
        const quizSections = ['quiz-start', 'quiz-questions', 'quiz-results'];
        quizSections.forEach(section => {
            const element = document.querySelector(`.${section}`);
            if (element) {
                element.style.display = 'none';
                element.classList.remove('active');
                element.classList.add('hidden');
            }
        });
        
        // Show the requested section
        const targetSection = document.querySelector(`.${sectionClass}`);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');
        }
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Initializing Portfolio Quiz with Gothic Aesthetics');
    new PortfolioQuiz();
});
