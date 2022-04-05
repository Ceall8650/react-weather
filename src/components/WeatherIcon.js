import { useMemo } from 'react';
import DayClear from "../images/day-clear.svg";
import DayCloudy from "../images/day-cloudy.svg";
import DayCloudyFog from "../images/day-cloudy-fog.svg";
import DayFog from "../images/day-fog.svg";
import DayPartiallyClearWithRain from "../images/day-partially-clear-with-rain.svg";
import DaySnowing from "../images/day-snowing.svg";
import DayThunderstorm from "../images/day-thunderstorm.svg";
import NightClear from "../images/night-clear.svg";
import NightCloudy from "../images/night-cloudy.svg";
import NightCloudyFog from "../images/night-cloudy-fog.svg";
import NightFog from "../images/night-fog.svg";
import NightPartiallyClearWithRain from "../images/night-partially-clear-with-rain.svg";
import NightSnowing from "../images/night-snowing.svg";
import NightThunderstorm from "../images/night-thunderstorm.svg";
import { ReactComponent as LoadingIcon } from "../images/loading.svg";


// Corresponding to the weather code from forecast weather API
// Code description: https://opendata.cwb.gov.tw/opendatadoc/MFC/ForecastElement.pdf
const weatherTypes = {
	isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
	isClear: [1],
	isCloudyFog: [25, 26, 27, 28],
	isCloudy: [2, 3, 4, 5, 6, 7],
	isFog: [24],
	isPartiallyClearWithRain: [
		8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39,
	],
	isSnowing: [23, 37, 42],
};

const weatherIcons = {
	day: {
		isThunderstorm: DayThunderstorm,
		isClear: DayClear,
		isCloudyFog: DayCloudyFog,
		isCloudy: DayCloudy,
		isFog: DayFog,
		isPartiallyClearWithRain: DayPartiallyClearWithRain,
		isSnowing: DaySnowing,
	},
	night: {
		isThunderstorm: NightThunderstorm,
		isClear: NightClear,
		isCloudyFog: NightCloudyFog,
		isCloudy: NightCloudy,
		isFog: NightFog,
		isPartiallyClearWithRain: NightPartiallyClearWithRain,
		isSnowing: NightSnowing,
	},
};

const weatherCode2Types = function (code) {
	const [weatherType] =
		Object.entries(weatherTypes).find(([weatherType, weatherCodes]) =>
			weatherCodes.includes(Number(code))
		) || [];

	return weatherType;
};

const WeatherIcon = ({ className, weatherCode, moment }) => {
	const weatherType = useMemo(() => weatherCode2Types(weatherCode), [weatherCode]); 
	const imagePath = weatherIcons[moment][weatherType];

	return (
		<>
			{imagePath ? (
				<img
					src={imagePath}
					alt={weatherType}
					className={`max-h-28 ${className}`}
				/>
			) : <LoadingIcon className="animate-spin-slow w-20 h-20"/> }
		</>
	);
};

export default WeatherIcon;
