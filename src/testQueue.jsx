import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './testQ.css' 

const TestQueue = () => {
  const [reception, setReception] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [triage, setTriage] = useState([]);
  const [treatment, setTreatment] = useState([]);
  const [ecg, setEcg] = useState([]);





  useEffect(() => {
    const fetchData = async () => {
      try {
        const reception = await axios.get(`http://localhost:3001/main-table/receptionQueue`);
        const doctor = await axios.get(`http://localhost:3001/main-table/doctorQueue`);
        const triage = await axios.get(`http://localhost:3001/main-table/triageQueue`);
        const treatment = await axios.get(`http://localhost:3001/main-table/treatmentQueue`);
        const ecg = await axios.get(`http://localhost:3001/main-table/ecgQueue`);



        setReception(reception.data.data);
        setDoctor(doctor.data.data);
        setTriage(triage.data.data);
        setTreatment(treatment.data.data);
        setEcg(ecg.data.data);

      } catch (error) {
        console.error('Error fetching queue data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='queuesLists'>
      <div className='queuee'>
        <h2>קבלה</h2>
        {reception.map(({ name, uniqueNumber, _id, turnId }) => (
          <div className='allPatients' key={_id}>
            <span className='patientDet'> {name}</span>
            <span className='patientDet'>{uniqueNumber}</span>
            <span className='patientDet'>{turnId}</span>

          </div>
        ))}
      </div>

      <div className='queuee'>
        <h2>רופא</h2>
        {doctor.map(({ name, uniqueNumber, _id, turnId }) => (
          <div className='allPatients' key={_id}>
            <span className='patientDet'> {name}</span>
            <span className='patientDet'>{uniqueNumber}</span>
            <span className='patientDet'>{turnId}</span>

          </div>
        ))}
      </div>

      <div className='queuee'>
        <h2>טריאג</h2>
        {triage.map(({ name, uniqueNumber, _id, turnId }) => (
          <div className='allPatients' key={_id}>
            <span className='patientDet'> {name}</span>
            <span className='patientDet'>{uniqueNumber}</span>
            <span className='patientDet'>{turnId}</span>

          </div>
        ))}
      </div>

      <div className='queuee'>
        <h2>טיפולים</h2>
        {treatment.map(({ name, uniqueNumber, _id, turnId }) => (
          <div className='allPatients' key={_id}>
            <span className='patientDet'> {name}</span>
            <span className='patientDet'>{uniqueNumber}</span>
            <span className='patientDet'>{turnId}</span>

          </div>
        ))}
      </div>

      <div className='queuee'>
        <h2>אקג</h2>
        {ecg.map(({ name, uniqueNumber, _id, turnId }) => (
          <div className='allPatients' key={_id}>
            <span className='patientDet'> {name}</span>
            <span className='patientDet'>{uniqueNumber}</span>
            <span className='patientDet'>{turnId}</span>

          </div>
        ))}
      </div>

    </div>
  );
};

export default TestQueue;
