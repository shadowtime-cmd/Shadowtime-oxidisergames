from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:3000/neon-roguelite.html')
        page.wait_for_timeout(2000)

        # Hold space to ensure it registers in the animation loop
        page.keyboard.down(' ')
        page.wait_for_timeout(100)
        page.keyboard.up(' ')

        page.wait_for_timeout(50) # let bullets move a bit
        page.screenshot(path='test_megamove2.png')
        browser.close()

run()
