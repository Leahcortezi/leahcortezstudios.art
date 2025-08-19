/*
  Leah Cortez Studio Shop - JavaScript
  Handles cart functionality and payment processing
  Standalone shop functionality - not linked to main navigation
*/

// Shop state
let cart = JSON.parse(localStorage.getItem('leah-shop-cart')) || [];

// Product database
const products = {
    'sacred-heart-felt-pin': {
        id: 'sacred-heart-felt-pin',
        name: 'Corazón Embroidered Pin',
        price: 18.00,
        type: 'pin',
        description: 'Hand-embroidered felt pin with sacred heart design',
        image: 'images/pins/sacred-heart-felt.jpg'
    },
    'milagros-heart-keychain': {
        id: 'milagros-heart-keychain',
        name: 'Protection Milagro Keychain',
        price: 15.00,
        type: 'keychain',
        description: 'Traditional milagro keychain for protection and good fortune',
        image: 'images/keychains/milagros-heart.jpg'
    },
    'chicana-gothic-button': {
        id: 'chicana-gothic-button',
        name: 'Cultural Heritage Button',
        price: 5.00,
        type: 'button',
        description: 'Button featuring original artwork celebrating cultural identity',
        image: 'images/buttons/chicana-gothic.jpg'
    }
};

// Initialize shop functionality
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    attachEventListeners();
});

// Attach event listeners
function attachEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            addToCart(productId);
        });
    });

    // Cart icon click
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', showCart);
    }
}

// Add product to cart
function addToCart(productId) {
    const product = products[productId];
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartDisplay();
    showAddedToCartMessage(product.name);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
}

// Update quantity in cart
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartDisplay();
        }
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('leah-shop-cart', JSON.stringify(cart));
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Show cart modal/sidebar
function showCart() {
    // Create cart modal if it doesn't exist
    let cartModal = document.querySelector('.cart-modal');
    if (!cartModal) {
        cartModal = createCartModal();
        document.body.appendChild(cartModal);
    }
    
    updateCartModal();
    cartModal.classList.add('show');
}

// Create cart modal HTML
function createCartModal() {
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.innerHTML = `
        <div class="cart-overlay" onclick="closeCart()"></div>
        <div class="cart-sidebar">
            <div class="cart-header">
                <h3>Your Cart</h3>
                <button class="close-cart" onclick="closeCart()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                    </svg>
                </button>
            </div>
            <div class="cart-items"></div>
            <div class="cart-footer">
                <div class="cart-total"></div>
                <button class="checkout-btn" onclick="proceedToCheckout()">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    `;
    return modal;
}

// Update cart modal content
function updateCartModal() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    
    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.innerHTML = '';
        return;
    }

    // Render cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='../icons/star.svg'">
            </div>
            <div class="item-details">
                <h4>${item.name}</h4>
                <p class="item-price">$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart('${item.id}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                </svg>
            </button>
        </div>
    `).join('');

    // Calculate and show total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}

// Close cart modal
function closeCart() {
    const cartModal = document.querySelector('.cart-modal');
    if (cartModal) {
        cartModal.classList.remove('show');
    }
}

// Show "added to cart" message
function showAddedToCartMessage(productName) {
    // Remove existing message
    const existingMessage = document.querySelector('.added-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const message = document.createElement('div');
    message.className = 'added-message';
    message.innerHTML = `
        <div class="message-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
            </svg>
            <span>Added "${productName}" to cart!</span>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

// Proceed to checkout (integrate with payment processor)
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // For now, just show an alert
    // You'll replace this with actual payment processing (Stripe, PayPal, etc.)
    alert(`Checkout functionality coming soon!\n\nYour cart:\n${cart.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\nTotal: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
}

// Add cart modal styles
const cartStyles = document.createElement('style');
cartStyles.textContent = `
    .cart-modal {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .cart-modal.show {
        opacity: 1;
        visibility: visible;
    }
    
    .cart-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }
    
    .cart-sidebar {
        position: absolute;
        top: 0;
        right: 0;
        width: 400px;
        max-width: 100vw;
        height: 100%;
        background: var(--color-background);
        border-left: 1px solid var(--color-primary-accent);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        flex-direction: column;
    }
    
    .cart-modal.show .cart-sidebar {
        transform: translateX(0);
    }
    
    .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid var(--color-primary-accent);
    }
    
    .cart-header h3 {
        color: var(--color-primary-accent);
        font-family: var(--font-headings);
        margin: 0;
    }
    
    .close-cart {
        background: none;
        border: none;
        color: var(--color-text);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: background 0.3s ease;
    }
    
    .close-cart:hover {
        background: rgba(248, 200, 208, 0.1);
    }
    
    .cart-items {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
    }
    
    .empty-cart {
        text-align: center;
        color: var(--color-primary-accent);
        font-style: italic;
        margin-top: 2rem;
    }
    
    .cart-item {
        display: flex;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid rgba(248, 200, 208, 0.1);
        align-items: center;
    }
    
    .item-image {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        overflow: hidden;
        background: rgba(248, 200, 208, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .item-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .item-details {
        flex: 1;
    }
    
    .item-details h4 {
        margin: 0 0 0.5rem 0;
        color: var(--color-primary-accent);
        font-size: 0.9rem;
    }
    
    .item-price {
        margin: 0 0 0.5rem 0;
        font-family: var(--font-accent);
        color: var(--color-secondary-accent);
        font-weight: bold;
    }
    
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .quantity-controls button {
        background: var(--color-primary-accent);
        color: var(--color-background);
        border: none;
        width: 24px;
        height: 24px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
    
    .quantity-controls span {
        min-width: 20px;
        text-align: center;
        font-family: var(--font-accent);
    }
    
    .remove-item {
        background: none;
        border: none;
        color: var(--color-secondary-accent);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: background 0.3s ease;
    }
    
    .remove-item:hover {
        background: rgba(126, 28, 46, 0.1);
    }
    
    .cart-footer {
        padding: 1.5rem;
        border-top: 1px solid var(--color-primary-accent);
    }
    
    .cart-total {
        margin-bottom: 1rem;
        text-align: center;
        font-family: var(--font-accent);
        font-size: 1.2rem;
        color: var(--color-primary-accent);
    }
    
    .checkout-btn {
        width: 100%;
        background: var(--color-secondary-accent);
        color: white;
        border: none;
        padding: 1rem;
        border-radius: 8px;
        font-family: var(--font-accent);
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .checkout-btn:hover {
        background: #6d1826;
        transform: translateY(-2px);
    }
    
    .added-message {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1001;
        background: var(--color-secondary-accent);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        animation: slideIn 0.3s ease forwards, slideOut 0.3s ease 2.7s forwards;
    }
    
    .message-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: var(--font-accent);
    }
    
    @keyframes slideIn {
        to { transform: translateX(0); }
    }
    
    @keyframes slideOut {
        to { transform: translateX(100%); }
    }
    
    @media (max-width: 500px) {
        .cart-sidebar {
            width: 100vw;
        }
    }
`;

document.head.appendChild(cartStyles);
