#!/usr/bin/env python3
"""
Script to add Community navigation link to all work pages and case study pages
that are missing it in the collections directory.
"""

import os
import re
from pathlib import Path

def fix_navigation_in_file(file_path):
    """Fix navigation in a single HTML file by adding the Community link."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if Community link is already present
        if 'Community' in content and '/community/index.html' in content:
            print(f"✓ {file_path} already has Community link")
            return False
        
        # Pattern to match the navigation structure
        # Look for the CV link followed by Contact link, and insert Community between them
        pattern = r'(<li><a href="[^"]*cv/index\.html">CV</a></li>\s*)(<li><a href="[^"]*contact/index\.html">Contact</a></li>)'
        
        # Replacement that adds Community link between CV and Contact
        replacement = r'\1<li><a href="../../../community/index.html">Community</a></li>\n                    \2'
        
        # Apply the replacement
        new_content = re.sub(pattern, replacement, content)
        
        # If no change was made, try alternative patterns for different directory levels
        if new_content == content:
            # Try pattern for files in personal/studio directories (3 levels deep)
            pattern2 = r'(<li><a href="[^"]*\.\./\.\./cv/index\.html">CV</a></li>\s*)(<li><a href="[^"]*\.\./\.\./contact/index\.html">Contact</a></li>)'
            replacement2 = r'\1<li><a href="../../community/index.html">Community</a></li>\n                    \2'
            new_content = re.sub(pattern2, replacement2, content)
        
        # If still no change, try another pattern
        if new_content == content:
            # Try a more general pattern
            pattern3 = r'(<li><a href="[^"]*cv/index\.html">CV</a></li>\s*)(<li><a href="[^"]*contact/index\.html">Contact</a></li>)'
            # Count the ../ to determine the correct path
            cv_match = re.search(r'<a href="([^"]*cv/index\.html)">', content)
            if cv_match:
                path_parts = cv_match.group(1).count('../')
                community_path = '../' * path_parts + 'community/index.html'
                replacement3 = f'\\1<li><a href="{community_path}">Community</a></li>\\n                    \\2'
                new_content = re.sub(pattern3, replacement3, content)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✓ Fixed {file_path}")
            return True
        else:
            print(f"✗ Could not fix {file_path} - pattern not found")
            return False
            
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return False

def main():
    """Main function to process all HTML files in the collections directory."""
    collections_dir = Path('/Users/lcortez14/Documents/leahcortezstudios.art/collections')
    
    if not collections_dir.exists():
        print("Collections directory not found!")
        return
    
    html_files = list(collections_dir.rglob('*.html'))
    
    # Exclude the main collections/index.html file as it already has the Community link
    html_files = [f for f in html_files if f.name != 'index.html' or f.parent != collections_dir]
    
    print(f"Found {len(html_files)} HTML files to process...")
    
    fixed_count = 0
    total_count = len(html_files)
    
    for file_path in html_files:
        if fix_navigation_in_file(file_path):
            fixed_count += 1
    
    print(f"\n✓ Successfully fixed {fixed_count} out of {total_count} files")

if __name__ == "__main__":
    main()
