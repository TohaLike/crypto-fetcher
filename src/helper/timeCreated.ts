import moment from "moment";

export const timeCreated = (createdAt: string | Date | undefined) => {
  const momentTime = moment(createdAt);
  const startOfHour = momentTime.startOf("s");
  const fromNow = startOfHour.fromNow();
  return fromNow;
};
