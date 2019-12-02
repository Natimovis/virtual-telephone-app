import React, { useEffect } from 'react';
import SoftPhone1 from './SoftPhone1';
import { handleChange, handleSubmit } from '../../store/reducers/ContactsReducer';
import { connect } from 'react-redux';
import "./SoftPhone.css";

const SoftPhone2 = (props) => {

    const handleChange = (e) => {
        props.handleChange({ [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        const { number } = props;
        props.handleSubmit(number)
    }


    useEffect(() => {
        SoftPhone1()
    }, [])

    // console.log(state)

    return (
        <div id="softPhone">
            <div id="controls">
                <div id="info">
                    <p className="instructions">Twilio Client</p>
                    <div id="client-name"></div>
                    <div id="output-selection">
                        <label>Ringtone Devices</label>
                        <select id="ringtone-devices" multiple></select>
                        <label>Speaker Devices</label>
                        <select id="speaker-devices" multiple></select><br />
                        <a id="get-devices">Seeing unknown devices?</a>
                    </div>
                </div>
                <div id="call-controls">
                    <p className="instructions">Make a Call:</p>
                    <input onChange={handleChange} id="phone-number" type="text" placeholder="Enter a phone # or client name" value={props.phone_number || props.number} />
                    <button id="button-call">Call</button>
                    <button type="submit" onClick={handleSubmit}>Add Contact</button>
                    <button id="button-hangup">Hangup</button>
                    <div id="volume-indicators">
                        <label>Mic Volume</label>
                        <div id="input-volume"></div><br /><br />
                        <label>Speaker Volume</label>
                        <div id="output-volume"></div>
                    </div>
                </div>
                <div id="log"></div>
                {/* <p> {state.number}</p> */}
            </div>
        </div>
    )
}
function mapStateToProps(reduxState) {
    return {
        number: reduxState.CR.number
    }
}

export default connect(
    mapStateToProps,
    { handleChange, handleSubmit })(SoftPhone2)