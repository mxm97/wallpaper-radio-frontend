import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Index.css";

function Index(props) {
    // state to fold the form data
    const [newForm, setNewForm] = useState({
        name: '',
        url: '',
    })

    // handleChange for the form input, captures user input as it's typed
    const handleChange = (event) => {
        setNewForm((prevState) => ({
            ...prevState, // captures keystroke data
            [event.target.name]: event.target.value, // [event.target.name] get converted to (a key) name or url depending on input field being typed in
        }))                                          // event.target.value takes the value of what's inside the input field
    };

    // handleSubmit function for the form
    const handleSubmit = (event) => {
        event.preventDefault();
        props.createABackground(newForm);
        setNewForm({
            name: '',
            url: '',
        })
    }

    // loaded function
    const loaded = () => {
        // console.log(props.backgrounds[0])
        return (
            <div className="index-tile-wrapper">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
                </style>
            {
                props.backgrounds.map((background) => (
                    <figure key={background._id} className="effect-index" >
                        <Link to={`/backgrounds/${background._id}`} className="index-link">
                            <img src={background.url} alt={background.name} className="index-background"/>
                            <figcaption>
                                <h1>{background.name}</h1>
                            </figcaption>
                        </Link>
                    </figure>
                ))
            }
            </div>
        )
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }

    return (
        <section>
            {props.backgrounds ? loaded() : loading()}
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newForm.name}
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.url}
                    name="url"
                    placeholder="image URL"
                    onChange={handleChange}
                />
                <input type="submit" value="Add Background" />
            </form>
        </section>
    )
};

export default Index;