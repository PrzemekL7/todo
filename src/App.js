import './App.css';
import {useState} from "react";

function* uuidGen() {
  let id = 0;

  while (true){
    yield id;
    id++;
  }
}

const uuid = uuidGen();

function App() {
  const [value, setValue] = useState('');
  const [tasks, setTask] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleKeyUp = (event) => {
    if (value !== ''){
      if (event.key === 'Enter'){
        setTask([...tasks, {
          name: value,
          id: uuid.next().value,
          status: false
        }])
        // setTask([value, ...tasks]) //jesli chcemy na poczatku
        setValue('')
      }
    }
  }

  function handleChangeStatus(id) {
    const newTasks = tasks.map(task => {
      if (task.id === id){
        task.status = !task.status
      }
      return task
    })

    setTask(newTasks);
  }

  function handleDeleteTask(id) {
    setTask(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="App">
      <h1>todos</h1>
      <input type="text"
       value={value}
       onChange={handleChange}
       onKeyUp={handleKeyUp}
       />
      <ul>
        {tasks.map(({id, name, status}) => (
          <li key={id} className='todo-item'>
            <span
              className={status ? 'status done' : 'status active'}
              onClick={() => handleChangeStatus(id)}
            />
            {name}
            <button onClick={() => handleDeleteTask(id)}>x</button>
          </li>)
        )}
      </ul>
    </div>
  );
}

export default App;