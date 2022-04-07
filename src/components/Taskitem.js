import React from "react";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";

function TaskItem({id, status, name}) {
    async function handleDeleteTask(id) {
        await deleteDoc(doc(db, 'todos', id));
    }

    async function handleChangeStatus(id) {
        await updateDoc(doc(db, 'todos', id), {status: !status});
    }

    return (
        <li className='todo-item'>
            <span
                className={status ? 'status done' : 'status active'}
                onClick={handleChangeStatus}
            />
            {name}
            <button onClick={handleDeleteTask}>x</button>
        </li>
    );

}

export default TaskItem;