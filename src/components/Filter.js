const Filter = ({toggleRadio}) => {
    // const [checked, setChecked] = useState(true)

    return (
        <section className="filter">

            <input type="radio" name="filterItem" value="all" id="allFilter" defaultChecked="checked" onChange={toggleRadio} />
            <label htmlFor="allFilter">All</label>

            <input type="radio" name="filterItem" value="active" id="activeFilter" onChange={toggleRadio}/>
            <label htmlFor="activeFilter">Active</label>

            <input type="radio" name="filterItem" value="completed" id="completedFilter" onChange={toggleRadio}/>
            <label htmlFor="completedFilter">Completed</label>
        </section>
    );
};

export default Filter;
