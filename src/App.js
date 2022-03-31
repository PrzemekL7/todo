import './App.css';
import {useEffect, useState} from "react";
import {loadFromLocalStorage, saveToLocalStorage} from "./utils/localstorage";
import uuidGen from "./utils/uuid";
import Headline from "./components/Headline";
import TaskInput from "./components/Taskinput";
import TaskList from "./components/TaskList";
import ItemsLeft from "./components/ItemsLeft";
import SelectionButtons from "./components/SelectionButtons";
import ClearCompletedButton from "./components/ClearCompletedButton";

function App() {
    const [value, setValue] = useState('');
    const [tasks, setTask] = useState([]);
    const [selection, setSelection] = useState('all');

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
        if (value !== '') {
            if (event.key === 'Enter') {
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
            if (task.id === id) {
                task.status = !task.status
            }
            return task
        })

        setTask(newTasks);
    }

    function handleDeleteTask(id) {
        setTask(tasks.filter(task => task.id !== id))
    }

    function handleDeleteDone () {
        setTask(tasks.filter(task => !task.status))
    }

    return (
        <div className="App">
            <Headline/>
            <TaskInput
                value={value}
                handleChange={handleChange}
                handleKeyUp={handleKeyUp}
            />
            {tasks.length === 0 ? ('') : ((
                <>
                    <TaskList
                        tasks={tasks}
                        handleChangeStatus={handleChangeStatus}
                        handleDeleteTask={handleDeleteTask}
                        selection={selection}
                    />
                    {/*TODO move to separate component */}
                    <ItemsLeft
                        tasks={tasks}
                    />

                    {/*TODO move to separate component */}
                    <SelectionButtons
                        setSelection={setSelection}
                    />

                    {/*TODO move to separate component */}
                    {tasks.filter((e) => e.status).length > 0 ? (
                        <button onClick={handleDeleteDone}>Clear Completed</button>) : ('')}
                </>))
            }
        </div>
    );
}

export default App;