import dayjs from 'dayjs';
import AVAILABLE_LOCATIONS from './availableLocations';

export function getMoment(sunTime, locationName, observationTime) {
  if(!sunTime.length) {
    return 'day'
  }
  
  const locationSunriseSunset = sunTime.find(location => location.locationName === locationName);
  const [currentDaytime] = observationTime.split(' ')
  const formattedCurrentDaytime = dayjs(currentDaytime).format('YYYY-MM-DD');
  const todaySunriseSunset = locationSunriseSunset.time.find(day => day.dataTime === formattedCurrentDaytime)
  const formattedObservationTime = dayjs(observationTime);
  const formattedTodaySunrise = dayjs(`${todaySunriseSunset.dataTime} ${todaySunriseSunset.sunrise}`)
  const formattedTodaySunset = dayjs(`${todaySunriseSunset.dataTime} ${todaySunriseSunset.sunset}`)

  if(formattedObservationTime.isAfter(formattedTodaySunrise)
    && formattedObservationTime.isBefore(formattedTodaySunset)) {
      return 'day'
  }

  return 'night'
}

export function findLocation(forecastLocation) {
  return AVAILABLE_LOCATIONS.find(location => location.cityName === forecastLocation)
}
