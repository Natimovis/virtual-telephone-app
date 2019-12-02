import React from 'react';
import { connect } from 'react-redux';
import { useAuth0 } from '../../authentication/react-auth0-spa'
import { handleChange, getOne, addEmail, renderDelete, handleEdit } from '../../store/reducers/ContactsReducer';
import DeleteContact from './DeleteContact'
import {Link} from 'react-router-dom'

const EditContact = (props) => {
    const { loading, user } = useAuth0();
    const { renderDelete } = props

    const { contact_id, first_name, last_name, phone_number, clickedDelete } = props

    if (loading || !user) {
        return (
            <div>Loading...</div>
        )
    }

    const handleChange = e => {
        props.handleChange({ [e.target.name]: e.target.value })
    }

    const handleClick = e => {
        props.handleEdit(contact_id, user.email, {
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number
        });
        alert('Changes successfully saved')
    }
    
    const handleClick2 = e => {
        e.preventDefault()
     renderDelete()
    }


    return (
        <form className='editContact'>
            <input id='input4' name='first_name' defaultValue={first_name} onChange={handleChange} type='text' />
            <input id='input5' name='last_name' defaultValue={last_name} onChange={handleChange} type='text' />
            <input id='input6' name='phone_number' defaultValue={phone_number} onChange={handleChange} type='text' />
            <span className='buttonClass'>
                <Link to='/softphone/contacts'>
                {!clickedDelete?<button id='button5' onClick={handleClick} type='submit'>Save Changes</button>:null}
                </Link>
                {!clickedDelete?<button id='button6' onClick={handleClick2}>Delete Contact </button>:null}
            </span>
            {clickedDelete ? <DeleteContact /> : null}
        </form>
    )
}

function mapStateToProps(reduxState) {
    return {
        contact_id: reduxState.CR.contact_id,
        user_email: reduxState.CR.user_email,
        first_name: reduxState.CR.first_name,
        last_name: reduxState.CR.last_name,
        phone_number: reduxState.CR.phone_number,
        clickedDelete: reduxState.CR.clickedDelete,
        contacts: reduxState.CR.contacts,
    }
}

export default connect(
    mapStateToProps,
    { handleChange, handleEdit, getOne, addEmail, renderDelete })(EditContact)