// Build Your Portfolio Quiz - Interest-Based Curation

class PortfolioBuilder {
    constructor() {
        this.selectedInterests = new Set();
        
        // Define interests and their matching pieces
        this.interests = {
            "social-impact": {
                title: "Social Impact & Activism",
                icon: "🌍",
                personality: "The Conscious Creator — You believe design should change the world, not just look pretty. You're drawn to work that makes a statement and sparks action.",
                pieces: [
                    "endangered-species",
                    "double-sided-poster",
                    "genesis-blackout-poetry"
                ]
            },
            "cultural-identity": {
                title: "Cultural Identity & Heritage",
                icon: "✨",
                personality: "The Memory Keeper — You see art as a bridge between past and present, honoring roots while creating something new. Stories run deep in your veins.",
                pieces: [
                    "abuelas-altar",
                    "anointed-gaze",
                    "inheritance",
                    "heaven-on-fire"
                ]
            },
            "motion-animation": {
                title: "Motion Design & Animation",
                icon: "🎬",
                personality: "The Movement Maker — Static images aren't enough for you. You want to see things flow, evolve, and come alive through time and space.",
                pieces: [
                    "visual-language",
                    "reminiscent",
                    "genesis-blackout-poetry"
                ]
            },
            "experimental": {
                title: "Experimental & Conceptual",
                icon: "🔮",
                personality: "The Boundary Pusher — You love when art makes you think 'what the hell is that?' in the best way. Rules are made to be beautifully broken.",
                pieces: [
                    "abyss-bloom",
                    "visual-language",
                    "reductive-symbols",
                    "typographic-interpretation"
                ]
            },
            "commercial-design": {
                title: "Commercial Design & Branding",
                icon: "💼",
                personality: "The Strategic Stylist — You appreciate design that sells and tells a story. Beauty meets function, creativity meets commerce.",
                pieces: [
                    "insane-grain",
                    "endangered-species",
                    "themed-playing-cards",
                    "book-cover"
                ]
            },
            "typography-posters": {
                title: "Typography & Poster Design",
                icon: "📰",
                personality: "The Type Obsessive — You judge every poster and menu. Letters have feelings, spacing matters, and a good layout makes your heart sing.",
                pieces: [
                    "constructivism",
                    "dada",
                    "grunge",
                    "typographic-interpretation",
                    "double-sided-poster"
                ]
            },
            "sculptural-objects": {
                title: "Sculptural & Found Objects",
                icon: "🪡",
                personality: "The Tactile Dreamer — Flat surfaces aren't enough. You need texture, dimension, and objects you can experience in three-dimensional space.",
                pieces: [
                    "abyss-bloom",
                    "feathers-along-bend",
                    "unraveling",
                    "gnaw"
                ]
            },
            "narrative-illustration": {
                title: "Narrative Illustration",
                icon: "🎨",
                personality: "The Visual Storyteller — Every image should whisper secrets. You're captivated by work that carries emotional weight and symbolic depth.",
                pieces: [
                    "anointed-gaze",
                    "heaven-on-fire",
                    "inheritance",
                    "abuelas-altar"
                ]
            }
        };

        // Portfolio pieces data
        this.pieces = {
            "endangered-species": {
                title: "No Way to Live — Endangered Species Poster",
                category: "Design",
                path: "collections/design/endangered-species-poster/index.html",
                image: "collections/design/endangered-species-poster/images/Disappearing Species Poster.jpg",
                description: "WWF campaign poster merging koala and cooling tower to communicate climate impact"
            },
            "insane-grain": {
                title: "Insane Grain — Health Snack Packaging",
                category: "Design",
                path: "collections/design/insane-grain-packaging/index.html",
                image: "collections/design/insane-grain-packaging/images/Snack Packaging.jpg",
                description: "Bold packaging rebrand balancing visual chaos with functional clarity"
            },
            "themed-playing-cards": {
                title: "Scientific Revolution Playing Cards",
                category: "Design",
                path: "collections/design/themed-playing-card-design/index-case-study.html",
                image: "collections/design/themed-playing-card-design/images/design1-2.jpg",
                description: "Educational playing card deck featuring historical figures and symbolic elements"
            },
            "double-sided-poster": {
                title: "Double-Sided Poster",
                category: "Design",
                path: "collections/design/double-sided-poster/index-case-study.html",
                image: "collections/design/double-sided-poster/images/Design8.jpg",
                description: "Conceptual dual-sided poster exploring contrasting design approaches"
            },
            "book-cover": {
                title: "Elements & Principles Book Cover",
                category: "Design",
                path: "collections/design/elements-and-principles-book-cover/index-case-study.html",
                image: "collections/design/elements-and-principles-book-cover/images/Design1.jpg",
                description: "Modernist book cover design exploring compositional theory"
            },
            "reductive-symbols": {
                title: "Apology — Reductive Symbol Design",
                category: "Design",
                path: "collections/design/reductive-symbols/index-case-study.html",
                image: "collections/design/reductive-symbols/images/design4.jpg",
                description: "Minimalist symbol system representing emotional states"
            },
            "typographic-interpretation": {
                title: "HUNCH — Typographic Interpretation",
                category: "Design",
                path: "collections/design/typographic-interpretation/index-case-study.html",
                image: "collections/design/typographic-interpretation/images/design5.jpg",
                description: "Experimental typography exploring letterforms as expressive elements"
            },
            "constructivism": {
                title: "Constructivism Movement Study",
                category: "Design",
                path: "collections/design/constructivism/index-case-study.html",
                image: "collections/design/constructivism/images/2301_Cort_p1_StenburgPoster-1 copy.jpg",
                description: "Historical poster study exploring Russian Constructivist principles"
            },
            "dada": {
                title: "Dada Movement Study",
                category: "Design",
                path: "collections/design/dada/index-case-study.html",
                image: "collections/design/dada/images/annotated-2301_Cort_FinalDADA.jpg",
                description: "Anti-art poster exploring Dada's chaotic visual language"
            },
            "grunge": {
                title: "Grunge Movement Study",
                category: "Design",
                path: "collections/design/grunge/index-case-study.html",
                image: "collections/design/grunge/images/2301_Cort_P1_Grunge.jpg",
                description: "90s grunge aesthetic applied to contemporary poster design"
            },
            "anointed-gaze": {
                title: "Anointed Gaze",
                category: "Illustration",
                path: "collections/illustration/anointed-gaze/index.html",
                image: "collections/illustration/anointed-gaze/images/JPEG/personal6.jpg",
                description: "Surreal portrait exploring spiritual femininity and sacred imagery"
            },
            "heaven-on-fire": {
                title: "Heaven on Fire",
                category: "Illustration",
                path: "collections/illustration/heaven-on-fire/index.html",
                image: "collections/illustration/heaven-on-fire/images/JPEG/personal7.jpg",
                description: "Mixed media piece exploring divine destruction and transformation"
            },
            "inheritance": {
                title: "Inheritance",
                category: "Illustration",
                path: "collections/illustration/inheritance/index.html",
                image: "collections/illustration/inheritance/images/JPEG/Personal1.jpg",
                description: "Layered narrative exploring generational memory and cultural identity"
            },
            "abuelas-altar": {
                title: "Abuela's Altar",
                category: "Illustration",
                path: "collections/illustration/abuelas-altar/index.html",
                image: "collections/illustration/abuelas-altar/images/JPEG/Studio10.jpg",
                description: "Día de los Muertos tribute honoring familial memory and ritual"
            },
            "abyss-bloom": {
                title: "Abyss Bloom",
                category: "Objects",
                path: "collections/objects/abyss-bloom/index.html",
                image: "collections/objects/abyss-bloom/images/JPEG/studio2.jpg",
                description: "Sculptural creature exploring beauty in the uncanny and grotesque"
            },
            "feathers-along-bend": {
                title: "Feathers Along the Bend",
                category: "Objects",
                path: "collections/objects/feathers-along-the-bend/index.html",
                image: "collections/objects/feathers-along-the-bend/images/JPEG/studio8.jpg",
                description: "Found object assemblage celebrating natural curiosities"
            },
            "unraveling": {
                title: "Unraveling",
                category: "Objects",
                path: "collections/objects/unraveling/index.html",
                image: "collections/objects/unraveling/images/JPEG/Studio5.jpg",
                description: "Wire sculpture embodying anxiety and controlled chaos"
            },
            "gnaw": {
                title: "Gnaw",
                category: "Objects",
                path: "collections/objects/gnaw/index.html",
                image: "collections/objects/gnaw/images/JPEG/Studio6.jpg",
                description: "Sculptural exploration of consumption and transformation"
            },
            "visual-language": {
                title: "Visual Language of Dream Logic",
                category: "Motion",
                path: "collections/motion/visual-language-of-dream-logic/index.html",
                image: "collections/motion/visual-language-of-dream-logic/images/dreamthumb.png",
                description: "Experimental motion piece exploring surreal visual narrative"
            },
            "reminiscent": {
                title: "Reminiscent",
                category: "Motion",
                path: "collections/motion/reminiscent/index.html",
                image: "collections/motion/reminiscent/images/thumbrem.jpg",
                description: "3D animation exploring childhood insomnia and nostalgic memory"
            },
            "genesis-blackout-poetry": {
                title: "Genesis: Reframing Eve",
                category: "Motion",
                path: "collections/motion/genesis-blackout-poetry/index.html",
                image: "collections/motion/genesis-blackout-poetry/thumb (1).jpg",
                description: "Kinetic typography reframing biblical narrative through Eve's perspective"
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const startBtn = document.getElementById('start-quiz-btn');
        const showResultsBtn = document.getElementById('show-results-btn');

        if (startBtn) {
            startBtn.addEventListener('click', () => this.showInterestSelector());
        }

        if (showResultsBtn) {
            showResultsBtn.addEventListener('click', () => this.showResults());
        }
    }

    showInterestSelector() {
        const startScreen = document.querySelector('.quiz-start');
        const questionsScreen = document.querySelector('.quiz-questions');

        startScreen.classList.remove('active');
        startScreen.classList.add('hidden');
        questionsScreen.classList.remove('hidden');

        this.renderInterests();
    }

    renderInterests() {
        const container = document.getElementById('interest-options');
        container.innerHTML = '';

        Object.entries(this.interests).forEach(([key, interest]) => {
            const card = document.createElement('div');
            card.className = 'interest-card';
            card.dataset.interest = key;
            
            card.innerHTML = `
                <span class="interest-icon">${interest.icon}</span>
                <h4>${interest.title}</h4>
            `;

            card.addEventListener('click', () => this.toggleInterest(key, card));
            container.appendChild(card);
        });
    }

    toggleInterest(key, card) {
        if (this.selectedInterests.has(key)) {
            this.selectedInterests.delete(key);
            card.classList.remove('selected');
        } else {
            // Limit to 2 selections
            if (this.selectedInterests.size >= 2) {
                return;
            }
            this.selectedInterests.add(key);
            card.classList.add('selected');
        }

        this.updateButton();
    }

    updateButton() {
        const btn = document.getElementById('show-results-btn');
        const count = this.selectedInterests.size;

        if (count === 2) {
            btn.disabled = false;
            btn.textContent = `Show My Portfolio (${count} interests selected)`;
        } else {
            btn.disabled = true;
            btn.textContent = `Select 2 Interests (${count}/2)`;
        }
    }

    showResults() {
        const questionsScreen = document.querySelector('.quiz-questions');
        const resultsScreen = document.querySelector('.quiz-results');

        questionsScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');

        this.renderResults();
    }

    renderResults() {
        const container = document.querySelector('.result-container');
        const curatedPieces = this.curatePieces();

        // Get personality description from primary interest
        const primaryInterest = Array.from(this.selectedInterests)[0];
        const personality = this.interests[primaryInterest].personality;

        const interestsList = Array.from(this.selectedInterests)
            .map(key => this.interests[key].title)
            .join(', ');

        container.innerHTML = `
            <div class="portfolio-result">
                <h3>Your Curated Portfolio</h3>
                <p class="personality-description">${personality}</p>
                <p class="interests-selected">Your selections: <strong>${interestsList}</strong></p>
                
                <div class="curated-pieces">
                    ${curatedPieces.map(piece => this.renderPieceCard(piece)).join('')}
                </div>

                <div class="result-actions">
                    <a href="collections/index.html" class="quiz-btn primary">View Full Portfolio</a>
                    <button onclick="location.reload()" class="quiz-btn secondary">Start Over</button>
                </div>
            </div>
        `;
    }

    curatePieces() {
        // Collect all pieces from selected interests
        const pieceScores = {};

        this.selectedInterests.forEach(interestKey => {
            const interest = this.interests[interestKey];
            interest.pieces.forEach(pieceKey => {
                pieceScores[pieceKey] = (pieceScores[pieceKey] || 0) + 1;
            });
        });

        // Sort by score and get top 3
        const sortedPieces = Object.entries(pieceScores)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([key]) => this.pieces[key]);

        return sortedPieces;
    }

    renderPieceCard(piece) {
        return `
            <div class="piece-card">
                <a href="${piece.path}" class="piece-link">
                    <div class="piece-image">
                        <img src="${piece.image}" alt="${piece.title}" loading="lazy">
                    </div>
                    <div class="piece-info">
                        <span class="piece-category">${piece.category}</span>
                        <h4 class="piece-title">${piece.title}</h4>
                        <p class="piece-description">${piece.description}</p>
                    </div>
                </a>
            </div>
        `;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioBuilder();
});
