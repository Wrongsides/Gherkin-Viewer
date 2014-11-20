var body = document.body.textContent.split('\n');
var newBody = '';
var newLine = '';
var splitter = '';
var lines = body.length;
var tableStarted = false;
var table = '';

for (i = 0; i < lines; i++) {

	if (tableStarted && body[i].indexOf('|') == -1) {
		table = '<table class="table">' + table + '</table>';
		tableStarted = false;
		newBody = newBody.concat(table);
		table = '';
	};

    if(body[i].indexOf('Feature:') > -1){

        //Format the Feature Line
        newLine = body[i];

        newLine = newLine.replace('Feature:', '<h1><span class="feature">Feature:</span>').concat('</h1><br />');

        newBody = newBody.concat(newLine);

    } else if (body[i].indexOf('Scenario:') > -1) {

        //Format the Scenario Line
        newLine = body[i];

        newLine = newLine.replace('Scenario:', '<span class="scenario">Scenario:</span>').concat('</span><br />');

        newBody = newBody.concat(newLine);

    } else if (body[i].indexOf('Scenario Outline:') > -1) {

    	//Format the Scenario Line
    	newLine = body[i];

    	newLine = newLine.replace('Scenario Outline:', '<span class="scenario">Scenario Outline:</span>').concat('</span><br />');

    	newBody = newBody.concat(newLine);

    } else if (body[i].indexOf('Scenarios:') > -1) {

    	//Format the Scenario Line
    	newLine = body[i];

    	newLine = newLine.replace('Scenarios:', '<span class="scenario">Scenarios:</span>').concat('</span><br />');

    	newBody = newBody.concat(newLine);

    } else if (body[i].indexOf('Given ') > -1) {

        //Format the Given Line
        newLine = body[i];

        newLine = newLine.replace('Given ','<span class="example">Given </span>').concat('</span><br />');

        newBody = newBody.concat(newLine);

    } else if(body[i].indexOf('When ') > -1){

        //Format the When Line
        newLine = body[i];

        newLine = newLine.replace('When ','<span class="example">When </span>').concat('</span><br />');

        newBody = newBody.concat(newLine);

    } else if(body[i].indexOf('Then ') > -1){

        //Format the Then Line
        newLine = body[i];

        newLine = newLine.replace('Then ','<span class="example">Then </span>').concat('</span><br />');

        newBody = newBody.concat(newLine);

    } else if(body[i].indexOf('And ') > -1){

        //Format the Then Line
        newLine = body[i];

        newLine = newLine.replace('And ','<span class="example">And </span>').concat('</span><br />');

        newBody = newBody.concat(newLine);
    } else if (body[i].indexOf('#') > -1 && (body[i].indexOf('|') == -1 || body[i].indexOf('#') < body[i].indexOf('|'))) {

    	//Format the Comment Line
    	newLine = body[i];
    	newLine = '<span class="comment">' + htmlEscape(newLine) + '</div></span><br />';
    	newBody = newBody.concat(newLine);

    } else if (body[i].indexOf('@') > -1) {

    	//Format the Comment Line
    	newLine = body[i];
    	newLine = '<span class="tags">' + newLine + ' </span><br />';
    	newBody = newBody.concat(newLine);

    } else if (body[i].indexOf('|') > -1 && body[i].lastIndexOf('|') > -1) {

    	//Format the Table Line
	    var textStart = body[i].indexOf('|');
	    var textEnd = body[i].lastIndexOf('|');
	    var splittedLine = body[i].substring(textStart + 1, textEnd).trim().split('|');
	    var openTd = '<td class="tableText">'
	    if (!tableStarted)
	    	openTd = '<td class="tableHeader">'
	    table = table + '<tr>';
	    tableStarted = true;

    	for (j = 0; j < splittedLine.length; j++)
		{
    		table = table + '<td>|</td>' + openTd + splittedLine[j].trim() + '</td>';
    	};

    	table = table.substring(0, table.lastIndexOf('</td>')) + '</td><td>|</td></tr>';
    } else {
    	newBody = newBody.concat(body[i] + '<br/>');
    }
}

function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

document.body.innerHTML = newBody;
