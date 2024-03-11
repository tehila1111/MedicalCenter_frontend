import './triage.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import socket from '../socketConfig';
import url from '../config'



const TriageQueue = () => {
    const [queue, setQueue] = useState([]);
    const [name, setName] = useState('');
    const [uniqueNumber, setUniqueNumber] = useState('');
    const [currentPatient, setCurrentPatient] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        socket.on('updateQueue', () => {
            const apiUrl =  `${url}/main-table/triageQueue`;
            axios.get(apiUrl)
                .then((response) => {
                    setQueue(response.data);
                    if (response.data.data && response.data.data.length > 0) {
                        const firstPatient = response.data.data[0];
                        setCurrentPatient(firstPatient);
                        if (firstPatient.name) {
                            setName(firstPatient.name);
                        }
                        if (firstPatient.uniqueNumber) {
                            setUniqueNumber(firstPatient.uniqueNumber);
                        }
                    } else {
                        setCurrentPatient([]);
                        setName('');
                        setUniqueNumber('');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching triage queue data:', error);
                });
        })
    }, [])

    useEffect(() => {
        const apiUrl = `${url}/main-table/triageQueue`;

        axios
            .get(apiUrl)
            .then((response) => {
                setQueue(response.data);
                if (response.data.data && response.data.data.length > 0) {
                    const firstPatient = response.data.data[0];
                    setCurrentPatient(firstPatient);
                    if (firstPatient.name) {
                        setName(firstPatient.name);
                    }
                    if (firstPatient.uniqueNumber) {
                        setUniqueNumber(firstPatient.uniqueNumber);
                    }
                } else {
                    setCurrentPatient([]);
                    setName('');
                    setUniqueNumber('');
                }
            })
            .catch((error) => {
                console.error('Error fetching triage queue data:', error);
            });
    }, []);

    useEffect(() => {
        const apiUrl =  `${url}/roomsTable`;

        axios
            .get(apiUrl)
            .then((response) => {
                setRooms(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching reception queue data:', error);
            });
    }, []);

    const moveToOtherRoom = async (otherRoomId) => {
        try {
            const response = await axios.put( `${url}/main-table/move`, {
                mainTableId: currentPatient._id, // Assuming you have an 'id' field for the current patient
                otherRoomId,
            });

            // Handle the response as needed
            console.log(response.data);

            socket.emit('moveToOtherRoom', (otherRoomId) => {
                console.log('move to other room', otherRoomId);
            });
        } catch (error) {
            // Handle errors
            console.error(error);
        }
    };

    return (
        <div className='allPage'>
            <div className='queuesCont'>
                <h2>חדר טריאג</h2>

                {queue.data && queue.data.length > 0 ? (

                    <div className='currentPatient'>
                        <div className='patientNumber'>{uniqueNumber}</div>
                        <div className='patientName'>{name}</div>
                    </div>
                ) : (
                    <div className='emptyQueueMessage'>התור ריק....</div>
                )}
                {queue.data && queue.data.length > 1 && (
                    <div className='nextPatient'>
                        <span className='queueDetTitle'>מטופל הבא: </span>
                        <div className='nextPatientName'>{queue.data[1].name}</div>
                    </div>
                )}


{queue.data && queue.data.length > 0 && (

                <div className='allQueues'>
                    <div className='queuesList'>
                        <div className='moveQueue' onClick={() => moveToOtherRoom(rooms[0]._id)}>
                            <VaccinesIcon className='queueIcon' />
                            <span>העבר לקבלה</span>
                        </div>
                        <div className='moveQueue' onClick={() => moveToOtherRoom(rooms[1]._id)}>
                            <MedicalServicesIcon className='queueIcon' />
                            <span>העבר לחדר רופא</span>
                        </div>
                        <div className='moveQueue' onClick={() => moveToOtherRoom(rooms[4]._id)}>
                            <MonitorHeartIcon className='queueIcon' />
                            <span>העבר לחדר אקג</span>
                        </div>
                        <div className='moveQueue' onClick={() => moveToOtherRoom(rooms[0]._id)}>
                            <VaccinesIcon className='queueIcon' />
                            <span>העבר לחדר טיפולים</span>
                        </div>
                    </div>
                </div>
                )}

            </div>
        </div>
    );
};

export default TriageQueue;
