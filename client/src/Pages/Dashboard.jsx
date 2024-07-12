import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import'./dashboard.css'
import Navbar from '../Components/Navbar';

export default function Dashboard() {
  const [pieChartData, setPieChartData] = useState([]);
  const [user, Setuser] = useState();

  useEffect(() => {
    
  
    const fetchData = async () => {
      try {
      
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('User ID not found in local storage');
          return;
        }

        const response = await axios.get(`/api/v1/user/${userId}/dashboard`);

        console.log(response)
        if (response.data.success) {
          setPieChartData(response.data.pieChartData);
          Setuser(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <>
    <Navbar/>
      <div className="dashboard-container">
        <div className="dashboard-left">
            <div className="useinfo-container">
            <h2>
            <label >Name : </label>
             <span  style={{color:'#eb5e28'}}> {user?.username}</span>
            
          </h2>
          <h3>
          <label>Email : </label>
          <span  style={{color:'#eb5e28'}}> {user?.email}</span>
            
          </h3>
            </div>
        </div>
        <div className="dashboard-right">
            <div className="pichart-content">
            <h1 className='dash-heading'>
                <span style={{color:'#eb5e28'}}>D</span>ashboard
            </h1>
          <PieChart 
            colors={['#eb5e28', '#fffcf2', '#ccc5b9']} // Use palette
            series={[
              {
                data: pieChartData,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'white' },
              },
            ]}
            width={500}  // Adjust the width as needed
            height={500}
            
          />
            </div>
        </div>
      </div>

    </>
  );
}