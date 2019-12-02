import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useAuth0} from '../../authentication/react-auth0-spa';
import {cancelDelete, handleDelete, addEmail} from '../../store/reducers/ContactsReducer';
import {Link} from 'react-router-dom';

const DeleteContact = (props) => {
    const { loading, user } = useAuth0();
    const { contact_id, user_email, first_name, last_name, phone_number } = props

    useEffect(() => {
        addEmail(user.email)  
    },[user.email]);

    useEffect(() => {
    },[contact_id, user_email, first_name, last_name, phone_number]);
    
        if (loading || !user) {
            return (
                <div>Loading...</div>
            )
        }

        const handleClick = e => {
            e.preventDefault();
            props.cancelDelete()
        }



        return (
            <div className='confirmation'>
            <h1 className='confBody'>
                Are sure you want to delete {first_name} {last_name} from your contact list?
            </h1>
         <span className='buttonClass2'>   <Link to={'/softphone/contacts'}>
            <button id='button7' onClick={()=>props.handleDelete(user_email,contact_id)} type='submit'>Delete Contact</button>
            </Link>
            <button onClick={handleClick} id='button8'>Cancel</button></span>
            </div>
        )
}


function mapStateToProps(reduxState) {
    return {
        contact_id: reduxState.CR.contact_id,
        user_email: reduxState.CR.user_email,
        first_name: reduxState.CR.first_name,
        last_name: reduxState.CR.last_name,
        phone_number: reduxState.CR.phone_number,
        contacts: reduxState.CR.contacts,
        clickedDelete: reduxState.CR.clickedDelete
    }
}

export default connect(
    mapStateToProps,
    {cancelDelete, handleDelete, addEmail})(DeleteContact)