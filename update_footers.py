#!/usr/bin/env python3
import os
import re
import glob

# Define the new footer content
NEW_FOOTER = '''    <footer class="main-footer">
        <div class="footer-content">
            <img src="../../../images/logo/logo4.png" alt="Leah Cortez Logo" class="footer-logo">
            <p class="copyright">Leah Cortez © 2025</p>
        </div>
    </footer>'''

# Find all HTML files in collections subdirectories (not the main collections/index.html)
pattern = "collections/*/*/index.html"
files = glob.glob(pattern)

print(f"Found {len(files)} artwork files to update:")

for file_path in files:
    print(f"Processing: {file_path}")
    
    try:
        # Read the file
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find and replace the footer section
        # Pattern to match from <footer> to </footer>
        footer_pattern = r'<footer class="main-footer">.*?</footer>'
        
        if re.search(footer_pattern, content, re.DOTALL):
            # Replace with new footer
            new_content = re.sub(footer_pattern, NEW_FOOTER, content, flags=re.DOTALL)
            
            # Write back to file
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"  ✓ Updated footer in {file_path}")
        else:
            print(f"  ⚠ No footer found in {file_path}")
            
    except Exception as e:
        print(f"  ✗ Error processing {file_path}: {e}")

print("Footer update complete!")
