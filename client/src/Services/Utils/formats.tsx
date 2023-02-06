import { ChangeEvent } from "react";

function getDateFormat(date: Date) {
  if (date) {
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  }
  return "תאריך לא זמין כעת";
}

function numberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getMultipleFileAsFilesArray(e: ChangeEvent<HTMLInputElement>) {
  let files: File[] = [];
  if (e.target.files) {
    for (let i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files[i]);
    }
  }
  return files;
}

export { getDateFormat, numberWithCommas, getMultipleFileAsFilesArray };
