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
import {firestore} from "./firebase";
import {db} from "./firebase";
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch} from "firebase/firestore"

function App() {
    const [value, setValue] = useState('');
    const [tasks, setTask] = useState([]);
    const [selection, setSelection] = useState('all');

    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "todos"));
        setTask(querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })))
    }

    useEffect(() => {
        getData().catch(() => {
        });
    }, []);

    useEffect(() => {
        setTask(loadFromLocalStorage('tds'))
    }, []);

    useEffect(() => {
        saveToLocalStorage('tds', tasks)
    }, [tasks])

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleKeyUp = async (event) => {
        if (event.key === 'Enter') {

            const newTodo = {
                name: value,
                status: false
            }

            const docRef = await addDoc(collection(db, "todos"), newTodo);

            setTask([Object.assign(newTodo, {id: docRef.id}), ...tasks]);
            setValue('');
        }
    }

    async function handleChangeStatus(id) {
        const newTasks = tasks.filter(task => task.id === id)[0];
        newTasks.status = !newTasks.status;

        await updateDoc(doc(db, 'todos', id), {status: newTasks.status});


        setTask([...tasks]);
    }

    async function handleDeleteTask(id) {
        await deleteDoc(doc(db, 'todos', id));
        setTask(tasks.filter(task => task.id !== id))
    }

    async function handleDeleteDone() {
        const batch = writeBatch(db);
        tasks.forEach(task => {
            if (task.status) {
                const ref = doc(db, 'todos', task.id);
                batch.delete(ref);
            }
        })

        await batch.commit();

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