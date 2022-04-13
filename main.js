#!/usr/bin/env node
let fs = require('fs');

commands = process.argv.slice(2); // commands array

//---------------------------------------------------------------------------//
// Check which commands are passed
let removeLineBreaks = false;
let numbering = false;
let numbering2 = false;

//linebreak
for(let i=0; i<commands.length; i++){
    if(commands[i] == '-s'){
        removeLineBreaks = true;
    }
}
//numbering
for(let i=0; i<commands.length; i++){
    if(commands[i] == '-n'){
        numbering = true;
    }
}
//numbering2
for(let i=0; i<commands.length; i++){
    if(commands[i] == '-b'){
        numbering2 = true;
    }
}
//--------------------------------------------------------------------------//




// ---------------------Removing commands from Final array----------------- //
//remove line break command from array
let i = commands.indexOf('-s');
if(i>-1){
    commands.splice(i, 1);
}
//remove numbering command from array
i = commands.indexOf('-n');
if(i>-1){
    commands.splice(i, 1);
}
//remove numbering2 command from array
i = commands.indexOf('-b');
if(i>-1){
    commands.splice(i, 1);
}
//----------------------------------------------------------------------------------//




//---------------------------------Reading files------------------------------------//
function readHelper(filePath, removeLineBreaks=false, numbering=false, numbering2=false){
    if(fs.existsSync(filePath)){
        //numbering and numbering2 cannot be true at same time
        if(numbering && numbering2){
            return "You can't pass \'-n\' and \'-b\' at same time....Think about it!!!!";
        }
        let fileContent = fs.readFileSync(filePath, 'utf-8');
        if(numbering2 && removeLineBreaks){
            fileContent = fileContent.replace(/(\r\n|\n|\r){3,}/gm,"\n\r\n");
            fileContent = fileContent.split('\r\n');
            let i = 0;
            for(let j=0; j<fileContent.length; j++){
                if(fileContent[j].length>0){
                    fileContent[j] = `${i+1} ${fileContent[j]}`;
                    i++;
                }
            }
            return fileContent.join('\n');
        }
        if(numbering && removeLineBreaks){
            fileContent = fileContent.replace(/(\r\n|\n|\r){3,}/gm,"\n\n");
            return fileContent.split('\n').map((line, index) => `${index + 1} ${line}`).join('\n');
        }
        if(numbering){
            return fileContent.split('\n').map((line, index) => `${index + 1} ${line}`).join('\n');
        }
        if(numbering2){
            fileContent = fileContent.split('\r\n');
            let i = 0;
            for(let j=0; j<fileContent.length; j++){
                if(fileContent[j].length>0){
                    fileContent[j] = `${i+1} ${fileContent[j]}`;
                    i++;
                }
            }
            return fileContent.join('\n');
        }
        if(removeLineBreaks){
            return fileContent.replace(/(\r\n|\n|\r){3,}/gm,"\n\n");
        }
        return fileContent;
    }else{
        return "Please check the file path!!!";
    }
}

function read(){
    for(let i=0; i<commands.length; i++){
        console.log(readHelper(commands[i], removeLineBreaks = removeLineBreaks, numbering = numbering, numbering2 = numbering2));
    }
}
if(commands.indexOf(">") == -1 && commands.indexOf(">>") == -1){
    read();
}
//----------------------------------------------------------------------------------//