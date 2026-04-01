from playwright.sync_api import sync_playwright

def test_verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.route("**/*", lambda route: route.continue_() if route.request.resource_type in ["document", "stylesheet", "image", "font", "script"] and any(domain in route.request.url for domain in ["localhost", "tailwindcss.com", "fonts.googleapis.com", "unsplash.com"]) else route.abort())
        page.goto('http://localhost:8000/index.html')
        page.wait_for_timeout(2000) # wait for fonts/images

        # Add a task to see the delete button
        page.fill('#note-task', 'Test Task 1')
        page.fill('#note-time', '12:00')
        page.click('#button')

        # Take a screenshot
        page.screenshot(path='verification/verify_delete_button.png', full_page=True)
        browser.close()

if __name__ == '__main__':
    test_verify_ui()
