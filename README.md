# excel-to-json-in-Node.js

## How to convert staggered excel sheet?

Most of the Excel to JSON modules convert the excel data that is in simple column and row format with first
row or column has the object keys(headers) then it is easier to generate accurate json (key : value)

If the excel format is staggered then the json returned will not be correct. So I found this [repo](https://github.com/DiegoZoracKy/convert-excel-to-json) suing the mapping algorithm to translate excel sheet to json.


## Quick Setup

1) `https://github.com/sureshnswamy/excel-to-json-mapping.git` <br>
2) `cd excel-to-json-mapping` <br>
3) `npm install` <br>
4) `node app.js` <br>
5) In your browser `http://localhost:3000` <br>
6) Upload excel file and see result <br>
7) The originl excel file is saved in *uploads*<br>
8) Check the converted json in *output.json* <br>
