from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('file://' + '/home/jules/sandbox/index.html')
        page.screenshot(path='current_design_local.png', full_page=True)
        browser.close()

if __name__ == '__main__':
    run()
