import { MapPin, Wind, Droplets, Cloudy } from "lucide-react";
import clouds from "../assets/clouds-top.png";
import Image from "next/image";
import { LocationResponse, Weather } from "@/app/page";
import Loading from "./Loading";

interface Props {
  weather: Weather | null;
  location: LocationResponse | null;
}

export default function TemperatureNow({ weather, location }: Props) {
  return (
    <div className="relative flex h-[30rem] w-[30rem] flex-col justify-center rounded-[10px] bg-[url('../assets/clouds-temperature.png')] bg-cover bg-center bg-no-repeat">
      <Image
        src={clouds}
        alt=""
        className="absolute left-[-3.5rem] top-[-3.5rem]"
      />

      {weather ? (
        <>
          <div className="flex h-[200px] items-start justify-end pr-[2rem] pt-[2rem] font-[700]">
            <div className="flex items-center gap-[0.5rem] text-gray">
              <MapPin size={17} />
              <p className="text-[0.875rem] font-[700]">
                {location?.results[0].components.city},{" "}
                {location?.results[0].components.state_code}
              </p>
            </div>
          </div>

          <div className="relative flex h-full w-full flex-col items-center justify-center">
            <p className="text-[5.5rem] font-[700] leading-[6.6rem]">
              {Math.floor(weather?.current.temp_c)}
            </p>
            <p className="absolute top-[42px] ml-[8.4375rem] text-[1.5rem] font-[700] leading-[1.8rem] text-gray">
              °C
            </p>
            <div className="flex justify-center gap-[0.625rem] text-[1.25rem] font-[700]">
              <p>
                {Math.floor(
                  weather?.forecast.forecastday[0].day.maxtemp_c ?? 0
                )}
                °
              </p>
              <p className="text-gray">
                {Math.floor(
                  weather?.forecast.forecastday[0].day.mintemp_c ?? 0
                )}
                °
              </p>
            </div>
          </div>

          <div className="flex h-full items-end justify-center gap-[0.5rem] pb-[0.75rem]">
            <div className="flex h-[3.75rem] w-[9.1669rem] items-center justify-center rounded-[6px] bg-[#6660C899] px-[16px] py-[16px]">
              <div className="flex items-center gap-[0.75rem]">
                <Wind size={32} className="text-gray" />
                <div>
                  <p className="text-[0.875rem] leading-[0.9rem]">Vento</p>
                  <div className="flex gap-[0.25rem] font-[700]">
                    <span>
                      {weather?.current.wind_kph}{" "}
                      <span className="text-[0.875rem] text-gray">km/h</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-[3.75rem] w-[9.1669rem] items-center justify-center rounded-[6px] bg-[#6660C899]">
              <div className="flex items-center gap-[0.75rem]">
                <Droplets size={32} className="text-gray" />
                <div>
                  <p className="text-[0.875rem] leading-[0.9rem]">Umidade</p>
                  <div className="flex gap-[0.25rem] font-[700]">
                    <span>
                      {weather?.current.humidity}{" "}
                      <span className="text-[0.875rem] text-gray">%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-[3.75rem] w-[9.1669rem] items-center justify-center rounded-[6px] bg-[#6660C899]">
              <div className="flex items-center gap-[0.75rem]">
                <Cloudy size={32} className="text-gray" />
                <div>
                  <p className="text-[0.875rem] leading-[0.9rem]">Nuvens</p>
                  <div className="flex gap-[0.25rem] font-[700]">
                    <span>
                      {weather?.current.cloud}{" "}
                      <span className="text-[0.875rem] text-gray">%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
