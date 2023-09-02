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

// Globals constants

const SS_DATABASE = SpreadsheetApp.openById('1VQj_Q94xvpWtFb847UUzPl6d_AdU_XNU6Fifroo1b6o');
const SS_REGISTER = SpreadsheetApp.openById('1grE9uiWBYmTrCQnfOPAWplegW2PjcA3xcL4_xfTqnVs');

