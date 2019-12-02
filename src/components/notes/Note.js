import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useAuth0 } from '../../authentication/react-auth0-spa'
import { handleChange, getNotes, addContactNote, handleEditNote } from '../../store/reducers/NotesReducer';
// import DeleteContact from './DeleteContact'
import {Link} from 'react-router-dom'

const EditContact = (props) => {
    const { loading, user } = useAuth0();
    const {contact_id} = props.match.params;
    const {getNotes} = props
    useEffect(() => {
    getNotes(contact_id)
    }, [getNotes, contact_id])

    if (loading || !user) {
        return (
            <div>Loading...</div>
        )
    }

    
    const notesMapped = props.notes.map((note, index) => {
        return (
            <div className='contactsDiv' key={index}>
                <header id='noteButtons'><button id='noteButton1'>Edit</button><button id='noteButton2'>Delete</button>
                </header>
                <div id='contactNotes'>
                    <span id='noteName'>Notes on <br/>{note.first_name} {note.last_name} </span><br/>
                 <br/>   <span id='noteDate'>Note Timestamp<br/>
                    {note.note_date}</span><br/>
                </div> 
                    <div id='noteText'>{note.note_text}</div>
            </div>
        )
    })
    
    return (
        <>
        <form className='contactNotes'>
        {notesMapped}
        </form>
        <Link to={'/notes/newnote'}><button id='noteButton3'>New Note</button></Link>
    </>
    )
}

function mapStateToProps(reduxState) {
    return {
        note_id:reduxState.NR.note_id,
        contact_id:reduxState.NR.contact_id,
        note_date:reduxState.NR.note_date,
        note_text:reduxState.NR.note_text,
        rating:reduxState.NR.rating,
        user_email:reduxState.NR.user_email,
        notes:reduxState.NR.notes,
        note:reduxState.NR.note,
    }
}

export default connect(
    mapStateToProps,
    { handleChange, handleEditNote, getNotes, addContactNote })(EditContact)
