#!/usr/bin/env python3

import re

# Read the file
with open('community/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match the resource-item structure with icon and content divs
pattern = r'(<div class="resource-item">)\s*<div class="resource-icon">[^<]*</div>\s*<div class="resource-content">\s*(<h5>[^<]+</h5>)\s*(<p>[^<]+</p>)\s*(<button[^>]+>[^<]+</button>)\s*</div>\s*(</div>)'

# Replace with simplified structure
def replace_resource_item(match):
    h5_content = match.group(2).replace('<h5>', '<h4>').replace('</h5>', '</h4>')
    return f'''{match.group(1)}
                                {h5_content}
                                {match.group(3)}
                                {match.group(4)}
                            {match.group(5)}'''

# Apply the replacement
new_content = re.sub(pattern, replace_resource_item, content, flags=re.DOTALL)

# Write the updated content back
with open('community/index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Resources section simplified successfully!")
