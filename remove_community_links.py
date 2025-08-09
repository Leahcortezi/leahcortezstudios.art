#!/usr/bin/env python3
import os
import re
import glob

# Find all HTML files in collections directory
collections_files = glob.glob("/Users/billyjoel/Documents/leahcortezstudios.art/collections/**/*.html", recursive=True)

print(f"Found {len(collections_files)} HTML files in collections directory")

for file_path in collections_files:
    try:
        # Read the file
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if it contains community links
        if 'community/index.html' in content:
            print(f"Updating: {file_path}")
            
            # Remove the community navigation item
            # Pattern to match the community li element
            pattern = r'\s*<li><a href="[^"]*community/index\.html">Community</a></li>\s*'
            updated_content = re.sub(pattern, '\n', content)
            
            # Write back to file
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            
            print(f"✅ Updated: {file_path}")
        else:
            print(f"⏭️  No community links found in: {file_path}")
            
    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")

print("Done!")
