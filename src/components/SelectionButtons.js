import app from "../App";

function SelectionButtons({setSelection, selection}) {
    return (
        <div>
            <button onClick={() => setSelection('all')} className={selection === 'all' ? 'active' : ''}>All</button>
            <button onClick={() => setSelection(false)} className={selection === false ? 'active' : ''}>Active</button>
            <button onClick={() => setSelection(true)} className={selection === true ? 'active' : ''}>Completed</button>
        </div>
    );
}

export default SelectionButtons;