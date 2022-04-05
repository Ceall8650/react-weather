import { useState, useMemo } from "react";
import AVAILABLE_LOCATIONS from './utils/availableLocations';
import { findLocation } from './utils/helpers';
import WeatherCard from "./views/WeatherCard";
import WeatherSetting from "./views/WeatherSetting";

function App() {
	const storageCity = localStorage.getItem('cityName');
	const defaultCity = storageCity || AVAILABLE_LOCATIONS[6].cityName // 臺北市
	const [currentPage, setCurrentPage] = useState("WeatherCard");
	const [currentCity, setCurrentCity] = useState(defaultCity)
	const currentLocation = useMemo(() => findLocation(currentCity), [currentCity])
	
	const handleCurrentPageChange = (page) => {
		setCurrentPage(page)
	}

	const handleCurrentCityChange = cityName => {
		setCurrentCity(cityName);
	}

	return (
		<div className="flex justify-center items-center h-full bg-container dark:bg-dark-container">
			{
				currentPage === 'WeatherCard' 
				? <WeatherCard handleCurrentPageChange={handleCurrentPageChange} currentLocation={currentLocation} />
				: <WeatherSetting
					cityName={currentLocation.cityName}
					handleCurrentPageChange={handleCurrentPageChange} 
					handleCurrentCityChange={handleCurrentCityChange} 
				/>
			}
		</div>
	);
}

export default App;
