import urllib.request
import sys
import time
import subprocess
from html.parser import HTMLParser

class IndexHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.found_bg_style = False
        self.found_placeholder = False
        self.found_checkbox_label = False
        self.sr_only_span_depth = 0

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)

        # Check body class or style
        if tag == "body":
            classes = attrs_dict.get("class", "").split()
            style = attrs_dict.get("style", "")
            if "bg-[#FAFAFA]" in classes or "background-color: #FAFAFA" in style:
                self.found_bg_style = True

        # Check input placeholder
        if tag == "input" and attrs_dict.get("id") == "note-task":
            if attrs_dict.get("placeholder") == "What needs to be done?":
                self.found_placeholder = True

        # Check for Mark as completed span (handle nesting)
        if tag == "span" and "sr-only" in attrs_dict.get("class", "").split():
            self.sr_only_span_depth += 1
        elif self.sr_only_span_depth > 0 and tag == "span":
            self.sr_only_span_depth += 1

    def handle_endtag(self, tag):
        if tag == "span" and self.sr_only_span_depth > 0:
            self.sr_only_span_depth -= 1

    def handle_data(self, data):
        if self.sr_only_span_depth > 0 and "Mark as completed" in data:
            self.found_checkbox_label = True

# Start server
print("Starting server...")
process = subprocess.Popen(["python3", "-m", "http.server", "8000"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1) # wait for server to start

try:
    print("Testing index.html...")
    response = urllib.request.urlopen("http://localhost:8000/index.html")
    html_content = response.read().decode('utf-8')

    parser = IndexHTMLParser()
    parser.feed(html_content)

    assert parser.found_bg_style, "Missing off-white background (class or style) on body"
    assert parser.found_placeholder, "Missing or incorrect placeholder on #note-task"
    assert parser.found_checkbox_label, "Missing 'Mark as completed' screen reader label"

    print("Testing scripts/dom-ntake.js...")
    response = urllib.request.urlopen("http://localhost:8000/scripts/dom-ntake.js")
    js_content = response.read().decode('utf-8')

    assert "text-gray-400 line-through" in js_content, "Missing checked style logic"
    assert "text-gray-900" in js_content, "Missing unchecked style logic"

    print("All checks passed successfully!")
    sys.exit(0)
except Exception as e:
    print(f"Test failed: {e}")
    sys.exit(1)
finally:
    print("Killing server...")
    process.kill()
