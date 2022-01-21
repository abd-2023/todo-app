import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Todos from "./components/Todos";
import NewTask from "./components/NewTask";
import Filter from "./components/Filter";
import { useState, useEffect} from "react";

function App() {
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("allFilter");
    const [theme, setTheme] = useState("light");
    // const forceUpdate = useForceUpdate();
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    // const filterValue = document.getElementById("#allFilter").value;

    // console.log("filterValue", filterValue);

    var toggleRadio = (e) => {
        console.log(
            "radio button toggled",
            "\n",
            e,
            e.target.id,
            e.target.checked
        );
        setFilter(e.target.id);
        console.log("filter", filter);
        // return
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log("preventDefault worked");

        var taskData = document.getElementById("task-data").value;
        setNewTask(taskData);
        console.log("taskData", taskData, newTask);

        document.getElementById("task-data").value = "";
    }

    function toggleTheme() {
        var tt = document.getElementById("theme-toggle");
        console.log("toggleTheme ", tt, tt.checked);
        if (systemTheme.matches) {
            tt.checked ? setTheme("light") : setTheme("dark");
            // window.localStorage.setItem("theme", theme);
        } else {
            tt.checked ? setTheme("dark") : setTheme("light");
            // window.localStorage.setItem("theme", theme);
        }
        console.log("value of theme in toggle", theme);
        // window.localStorage.setItem("theme", theme);
        // return tt;
        // return false;
    }

    useEffect(() => {
        console.log(
            document.getElementById("theme-toggle").checked,
            "systemTheme ",
            systemTheme
        );
        console.log(typeof systemTheme);

        if (window.localStorage.getItem("theme")) {
            console.log("local storage set");
            setTheme(window.localStorage.getItem("theme"));
        } else {
            setSystemTheme(systemTheme);
        }
    }, []);

    useEffect(() => {
        console.log("change theme in local storage ");
        window.localStorage.setItem("theme", theme);
    }, [theme]);

    function setSystemTheme(e) {
        if (e.matches) {
            console.log("e.matches true", e);
            setTheme("dark");
        } else {
            console.log("e.matches false", e);
            setTheme("light");
        }
    }
    systemTheme.addEventListener("change", setSystemTheme);

    return (
        <div className={`App ${theme}`}>
            <Header toggleTheme={toggleTheme} />
            <main>
                <NewTask handleSubmit={handleSubmit} />
                <Todos newTask={newTask} filter={filter} />
                <Filter toggleRadio={toggleRadio} />
            </main>
            <Footer />
        </div>
    );
}

export default App;