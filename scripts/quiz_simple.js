class PortfolioQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.questions = [
            {
                question: "When you need to express something deeply personal, you're drawn to:",
                answers: [
                    { text: "Raw, emotional imagery that speaks without words", points: { inheritance: 3, abuelas_altar: 1, heaven_on_fire: 2 } },
                    { text: "Symbolic elements that carry cultural meaning", points: { abuelas_altar: 3, inheritance: 2, heaven_on_fire: 1 } },
                    { text: "Abstract forms that capture pure feeling", points: { heaven_on_fire: 3, inheritance: 1, abuelas_altar: 2 } }
                ]
            },
            {
                question: "Your creative process feels most authentic when:",
                answers: [
                    { text: "I'm exploring my roots and family stories", points: { abuelas_altar: 3, inheritance: 2, heaven_on_fire: 1 } },
                    { text: "I'm processing personal transformation", points: { inheritance: 3, heaven_on_fire: 2, abuelas_altar: 1 } },
                    { text: "I'm channeling intense emotions into art", points: { heaven_on_fire: 3, inheritance: 2, abuelas_altar: 1 } }
                ]
            },
            {
                question: "The concept that resonates most with your soul:",
                answers: [
                    { text: "Sacred traditions passed down through generations", points: { abuelas_altar: 3, inheritance: 2, heaven_on_fire: 1 } },
                    { text: "The weight and beauty of inherited experiences", points: { inheritance: 3, abuelas_altar: 2, heaven_on_fire: 1 } },
                    { text: "Spiritual awakening through destruction and rebirth", points: { heaven_on_fire: 3, inheritance: 1, abuelas_altar: 2 } }
                ]
            },
            {
                question: "In your most vulnerable moments, you find strength in:",
                answers: [
                    { text: "Connecting with ancestral wisdom and rituals", points: { abuelas_altar: 3, inheritance: 1, heaven_on_fire: 2 } },
                    { text: "Embracing the complexity of your identity", points: { inheritance: 3, abuelas_altar: 2, heaven_on_fire: 1 } },
                    { text: "Accepting that growth requires letting go", points: { heaven_on_fire: 3, inheritance: 2, abuelas_altar: 1 } }
                ]
            },
            {
                question: "Your ideal creative sanctuary would be:",
                answers: [
                    { text: "A space filled with meaningful objects and memories", points: { abuelas_altar: 3, inheritance: 2, heaven_on_fire: 1 } },
                    { text: "A quiet place for deep self-reflection", points: { inheritance: 3, heaven_on_fire: 2, abuelas_altar: 1 } },
                    { text: "An environment where I can express raw emotion freely", points: { heaven_on_fire: 3, inheritance: 1, abuelas_altar: 2 } }
                ]
            }
        ];

        this.results = {
            inheritance: {
                title: "Inheritance",
                subtitle: "Digital Art, 2025",
                image: "collections/personal/inheritance/images/JPEG/Personal1.jpg",
                description: "You're drawn to introspective work that explores identity, transformation, and the quiet weight of personal history. Like this surreal self-portrait, you appreciate art that reveals inherited wounds and sacred feminine power through symbolic imagery.",
                quote: "A surreal self-portrait revealing the quiet weight of inherited wounds, sacred feminine power, and ancestral memory.",
                category: "Personal Work",
                works: [
                    { title: "Inheritance", path: "collections/personal/inheritance/index.html" }
                ]
            },
            abuelas_altar: {
                title: "Abuela's Altar",
                subtitle: "Charcoal, 2025",
                image: "collections/studio/abuelas-altar/images/JPEG/Studio10.jpg",
                description: "Your creative spirit resonates with devotional art that honors tradition, family, and cultural heritage. You're moved by work that blends sacred and personal elements, creating bridges between past and present.",
                quote: "A devotional altar blending Catholic and bruja traditions—love survives in every sacred piece left behind.",
                category: "Studio Work",
                works: [
                    { title: "Abuela's Altar", path: "collections/studio/abuelas-altar/index.html" }
                ]
            },
            heaven_on_fire: {
                title: "Heaven on Fire",
                subtitle: "Mixed Media, 2021",
                image: "collections/personal/heaven-on-fire/images/JPEG/personal7.jpg",
                description: "You connect with abstract, emotionally charged work that captures spiritual reckoning and transformation. Your artistic soul appreciates pieces that confront disillusionment while finding beauty in chaos and change.",
                quote: "An abstract vision of paradise unraveling—flames licking the clouds, chaos blooming in sacred ground.",
                category: "Personal Work",
                works: [
                    { title: "Heaven on Fire", path: "collections/personal/heaven-on-fire/index.html" }
                ]
            }
        };

        this.init();
    }

    init() {
        console.log('🎨 Portfolio Quiz initialized');
        this.preloadImages();
        this.bindEvents();
    }

    preloadImages() {
        Object.values(this.results).forEach(result => {
            const img = new Image();
            img.src = result.image;
        });
    }

    bindEvents() {
        const startBtn = document.querySelector('#start-quiz-btn');
        const nextBtn = document.querySelector('#next-question-btn');
        const retakeBtn = document.querySelector('#retake-quiz-btn');

        if (startBtn) {
            startBtn.addEventListener('click', () => this.startQuiz());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }

        if (retakeBtn) {
            retakeBtn.addEventListener('click', () => this.resetQuiz());
        }
    }

    startQuiz() {
        this.currentQuestion = 0;
        this.answers = [];
        this.showSection('quiz-questions');
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionText = document.querySelector('#question-text');
        const answerOptions = document.querySelector('#answer-options');
        const currentQuestionSpan = document.querySelector('#current-question');
        const totalQuestionsSpan = document.querySelector('#total-questions');
        const progressFill = document.querySelector('.progress-fill');

        if (questionText) questionText.textContent = question.question;
        if (currentQuestionSpan) currentQuestionSpan.textContent = this.currentQuestion + 1;
        if (totalQuestionsSpan) totalQuestionsSpan.textContent = this.questions.length;

        // Update progress bar
        if (progressFill) {
            const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
            progressFill.style.width = `${progress}%`;
        }

        // Clear previous options
        if (answerOptions) {
            answerOptions.innerHTML = '';
            
            question.answers.forEach((answer, index) => {
                const button = document.createElement('button');
                button.className = 'option-btn';
                button.textContent = answer.text;
                button.dataset.index = index;
                button.addEventListener('click', (e) => this.selectAnswer(e));
                answerOptions.appendChild(button);
            });
        }

        // Hide next button initially
        const nextBtn = document.querySelector('#next-question-btn');
        if (nextBtn) {
            nextBtn.classList.add('hidden');
        }
    }

    selectAnswer(event) {
        const selectedIndex = parseInt(event.target.dataset.index);
        const question = this.questions[this.currentQuestion];
        
        // Store the answer
        this.answers[this.currentQuestion] = question.answers[selectedIndex];
        
        // Update UI
        const options = document.querySelectorAll('.option-btn');
        options.forEach(option => option.classList.remove('selected'));
        event.target.classList.add('selected');
        
        // Show next button or finish
        setTimeout(() => {
            if (this.currentQuestion < this.questions.length - 1) {
                const nextBtn = document.querySelector('#next-question-btn');
                if (nextBtn) {
                    nextBtn.classList.remove('hidden');
                }
            } else {
                this.calculateResult();
            }
        }, 500);
    }

    nextQuestion() {
        this.currentQuestion++;
        this.displayQuestion();
    }

    calculateResult() {
        const scores = {};
        
        // Initialize scores
        Object.keys(this.results).forEach(key => {
            scores[key] = 0;
        });
        
        // Calculate scores based on answers
        this.answers.forEach(answer => {
            Object.entries(answer.points).forEach(([key, points]) => {
                scores[key] += points;
            });
        });
        
        // Find the highest scoring result
        const maxScore = Math.max(...Object.values(scores));
        const resultKey = Object.keys(scores).find(key => scores[key] === maxScore);
        
        this.displayResult(this.results[resultKey]);
    }

    displayResult(result) {
        this.showSection('quiz-results');
        
        // Update result content
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
    console.log('🎨 Initializing Portfolio Quiz');
    new PortfolioQuiz();
});
