// Function for initialize web.

function doGet() {
	const html = HtmlService.createTemplateFromFile('web');
	html.evaluate();
	return html;
}

// Function for vinculate files to web.

function includes(fileName) {
	return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}

// Globals constants.

const SS_DATABASE = SpreadsheetApp.openById('');
const SS_REGISTER = SpreadsheetApp.openById('');

// Function DNI search.

function searchDNI(list, dni) {
	let rowDni = list.indexOf(dni);  
	return rowDni;
}

// Function search according input

function searchForInput(sheet, dni) {
	let rowData = '';
	let data = sheet.getDataRange().getValues();
	let firstChar = dni.toUpperCase().slice(0, 1);

	if (firstChar == 'M' || firstChar == 'F') {
		let list = data.map(row => row[0]);
		rowData = searchDNI(list, dni);
	} else {
		let list = datos.map(row => row[1]);
		rowData = searchDNI(list, dni);
	}

	return rowData;
}

// Function search data according dni and sheet

function searchData(dni, sheet) {
	let dataSheet = SS_DATABASE.getSheetByName(sheet);
	let data = dataSheet.getDataRange().getValues();
	let dataResult = [];
	let row = searchForInput(dataSheet, dni);

	if(row >= 0) {
		let name = data[row][2];
		let surname = data[row][3];
		let type = data[row][4];
		let register = data[row][5];
		let description = data[row][6];
		dataResult = [name, surname, type, register, description];
	}
	
	return dataResult;
}

// Functions register New Person

function insertNewPerson(dataToInsert) {
  let relation = dataToInsert[0];
  let genDni = dataToInsert[1];
  let scanDni = dataToInsert[2];
  let name = dataToInsert[3];
  let surname = dataToInsert[4];
  let type = dataToInsert[5];
  let register = dataToInsert[6];
  let description = dataToInsert[7];
  let observation = "ingreso";

  insertIntoBD(relation, [genDni, scanDni, name, surname, type, register, description]);
  registerInOut(relation, [genDni, name, surname, type, register, description, observation]);
}

function insertIntoBD(sheet, dataToInsert) {
  let sheetBase = SS_DATABASE.getSheetByName(sheet);
  sheetBase.appendRow(dataToInsert);
}

// Function register IN/OUT

function registerInOut(sheet, dataToInsert) {
  let sheetRegister = SS_REGISTER.getSheetByName(sheet);

  let clock = new Date();
  let registerDate = clock.getDate() + "/" + (clock.getMonth()+1) + "/" + clock.getFullYear() + " " + clock.getHours() + ":" + clock.getMinutes() + ":" + clock.getSeconds();

  let dni = dataToInsert[0];
  let name = dataToInsert[1];
  let surname = dataToInsert[2];
  let type = dataToInsert[3];
  let register = dataToInsert[4];
  let description = dataToInsert[5];
  let observation = dataToInsert[6];

  sheetRegister.appendRow([registerDate, dni, name, surname, type, register, description, observation]);
}