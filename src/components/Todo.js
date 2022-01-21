import { useRef } from "react";
import cross from "../images/icon-cross.svg";

const Todo = ({ todo: { status, task, id }, toggleTodo, removeTask }) => {
    var singleTodo;
    const todoEle = useRef(null);
    // console.log("----task in todo---", task, typeof task);

    function drop(e) {
        console.log("element dropped", e);
        var eleId = e.dataTransfer.getData("text/plain");
        console.log(eleId, "drop target", e.target);
        todoEle.current.insertAdjacentElement(
            "afterend",
            document.getElementById(eleId)
        );
    }

    function drag(e) {
        console.log("element dragged", e);
        e.dataTransfer.setData("text/plain", e.target.id);
        e.dataTransfer.setData("text/html", e.target.outerHTML);
        console.log(e.dataTransfer.getData("text/html"));
    }
    singleTodo = (
        <div
            className={status === "completed" ? "todo todo-completed" : "todo"}
            draggable="true"
            id={id}
            onDragStart={drag}
            onDragOver={(e) => e.preventDefault()}
            onDrop={drop}
            ref={todoEle}
        >
            <p className="todo-text" onClick={() => toggleTodo(id)}>
                {task}
            </p>
            <img
                src={cross}
                alt="delete todo"
                className="todo-cross"
                onClick={() => {
                    removeTask(id);
                }}
            />
        </div>
    );
    return singleTodo;
};

export default Todo;
