import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reception.css'
import SearchIcon from '@mui/icons-material/Search';
import url from '../config'


const AllPatients = ({ onPatientSelect }) => {
    const [searchText, setSearchText] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);

    const [allPatients, setAllPatients] = useState([])

    useEffect(() => {
        const apiUrl =  `${url}/main-table`;

        axios.get(apiUrl)
            .then(response => {
              setAllPatients(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching reception queue data:', error);
            });
    }, []); 


    const handlePatientSelect = (uniqueNumber) => {
        setSelectedPatient(uniqueNumber);
        // Notify the parent component about the selected patient
        onPatientSelect(uniqueNumber);
      };
    
      const filteredPatients = allPatients.filter(
        ({ name, uniqueNumber }) =>
          name.toLowerCase().includes(searchText.toLowerCase()) ||
          uniqueNumber.toLowerCase().includes(searchText.toLowerCase())
      );
    
      return (
        <>
          <div className='patientSearch'>
            <div className='searchDiv'>
              <SearchIcon />
              <input
                className='selectPatient'
                placeholder='חיפוש מטופל...'
                type="text"
                value={searchText}
                onChange={({ target }) => setSearchText(target.value)}
              />
            </div>
            <div className='scrollList'>
              {filteredPatients.map(({ name, uniqueNumber,_id }) => (
                <div className='allPatients' key={_id}>
                  <input
                    className='patientDet'
                    name='selectPatient'
                    type="radio"
                    value={_id}
                    checked={selectedPatient === _id}
                    onChange={() => handlePatientSelect(_id)}
                  />
                  <span className='patientDet'> {name}</span>
                  <span className='patientDet'>{uniqueNumber}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    };
    
    export default AllPatients;