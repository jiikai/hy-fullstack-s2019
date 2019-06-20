import React from 'react';

const Header = ({course}) => (<h2>{course}</h2>);

const Part = ({name, exercises}) => (
  <li>{name} {exercises}</li>
);

const Content = ({parts}) => {
  const partList = () => parts.map(part => 
    <Part key={part.id} name={part.name} 
          exercises={part.exercises} />
  );
  return (
    <ul>
      {partList()}
    </ul>
  );
}

const Total = ({parts}) => (
  <p>Total of {parts.reduce((p,c) => 
      p + c.exercises, 0)} exercises</p>
);

const Course = ({name, parts}) => (
  <div>
    <Header course={name} />
    <Content parts={parts} />
    <Total parts={parts}/>
  </div>
);

export default Course;