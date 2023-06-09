import { Weather } from "app/page";
import Loading from "components/Loading";
import { Leaf } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  weather: Weather | null;
}

export default function AirQuality({ weather }: Props) {
  const [airQuality, setAirQuality] = useState("");

  useEffect(() => {
    const airQualityValue = weather?.current.air_quality["us-epa-index"];

    switch (airQualityValue) {
      case 1:
        setAirQuality("Bom");
        break;
      case 2:
        setAirQuality("Moderado");
        break;
      case 3:
        setAirQuality("Insalubre para grupo sensível");
        break;
      case 4:
        setAirQuality("Insalubre");
        break;
      case 5:
        setAirQuality("Muito insalubre");
        break;
      case 6:
        setAirQuality("Perigoso");
        break;
      default:
        setAirQuality("");
        break;
    }
  }, [weather]);

  return (
    <div className="flex h-[15.25rem] w-full flex-col items-center justify-between rounded-[0.625rem] bg-purple px-[1rem] pb-[1rem] pt-[2rem] lg:w-[18.4375rem]">
      {weather ? (
        <>
          <div className="flex items-center gap-[0.5rem] text-white-ice">
            <Leaf size={24} />
            <p className="font-[700] leading-[1.2rem]">Qualidade do ar</p>
          </div>

          <div className="font-[700]">
            <p className="text-center text-[1.125rem] leading-[1.35rem] text-[#87EBCD]">
              {airQuality}
            </p>
          </div>

          <div className="flex items-end gap-[1.5625rem] text-center lg:gap-[1rem]">
            <div>
              <p className="text-[0.875rem] font-[700] text-[#87EBCD]">
                {(weather?.current.air_quality.pm2_5 ?? 0).toFixed(1)}
              </p>
              <p className="text-[0.75rem]">PM2.5</p>
            </div>
            <div>
              <p className="text-[0.875rem] font-[700] text-[#87EBCD]">
                {" "}
                {(weather?.current.air_quality.pm10 ?? 0).toFixed(1)}
              </p>
              <p className="text-[0.75rem]">PM10</p>
            </div>
            <div>
              <p className="text-[0.875rem] font-[700] text-[#87EBCD]">
                {(weather?.current.air_quality.so2 ?? 0).toFixed(1)}
              </p>
              <p className="text-[0.75rem]">
                SO <sub>2</sub>
              </p>
            </div>
            <div>
              <p className="text-[0.875rem] font-[700] text-[#87EBCD]">
                {(weather?.current.air_quality.no2 ?? 0).toFixed(1)}
              </p>
              <p className="text-[0.75rem]">
                NO <sub>2</sub>
              </p>
            </div>
            <div>
              <p className="text-[0.875rem] font-[700] text-[#87EBCD]">
                {(weather?.current.air_quality.o3 ?? 0).toFixed(1)}
              </p>
              <p className="text-center text-[0.75rem]">
                O <sub>3</sub>
              </p>
            </div>
            <div>
              <p className="text-[0.875rem] font-[700] text-[#87EBCD]">
                {(weather?.current.air_quality.co ?? 0).toFixed(1)}
              </p>
              <p className="text-[0.75rem]">CO</p>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
