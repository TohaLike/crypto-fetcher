import moment from "moment";

export const timeUpdated = (createdAt: string | Date | any) => {
  const momentTime = moment(new Date(createdAt).getTime()).format("hh:ss");
  // const startOfHour = momentTime.startOf("s");
  // const fromNow = startOfHour.fromNow();
  return momentTime;
};
// 