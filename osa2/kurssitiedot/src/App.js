import React from 'react';
import Course from './components/Course';

const App = ({courses}) => {
  const courseList = () => courses.map((course, i) => 
    <li key={i + 1}>
      <Course name={course.name} parts={course.parts} />
    </li>
  );
  return (
    <div> 
      <h1>Web development curriculum</h1>
      <ul>
        {courseList()}
      </ul>
    </div>
  );
}

export default App;