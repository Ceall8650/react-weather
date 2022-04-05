import dayjs from 'dayjs';
import SUNRISE_SUNSET from './sunrise-sunset.json';
import AVAILABLE_LOCATIONS from './availableLocations';

export function getMoment(locationName, observationTime) {
  const locationSunriseSunset = SUNRISE_SUNSET.find(location => location.locationName === locationName);
  const [currentDaytime] = observationTime.split(' ')
  const formattedCurrentDaytime = dayjs(currentDaytime).format('YYYY-MM-DD');
  const todaySunriseSunset = locationSunriseSunset.time.find(day => day.dataTime === formattedCurrentDaytime)
  const formattedObservationTime = dayjs(observationTime);
  const formattedTodaySunrise = dayjs(`${todaySunriseSunset.dataTime} ${todaySunriseSunset.sunrise}`)
  const formattedTodaySunset = dayjs(`${todaySunriseSunset.dataTime} ${todaySunriseSunset.sunset}`)

  if(formattedObservationTime.isAfter(formattedTodaySunrise)
    && formattedObservationTime.isBefore(formattedTodaySunset)) {
      return 'light'
  }

  return 'night'
}

export function findLocation(forecastLocation) {
  return AVAILABLE_LOCATIONS.find(location => location.cityName === forecastLocation)
}
