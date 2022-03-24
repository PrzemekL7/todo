import React from "react";
import TaskItem from "./Taskitem";

function TaskList({tasks, handleChangeStatus, handleDeleteTask}) {
    return (
        <ul>
            {tasks.map(({id, name, status}) => (
                <TaskItem
                    key={id}
                    id={id}
                    status={status}
                    name={name}
                    handleDeleteTask={handleDeleteTask}
                    handleChangeStatus={handleChangeStatus}
                />))}
        </ul>
    );
}

export default TaskList