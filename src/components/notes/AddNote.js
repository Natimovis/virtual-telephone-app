import React, { useEffect, Fragment } from 'react';
import { handleChange, handleSubmit, addEmailNote } from '../../store/reducers/NotesReducer';
import { connect } from 'react-redux';
import { useAuth0 } from '../../authentication/react-auth0-spa';
import { Link } from 'react-router-dom';
const AddNote = (props) => {

    const { loading, user } = useAuth0();
    const { contact, addEmailNote } = props
    useEffect(() => {
    addEmailNote(user.email)
    }, [addEmailNote, user.email])

    useEffect(() => {
    }, [contact])

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
            contact_id:props.contact_id,
            user_email:props.user_email,
            note_text:props.note_text,
            rating:props.rating
        });
    }

    return (
        <Fragment>
            <form className='addNoteForm'>
                <h1 id='noteText'>{props.note_text} </h1>
                <h1 id='noteRating'>{props.rating} </h1>
                <input id="noteCaption" name='rating' onChange={handleChange} type="text" placeholder="Enter phone number to link contact" /><br/>
                <textarea id="noteText" name='note_text' onChange={handleChange} type="text" placeholder="Enter Note" /><br/>
                <span className="addNoteButtons">
                    <Link to={'/notes'}>
                        <button id='abc' onClick={handleSubmit} type="submit">Save Notes</button>
                    </Link>
                </span>
            </form>
        </Fragment>
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
        note:reduxState.NR.note
    }
}

export default connect(
    mapStateToProps,
    { handleChange, handleSubmit, addEmailNote })(AddNote)