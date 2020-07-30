import React from 'react';
import './App.css';
import MarksData from './data.json';

const totalMarks = obj => {
  let total = 0;
  for(var pro in obj){
    total = total + +obj[pro];
  }
  return total;
};

const findStatus = marks => {
  let res = true;
  for(var sub in marks){
    if(marks[sub] < 20){
      res = false;
      break;
    }
  }
  return res;
}

const rowColor = (obj,maxMarks) => {
  if(findStatus(obj)){
    if(totalMarks(obj) === maxMarks){
      return 'Topper';
    }
    return 'Pass';
  }else{
    return 'Fail';
  }
}

const findMaxMarks = () => {
  let maxMarks = 0;
  let temp;
  for(let myObj=0; myObj < MarksData.length; myObj++){
    temp = totalMarks(MarksData[myObj].marks);
    maxMarks = Math.max(temp,maxMarks);
  }
  console.log(maxMarks);
  return maxMarks;
}

function App() {
  const maxMarks = findMaxMarks();
  MarksData.sort((a,b) => (a.name > b.name) ? 1 : -1);
  return (
    <div className="App">
      <table>
        <tr>
          <th colSpan="4">Students Result Board</th>
        </tr>
        <tr>
          <th>Student Name</th>
          <th>Roll Number</th>
          <th>Total Marks</th>
          <th>Status</th> 
        </tr>
        {MarksData.map((markObj, index) => {
          return (
            <tr className={rowColor(markObj.marks,maxMarks)}>
              <td id="Name">{markObj.name}</td>
              <td>{markObj.rollNumber}</td>
              <td>{totalMarks(markObj.marks)}</td>
              <td>{rowColor(markObj.marks,maxMarks)}</td>
            </tr>
          );
        })}  
      </table>
      
    </div>
  );
}

export default App;
