import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import './chart.css';
import url from '../../config'

export default function ChartsOverviewDemo() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const today = new Date().toISOString().split('T')[0];
                const apiUrl =  `${url}/reportTable?date=${today}`;

                const response = await axios.get(apiUrl);
                const data = response.data.data[0];
                setChartData(data);

            } catch (error) {
                console.error('Error fetching report data:', error);
            }
        };

        fetchReportData();
    }, []);

    const createReport = async () => {
        try {
            const apiUrl = `${url}/reportTable`;

            const response = await axios.post(apiUrl);
            console.log(response);

        } catch (error) {
            console.error('Error fetching report data:', error);
        }
    };

    // Define colors for the bars
    const barColors = ['#345ef8', '#345ef8', '#345ef8', '#345ef8', '#345ef8'];

    return (
        <div className='chartCont'>
            <div className='chart'>
                <h1>דוח לתאריך: {chartData.date}</h1>
                <BarChart
                    series={[
                        { data: [chartData.clinic1, chartData.clinic2, chartData.clinic3, chartData.clinic4, chartData.clinic5] }
                    ]}
                    height={290}
                    xAxis={[{ data: ['אחר', 'כללית', 'לאומית', 'מאוחדת', 'מכבי'], scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 30, left: 50, right: 10 }}
                    containerProps={{ width: 700 }}
                    colors={barColors}
                />
                <div className='patientsAmountCont'>
                    <div className='patientsAmountTtile'>כמות מטופלים</div>
                    <div className='patientsAmount'>
                        {chartData.patientsAmount}
                    </div>
                </div>
            </div>
            <div className='reportBtnsCont'>
                <button className='reportBtn' onClick={createReport}>עדכן דוח יומי</button>
                <button className='reportBtn'>צפה בהיסטורית דוחות</button>
            </div>
        </div>
    );
}
