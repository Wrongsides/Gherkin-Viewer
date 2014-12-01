var body = document.body.textContent.split('\n');
var newBody = '';
var newLine = '';
var splitter = '';
var lines = body.length;
var tableStarted = false;
var table = '';
var tableRegEx = /^\s*\|.*\|\s*$/im;

for (i = 0; i < lines; i++) {

    if (body[i].match(/^\s*#.*/i)) {

        //Format the Comment Line
        newLine = body[i];
        newLine = '<span class="comment">' + htmlEscape(newLine) + '</div></span><br />';
        newBody = newBody.concat(newLine);
    } else if(body[i].indexOf('Feature:') > -1){
        //Format the Feature Line
        formatLine(body[i], 'Feature:', 'feature', true);
    } else if (body[i].indexOf('Scenario:') > -1) {
        //Format the Scenario Line
        formatLine(body[i], 'Scenario:', 'scenario', false);
    } else if (body[i].indexOf('Scenario Outline:') > -1) {
        //Format the Scenario Line
        formatLine(body[i], 'Scenario Outline:', 'scenario', false);
    } else if (body[i].indexOf('Scenarios:') > -1) {
        //Format the Scenarios Line
        formatLine(body[i], 'Scenarios:', 'scenario', false);
    } else if (body[i].indexOf('Given ') > -1) {
        //Format the Given Line
        formatLine(body[i], 'Given ', 'example', false);
    } else if(body[i].indexOf('When ') > -1){
        //Format the When Line
        formatLine(body[i], 'When ', 'example', false);
    } else if(body[i].indexOf('Then ') > -1){
        //Format the Then Line
        formatLine(body[i], 'Then ', 'example', false);
    } else if(body[i].indexOf('And ') > -1){
        //Format the Then Line
        formatLine(body[i], 'And ', 'example', false);
    } else if (body[i].match(/^@.*/i)) {
        newBody = newBody.concat(body[i].replace(/^@.*/i, '<span class="tags">' + body[i] + ' </span><br />'));
    } else if (body[i].match(tableRegEx)) {
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
    	    table = table + '<td>|</td>' + openTd + htmlEscape(splittedLine[j].trim()) + '</td>';
    	};

        table = table.substring(0, table.lastIndexOf('</td>')) + '</td><td>|</td></tr>';
    } else {
        newBody = newBody.concat(body[i] + '<br/>');
    }

    if (tableStarted && body.length <= i + 1){
        finishTable();
    }else if (tableStarted && !body[i + 1].match(tableRegEx)) {
        finishTable();
    }
}

function formatLine(line, strWord, strClass, useH1) {
    var textStart = line.indexOf(strWord) + strWord.length;
    var text = line.substring(textStart);

    if (useH1)
        newLine = '<h1><span class="' + strClass + '">' + strWord + '</span>' + formatReplaceTag(htmlEscape(text)) + '</h1><br/>';
    else
        newLine = '<span class="' + strClass + '">' + strWord + '</span>' + formatReplaceTag(htmlEscape(text)) + '<br/>';

    newBody = newBody.concat(newLine);
}

function formatReplaceTag(line) {
    if (line.match(/&lt.*&gt/i)) {
        line = line.replace('&lt;', '<span class="replaceTags">&lt;');
        line = line.replace('&gt;', '&gt;</span>');
    }
    return line;
}

function finishTable() {
    table = '<table class="table">' + table + '</table>';
    tableStarted = false;
    newBody = newBody.concat(table);
    table = '';
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
