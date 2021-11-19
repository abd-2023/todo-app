const NewTask = ({handleSubmit}) => {
    var form = (
            <form className="create-todo" onSubmit={handleSubmit}>
                <input
                    id="task-data"
                    type="text"
                    placeholder="Create a new todo..."
                    className="create-todo-inp"
                    onSubmit={handleSubmit}
                    autoFocus
                />
            </form>
    );
    
    return form;
};
export default NewTask;
