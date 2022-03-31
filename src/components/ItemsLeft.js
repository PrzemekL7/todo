function ItemsLeft({tasks}) {
    return (
        <p>
            {tasks
                .filter((e) => !e.status).length} items left
        </p>
    );
}

export default ItemsLeft;