import http.client

conn = http.client.HTTPSConnection("api.sportradar.us")

conn.request("GET", "/rugby-league/trial/v3/fr/competitions.json?api_key=erkz7fxhwsv4rr2zxz93j8e4")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))