from flask import Flask
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

@app.route('/clubs')
def page_code():
    req = requests.get("https://top14.lnr.fr/clubs").text
    res = []
    soup = BeautifulSoup(req, 'html.parser')
    for link in soup.find_all('a'):
        res.append(link.get('href'))
    return res