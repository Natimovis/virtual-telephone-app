import axios from 'axios';

const initialState = {
    note_id: '',
    contact_id: '',
    note_date: '',
    note_text: '',
    rating: '',
    user_email: '',
    notes: [],
    contact: []
};

const GET_ALL_NOTES = 'GET_ALL_NOTES'
const GET_NOTES = 'GET_NOTES'
const HANDLE_CHANGE = 'HANDLE_CHANGE'
const HANDLE_SUBMIT = 'HANDLE_SUBMIT'
const HANDLE_EDIT_NOTE = 'HANDLE_EDIT_NOTE'
const ADD_EMAIL_NOTE = 'ADD_EMAIL_NOTE'
const ADD_CONTACT_NOTE = 'ADD_CONTACT_NOTE'

export function getAllNotes(user_email) {
    return {
        type: GET_ALL_NOTES,
        payload: axios.get(`/api/notes/${user_email}`)
    }
}

export function addEmailNote(email) {
    return {
        type: ADD_EMAIL_NOTE,
        payload: axios.post('/api/notes', email)
    }
}

export function addContactNote(contact) {
    return {
        type: ADD_CONTACT_NOTE,
        payload: contact
    }
}

export const handleChange = e => {
    return {
        type: HANDLE_CHANGE,
        payload: e
    }
}

export const handleSubmit = (noteInfo) => {
    return {
        type: HANDLE_SUBMIT,
        payload: axios.post('/api/notes', noteInfo)
    }
}

export const handleEditNote = (contact_id, user_email, first_name, last_name, phone_number) => {
    return {
        type: HANDLE_EDIT_NOTE,
        payload: axios.put(`/api/contact/${contact_id}/${user_email}`, first_name, last_name, phone_number)
    }
}

export const getNotes = (contact_id) => {
    return {
        type: GET_NOTES,
        payload: axios.get(`/api/contact/notes/${contact_id}`)
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case HANDLE_CHANGE:
            return {
                ...state, ...payload
            }
        case `${HANDLE_SUBMIT}_FULFILLED`:
            return {
                ...state,
                notes: payload.data
            }
        case `${ADD_EMAIL_NOTE}_FULFILLED`:
            return {
                ...state,
                user_email: payload
            }
        case `${ADD_CONTACT_NOTE}_FULFILLED`:
            return {
                ...state,
                contact_id: payload
            }
        case `${GET_ALL_NOTES}_FULFILLED`:
            return {
                notes: payload.data
            }
        case `${HANDLE_EDIT_NOTE}_FULFILLED`:
            return {
                ...state,
                note_id: payload.data.note_id,
                contact_id: payload.data.contact_id,
                note_date: payload.data.note_date,
                note_text: payload.data.note_text,
                rating: payload.data.rating,
                user_email: payload.data.user_email
            }
        case `${GET_NOTES}_FULFILLED`:
            return {
                notes:payload.data
            }
        default:
        return state;
    }
}