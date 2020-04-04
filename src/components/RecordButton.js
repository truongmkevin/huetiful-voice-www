import React from 'react';
import axios from 'axios'

const RecordButton = props => {
    const sendRecording = () => {
        let recording = {
            data: null,
            length: null
        }
        axios.post('/api/assistant/recording', {
            recording: recording
        }).catch(err => console.log(err))
    }
    return (
        <div 
            {...props}
            className='record-button'
            onClick={sendRecording}>
            Click to Record 
        </div>
    )
}

export default RecordButton