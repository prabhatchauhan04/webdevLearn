let studentData = (function solve(name, marksData){
    let studentName = name;
    let marks;
    function updateMarks(m){
        marks = m;
    }

    updateMarks(marksData);

    return{
        getMarks(){
            return marks
        },
        getName(){
            return studentName;
        }
    }
})('Kartik', 80);

// console.log(studentData)
console.log(studentData.getMarks())
console.log(studentData.getName())

/*
IIFE :-- 
(function solve(name, marksData){ ... })('Kartik', 80);
The function solve runs immediately with 'Kartik' as name and 80 as marksData.

Private variables
studentName and marks are not accessible outside this function directly.
Only accessible through the returned methods (getMarks and getName).
updateMarks function
Updates the internal marks variable.
Called once immediately: updateMarks(marksData);
Returned object

{ getMarks(){ ... }, getName(){ ... } }
Provides controlled access to private variables.
*/

