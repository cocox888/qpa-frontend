import store from "@/app/admin/reducers/store";
import { calculateTotalTime } from "./calculate";
import { useTotalTime } from "@/hooks/useTotalTime";

export function getRecentTasksAndReturnTotalTime() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const state = store.getState();
      const tasks = state?.tasks?.tasks;
      const totalTime: number = calculateTotalTime(tasks) || 0;
      resolve(totalTime);
    }, 200);
  });
}
