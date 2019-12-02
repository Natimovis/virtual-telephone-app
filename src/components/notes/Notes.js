import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useAuth0 } from '../../authentication/react-auth0-spa';
import { getNotes, getAllNotes } from '../../store/reducers/NotesReducer';
import { getAll } from '../../store/reducers/ContactsReducer'
import { Link } from 'react-router-dom';

const Notes = (props) => {
    const { loading, user } = useAuth0();
    const { getNotes, getAllNotes, notes } = props

    useEffect(() => {
        getAllNotes(user.email)
    }, [getAllNotes, user.email])

    useEffect(() => {
        getAll(user.email)
    }, [user.email])

    if (loading || !user) {
        return (
            <div>Loading...</div>
        )
    }

    const handleClick = (selection) => {
        getNotes(selection)
    }

    const notesMapped = notes.map((note, index) => {
        return (
            <div className='viewNotes' key={index}>
                <p>
                    <Link to={`/note/${note.note_id}`} key={index}>
                        <button id='viewNote' onClick={() => handleClick(`${note.note_id}`)}>Edit</button>
                    </Link>

                    <button id='deleteNote'>Delete</button>
                    {note.first_name} {note.last_name}<br/><br/>
                    {note.note_date}<br/><br/>

                    <span id="noteNames">  {note.note_text} </span>
                </p>
            </div>
        )

    })
    return (
        <div id='viewNotesDiv'>
               <span id='viewNotesHeader'> Your Notes    </span>
               <br/>
        <Link to='/notes/newnote'><button id='newNote'>New Note</button></Link>
            {notesMapped}
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {
        notes: reduxState.NR.notes,
        note: reduxState.NR.note,
        note_id: reduxState.NR.note_id,
        contact_id: reduxState.NR.contact_id,
        note_date: reduxState.NR.note_date,
        rating: reduxState.NR.rating,
        user_email: reduxState.NR.user_email,
    }
}

export default connect(
    mapStateToProps,
    { getAllNotes, getNotes, getAll })(Notes)