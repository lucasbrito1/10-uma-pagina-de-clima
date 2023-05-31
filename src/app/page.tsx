"use client";

import AirQuality from "components/AirQuality";
import SunTime from "components/SunTime";
import TemperatureNow from "components/TemperatureNow";
import WeekWeather from "components/WeekWeather";
import { useEffect, useState } from "react";

export type Weather = {
  current: CurrentWeather;
  forecast: ForecastWeather;
};

type CurrentWeather = {
  temp_c: number;
  wind_kph: number;
  humidity: number;
  cloud: number;
  air_quality: AirQuality;
};

type ForecastWeather = {
  forecastday: ForecastDayWeather[];
};

export type ForecastDayWeather = {
  day: ForecastDayData;
  date: string;
  astro: ForecastDayAstro;
};

type ForecastDayData = {
  maxtemp_c: number;
  mintemp_c: number;
  condition: ForecastDayIcon;
};

type ForecastDayAstro = {
  sunrise: string;
  sunset: string;
};

type ForecastDayIcon = {
  icon: string;
};

type AirQuality = {
  pm2_5: number;
  pm10: number;
  so2: number;
  no2: number;
  o3: number;
  co: number;
  "us-epa-index": number;
};

export type LocationResponse = {
  results: LocationResults[];
};

type LocationResults = {
  components: ResultsLocation;
};

type ResultsLocation = {
  city: string;
  state_code: string;
};

const keyWeather = process.env.NEXT_PUBLIC_WEATHERAPIKEY;
const urlWeather = "https://api.weatherapi.com/v1/forecast.json?key=";

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [location, setLocation] = useState<LocationResponse | null>(null);

  console.log(weather);

  useEffect(() => {
    const loadWeather = async () => {
      if (location) {
        const response = await fetch(
          `${urlWeather + keyWeather}&q=${
            location?.results[0].components.city
          }&days=5&aqi=yes&alerts=no`
        );
        const data = await response.json();

        setWeather(data);
      }
    };
    loadWeather();
  }, [location]);

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const keyGeo = process.env.NEXT_PUBLIC_GEOCODINGKEY;
          const urlGeo = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${keyGeo}`;
          const response = await fetch(urlGeo);
          const data = await response.json();

          setLocation(data);
        });
      }
    };
    getLocation();
  }, []);

  return (
    <div>
      <div className="h-screen lg:flex lg:items-center lg:justify-center">
        <div className="flex flex-col gap-[1.5rem] p-[1.25rem] lg:flex lg:flex-row lg:gap-[1.5rem]">
          <TemperatureNow weather={weather} location={location} />
          <div className="flex flex-col gap-[1.5rem] lg:flex lg:w-[37.25rem] lg:flex-row lg:flex-wrap lg:gap-[1.5rem]">
            <AirQuality weather={weather} />
            <SunTime weather={weather} />
            <WeekWeather forecastday={weather?.forecast.forecastday} />
          </div>
        </div>
      </div>
    </div>
  );
}
