# Site Structure

This document outlines the file and directory structure for the Leah Cortez Studio Art website.

## Root Directory

-   `index.html`: The main landing page (Homepage).
-   `404.html`: Custom 404 error page.
-   `bio/`: Contains the artist's biography page.
-   `contact/`: Contains the contact page and form.
-   `cv/`: Contains the artist's curriculum vitae.
-   `collections/`: Contains the portfolio galleries and individual work pages.
-   `css/`: Contains all stylesheets.
-   `scripts/`: Contains all JavaScript files.
-   `images/`: Contains all image assets, such as logos and photos.
-   `icons/`: Contains all icon assets, such as the favicon and hamburger menu icon.
-   `.gitignore`: Specifies which files and directories to ignore in version control.
-   `robots.txt`: Provides instructions for web crawlers.
-   `prompt-for-jules.md`: The initial prompt used to generate this project.
-   `site-structure.md`: This file.

## Directories

### `css/`

-   `styles.css`: Global stylesheet for all pages.
-   `home.css`: Stylesheet for the homepage.
-   `bio.css`: Stylesheet for the bio page.
-   `cv.css`: Stylesheet for the CV page.
-   `contact.css`: Stylesheet for the contact page.
-   `portfolio.css`: Stylesheet for the main portfolio gallery page.
-   `work.css`: Stylesheet for individual work pages.
-   `404.css`: Stylesheet for the 404 page.

### `scripts/`

-   `main.js`: Global JavaScript file for interactive elements like the navigation and carousel.

### `images/`

-   `logo/`: Contains the different logo versions.
-   `bio/`: Contains the artist's photo for the bio page.
-   `favicon.ico`: The site's favicon.

### `icons/`

-   `flower.svg`: Custom hamburger menu icon.

### `collections/`

-   `index.html`: The main portfolio gallery page.
-   `<collection-name>/`: A directory for a specific collection of works.
    -   `index.html`: A landing page for the collection.
    -   `<work-name>/`: A directory for an individual work.
        -   `index.html`: The page for the individual work.
        -   `images/`: Contains images of the individual work.
        -   `models/`: Contains 3D models of the individual work (if applicable).
