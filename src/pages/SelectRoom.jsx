import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './selectRoom.css'
import url from '../config'

export default function SelectRoom() {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    const handleClick = (roomRoute) => {
        if (roomRoute === 'קבלה') {
            navigate('/reception');
        }

        if (roomRoute === 'חדר רופא') {
            navigate('/doctor');
        }

        if (roomRoute === 'חדר אקג') {
            navigate('/ecg');
        }

        if (roomRoute === 'חדר טיפולים') {
            navigate('/treatment');
        }

        if (roomRoute === 'חדר טריאג') {
            navigate('/triage');
        }
        if (roomRoute === 'patientEnter') {
            navigate('/patientEnter');
        } if (roomRoute ==='monitor') {
            navigate('/monitor');
        }


    };

    useEffect(() => {
        const apiUrl =  `${url}/roomsTable`;

        axios
            .get(apiUrl)
            .then((response) => {
                setRooms(response.data.data);
                console.log(response.data.data)
            })
            .catch((error) => {
                console.error('Error fetching rooms data:', error);
            });
    }, []);

    return (
        <>
            <div>
                <h1>בחירת מסך</h1>
                <div className='selectRoomCont'>
                    {rooms.map((room) => (
                        <div className='roomDiv' key={room._id} onClick={() => handleClick(`${room.room}`)}>
                            {room.room}
                        </div>
                    ))}
                    <div className='roomDiv' onClick={() => handleClick(`monitor`)}>
                        מוניטור
                    </div>

                    <div className='roomDiv' onClick={() => handleClick(`patientEnter`)}>
                        כניסת לקוחות
                    </div>
                </div>
            </div>
        </>
    );
}
