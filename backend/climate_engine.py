import requests

API_KEY = "bcc7f710fcfe1a71d5899f592caa4674"
CITY = "Ahmedabad"

def get_live_climate():
    url = f"https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    temperature = data["main"]["temp"]
    humidity = data["main"]["humidity"]
    rainfall = data.get("rain", {}).get("1h", 0)

    return {
        "temperature": temperature,
        "humidity": humidity,
        "rainfall": rainfall
    }
