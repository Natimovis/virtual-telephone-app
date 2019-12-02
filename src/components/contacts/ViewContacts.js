import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOne, getAll } from '../../store/reducers/ContactsReducer';
import { useAuth0 } from '../../authentication/react-auth0-spa';
import { Link } from 'react-router-dom';
import { getNotes } from '../../store/reducers/NotesReducer';

const ViewContacts = (props) => {
    const { loading, user } = useAuth0();
    const { getAll, getOne, contacts } = props
    const {email} = user
    useEffect(() => {
        getAll(email)
    }, [getAll, email])
    
    {
        if (loading || !user) {
            return (
                <div>Loading...</div>
                )
            }
                    
        const handleClick = (selection) => {
            getOne(selection)
        }

        const handleClick2 = (selection) => {
            getNotes(selection)
        }

        contacts.sort((a, b) => a.last_name.localeCompare(b.last_name))

        const contactsMapped = contacts.map((contact, index) => {
            return (
                <div className="viewContacts" key={index}>
                        <Link to={`/notes/${contact.contact_id}`}><button id="viewNotes" onClick={() => handleClick2(`${contact.contact_id}`)}>View Contact Notes</button></Link>
                        <Link to={{ pathname: /softphone/, state: { phone_number: contact.phone_number } }}> <button id='button3'>Call</button></Link>
                        <Link to={`/contact/${contact.contact_id}`} key={index}><button id='button4' onClick={() => handleClick(`${contact.contact_id}`)}>Edit</button></Link>
                        <span id="contactNames">  {contact.first_name} {contact.last_name} </span>
                </div>
            )
        })



        return (
            <>
                <h2 id="viewContactHeader">
                    Your Contacts<br />
                </h2>
               {contactsMapped}  
            </>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        contacts: reduxState.CR.contacts,
        contact: reduxState.CR.contact,
        user_email: reduxState.CR.user_email,
        first_name: reduxState.CR.first_name,
        last_name: reduxState.CR.last_name,
        phone_number: reduxState.CR.phone_number
    }
}

export default connect(
    mapStateToProps,
    { getAll, getOne })(ViewContacts)