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