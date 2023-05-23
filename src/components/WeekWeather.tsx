import { ForecastDayWeather } from "@/app/page";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import ptBR from "date-fns/locale/pt-BR";
import Loading from "./Loading";

interface Props {
  forecastday: ForecastDayWeather[] | undefined;
}

export default function WeekWeather({ forecastday }: Props) {
  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="h-[13.25rem] w-[37.25rem] rounded-[0.625rem] bg-purple">
      {forecastday ? (
        <div className="flex h-full items-center justify-between p-[2.5rem]">
          {forecastday
            ? forecastday.map((forecast, key) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-[1rem]"
                >
                  <p className="text-[0.875rem] font-[700] text-gray">
                    {capitalize(
                      format(utcToZonedTime(forecast.date, "UTC"), "EEEE", {
                        locale: ptBR,
                      })
                    )}
                  </p>
                  <img src={forecast.day.condition.icon} alt="" />
                  <div className="flex gap-[0.3125rem] font-[700]">
                    <p>{Math.floor(forecast.day.maxtemp_c)}°</p>
                    <p className="text-gray">
                      {Math.floor(forecast.day.mintemp_c)}°
                    </p>
                  </div>
                </div>
              ))
            : null}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
