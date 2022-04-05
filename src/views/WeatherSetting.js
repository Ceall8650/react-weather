import { useState } from 'react';
import style from '../scss/views/weatherSetting.module.css';
import AVAILABLE_LOCATIONS from '../utils/availableLocations';

const WeatherSetting = function ({ cityName, handleCurrentPageChange, handleCurrentCityChange }) {
  const [locationName, setLocationName] = useState(cityName);

  function handleChange(e) {
    setLocationName(e.target.value)
  }

  function handleSave() {
    localStorage.setItem('cityName', locationName)
    handleCurrentCityChange(locationName)
    handleCurrentPageChange('WeatherCard')
  }

    return (
      <div className="relative min-w-[360px] shadow-card dark:shadow-dark-card bg-card dark:bg-dark-card p-5 box-border">
        <h3 className="text-3xl text-default dark:text-dark-default mb-8">設定</h3>
        <label htmlFor="location" className="block text-base text-default dark:text-dark-default mb-4">地區</label>
        <select id="location" name="location" className={style.select} onChange={handleChange} value={locationName}>
          {AVAILABLE_LOCATIONS.map(({cityName}) => (
            <option value={cityName} key={cityName}>
              {cityName}
            </option>
          ))}
        </select>
        <div className="flex justify-between items-center">
            <button className={`${style.button} ${style.back}`} onClick={() => handleCurrentPageChange('WeatherCard') }>返回</button>
            <button className={`${style.button} ${style.save}`} onClick={handleSave}>儲存</button>
        </div>
      </div>
    )
}

export default WeatherSetting
