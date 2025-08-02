#!/usr/bin/env python3
"""
Script to update favicon links in all HTML files with cache-busting version parameter
"""

import os
import re
import glob

def update_favicon_in_file(file_path):
    """Update favicon links in a single HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Count how many '../' we need based on the file path depth
        depth = file_path.count('/') - file_path.count('/Users/billyjoel/Documents/leahcortezstudios.art/') + 1
        relative_path = '../' * (depth - 1) + 'icons/favicon.ico?v=2025'
        
        # Replace existing favicon links
        # Pattern 1: Basic favicon link
        pattern1 = r'<link rel="icon" href="[^"]*favicon\.ico[^"]*" type="image/x-icon">'
        replacement1 = f'<link rel="icon" href="{relative_path}" type="image/x-icon">'
        
        # Pattern 2: Look for favicon lines and add shortcut icon if missing
        if 'shortcut icon' not in content:
            pattern2 = r'(<link rel="icon" href="[^"]*favicon\.ico[^"]*" type="image/x-icon">)'
            replacement2 = f'\\1\n    <link rel="shortcut icon" href="{relative_path}" type="image/x-icon">'
            content = re.sub(pattern2, replacement2, content)
        
        # Apply the main replacement
        content = re.sub(pattern1, replacement1, content)
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Updated: {file_path}")
        return True
        
    except Exception as e:
        print(f"Error updating {file_path}: {e}")
        return False

def main():
    """Main function to update all HTML files"""
    base_dir = '/Users/billyjoel/Documents/leahcortezstudios.art'
    
    # Find all HTML files in the collections subdirectories
    html_files = []
    
    # Get all index.html files in project directories (but not the main collections index)
    for root, dirs, files in os.walk(os.path.join(base_dir, 'collections')):
        for file in files:
            if file == 'index.html' and root != os.path.join(base_dir, 'collections'):
                html_files.append(os.path.join(root, file))
    
    print(f"Found {len(html_files)} HTML files to update...")
    
    updated_count = 0
    for file_path in html_files:
        if update_favicon_in_file(file_path):
            updated_count += 1
    
    print(f"\nCompleted! Updated {updated_count} out of {len(html_files)} files.")

if __name__ == "__main__":
    main()
