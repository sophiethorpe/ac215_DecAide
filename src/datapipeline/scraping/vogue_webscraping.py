from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time
import re

# Setup Chrome options
options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")  # Start maximized
options.add_argument("--no-sandbox")       # Bypass OS security model
options.add_argument("--disable-dev-shm-usage")  # Overcome limited resource problems

# Set up the Chrome driver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

url = 'https://www.vogue.com/fashion-shows/tokyo-spring-2025/chika-kisada/slideshow/collection#1'
div_class = "RunwayGalleryLookNumberText"

try:
    # Open the URL
    driver.get(url)

    # # Wait for a few seconds to allow the page to load
    # time.sleep(5)  # Adjust the sleep time as necessary

    # Find all divs with the specified class
    divs = driver.find_elements(By.XPATH, "//div[contains(@class, 'RunwayGalleryLookNumberText')]")

    # Print the content of each div
    for div in divs:
        print(div.text)

finally:
    # Close the driver
    driver.quit()
