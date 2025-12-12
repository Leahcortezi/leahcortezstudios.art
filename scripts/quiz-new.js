// Build Your Portfolio Quiz - Interest-Based Curation

class PortfolioBuilder {
    constructor() {
        this.selectedInterests = new Set();
        
        // Personality combos for different interest pairs
        this.personalityCombos = {
            "social-impact_cultural-identity": "The Activist Storyteller — You blend advocacy with heritage, creating work that honors roots while demanding change.",
            "social-impact_motion-animation": "The Movement Messenger — You believe change needs motion, using animation to amplify urgent stories.",
            "social-impact_experimental": "The Revolutionary Creator — You reject rules to disrupt systems, making provocative work that demands attention.",
            "social-impact_commercial-design": "The Strategic Activist — You weaponize design thinking for social good, proving impact and beauty can coexist.",
            "social-impact_typography-posters": "The Visual Agitator — Bold type and fearless messaging—you make posters that stick in minds and hearts.",
            "social-impact_sculptural-objects": "The Tactile Activist — Your work demands to be felt, not just seen—objects that carry weight and meaning.",
            "social-impact_narrative-illustration": "The Conscious Illustrator — Every drawing tells a truth, every composition carries intention toward justice.",
            "cultural-identity_motion-animation": "The Heritage Animator — You bring tradition to life through motion, honoring memory with modern tools.",
            "cultural-identity_experimental": "The Cultural Alchemist — You remix tradition and experimentation, creating something ancestral yet entirely new.",
            "cultural-identity_commercial-design": "The Identity Designer — You craft brands that honor culture while staying commercially sharp and relevant.",
            "cultural-identity_typography-posters": "The Legacy Typographer — Letters carry lineage for you—every poster is a bridge between past and present.",
            "cultural-identity_sculptural-objects": "The Memory Maker — Tactile, dimensional, rooted—your objects hold generations in their form.",
            "cultural-identity_narrative-illustration": "The Heritage Illustrator — Your work whispers ancestral stories through every brushstroke and symbol.",
            "motion-animation_experimental": "The Boundary Pusher — Static images aren't enough, and neither are rules—you want motion that surprises.",
            "motion-animation_commercial-design": "The Strategic Animator — Motion with purpose—you make animations that sell, engage, and convert.",
            "motion-animation_typography-posters": "The Kinetic Type Obsessive — Letters should move, messages should flow—you make typography come alive.",
            "motion-animation_sculptural-objects": "The Dimensional Animator — Physical meets digital—you blend 3D and motion in unexpected ways.",
            "motion-animation_narrative-illustration": "The Story Animator — Illustrations that breathe and move—your work unfolds narratives across time.",
            "experimental_commercial-design": "The Daring Strategist — You push boundaries while staying commercially viable—weird, but it works.",
            "experimental_typography-posters": "The Type Anarchist — Letters break rules in your hands, creating layouts that feel alive and untamed.",
            "experimental_sculptural-objects": "The Strange Sculptor — Your objects confuse and compel—beauty in the bizarre, craft in chaos.",
            "experimental_narrative-illustration": "The Surreal Storyteller — Your narratives twist reality, inviting viewers into worlds that shouldn't exist—but do.",
            "commercial-design_typography-posters": "The Brand Perfectionist — Clean, strategic, impactful—you design systems that work and look flawless.",
            "commercial-design_sculptural-objects": "The Tangible Brand Builder — You create 3D brand experiences—packaging, products, tactile identity systems.",
            "commercial-design_narrative-illustration": "The Commercial Illustrator — Your drawings sell while telling stories—beauty that converts.",
            "typography-posters_sculptural-objects": "The Dimensional Typographer — Flat isn't enough—you want letterforms that cast shadows and take up space.",
            "typography-posters_narrative-illustration": "The Editorial Artist — Type and image dance together—layouts that guide eyes and stir emotions.",
            "sculptural-objects_narrative-illustration": "The Tactile Storyteller — Your work exists between dimensions—illustrations that become objects, objects that tell stories."
        };
        
        // Define interests and their matching pieces
        this.interests = {
            "social-impact": {
                title: "Social Impact & Activism",
                icon: "",
                personality: "The Conscious Creator — You believe design should change the world, not just look pretty. You're drawn to work that makes a statement and sparks action.",
                pieces: [
                    "endangered-species",
                    "double-sided-poster",
                    "genesis-blackout-poetry"
                ]
            },
            "cultural-identity": {
                title: "Cultural Identity & Heritage",
                icon: "",
                personality: "The Memory Keeper — You see art as a bridge between past and present, honoring roots while creating something new. Stories run deep in your veins.",
                pieces: [
                    "abuelas-altar",
                    "abuelas-ofrenda",
                    "anointed-gaze",
                    "inheritance",
                    "heaven-on-fire"
                ]
            },
            "motion-animation": {
                title: "Motion Design & Animation",
                icon: "",
                personality: "The Movement Maker — Static images aren't enough for you. You want to see things flow, evolve, and come alive through time and space.",
                pieces: [
                    "visual-language",
                    "reminiscent",
                    "genesis-blackout-poetry",
                    "abuelas-ofrenda"
                ]
            },
            "experimental": {
                title: "Experimental & Conceptual",
                icon: "",
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
                icon: "",
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
                icon: "",
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
                icon: "",
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
                icon: "",
                personality: "The Visual Storyteller — Every image should whisper secrets. You're captivated by work that carries emotional weight and symbolic depth.",
                pieces: [
                    "anointed-gaze",
                    "heaven-on-fire",
                    "inheritance",
                    "abuelas-altar"
                ]
            }
            ,
            "printmaking-process": {
                title: "Printmaking Process & Ritual",
                icon: "",
                personality: "The Process Devotee — You find meaning in carving, inking, pressure, and repetition. The making is as important as the final image.",
                pieces: [
                    "reliquary-heart",
                    "the-living-room",
                    "unbecoming"
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
            },
            "abuelas-ofrenda": {
                title: "Abuela's Ofrenda",
                category: "Motion",
                path: "collections/motion/abuelas-ofrenda/index.html",
                image: "https://vumbnail.com/1140266929.jpg",
                description: "3D animated ofrenda exploring memory, lighting, and atmospheric design"
            }
            ,
            "reliquary-heart": {
                title: "Reliquary Heart",
                category: "Printmaking",
                path: "collections/printmaking/reliquary-heart/index.html",
                image: "collections/printmaking/Reliquary Heart.jpg",
                description: "Relief print exploring ritual, repetition, and emotional preservation"
            },
            "the-living-room": {
                title: "The Living Room",
                category: "Printmaking",
                path: "collections/printmaking/the-living-room/index.html",
                image: "collections/printmaking/The Living Room.jpg",
                description: "Process-centered print celebrating the tactile act of making"
            },
            "unbecoming": {
                title: "Unbecoming",
                category: "Printmaking",
                path: "collections/printmaking/unbecoming/index.html",
                image: "collections/printmaking/Unbecoming.jpg",
                description: "Etching and drypoint visualizing transformation, anxiety, and resilience"
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

        // Get personality combo based on selected interests
        const interestKeys = Array.from(this.selectedInterests).sort();
        const comboKey = interestKeys.join('_');
        const personalityCombo = this.personalityCombos[comboKey] || this.interests[interestKeys[0]].personality;

        const interestsList = interestKeys
            .map(key => this.interests[key].title)
            .join(' + ');

        // Create explanation for why these pieces matched
        const explanation = this.getMatchExplanation(curatedPieces);

        container.innerHTML = `
            <div class="portfolio-result">
                <div class="selected-interests-display">
                    <strong>Your Interests:</strong> ${interestsList}
                </div>
                <h3>Your Creative Profile</h3>
                <p class="personality-combo">${personalityCombo}</p>
                
                <h4>Your Curated Portfolio</h4>
                <p class="match-explanation">${explanation}</p>
                
                <div class="curated-pieces">
                    ${curatedPieces.map(piece => this.renderPieceCard(piece)).join('')}
                </div>

                <div class="result-actions">
                    <a href="collections/index.html" class="quiz-btn primary">View Full Portfolio</a>
                    <button onclick="location.reload()" class="quiz-btn secondary">Start Over</button>
                    <button onclick="navigator.clipboard.writeText(window.location.href)" class="quiz-btn secondary">Copy Link</button>
                </div>
            </div>
        `;
    }

    getMatchExplanation(pieces) {
        const interestTitles = Array.from(this.selectedInterests)
            .map(key => this.interests[key].title);
        
        const categories = [...new Set(pieces.map(p => p.category))];
        const categoryText = categories.length === 1 
            ? `all from ${categories[0]}` 
            : `spanning ${categories.join(', ')}`;

        return `These ${pieces.length} pieces align with your interest in <strong>${interestTitles.join(' and ')}</strong>—${categoryText}. Each one demonstrates the intersection of your creative values.`;
    }

    curatePieces() {
        // Collect all pieces from selected interests with scoring
        const pieceScores = {};
        const pieceCategories = {};

        this.selectedInterests.forEach(interestKey => {
            const interest = this.interests[interestKey];
            interest.pieces.forEach(pieceKey => {
                pieceScores[pieceKey] = (pieceScores[pieceKey] || 0) + 1;
                pieceCategories[pieceKey] = this.pieces[pieceKey].category;
            });
        });

        // Sort by score
        const sortedPieces = Object.entries(pieceScores)
            .sort((a, b) => b[1] - a[1]);

        // Try to get diverse categories - one from each if possible
        const selectedPieces = [];
        const usedCategories = new Set();

        // First pass: get highest scoring pieces from different categories
        for (const [key] of sortedPieces) {
            const category = pieceCategories[key];
            if (!usedCategories.has(category) && selectedPieces.length < 3) {
                selectedPieces.push(this.pieces[key]);
                usedCategories.add(category);
            }
        }

        // Second pass: fill remaining slots with highest scores
        if (selectedPieces.length < 3) {
            for (const [key] of sortedPieces) {
                if (!selectedPieces.find(p => p === this.pieces[key]) && selectedPieces.length < 3) {
                    selectedPieces.push(this.pieces[key]);
                }
            }
        }

        return selectedPieces;
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
