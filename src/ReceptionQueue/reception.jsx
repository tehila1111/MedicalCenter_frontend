import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from './menu';
import './reception.css';
import Messages from './messages';
import PersonIcon from '@mui/icons-material/Person';
import NumbersIcon from '@mui/icons-material/Numbers';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import AllPatients from './allPatients';
import Monitor from '../Monitor/monitor';
import Queues from './queues';
import ChartsOverviewDemo from './chart/chart';
import url from '../config'


const ReceptionQueue = () => {
    const [visibleComponent, setVisibleComponent] = useState("Queues");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selPatient, setSelPatient] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedAction, setSelectedAction] = useState("");
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState({});

    useEffect(() => {
        const fetchRoomsData = async () => {
            try {
                const response = await axios.get( `${url}/roomsTable`);
                setRooms(response.data.data);
            } catch (error) {
                console.error('Error fetching reception queue data:', error);
            }
        };

        fetchRoomsData();
    }, []);

    useEffect(() => {
        const fetchPatientData = async () => {
            if (selectedPatient) {
                const apiUrl =  `${url}/main-table/${selectedPatient}`;

                try {
                    const response = await axios.get(apiUrl);
                    setSelPatient(response.data.data);
                    setRoomName(response.data.room || {});
                    console.log(selPatient);
                } catch (error) {
                    console.error('Error fetching reception queue data:', error);
                }
            }
        };

        fetchPatientData();
    }, [selectedPatient]);

    const handleDeletePatient = () => {
        const apiUrl =  `${url}/main-table/${selectedPatient}`;

        axios.delete(apiUrl)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching reception queue data:', error);
                console.log(selectedPatient)
            });
    };

    const handleMovePatient = async () => {
        if (!selectedPatient || !selectedRoom || !selectedAction) {
            alert('בבקשה לבחור לקוח וחדר להעברה.');
            return;
        }
        if (selectedAction === 'select' || selectedRoom === 'select') {
            alert('בבקשה לבחור לקוח וחדר להעברה.');
            return;
        }

        if (selectedAction === 'moveToStart') {
            handleMoveTop();
        } else {
            handleMove();
        }
    };

    const handleMoveTop = async () => {
        const apiUrl =  `${url}/main-table/moveTop`;

        try {
            await axios.put(apiUrl, {
                mainTableId: selectedPatient,
                otherRoomId: selectedRoom
            });

            console.log(`Moved patient ${selectedPatient} to ${selectedRoom}`);
            setSelectedPatient(null);
            setRoomName(null);
        } catch (error) {
            console.error('Error moving patient:', error);
        }
    };

    const handleMove = async () => {
        const apiUrl =  `${url}/main-table/move`;

        try {
            await axios.put(apiUrl, {
                mainTableId: selectedPatient,
                otherRoomId: selectedRoom
            });

            console.log(`Moved patient ${selectedPatient} to ${selectedRoom}`);
            setSelectedPatient("");
            setRoomName("");
        } catch (error) {
            console.error('Error moving patient:', error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const setComponentsVisibility = (componentName) => {
        setVisibleComponent(componentName);
    };

    return (
        <>
            <div className='allPage'>
                <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} setComponentsVisibility={setComponentsVisibility} />

                {visibleComponent === 'Queues' && (
                    <Queues />
                )}

                {visibleComponent === 'Messages' && (
                    <Messages />
                )}
                {visibleComponent === 'Monitor' && (
                    <Monitor />
                )}
                {visibleComponent === 'Chart' && (
                    <ChartsOverviewDemo />
                )}

                {visibleComponent === 'Actions' && (
                    <div className='controllBoard'>
                        <AllPatients onPatientSelect={setSelectedPatient} />
                        <div className='selectedPatientDetails'>
                            {selPatient ? (
                                <div className='details'>
                                    <div className='selPatientDetSection'>
                                        <span className='selPatientDetTitles'><NumbersIcon /></span>
                                        <span>{selPatient.uniqueNumber}</span>
                                    </div>
                                    <div className='selPatientDetSection'>
                                        <span className='selPatientDetTitles'><PersonIcon /></span>
                                        <span>{selPatient.name}</span>
                                    </div>
                                    <div className='selPatientDetSection'>
                                        <span className='selPatientDetTitles'><MeetingRoomIcon /></span>
                                        <span>{roomName && roomName.room}</span>
                                    </div>
                                    <div className='selPatientDetSection'>
                                        <span className='selPatientDetTitles'><FormatListNumberedRtlIcon /></span>
                                        <span>{selPatient.turnId}</span>
                                    </div>
                                </div>
                            ) : (
                                <div>מחפש מטופל...</div>
                            )}
                            <div className='receptionActions'>
                                <div className="moveToHeadControll">
                                    <div className='moveSelects'>
                                        <select className='selectRoom' value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                                            <option value={"select"} >בחר חדר</option>
                                            {rooms.map((room) => (
                                                <option key={room._id} value={room._id}>{room.room}</option>
                                            ))}
                                        </select>
                                        <select className='selectAction' value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)}>
                                            <option value={"select"}>בחר פעולה</option>
                                            <option value="moveToStart">העבר לתחילת התור</option>
                                            <option value="moveToEnd">העבר לסוף התור</option>
                                        </select>
                                    </div>
                                    <div className='submitActions'>
                                        <button className='moveToHeadBtn' onClick={handleMovePatient}>
                                            העבר מטופל
                                        </button>
                                        <button className='finishTreatment' onClick={handleDeletePatient}>
                                            סיים טיפול
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ReceptionQueue;
