import './App.css';
import {useEffect, useState} from "react";
import {loadFromLocalStorage, saveToLocalStorage} from "./utils/localstorage";
import uuidGen from "./utils/uuid";
import Headline from "./components/Headline";
import TaskInput from "./components/Taskinput";
import TaskList from "./components/TaskList";

function App() {
  const [value, setValue] = useState('');
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    setTask(loadFromLocalStorage('tds'))
  }, []);

  useEffect(() => {
    saveToLocalStorage('tds', tasks)
  }, [tasks])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleKeyUp = (event) => {
    if (value !== ''){
      if (event.key === 'Enter'){
        const newTask = [...tasks, {
          name: value,
          id: uuidGen(),
          status: false
        }]
        setTask(newTask);
        setValue('')
        saveToLocalStorage('tds', newTask);
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
      <Headline />
      <TaskInput
          value={value}
          handleChange={handleChange}
          handleKeyUp={handleKeyUp}
      />
      <TaskList
          tasks={tasks}
          handleChangeStatus={handleChangeStatus}
          handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;