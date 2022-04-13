import './App.scss';
import {useEffect, useState} from "react";
import Headline from "./components/Headline";
import TaskInput from "./components/Taskinput";
import TaskList from "./components/TaskList";
import ItemsLeft from "./components/ItemsLeft";
import SelectionButtons from "./components/SelectionButtons";

import {db} from "./firebase";
import {collection, doc, writeBatch, onSnapshot} from "firebase/firestore"

function App() {
    const [tasks, setTask] = useState([]);
    const [selection, setSelection] = useState('all');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
            setTask(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        });

        return () => {
            unsubscribe();
        }
    }, []);

    async function handleDeleteDone() {
        const batch = writeBatch(db);
        tasks.forEach(task => {
            if (task.status) {
                const ref = doc(db, 'todos', task.id);
                batch.delete(ref);
            }
        })

        await batch.commit();
    }

    return (
        <div className="App">
            <Headline/>
            <div className="container">
                <TaskInput/>
                {tasks.length === 0 ? ('') : (
                    <>
                        <TaskList
                            tasks={tasks}
                            selection={selection}
                        />
                        <div className="utils">
                            {/*TODO move to separate component */}
                            <ItemsLeft
                                tasks={tasks}
                            />

                            {/*TODO move to separate component */}
                            <SelectionButtons
                                setSelection={setSelection}
                                selection={selection}
                            />

                            {/*TODO move to separate component */}
                            <div>
                                {tasks.filter((e) => e.status).length > 0 ? (
                                    <button onClick={handleDeleteDone}>Clear Completed</button>) : ('')}
                            </div>
                        </div>
                    </>)
                }
            </div>
        </div>
    );
}

export default App;