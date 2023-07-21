import dayjs from 'dayjs';
import { useState, useCallback } from 'react';

async function fetchObservationWeather(authToken, observationLocation) {
	const res = await fetch(
		`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authToken}&format=JSON&locationName=${observationLocation}`
	);
	const json = await res.json();

	if (json.success === "true") {
		return json.records.location[0];
	}

	return json;
}

async function fetchForecastWeather(authToken, forecastLocation) {
	const res = await fetch(
		`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authToken}&locationName=${forecastLocation}`
	);
	const json = await res.json();

	if (json.success === "true") {
		return json.records.location[0];
	}

	return json;
}

function getObservationWeatherData(locationInfo) {
	return locationInfo.weatherElement.reduce((neededElements, element) => {
		if (["WDSD", "TEMP"].includes(element.elementName)) {
			neededElements[element.elementName] = element.elementValue;
		}

		return neededElements;
	}, {});
}

function getForecastWeather(locationInfo) {
	return locationInfo.weatherElement.reduce((neededElements, element) => {
		if (["Wx", "PoP", "CI"].includes(element.elementName)) {
			neededElements[element.elementName] = element.time[0].parameter;
		}

		return neededElements;
	}, {});
}

const useWeatherApi = ({ authToken, observationLocation, forecastLocation }) => {
	const defaultObservationTime = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
  const [weatherElement, setWeatherElement] = useState({
		locationName: "臺北市",
		description: "多雲時晴",
		windSpeed: null,
		temperature: null,
		rainPossibility: null,
		observationTime: defaultObservationTime,
		weatherCode: null,
		comfortability: "",
    isLoading: true,
	});

  const fetchData = useCallback(async () => {
		try {
      setWeatherElement((previousWeather) => ({
        ...previousWeather,
        isLoading: true,
      }))
			 const [
				observationLocationInfo, 
				forecastLocationInfo,
			] = await Promise.all([
        fetchObservationWeather(authToken, observationLocation),
        fetchForecastWeather(authToken, forecastLocation),
      ]);
			const observationWeather = observationLocationInfo && getObservationWeatherData(observationLocationInfo);
			const forecastWeather = getForecastWeather(forecastLocationInfo);

			setWeatherElement((previousWeather) => ({
				...previousWeather,
				temperature: observationWeather?.TEMP || '--',
				windSpeed: observationWeather?.WDSD || '--',
				observationTime: observationLocationInfo?.time?.obsTime || defaultObservationTime ,
				rainPossibility: forecastWeather["PoP"].parameterName,
				weatherCode: forecastWeather["Wx"].parameterValue,
				description: forecastWeather["Wx"].parameterName,
				comfortability: forecastWeather["CI"].parameterName,
			}));
		} catch (error) {
			throw error;
		} finally {
      setWeatherElement((previousWeather) => ({
        ...previousWeather,
        isLoading: false,
      }))

		}
	}, [authToken, observationLocation, forecastLocation, defaultObservationTime]);

  return [weatherElement, fetchData]
}

export default useWeatherApi
