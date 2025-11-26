#!/usr/bin/env python3
"""
Script to add breadcrumb navigation to all work pages
"""

import os
import re

# Define work pages with their categories and titles
work_pages = {
    # Illustration
    'collections/illustration/heaven-on-fire/index.html': ('Illustration', 'Heaven On Fire'),
    'collections/illustration/entre-mundos/index.html': ('Illustration', 'Entre Mundos'),
    'collections/illustration/inheritance/index.html': ('Illustration', 'Inheritance'),
    'collections/illustration/shadows-in-repetition/index.html': ('Illustration', 'Shadows in Repetition'),
    'collections/illustration/abuelas-altar/index.html': ('Illustration', "Abuela's Altar"),
    'collections/illustration/artificial-meadow/index.html': ('Illustration', 'Artificial Meadow'),
    'collections/illustration/drilled-into-memory/index.html': ('Illustration', 'Drilled Into Memory'),
    'collections/illustration/anointed-gaze/index.html': ('Illustration', 'Anointed Gaze'),
    
    # Motion
    'collections/motion/genesis-blackout-poetry/index.html': ('Motion Design', 'Genesis Blackout Poetry'),
    'collections/motion/visual-language-of-dream-logic/index.html': ('Motion Design', 'Visual Language of Dream Logic'),
    'collections/motion/reminiscent/index.html': ('Motion Design', 'Reminiscent'),
    
    # Objects
    'collections/objects/unraveling/index.html': ('Objects', 'Unraveling'),
    'collections/objects/gnaw/index.html': ('Objects', 'Gnaw'),
    'collections/objects/feathers-along-the-bend/index.html': ('Objects', 'Feathers Along The Bend'),
    'collections/objects/abyss-bloom/index.html': ('Objects', 'Abyss Bloom'),
    
    # Design
    'collections/design/double-sided-poster/index.html': ('Design', 'Double-Sided Poster'),
    'collections/design/reductive-symbols/index.html': ('Design', 'Reductive Symbols'),
    'collections/design/elements-and-principles-book-cover/index.html': ('Design', 'Elements and Principles Book Cover'),
    'collections/design/insane-grain-packaging/index.html': ('Design', 'Insane Grain Packaging'),
    'collections/design/typographic-interpretation/index.html': ('Design', 'Typographic Interpretation'),
    'collections/design/reductive-photo-solutions/index.html': ('Design', 'Reductive Photo Solutions'),
    'collections/design/endangered-species-poster/index.html': ('Design', 'Endangered Species Poster'),
    'collections/design/themed-playing-card-design/index.html': ('Design', 'Themed Playing Card Design'),
}

def add_breadcrumb(file_path, category, title):
    """Add breadcrumb navigation to a work page"""
    full_path = f'/Users/leahcortez/Documents/leahcortezstudios.art/{file_path}'
    
    # Calculate relative path depth
    depth = file_path.count('/') - 1  # -1 because collections is the root
    rel_path = '../' * depth
    
    breadcrumb_html = f'''    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb">
        <a href="{rel_path}index.html">Home</a> > <a href="{rel_path}collections/index.html">Portfolio</a> > <span>{category}</span> > <span>{title}</span>
    </div>

'''
    
    try:
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if breadcrumb already exists
        if 'class="breadcrumb"' in content:
            print(f'✓ Breadcrumb already exists in {file_path}')
            return
        
        # Find the position after </nav> and before <main>
        pattern = r'(</nav>\s*)(<main)'
        replacement = rf'\1{breadcrumb_html}\2'
        
        new_content = re.sub(pattern, replacement, content, count=1)
        
        if new_content != content:
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'✓ Added breadcrumb to {file_path}')
        else:
            print(f'✗ Could not find insertion point in {file_path}')
            
    except Exception as e:
        print(f'✗ Error processing {file_path}: {e}')

def main():
    print('Adding breadcrumb navigation to all work pages...\n')
    
    for file_path, (category, title) in work_pages.items():
        add_breadcrumb(file_path, category, title)
    
    print('\n✓ Breadcrumb addition complete!')

if __name__ == '__main__':
    main()
