# Accessibility & UX Improvements

## Implementation Summary

### 1. Breadcrumb Navigation ✓

**What it does:** Shows users where they are in the site hierarchy (Home > Portfolio > Category > Title)

**Implementation:**
- Added breadcrumb HTML structure after `</nav>` on all work pages
- Styled in `css/work.css` with IBM Plex Mono font and var(--cream) color
- Mobile-responsive (smaller font on screens < 768px)
- 20 work pages updated with breadcrumbs

**Pages with Breadcrumbs:**
- All Illustration work pages (8 total: Anointed Gaze, Heaven On Fire, Inheritance, Abuela's Altar, plus 4 empty placeholders)
- All Motion work pages (4 total: Visual Language, Reminiscent, Genesis, Abuela's Ofrenda)
- All Objects work pages (4 total: Gnaw, Unraveling, Feathers Along The Bend, Abyss Bloom)
- All Design work pages (13 total: historical movements, commercial projects)

**Benefits:**
- Improved SEO (search engines understand site structure)
- Better user orientation (always know where you are)
- Quick navigation to parent pages

### 2. Keyboard Navigation ✓

**What it does:** Navigate between work pieces using arrow keys

**Implementation:**
- Added `initializeKeyboardNavigation()` function to `scripts/main.js`
- Left Arrow (←): Go to previous work
- Right Arrow (→): Go to next work
- Smart detection: only activates on work pages (checks for .prev-work and .next-work links)
- Respects input focus: doesn't interfere when typing in forms

**How it works:**
- Listens for `keydown` events on work pages
- Ignores keypresses when user is in input/textarea/contenteditable
- Navigates using existing prev/next work links
- Works with navigation-randomizer.js system

**Benefits:**
- Accessibility: keyboard-only navigation support
- Power user feature: faster browsing for repeat visitors
- Industry standard: expected behavior on portfolio sites

### 3. Alt Text for Images ✓

**What it does:** Provides descriptive text for all portfolio images

**Implementation:**
- Updated all masonry-item images in `collections/index.html`
- Updated Latest Project image on homepage (`index.html`)
- Format: "[Title] - [Medium/description] featuring/exploring [key elements]"

**Examples:**
- "Anointed Gaze - Mixed media illustration featuring golden halo and intimate portraiture"
- "Genesis: Reframing Eve - Animated blackout poetry challenging Biblical narratives through erasure"
- "No Way to Live - WWF poster merging endangered koala with industrial cooling tower symbolizing climate impact"
- "Constructivism Movement Study - Bold geometric poster inspired by Soviet avant-garde design"

**Images Updated:**
- 8 Illustration pieces
- 4 Motion pieces
- 13 Design pieces (historical movements + commercial)
- 4 Objects pieces
- Homepage Latest Project
- Total: 30+ descriptive alt texts added

**Benefits:**
- Accessibility: screen reader support for visually impaired users
- SEO: search engines index image content
- Better context: meaningful descriptions beyond just titles

## Technical Details

### Files Modified:
1. `css/work.css` - Added breadcrumb styles
2. `scripts/main.js` - Added keyboard navigation function
3. `collections/index.html` - Updated all portfolio image alt text
4. `index.html` - Updated Latest Project alt text
5. 20 work page HTML files - Added breadcrumb navigation

### Testing Recommendations:
1. **Breadcrumbs:** Navigate to any work page and verify breadcrumb appears below nav
2. **Keyboard Nav:** Open any work page, press left/right arrow keys to navigate
3. **Alt Text:** Use screen reader or inspect element to verify descriptive alt attributes

### Browser Compatibility:
- Breadcrumbs: Pure CSS, works in all modern browsers
- Keyboard Nav: Standard JavaScript event listeners, universal support
- Alt Text: HTML standard, supported everywhere

## Maintenance Notes

### Adding New Work:
When adding new work pages, remember to:
1. Include breadcrumb HTML after `</nav>`:
   ```html
   <div class="breadcrumb">
       <a href="../../../index.html">Home</a> > 
       <a href="../../../collections/index.html">Portfolio</a> > 
       <span>Category</span> > 
       <span>Title</span>
   </div>
   ```

2. Add descriptive alt text to portfolio thumbnail:
   - Be specific about medium and key visual elements
   - Go beyond just the title
   - Consider what blind users need to understand the work

3. Ensure work page has .prev-work and .next-work links for keyboard navigation

### Accessibility Best Practices:
- Keep alt text descriptive but concise (under 125 characters when possible)
- Breadcrumbs should always show full path from Home
- Keyboard navigation should never trap focus
- Test with screen readers periodically (VoiceOver on Mac, NVDA on Windows)

---

**Completed:** January 2025  
**Impact:** Improved accessibility, SEO, and user experience across entire portfolio
