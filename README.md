
# SkyCast: Your Weather Companion 

SkyCast is a responsive weather forecast application that allows users to check real-time weather conditions and a 5-day extended forecast for any location. Built with HTML, Tailwind CSS, and JavaScript, it integrates the OpenWeatherMap API to fetch and display weather data in an intuitive interface.


## Features

- **Current Weather:** View temperature, humidity, wind speed, and a weather description for a searched location.  
- **Location-Based Forecast:** Search by city name or get weather updates for your current location using geolocation.  
- **5-Day Extended Forecast:** Displays daily forecasts with icons, temperature, humidity, and wind details.  
- **Recent Searches:** Dropdown menu to quickly access recently searched cities (stored in local storage).  
- **Responsive Design:** Optimized for desktop, tablets, and mobile devices (including iPhone SE).  
- **Error Handling:** Graceful handling of invalid inputs or API errors with user-friendly messages.

## Technologies Used 
 
- **HTML5:** Markup for structuring the application.  
- **Tailwind CSS:** For responsive and modern styling.  
- **JavaScript:** Core functionality for fetching and displaying weather data.  
- **OpenWeatherMap API:** To retrieve weather data.  


## How to Use

 **Search for Weather by City:**  
   - Enter a city name in the input field and click the "Search" button to get current weather details and the 5-day forecast.  

 **Use Current Location:**  
   - Click the "Use Current Location" button to get weather data based on your device’s location.  

 **Recent Searches:**  
   - Access previously searched cities from the dropdown menu. Clicking on a city will reload the weather data for that location.  


## Setup Instructions 

1. Clone this repository:  
   ```bash
   git clone https://github.com/Labib000/Weather-Forecast-Application.git
   ```
2. Go to the project directory

```bash
  cd Weather-Forecast-Application
```

3. Open the `index.html` file in your browser to run the application.  

4. Replace the placeholder `const API_KEY = ""` in the `app.js` file with your **OpenWeatherMap API key**:  
   ```javascript
   const API_KEY = "your_api_key_here";
   ```


## Screenshots

**Desktop View**

![Screenshot 2024-11-20 131515](https://github.com/user-attachments/assets/aac81efb-e3a2-4c79-91d9-67ffee380190)

**Mobile View**

![Screenshot 2024-11-20 131903](https://github.com/user-attachments/assets/fc515e5c-723e-4707-9d33-01dfd03f06b6)

**Tablet View**

![Screenshot 2024-11-20 131932](https://github.com/user-attachments/assets/e9f5e7c8-37e1-4f1b-98f7-fb8e28b93b91)

## Acknowledgements
This project was made possible with the help of :
- [OpenWeatherMap API](https://openweathermap.org/api) for providing weather data.   
- [Stack Overflow](https://stackoverflow.com/) for troubleshooting and helpful solutions to various coding challenges.  
## Contributing
 
Contributions are welcome! If you'd like to improve SkyCast, feel free to:  
1. Fork the repository.  
2. Make your changes.  
3. Submit a pull request.  

