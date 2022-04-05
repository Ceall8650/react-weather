import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { getMoment } from "../utils/helpers";
import useWeatherApi from '../hooks/useWeatherApi';
import { ReactComponent as AirFlowIcon } from "../images/airFlow.svg";
import { ReactComponent as RainIcon } from "../images/rain.svg";
import { ReactComponent as RefreshIcon } from "../images/refresh.svg";
import { ReactComponent as LoadingIcon } from "../images/loading.svg";
import { ReactComponent as CogIcon } from "../images/cog.svg";
import WeatherIcon from "../components/WeatherIcon";

// Use the token applied from https://opendata.cwb.gov.tw/index
const AUTH_TOKEN = "AUTH_TOKEN";

function handleThemeMode(mode) {
	const rootElement = document.querySelector("html");

	if (mode === "night") {
		rootElement.classList.add('dark');
	} else {
		rootElement.classList.add("light");
		rootElement.classList.remove("dark");
	}
}

const WeatherCard = ({ handleCurrentPageChange, currentLocation }) => {
	const {
		cityName,
		locationName,
		sunriseCityName,
	 } = currentLocation
  const [weatherElement, fetchData] = useWeatherApi({
    authToken: AUTH_TOKEN,
    observationLocation: locationName,
    forecastLocation: cityName,
  })
	const {
		description,
		windSpeed,
		temperature,
		rainPossibility,
		observationTime,
		comfortability,
		weatherCode,
    isLoading,
	} = weatherElement;

	const moment = useMemo(
		() => getMoment(sunriseCityName, observationTime),
		[observationTime, sunriseCityName]
	);

  useEffect(() => {
		fetchData();
	}, [fetchData]);
	useEffect(() => {
		handleThemeMode(moment);
	}, [moment]);

	return (
		<div className="relative min-w-card bg-card dark:bg-dark-card shadow-card dark:shadow-dark-card box-border py-8 px-4">
			<div className="flex justify-start">
				<button
					className="text-default dark:text-dark-default mr-4 p-1"
					onClick={() => handleThemeMode()}
				>
					Light
				</button>
				<button
					className="text-default dark:text-dark-default p-1"
					onClick={() => handleThemeMode("night")}
				>
					Dark
				</button>
			</div>
			<CogIcon className="absolute top-6 right-4 w-4 h-4 cursor-pointer" onClick={() => handleCurrentPageChange('WeatherSetting') } />
			<h1 className="text-[28px] text-title dark:text-dark-title mb-5">
				{cityName}
			</h1>
			<div className="text-default dark:text-dark-default text-lg mb-8">
				{description} {comfortability}
			</div>
			<div className="flex justify-between items-center mb-8">
				<div className="flex text-8xl text-temperature dark:text-dark-temperature font-light">
					{Math.round(temperature) || "--"}{" "}
					<span className="font-normal text-5xl">°C</span>
				</div>
				<WeatherIcon
					className="basis-1/3"
					moment={moment}
					weatherCode={weatherCode}
				/>
			</div>
			<div className="flex items-center text-base font-light text-default dark:text-dark-default mb-5">
				<AirFlowIcon className="w-6 h-auto mr-7" /> {windSpeed || "--"} m/h
			</div>
			<div className="flex items-center text-base font-light text-default dark:text-dark-default">
				<RainIcon className="w-6 h-auto mr-7" /> {rainPossibility || "--"}%
			</div>
			<div className="absolute right-4 bottom-4 text-xs inline-flex items-end text-default dark:text-dark-default">
				最後觀測時間：
				{new Intl.DateTimeFormat("zh-tw", {
					hour: "numeric",
					minute: "numeric",
				}).format(dayjs(observationTime))}{" "}
				{isLoading ? (
					<LoadingIcon className="ml-3 w-4 h-4 animate-spin-slow" />
				) : (
					<RefreshIcon className="ml-3 w-4 h-4 cursor-pointer" onClick={fetchData} />
				)}
			</div>
		</div>
	);
};

export default WeatherCard;
