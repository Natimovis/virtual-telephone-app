import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editNote, deleteNote} from '../../store/reducers/NotesReducer';

class EditNote extends Component {
    state = { note: '' }

    handleInput = e => {
        this.setState({ note: e.target.value});
    }
    handleEditSubmit = () => {
        const {note_id, contact_id} = this.props;
        const {note} = this.state;

        this.props.editNote(contact_id, note_id, {editedNote: note});
    }
    render() {
        const {note_id, contact_id} = this.props;

        return (
            <>
                <input onChange={this.handleInput} />
                <button onClick={this.handleEditSubmit}>Submit Edit</button>

                <br />

                <button onClick={() =>this.props.deleteNote(contact_id, note_id)}>Delete</button>
            </>
        )
    }
}

export default connect(null, {
    editNote,
    deleteNote
})(EditNote);