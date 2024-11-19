from selenium import webdriver
from selenium.webdriver.common.by import By
import urllib.request
import time
import os

base_url = "https://www.gettyimages.com/search/2/image?family=creative%2Ceditorial&phrase=vogue%20"
Prefix = "Vogue_"
output_dir = "./secrets/pics/old/"


def download_image(prefix, year, src, seq, dir):
    filename = prefix + str(year) + "#" + str(seq) + ".png"  # i.e: "JohnTravolta0.png"
    image_path = os.path.abspath(os.path.join(dir, filename))  # /home/user/Desktop/dirname
    try:
        urllib.request.urlretrieve(src, image_path)  # download image
    except Exception as e:
        pass


def browse_page(base_url, year, prefix, dir):
    url = base_url + str(year)
    driver = webdriver.Firefox()
    # driver = webdriver.Chrome() # IF YOU ARE USING CHROME.	
    driver.maximize_window()
    driver.get(url)

    npage = driver.find_element(By.CSS_SELECTOR, "span.JO4Dw2C5EjCB3iovKUcw")
    if npage:
        npage = int(npage.text)
    else:
        print("Error loading", url)
        return

    seq = 1  # initialize the file number.
    for i in range(npage):  # Loop for the number of pages you want to scrape.
        try:
            driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')  # Scroll to the end of page.
            time.sleep(2)  # Wait for all the images to load correctly.
            images = driver.find_elements(By.CSS_SELECTOR, 'picture > img')  # Find all images.
            print("Found", len(images), "images")
        except:
            continue

        for image in images:  # For each image in one page:
            try:
                src = image.get_attribute('src')  # Get the link
                download_image(prefix, year, src, seq, dir)  # And download it to directory
            except Exception as e:
                print(e)
            seq += 1
        try:
            nextpage = driver.find_element(By.CSS_SELECTOR,
                'a[data-testid="pagination-button-next"]').click()  # Move to next page
        except Exception as e:
            pass

        time.sleep(1)

    driver.quit()


if __name__ == '__main__':
    if not os.path.isdir(output_dir):  # If the folder does not exist in working directory, create a new one.
        os.makedirs(output_dir)
    for year in range(1960, 1990):
        browse_page(base_url, year, Prefix, output_dir)