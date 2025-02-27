import { useSelector } from "react-redux";
import { TypeTask } from "../types";
import type { WeeklyDataType } from "./date";
import { RootState } from "@/app/admin/reducers/store";

export const calculateScale = (weekly: WeeklyDataType[]): number[] => {
  const maxDurationSec = Math.max(...weekly.map((data) => data.duration));
  const defaultScales = {
    small: [0, 7200, 14400, 21600, 28800, 36000],
    medium: [0, 10800, 21600, 32400, 43200, 54000],
    large: [0, 14400, 28800, 43200, 57600, 72000, 86400],
  };

  const scale =
    maxDurationSec <= 36000
      ? defaultScales.small
      : maxDurationSec <= 54000
      ? defaultScales.medium
      : defaultScales.large;

  return scale;
};

export const calculateTotalTime = (totalTask: TypeTask[]) => {
  return totalTask.reduce((acc, item) => {
    return acc + Number(item.estimated_time);
  }, 0);
};
