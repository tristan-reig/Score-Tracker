import requests

url = "https://api.pandascore.co/lives?page=&per_page=50"

headers = {
    "accept": "application/json",
    "authorization": "Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes"
}

response = requests.get(url, headers=headers)

print(response.text)