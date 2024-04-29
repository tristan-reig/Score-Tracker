import requests

url = "https://api.pandascore.co/series/7385/tournaments"

headers = {
    "accept": "application/json",
    "authorization": "Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes"
}

response = requests.get(url, headers=headers)

data = response.json()

print(data[1])