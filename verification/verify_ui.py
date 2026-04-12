from playwright.sync_api import Page, expect, sync_playwright
import subprocess
import time

def verify_fix(page: Page):
    # Start the server on port 8000
    server_process = subprocess.Popen(["python3", "-m", "http.server", "8000"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)  # Wait for server to start

    try:
        # Block ALL external requests
        page.route("**", lambda route: route.continue_() if "127.0.0.1" in route.request.url or "localhost" in route.request.url else route.abort())

        print("Navigating...")
        page.goto("http://127.0.0.1:8000/index.html", wait_until="domcontentloaded")

        # Take a screenshot
        page.screenshot(path="verification/verification.png")
        print("Screenshot saved to verification/verification.png")

    finally:
        server_process.terminate()
        server_process.wait()

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_fix(page)
        finally:
            browser.close()
