import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

async function fetchSunriseSunset(authToken) {
  const today = dayjs(new Date()).format('YYYY-MM-DD');
	const res = await fetch(
		`https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=${authToken}&Date=${today}`
	);
	const json = await res.json();

	if (json.success === "true") {
		return formatSunriseSunsetTime(json.records.locations.location);
	}

	return json;
}

function formatSunriseSunsetTime(locations) {
	return locations.map(location => {
		const time = location.time.map(daytime => ({
			"dataTime": daytime.Date,
			"sunrise": daytime.SunRiseTime,
			"sunset": daytime.SunSetTime
		}))

		return {
			time,
			locationName: location.CountyName
		}
	})
}

export default function useSunTimeApi(authToken) {
  const [sunTime, setSunTime] = useState([])
  const fetchSunTime = useCallback(async () => {
    const sunriseSunsetTime = await fetchSunriseSunset(authToken);

    setSunTime(sunriseSunsetTime)
  }, [authToken])

  return [sunTime, fetchSunTime]
}
