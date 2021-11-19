import moon from "../images/icon-moon.svg";
import sun from "../images/icon-sun.svg";
import { useEffect, useRef } from "react";

const Header = ({ toggleTheme }) => {
    return (
        <header className="App-header">
            <div className="top-bar">
                <h1 className="site-title">
                    <a href="/">TODO</a>
                </h1>
                <input
                    type="checkbox"
                    id="theme-toggle"
                    onChange={toggleTheme}
                />
                <label htmlFor="theme-toggle">
                    <img src={moon} className="moon-icon" alt="" />
                    <img src={sun} className="sun-icon" alt="" />
                </label>
            </div>
        </header>
    );
};

export default Header;
