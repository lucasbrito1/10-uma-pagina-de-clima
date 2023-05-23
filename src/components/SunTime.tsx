import { Sun } from "lucide-react";
import Image from "next/image";
import sunChart from "../images/sun-chart.png";
import sunGradient from "../images/sun-gradient.png";
import { Weather } from "@/app/page";
import Loading from "./Loading";
import { differenceInSeconds, parse, startOfDay } from "date-fns";
import { useState, useEffect } from "react";

interface Props {
  weather: Weather | null;
}

export default function SunTime({ weather }: Props) {
  const [widthGradient, setWidthGradient] = useState("0px");
  const [rotateSun, setRotateSun] = useState("0deg");
  const [heightSun, setHeightSun] = useState("0px");

  const time = new Date();
  const formattedTime = time.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const todayStart = startOfDay(time);
    const todaySunrise = parse(
      weather?.forecast.forecastday[0].astro.sunrise ?? "",
      "hh:mm a",
      new Date()
    );
    const todaySunset = parse(
      weather?.forecast.forecastday[0].astro.sunset ?? "",
      "hh:mm a",
      new Date()
    );
    const todayNow = new Date();

    const difference1 = Math.abs(differenceInSeconds(todaySunrise, todayStart));
    const difference2 = Math.abs(differenceInSeconds(todaySunset, todayStart));
    const difference3 = Math.abs(differenceInSeconds(todayNow, todayStart));

    let newPct = 0;

    if (difference3 > difference1) {
      if (difference3 < difference2) {
        newPct =
          ((difference3 - difference1) * 100) / (difference2 - difference1);
      } else {
        newPct = 100;
      }
    }

    const newWidthGradient = (newPct * 210) / 100;
    setWidthGradient(`${newWidthGradient}px`);

    const newHeightSun = Math.sqrt(
      newWidthGradient * (newWidthGradient * -1 + 210)
    );
    setHeightSun(`${newHeightSun}px`);

    const newRotate = (180 * newPct) / 100;
    setRotateSun(`${newRotate}deg`);
  }, [weather?.forecast.forecastday, widthGradient, time]);

  return (
    <div className="flex h-[15.25rem] w-[17.3125rem] flex-col justify-between rounded-[0.625rem] bg-purple px-[1rem] pb-[1rem] pt-[2rem]">
      {weather ? (
        <>
          <div className="flex flex-col items-center">
            <div className="flex gap-[0.5rem] text-white-ice">
              <Sun />
              <p className="font-[700]">Horário do sol</p>
            </div>
          </div>
          <div className="relative mt-[1.875rem] flex justify-center">
            <p className="absolute top-[50%] font-[700] leading-[1.05rem]">
              {formattedTime}
            </p>
            <div>
              <Image
                src={sunChart}
                alt=""
                className="relative z-[101] h-auto w-full max-w-[231px]"
              />
              <Image
                src={sunGradient}
                alt=""
                className="absolute left-[9px] top-[8px] z-[100] h-full"
                style={{ width: widthGradient }}
              />
            </div>

            <div
              className="absolute left-[3px] top-[116px] h-auto w-full max-w-[231px]"
              style={{ transform: rotateSun }}
            >
              <div
                className="absolute z-[102] h-[0.75rem] w-[0.75rem] rounded-full bg-[#f6c833]"
                style={{
                  left: widthGradient,
                  bottom: heightSun,
                }}
              />
            </div>
          </div>
          <div className="flex justify-between text-[0.75rem] leading-[0.9rem]">
            <p>{weather.forecast.forecastday[0].astro.sunrise}</p>
            <p>{weather.forecast.forecastday[0].astro.sunset}</p>
          </div>{" "}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}