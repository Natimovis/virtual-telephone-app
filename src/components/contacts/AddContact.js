import React, { useEffect, Fragment } from 'react';
import { handleChange, handleSubmit, addEmail } from '../../store/reducers/ContactsReducer';
import { connect } from 'react-redux';
import { useAuth0 } from '../../authentication/react-auth0-spa';
import { Link } from 'react-router-dom';
const AddContact = (props) => {

    const { loading, user } = useAuth0();
    const {addEmail} = props
    useEffect(() => {
        addEmail(user.email)
    }, [addEmail, user.email])

    if (loading || !user) {
        return (
            <div>Loading...</div>
        )
    }

    const handleChange = e => {
        props.handleChange({ [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        props.handleSubmit({
            user_email: user.email,
            first_name: props.first_name,
            last_name: props.last_name,
            phone_number: props.phone_number
        });
    }

    return (
        <Fragment>
            <form className='addContactForm'>
                <h1 id='first'>{props.first_name}</h1>
                <h1 id='last'>{props.last_name} </h1>
                <h1 id='phone'>{props.phone_number} </h1>
                <input id="input1" name='first_name' onChange={handleChange} type="text" placeholder="Contact First Name" />
                <input id="input2" name='last_name' onChange={handleChange} type="text" placeholder="Contact Last Name" />
                <input id="input3" name='phone_number' onChange={handleChange} type="tel" placeholder="Contact Phone Number" />
                <span className="addContactButtons">
                    <Link to={'/softphone/contacts'}>
                        <button id="button1" onClick={handleSubmit} type="submit">Add Contact</button>
                    </Link>
                </span>
            </form>
        </Fragment>
    )
}


function mapStateToProps(reduxState) {
    return {
        first_name: reduxState.CR.first_name,
        last_name: reduxState.CR.last_name,
        phone_number: reduxState.CR.phone_number,
        user_email: reduxState.CR.user_email
    }
}

export default connect(
    mapStateToProps,
    { handleChange, handleSubmit, addEmail })(AddContact)