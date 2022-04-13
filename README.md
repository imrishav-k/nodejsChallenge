# nodejsChallenge

This program can be used to display one or more files in terminal

## commands:

node main \<filepath\>
  -displays file content in terminal
 
node main <filepath1> <filepath2> <filepath3> .... <filepath(n)>
  -displays content of all files in terminal
  
node main -s <filepath>
  -converts big linebreaks into single line break
  
node main -n <filepath>
  -displays content of file in terminal with numbering (to all lines even if its empty)
  
node main -b <filepath>
  -displays content of file in terminal with numbering (only to non-empty lines)
  
'-s', '-n', '-b' can be used on multiple files as well and order doesn't matter
For ex. 'node main <filepath1> <filepath2> -s' will also work
