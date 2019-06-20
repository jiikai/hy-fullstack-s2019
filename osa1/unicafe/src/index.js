import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => (
        <tr>
            <td>{text}</td> 
            <td>{value}</td>
        </tr>
    
);

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad;
    return !total ? (
        <div>
            <h1>statistics</h1><p>no feedback given</p></div>
        ) : (
        <div>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <Statistic text="good" value={good}/>
                    <Statistic text="neutral" value={neutral}/>
                    <Statistic text="bad" value={bad}/>
                    <Statistic text="all" value={total}/>
                    <Statistic text="average" value={ (good + bad * -1) / total}/>
                    <Statistic text="positive" value={good / total}/>
                </tbody>
            </table>
        </div>
    );
} 

const Button = props => (
    <button onClick={props.handleClick}>{props.name}</button>
);

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const setToValue = (setter, val) => () => {
      setter(val);
  }
  return (
    <div>
        <h1>give feedback</h1>
        <Button name="good" handleClick={setToValue(setGood, good + 1)}/>
        <Button name="neutral" handleClick={setToValue(setNeutral, neutral + 1)}/>
        <Button name="bad" handleClick={setToValue(setBad, bad + 1)}/>
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)