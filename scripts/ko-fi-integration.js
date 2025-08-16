// Ko-fi Integration for Leah Cortez Studios Store
// This file handles Ko-fi product integration for when products are ready

class KofiStore {
    constructor() {
        this.products = new Map();
        this.init();
    }

    init() {
        this.setupKofiButtons();
        this.setupProductData();
    }

    // Setup Ko-fi button functionality
    setupKofiButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('ko-fi-buy-btn')) {
                const kofiId = e.target.getAttribute('data-ko-fi-id');
                if (kofiId) {
                    this.redirectToKofi(kofiId);
                }
            }
        });
    }

    // Redirect to Ko-fi product page
    redirectToKofi(productId) {
        // Replace YOUR_KOFI_USERNAME with your actual Ko-fi username
        const kofiUrl = `https://ko-fi.com/s/${productId}`;
        window.open(kofiUrl, '_blank');
    }

    // Setup product data structure for when products are added
    setupProductData() {
        // Example product structure - replace with actual products when ready
        this.products.set('print-001', {
            id: 'print-001',
            name: 'Sacred Heart Print',
            price: 25.00,
            kofiId: 'KOFI_PRODUCT_ID_HERE',
            category: 'prints'
        });

        this.products.set('pin-001', {
            id: 'pin-001',
            name: 'Sacred Heart Pin',
            price: 38.00,
            kofiId: 'KOFI_PRODUCT_ID_HERE',
            category: 'pins'
        });

        // Add more products as needed
    }

    // Method to add new products dynamically
    addProduct(productData) {
        this.products.set(productData.id, productData);
    }

    // Method to create product HTML with Ko-fi integration
    createProductHTML(productData) {
        return `
            <div class="product-card" data-product-id="${productData.id}">
                <div class="product-image">
                    <img src="${productData.image}" alt="${productData.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${productData.name}</h3>
                    <p class="product-description">${productData.description}</p>
                    <div class="product-price">$${productData.price.toFixed(2)}</div>
                    <button class="ko-fi-buy-btn" data-ko-fi-id="${productData.kofiId}">
                        Buy on Ko-fi
                    </button>
                </div>
            </div>
        `;
    }

    // Method to populate products grid when products are ready
    populateProductsGrid(containerId, products) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        products.forEach(product => {
            container.innerHTML += this.createProductHTML(product);
        });
    }
}

// Initialize Ko-fi store when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.kofiStore = new KofiStore();
});

// Example of how to add products when ready:
/*
document.addEventListener('DOMContentLoaded', () => {
    // Example: Add a product when the page loads
    const exampleProduct = {
        id: 'new-print-001',
        name: 'Cultural Heritage Print',
        description: 'Beautiful print celebrating Chicana culture',
        price: 30.00,
        image: 'images/products/print-001.jpg',
        kofiId: 'YOUR_ACTUAL_KOFI_PRODUCT_ID'
    };
    
    // Uncomment when ready to add products:
    // window.kofiStore.addProduct(exampleProduct);
});
*/
