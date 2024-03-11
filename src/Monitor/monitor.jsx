import React, { useEffect, useState } from 'react';
import './monitor.css';
import logo from '../logo1.png'
import axios from 'axios';
import socket from '../socketConfig';
import url from '../config'




const Monitor = () => {
    const [doctorRoom, setDoctorRoom] = useState([]);
    const [receptionRoom, setReceptionRoom] = useState([]);
    const [ECGRoom, setECGRoom] = useState([]);
    const [treatmentRoom, setTreatmentRoom] = useState([]);
    const [triageRoom, setTriageRoom] = useState([]);

    const doctorRoomUrl = `${url}/main-table/doctorQueue`;
    const receptionRoomUrl =  `${url}/main-table/receptionQueue`;
    const ecgRoomUrl =  `${url}/main-table/ecgQueue`;
    const treatmentRoomUrl =  `${url}/main-table/treatmentQueue`;
    const triageRoomUrl =  `${url}/main-table/triageQueue`;


    useEffect(() => {
        


        axios.get(doctorRoomUrl)
            .then(response => {
                setDoctorRoom(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching reception queue data:', error);
            });

        axios.get(receptionRoomUrl)
            .then(response => {
                setReceptionRoom(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching reception queue data:', error);
            });
        axios.get(ecgRoomUrl)
            .then(response => {
                setECGRoom(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching reception queue data:', error);
            });
        axios.get(treatmentRoomUrl)
            .then(response => {
                setTreatmentRoom(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching reception queue data:', error);
            });
        axios.get(triageRoomUrl)
            .then(response => {
                setTriageRoom(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching reception queue data:', error);
            });
    }, []);

    useEffect(() => {
        socket.on('updateQueue', () => {
           
        axios.get(doctorRoomUrl)
        .then(response => {
            setDoctorRoom(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching reception queue data:', error);
        });

    axios.get(receptionRoomUrl)
        .then(response => {
            setReceptionRoom(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching reception queue data:', error);
        });
    axios.get(ecgRoomUrl)
        .then(response => {
            setECGRoom(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching reception queue data:', error);
        });
    axios.get(treatmentRoomUrl)
        .then(response => {
            setTreatmentRoom(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching reception queue data:', error);
        });
    axios.get(triageRoomUrl)
        .then(response => {
            setTriageRoom(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching reception queue data:', error);
        });
        })
      }, [])
    





    return (
        <>
            <div className='monitorAllPage'>
                <div className='logoImgCont'>
                    <img className='logoImg' src={logo} alt='logo'></img>
                </div>
                <div className='monitor'>


                    <div className='roomMonitor'>
                        <div className='roomName'>חדר רופא</div>
                        <div className='currentPatientCont'>
                            <span className='detailTitle'>מטופל נוכחי</span>
                            <span className='currentPatientDetails'>
                                {doctorRoom.length > 0 ? doctorRoom[0].uniqueNumber : ''}
                            </span>
                        </div>
                        <div className='morePatientsCont'>
                            <span className='detailTitle'>הבאים בתור</span>
                            <span className='nextPatientDetails'>
                                {doctorRoom.length > 1 ? doctorRoom[1].uniqueNumber : ''},
                                {doctorRoom.length > 2 ? doctorRoom[2].uniqueNumber : ''},
                                {doctorRoom.length > 3 ? doctorRoom[3].uniqueNumber : ''}
                            </span>
                        </div>
                        <div className='queueSizeCont'>
                            <span className='detailTitle'>מספר ממתינים</span>
                            <span className='queueSizeDetails'>15</span>
                        </div>
                    </div>



                    <div className='roomMonitor'>
                        <div className='roomName'>חדר אקג</div>
                        <div className='currentPatientCont'>
                            <span className='detailTitle'>מטופל נוכחי</span>
                            <span className='currentPatientDetails'>
                                {ECGRoom.length > 0 ? ECGRoom[0].uniqueNumber : ''}
                            </span>
                        </div>
                        <div className='morePatientsCont'>
                            <span className='detailTitle'>הבאים בתור</span>
                            <span className='nextPatientDetails'>
                                {ECGRoom.length > 1 ? ECGRoom[1].uniqueNumber : ''},
                                {ECGRoom.length > 2 ? ECGRoom[2].uniqueNumber : ''},
                                {ECGRoom.length > 3 ? ECGRoom[3].uniqueNumber : ''}
                            </span>
                        </div>
                        <div className='queueSizeCont'>
                            <span className='detailTitle'>מספר ממתינים</span>
                            <span className='queueSizeDetails'>2</span>
                        </div>
                    </div>
                    <div className='roomMonitor'>
                        <div className='roomName'>קבלה</div>
                        <div className='currentPatientCont'>
                            <span className='detailTitle'>מטופל נוכחי</span>
                            <span className='currentPatientDetails'>
                                {receptionRoom.length > 0 ? receptionRoom[0].uniqueNumber : ''}
                            </span>
                        </div>
                        <div className='morePatientsCont'>
                            <span className='detailTitle'>הבאים בתור</span>
                            <span className='nextPatientDetails'>
                                {receptionRoom.length > 1 ? receptionRoom[1].uniqueNumber : ''},
                                {receptionRoom.length > 2 ? receptionRoom[2].uniqueNumber : ''},
                                {receptionRoom.length > 3 ? receptionRoom[3].uniqueNumber : ''}
                            </span>
                        </div>
                        <div className='queueSizeCont'>
                            <span className='detailTitle'>מספר ממתינים</span>
                            <span className='queueSizeDetails'>8</span>
                        </div>
                    </div>

                    <div className='roomMonitor'>
                        <div className='roomName'>חדר טיפולים</div>
                        <div className='currentPatientCont'>
                            <span className='detailTitle'>מטופל נוכחי</span>
                            <span className='currentPatientDetails'>
                                {treatmentRoom.length > 0 ? treatmentRoom[0].uniqueNumber : ''}

                            </span>
                        </div>
                        <div className='morePatientsCont'>
                            <span className='detailTitle'>הבאים בתור</span>
                            <span className='nextPatientDetails'>
                                {treatmentRoom.length > 1 ? treatmentRoom[1].uniqueNumber : ''},
                                {treatmentRoom.length > 2 ? treatmentRoom[2].uniqueNumber : ''},
                                {treatmentRoom.length > 3 ? treatmentRoom[3].uniqueNumber : ''}
                            </span>
                        </div>
                        <div className='queueSizeCont'>
                            <span className='detailTitle'>מספר ממתינים</span>
                            <span className='queueSizeDetails'>5</span>
                        </div>
                    </div>

                    <div className='roomMonitor'>
                        <div className='roomName'>חדר טריאג</div>
                        <div className='currentPatientCont'>
                            <span className='detailTitle'>מטופל נוכחי</span>
                            <span className='currentPatientDetails'>
                                {triageRoom.length > 0 ? triageRoom[0].uniqueNumber : ''}
                            </span>
                        </div>
                        <div className='morePatientsCont'>
                            <span className='detailTitle'>הבאים בתור</span>
                            <span className='nextPatientDetails'>
                                {triageRoom.length > 1 ? triageRoom[1].uniqueNumber : ''},
                                {triageRoom.length > 2 ? triageRoom[2].uniqueNumber : ''},
                                {triageRoom.length > 3 ? triageRoom[3].uniqueNumber : ''}
                            </span>
                        </div>
                        <div className='queueSizeCont'>
                            <span className='detailTitle'>מספר ממתינים</span>
                            <span className='queueSizeDetails'>14</span>
                        </div>
                    </div>

                </div>

                <div className='messagesBoard'>
                    <div className="moving-text-container">
                        <p className="moving-text">מטופלים יקרים! נא לקחת תור מעמדת השירות לפני כניסה למוקד</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Monitor;
