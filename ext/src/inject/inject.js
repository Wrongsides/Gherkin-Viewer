var body = document.body.innerHTML.split(/[\n|>|</]+/);
var newBody = '';
var newLine = '';
var splitter = '';
var lines = body.length;

for (i = 0; i < lines; i++) {

    if(body[i].indexOf('Feature:') > -1){

        //Format the Feature Line
        newLine = body[i];

        newLine = newLine.replace('Feature:','<h1><span class="feature">Feature:</span>').concat('</h1></span>');

        newBody = newBody.concat(newLine);

    } else if(body[i].indexOf('Scenario:') > -1){

        //Format the Scenario Line
        newLine = body[i];

        newLine = newLine.replace('Scenario:','<h3><span class="scenario">Scenario:</span>').concat('</h3></span>');

        newBody = newBody.concat(newLine);

    } else if(body[i].indexOf('Given ') > -1){

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
    }
}

document.body.innerHTML = newBody;
