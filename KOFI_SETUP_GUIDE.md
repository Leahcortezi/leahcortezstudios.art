# Ko-fi Store Setup Guide for Leah Cortez Studios

## Overview
Your store is now fully integrated with Ko-fi for secure payment processing. Here's how to set it up when you're ready to list products.

## Step 1: Ko-fi Account Setup
1. Create or log into your Ko-fi account at https://ko-fi.com
2. Go to your Ko-fi Shop settings
3. Enable the Shop feature if not already enabled
4. Note your Ko-fi username (needed for integration)

## Step 2: Update Ko-fi Username
Replace `YOUR_KOFI_USERNAME` in these files with your actual Ko-fi username:

**Files to update:**
- `store.html` (line ~223)
- `shop-prints.html` (line ~102)
- `shop-stickers.html` (line ~86)
- `shop-pins.html` (line ~86)
- `shop-buttons.html` (line ~86)

**Example:**
```javascript
// Change this:
kofiWidgetOverlay.draw('YOUR_KOFI_USERNAME', {

// To this (replace with your username):
kofiWidgetOverlay.draw('leahcortezstudios', {
```

## Step 3: Adding Products to Ko-fi
1. In your Ko-fi dashboard, go to "Shop" → "Add Product"
2. Upload product images
3. Set descriptions, prices, and inventory
4. Note the Ko-fi product ID for each item

## Step 4: Adding Products to Your Website

### For individual products:
Edit the respective shop page (shop-prints.html, shop-pins.html, etc.) and:

1. **Remove the "coming-soon-notice" div**
2. **Show the products-grid div** (remove `style="display: none;"`)
3. **Add product HTML** inside the products-grid:

```html
<div class="product-card" data-product-id="print-001">
    <div class="product-image">
        <img src="images/products/your-image.jpg" alt="Product Name">
    </div>
    <div class="product-info">
        <h3 class="product-title">Sacred Heart Print</h3>
        <p class="product-description">Beautiful print celebrating culture</p>
        <div class="product-price">$25.00</div>
        <button class="ko-fi-buy-btn" data-ko-fi-id="YOUR_KOFI_PRODUCT_ID">Buy on Ko-fi</button>
    </div>
</div>
```

### JavaScript Integration:
The `ko-fi-integration.js` file handles:
- Automatic Ko-fi button functionality
- Product data management
- Secure redirects to Ko-fi checkout

## Step 5: Testing
1. Update your Ko-fi username in all files
2. Add a test product to Ko-fi
3. Add the product to one of your shop pages
4. Test the "Buy on Ko-fi" button

## Features Ready:
✅ **Dedicated shop pages** for each collection
✅ **Ko-fi widget integration** for support/donations
✅ **Secure checkout** through Ko-fi
✅ **Mobile responsive** design
✅ **Professional product layouts** ready for your items
✅ **Breadcrumb navigation** back to main store
✅ **SEO optimized** pages for each collection

## Collection Pages:
- `shop-prints.html` - Art Prints Collection
- `shop-stickers.html` - Stickers Collection  
- `shop-pins.html` - Enamel Pins Collection
- `shop-buttons.html` - Custom Buttons Collection

## Benefits of Ko-fi Integration:
- No monthly fees (Ko-fi takes small transaction fee)
- Secure payment processing
- PayPal and credit card support
- Instant notifications when sales happen
- Easy inventory management
- Supporter/fan engagement features

## Next Steps:
1. Replace Ko-fi username placeholders
2. Add your first product to Ko-fi
3. Update one shop page with real product
4. Test the complete purchase flow
5. Launch your collections!

Your store is professional, secure, and ready for business! 🎨✨
