import asyncio
from playwright.async_api import async_playwright
import os

async def run_test():
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()

            # Block everything except localhost
            async def handle_route(route):
                if "localhost" in route.request.url:
                    await route.continue_()
                else:
                    await route.abort()

            await page.route("**/*", handle_route)

            # Use wait_until="commit" to be as fast as possible
            print("Navigating to page...")
            await page.goto("http://localhost:3000/index.html", wait_until="domcontentloaded", timeout=60000)
            print("Page loaded.")

            # Test taskInput Enter
            print("Testing taskInput Enter...")
            await page.fill("#note-task", "Task from Task Input")
            await page.fill("#note-time", "10:00")
            await page.press("#note-task", "Enter")

            # Verify task created
            await page.wait_for_selector("text=Task from Task Input", timeout=5000)
            print("Successfully created task by pressing Enter in taskInput")

            # Test timeInput Enter
            print("Testing timeInput Enter...")
            await page.fill("#note-task", "Task from Time Input")
            await page.fill("#note-time", "11:00")
            await page.press("#note-time", "Enter")

            # Verify task created
            await page.wait_for_selector("text=Task from Time Input", timeout=5000)
            print("Successfully created task by pressing Enter in timeInput")

            await browser.close()
    except Exception as e:
        print(f"Test failed: {e}")
        import traceback
        traceback.print_exc()
        exit(1)

if __name__ == "__main__":
    asyncio.run(run_test())
