import sys
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from time import sleep

def fetch_prices(crop, state):
    # Set up headless Chrome
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(options=options)

    # Build Agmarknet URL for crop and state
    url = f"https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity={crop}&Tx_State={state}&Tx_District=0&Tx_Market=0&DateFrom=&DateTo=&Fr_Date=&To_Date=&Tx_Trend=0&Tx_CommodityHead=--Select--&Tx_StateHead=--Select--&Tx_DistrictHead=--Select--&Tx_MarketHead=--Select--"
    driver.get(url)
    sleep(8)  # Wait for data to load

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    tables = soup.find_all('table')
    prices = []
    for table in tables:
        headers = [th.text.strip() for th in table.find_all('th')]
        if 'Modal Price' in headers:
            for tr in table.find_all('tr')[1:]:
                tds = tr.find_all('td')
                if len(tds) >= 6:
                    prices.append({
                        'mandi': tds[1].text.strip(),
                        'price': float(tds[5].text.strip().replace(',', '') or 0),
                        'unit': 'quintal',
                        'date': tds[3].text.strip()
                    })
    driver.quit()
    return prices

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({'error': 'Usage: fetch_market_price.py <crop> <state>'}))
        sys.exit(1)
    crop = sys.argv[1]
    state = sys.argv[2]
    try:
        prices = fetch_prices(crop, state)
        print(json.dumps({'prices': prices}))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)
