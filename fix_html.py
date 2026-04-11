import re

with open('index.html', 'r') as f:
    content = f.read()

# Apply the gradient theme background over the new master background
def replace_bg(match):
    return """    <!-- Fixed Background Theme Container -->
    <div class="fixed inset-0 z-[-1] bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
    </div>"""

content = re.sub(
    r'\s*<div class="fixed inset-0 z-\[-1\] pointer-events-none">.*?(?:<div class="absolute.*?\n)+\s*</div>',
    replace_bg,
    content,
    flags=re.DOTALL
)

with open('index.html', 'w') as f:
    f.write(content)
