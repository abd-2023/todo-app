import Todo from "./Todo";
import uuid from "react-uuid";
import { useEffect, useState } from "react";

const todoList = [
    {
        id: uuid(),
        task: "Complete Online JavaScript Course",
        status: "completed",
    },
    {
        id: uuid(),
        task: "Jog around the park 3x",
        status: "pending",
    },
    {
        id: uuid(),
        task: "10 minutes mediation",
        status: "pending",
    },
    {
        id: uuid(),
        task: "Read for 1 hour",
        status: "pending",
    },
    {
        id: uuid(),
        task: "Pick up groceries",
        status: "pending",
    },
    {
        id: uuid(),
        task: "Complete Todo App on Frontend Mentor",
        status: "pending",
    },
];

const Todos = ({ newTask, filter }) => {
    const [todo, setTodo] = useState(todoList);
    var pendingTodos = 0;

    var renderedTodo = (
        <Todo
            todo={todo}
            key={todo.id}
            toggleTodo={toggleTodo}
            removeTask={removeTask}
        />
    );

    function renderTodos() {
        console.log("switch function working");
        switch (filter) {
            // console.log("switch working");
            case "allFilter":
                // console.log("all Filter switch working", renderedTodo);
                if (todo.length) {
                    return todo.map((todo) => (
                        <Todo
                            todo={todo}
                            key={todo.id}
                            toggleTodo={toggleTodo}
                            removeTask={removeTask}
                        />
                    ));
                }
                return (
                    <div className="todo no-task">
                        <p className="todo-text">No Task Remaining </p>
                    </div>
                );
            case "activeFilter":
                // console.log("active filter switch working");
                var activeTodos = todo.reduce((finalTodos, todo) => {
                    if (todo.status === "pending") {
                        // console.log("if pending working");
                        finalTodos.push(
                            <Todo
                                todo={todo}
                                key={todo.id}
                                toggleTodo={toggleTodo}
                                removeTask={removeTask}
                            />
                        );
                    }
                    // console.log("finalTodos", finalTodos);
                    return finalTodos;
                }, []);
                // console.log(activeTodos);
                if (activeTodos.length) {
                    // console.log("active todos", activeTodos);
                    return activeTodos;
                }
                // console.log("no active todos");
                return (
                    <div className="todo no-task">
                        <p className="todo-text">No Active Task </p>
                    </div>
                );
            case "completedFilter":
                // return todo.map((todo) => {
                //     if (todo.status === "completed") {
                //         // console.log("if completed working");
                //         return (
                //             <Todo
                //                 todo={todo}
                //                 key={todo.id}
                //                 toggleTodo={toggleTodo}
                //                 removeTask={removeTask}
                //             />
                //         );
                //     }
                // });
                // console.log("completed filter switch working");
                var completedTodos = todo.reduce((finalTodos, todo) => {
                    if (todo.status === "completed") {
                        // console.log("if completed working");
                        finalTodos.push(
                            <Todo
                                todo={todo}
                                key={todo.id}
                                toggleTodo={toggleTodo}
                                removeTask={removeTask}
                            />
                        );
                    }
                    // console.log("finalTodos", finalTodos);
                    return finalTodos;
                }, []);
                // console.log(completedTodos);
                if (completedTodos.length) {
                    // console.log("completed todos", completedTodos);
                    return completedTodos;
                }
                // console.log("no completed todos");
                return (
                    <div className="todo no-task">
                        <p className="todo-text">No Completed Task </p>
                    </div>
                );
        }
    }

    function removeTask(taskId) {
        // console.log("Task removed", taskId);
        var newTodo = todo.filter((todo) => todo.id !== taskId);
        // console.log(taskId, todo, newTodo);
        setTodo([...newTodo]);
    }
    // aaaaa
    useEffect(() => {
        if (newTask) {
            console.log("newTask", newTask);
            var latTask = {
                id: uuid(),
                task: newTask,
                status: "pending",
            };
            console.log("newTask", newTask);
            setTodo([...todo, latTask]);
        }
    }, [newTask]);

    //checking local storage on first render and updating the tasks
    useEffect(() => {
        var localTodos = localStorage.getItem("local-todo");
        console.log(
            "local-todo in localStorage",
            localStorage.getItem("local-todo")
        );
        if (localTodos) setTodo(JSON.parse(localTodos));
    }, []);

    // updating the tasks on every render with new tasks being addeds
    useEffect(() => {
        var localTodoJson = localStorage.setItem(
            "local-todo",
            JSON.stringify(todo)
        );
        console.log("localTodoJson", localTodoJson);
    }, [todo]);

    todo.forEach((item) => {
        if (item.status !== "completed") {
            pendingTodos += 1;
            // console.log("pendingTodos", pendingTodos);
        }
    });
    // console.log("pendingTodos after foreach", pendingTodos);

    function toggleTodo(id) {
        todo.forEach((item, itemIndex) => {
            if (item.id === id) {
                console.log("itemIndex", itemIndex);
                setTodo((previousState) => {
                    // console.log("previousState", previousState);
                    // statusValue = ();
                    previousState[itemIndex] = {
                        ...item,
                        status:
                            item.status === "completed"
                                ? "pending"
                                : "completed",
                    };
                    console.log("previousState Changed", previousState);
                    console.log("new State", todo);
                    return [...previousState];
                }); //[...previousState, {...item, status: "Completed"}]
            }
            console.log("toggleTodo Function running", id);
        });
    }

    function clearCompleted() {
        var pendingTasks = todo.filter((task) => task.status === "pending");
        // console.log(pendingTasks)
        setTodo([...pendingTasks]);
    }

    return (
        <div className="todos">
            {renderTodos()}
            <div className="todo-summary">
                <p>{pendingTodos} items left </p>
                <button onClick={clearCompleted}>Clear Completed</button>
            </div>
        </div>
    );
};

export default Todos;
