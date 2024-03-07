import requests

url = "https://api.pandascore.co/lol/matches/900376"

headers = {
    "accept": "application/json",
    "authorization": "Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes"
}

response = requests.get(url, headers=headers)

data = response.json()

print(data)

# league_id = 4531 | serie_id : 7178 | A : 12817 | B : 12818 | C : 12819