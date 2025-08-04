#!/usr/bin/env python3
"""
Script to add navigation randomizer to all portfolio work pages
"""

import os
import re
from pathlib import Path

# Define the base directory
base_dir = Path("/Users/billyjoel/Documents/leahcortezstudios.art")
collections_dir = base_dir / "collections"

# List of all work HTML files (excluding main portfolio index)
work_files = [
    # Design Work
    "design/double-sided-poster/index.html",
    "design/elements-and-principles-book-cover/index.html", 
    "design/flag-design/index.html",
    "design/letter-as-form/index.html",
    "design/reductive-photo-solutions/index.html",
    "design/reductive-symbols/index.html",
    "design/themed-playing-card-design/index.html",
    "design/typographic-interpretation/index.html",
    
    # Personal Work
    "personal/anointed-gaze/index.html",
    "personal/drilled-into-memory/index.html",
    "personal/entre-mundos/index.html",
    "personal/heaven-on-fire/index.html",
    "personal/inheritance/index.html",
    "personal/abuelas-altar/index.html",
    
    # Studio Work
    "studio/abuelas-altar/index.html",
    "studio/abyss-bloom/index.html",
    "studio/artificial-meadow/index.html",
    "studio/collected-remains/index.html",
    "studio/feathers-along-the-bend/index.html",
    "studio/gnaw/index.html",
    "studio/shadows-in-repetition/index.html",
    "studio/unraveling/index.html"
]

def add_navigation_script(file_path):
    """Add navigation randomizer script to a work HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if script is already included
        if 'navigation-randomizer.js' in content:
            print(f"✓ Script already present in {file_path}")
            return True
            
        # Pattern to find the main.js script tag
        pattern = r'(\s*<script src="\.\.\/\.\.\/\.\.\/scripts\/main\.js" defer><\/script>)'
        
        # Replacement with both scripts
        replacement = r'\1\n    <script src="../../../scripts/navigation-randomizer.js" defer></script>'
        
        # Perform replacement
        new_content = re.sub(pattern, replacement, content)
        
        # Check if replacement was made
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✓ Added navigation script to {file_path}")
            return True
        else:
            # Try alternative pattern for different script structures
            alt_pattern = r'(\s*<script src="\.\.\/\.\.\/\.\.\/scripts\/main\.js" defer><\/script>\s*)(\n?\s*</body>)'
            alt_replacement = r'\1\n    <script src="../../../scripts/navigation-randomizer.js" defer></script>\2'
            
            new_content = re.sub(alt_pattern, alt_replacement, content)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✓ Added navigation script to {file_path} (alt pattern)")
                return True
            else:
                print(f"⚠ Could not find script insertion point in {file_path}")
                return False
                
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return False

def main():
    """Main function to process all work files"""
    print("Adding navigation randomizer to all portfolio work pages...")
    print("-" * 60)
    
    success_count = 0
    total_count = 0
    
    for work_file in work_files:
        file_path = collections_dir / work_file
        
        if file_path.exists():
            total_count += 1
            if add_navigation_script(file_path):
                success_count += 1
        else:
            print(f"⚠ File not found: {file_path}")
    
    print("-" * 60)
    print(f"Processed {success_count}/{total_count} files successfully")
    
    if success_count == total_count:
        print("🎉 All files updated successfully!")
    else:
        print(f"⚠ {total_count - success_count} files need manual review")

if __name__ == "__main__":
    main()
