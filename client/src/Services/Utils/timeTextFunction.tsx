import { IUser } from "../../Data/interfaces/IUser";

const morning = {
  he: "בוקר טוב",
  en: "Good Morning",
};
const noon = {
  he: "צהריים טובים",
  en: "Good Afternoon",
};
const evening = {
  he: "ערב טוב",
  en: "Good Evening",
};

const getTextByCurrentTime = (user: IUser) => {
  const fullName: string = `${user.firstName ?? ""} ${user.lastName ?? ""}`;
  const currentDate: Date = new Date();
  const currentHour: number = currentDate.getHours();

  if (currentHour < 12) {
    return `${morning[user.language]}, ${fullName}`;
  } else if (currentHour < 18) {
    return `${noon[user.language]}, ${fullName}`;
  } else {
    return `${evening[user.language]}, ${fullName}`;
  }
};

export { getTextByCurrentTime };
