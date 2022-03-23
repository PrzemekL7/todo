import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function* uiid_gen() {
  let id = 0;

  while (true) {
    yield id;
    id++
  }
}

function App() {
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([])

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleKeyUp = (event) => {
    if (event.key === 'Enter'){
      setTasks([...tasks,
              name: value
              id: uiid_gen.next().value]);
      setValue('');
    }
  }

  return (
    <div className="App">
      <h1>todo</h1>
      <input type="text" value={value}onChange={handleChange} onKeyUp={handleKeyUp}/>
      <ul>
        {tasks.map((item) => <li>{item}</li>)}
      </ul>
    </div>
  );
}

export default App;
