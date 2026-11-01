const ExcelJS = require("exceljs");

class ExcelUtil {
  async writeData(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Sheet1");
    const output = await this.readData(worksheet, searchText);

    const cell = worksheet.getCell(
      output.row,
      output.column + change.colChange,
    );
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
  }

  async readData(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if (cell.value === searchText) {
          output.row = rowNumber;
          output.column = colNumber;
        }
      });
    });

    return output;
  }
}

module.exports = { ExcelUtil };
