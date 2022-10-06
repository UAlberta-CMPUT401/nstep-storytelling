function Form(props) {
    return (
        <>
            <h3>
                Form: {
                props.name
            } </h3>
            {props.role ? <p>{props.role}</p> : <p>No role</p>}
        </>
    );
}

export default Form;
