PROJECT BRIEF: Leah Cortez Portfolio Website

### 1. Basic Information
- Name: Leah Cortez
- Domain: leahcortezstudio.art
- Social Links:
  - Pinterest: https://pin.it/P7sLCI6r5
  - Behance: https://www.behance.net/leahcortez
  - Instagram (future account planned)
- Favicon: favicon.ico (located in /icons/)

### 2. Artistic & Design Vision
- Identity: Multimedia Artist & Graphic Designer
- Goals: Showcase work, promote personal brand, receive commissions
- Design Vibe: Gothic, Conceptual, Dreamy, Editorial, Chicana
- Logo Files: logo1.png, logo2.png, logo3.png, logo4.png (in /images/logo/)
- Color Palette:
  - Background: #000000
  - Text: #ffffff
  - Primary Accent: #f8c8d0
  - Secondary Accent: #7e1c2e
- Fonts:
  - Headings: Pirata One
  - Body Text: IM Fell English
  - Accent/Optional Text: IBM Plex Mono

### 3. Content & Pages
- Page Order:
  1. Homepage
  2. Bio
  3. Portfolio (Main Gallery)
  4. Individual Work Pages
  5. CV
  6. Contact
- Bio Page Text: Full artist statement provided by Leah
- CV Page: Includes Education, Exhibitions, Skills, Tools
- 3D Models: Not needed
- Google Analytics: Not included

### 4. SEO & Social Sharing
- Keywords:
  - “Chicana graphic designer”
  - “multimedia surreal artist”
  - “gothic visual storytelling”
  - “Corpus Christi artist”
  - “feminine conceptual design”
- Meta Description:
  “Leah Cortez is a Chicana graphic designer and multimedia artist creating bold, symbolic work rooted in gothic and conceptual storytelling.”
- Open Graph Image: /images/logo/logo2.png

### 5. Layouts & Enhancements
- Navigation:
  - Hamburger icon enabled for mobile
  - Custom icon: /images/icons/flower.svg
- Homepage: Full landing page with scrollable sections (hero, bio preview, featured art, contact)
- Bio Page: Layout with photo on left, text on right
- Portfolio (Main Gallery): Full-screen carousel view
- Individual Work Pages: Split screen layout (image left, details right)
- Contact Page:
  - Email: contact@leahcortezstudios.art
  - Fields: Name, Email, Subject, Message
  - Submit Button: “Send Message”
  - Spam Protection: Honeypot + simple math CAPTCHA
- 404 Page:
  - Message: “You wandered into the void.”
  - Include button to return home

---

## BEGIN TECHNICAL DIRECTIVES FOR JULES PROMPT

1. Execution Protocol:

Acknowledge and Plan: First, acknowledge these instructions. Then, create a detailed, step-by-step execution plan for building the entire website based on this prompt.

One-Time Approval: Present this plan to the user for a single, one-time "go/no-go" approval.

Autonomous Execution: Once you receive approval, you MUST execute the entire plan from start to finish without any further questions, check-ins, or requests for code review. Your final action should be committing the completed project. Do not stop partway through the plan to ask for feedback.

2. Prompt Archiving:

As the very first step in your execution plan, you must create the file prompt-for-jules.md in the project root.

You will then save this entire prompt (the complete text you are receiving now, including the Project Brief and all Technical Directives) into that prompt-for-jules.md file. This creates a permanent record of the instructions used for the build.

3. File Structure and Pathing:

Build the project using this exact file structure.

All internal links (href, src) MUST use relative paths (e.g., css/styles.css, not /css/styles.css) to ensure functionality on platforms like GitHub Pages.

project-root/
├─ css/
│  ├─ styles.css
│  └─ (page-specific css files, e.g., contact.css)
├─ scripts/main.js
├─ images/ (for site assets like logos)
├─ icons/
├─ collections/
│  ├─ index.html
│  └─ <collection-name>/
│     ├─ index.html
│     └─ <work-name>/
│         ├─ index.html
│         ├─ models/
│         └─ images/
├─ 404.html
├─ index.html
├─ .gitignore
├─ robots.txt
├─ site-structure.md
└─ prompt-for-jules.md

4. CSS Generation Rules:

ABSOLUTE PROHIBITION: You are forbidden from using inline style attributes or internal <style> tags in any HTML file.

Global Stylesheet: All global styles (for body, fonts, colors, navigation, footer) MUST go into css/styles.css.

Page-Specific Stylesheets: For every HTML page you create (e.g., bio.html), you MUST also create a corresponding CSS file (e.g., css/bio.css) for its unique styles.

Linking Order: Every HTML page must link to css/styles.css FIRST, and then to its own page-specific stylesheet second.

5. Code Commenting Mandate:

You must provide exhaustive, line-by-line pedagogical comments in all generated files. Explain the "why" behind each choice.

Example of Required Detail:

/* This rule targets the main site navigation (<nav> element). */
nav {
  /* Turns the nav into a flex container to easily align its children. */
  display: flex;
  /* Pushes the logo and links to opposite ends of the container. */
  justify-content: space-between;
  /* Vertically centers the items within the navigation bar. */
  align-items: center;
}

6. General Standards:

HTML: Use semantic tags (<header>, <nav>, <main>, <footer>) and a logical heading order. All <img> tags must have meaningful alt attributes.

Meta Tags: In the <head> of every page, include: <title>, meta description, keywords, author, Open Graph tags, Twitter Card tags, and favicon links.

Accessibility & Performance: Ensure high color contrast, keyboard navigability, lazy-loading for images, and deferred JavaScript.

Placeholders: Use descriptive placeholder text and correctly-sized placeholder images (placehold.co) where final content is not yet available.

END TECHNICAL DIRECTIVES FOR JULES PROMPT
