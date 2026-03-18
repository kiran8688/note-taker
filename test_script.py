import urllib.request
import sys
import time
import subprocess

# Start server
print("Starting server...")
process = subprocess.Popen(["python3", "-m", "http.server", "8000"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1) # wait for server to start

try:
    print("Testing index.html...")
    response = urllib.request.urlopen("http://localhost:8000/index.html")
    html_content = response.read().decode('utf-8')

    assert "bg-[#FAFAFA]" in html_content or "background-color: #FAFAFA" in html_content, "Missing off-white background"
    assert "What needs to be done?" in html_content, "Missing updated placeholder"
    assert "Mark as completed" in html_content, "Missing updated checkbox label"

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
