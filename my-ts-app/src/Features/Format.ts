import dayjs from "dayjs";

const convertDateFormatToDayJS = (date: string) => {
    if (date) {
        const splitDate = date.split("/");
        return dayjs(`${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`);
    }
    return null;
};

const convertDateFormatToString = (date: Date) => {
    if (date) {
        const currentDate = new Date(date);
        const day = `0${currentDate.getDate()}`;
        const month = `0${currentDate.getMonth() + 1}`;
        const year = `${currentDate.getFullYear()}`;
        return `${day.slice(-2)}/${month.slice(-2)}/${year}`;
    }
    return "תאריך לא זמין";
};

export { convertDateFormatToDayJS, convertDateFormatToString };