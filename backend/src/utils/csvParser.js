import fs from "fs";
import { parse } from "csv-parse";
import ExcelJS from "exceljs";

export const parseCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, trim: true }))
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
};

export const parseExcel = async (filePath) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const sheet = workbook.worksheets[0];

  const rows = [];
  const headers = sheet.getRow(1).values.slice(1);

  sheet.eachRow((row, rowNum) => {
    if (rowNum === 1) return;

    const obj = {};
    row.values.slice(1).forEach((value, i) => {
      obj[headers[i]] = value;
    });

    rows.push(obj);
  });

  return rows;
};

export const parseJSON = async (filePath) => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};
