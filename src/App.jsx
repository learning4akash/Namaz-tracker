import { Link,  } from "react-router-dom";
import { Tabs,message } from 'antd'
import Today from "./today";
import Dashboard from './Dashboard'
import { useState, useEffect } from "react";   
import Form from './Component/Form'
import './App.css'

const salatTime    = new Date();
const currentMonth = salatTime.getMonth() + 1;
const App = () => {
  const [userData, setUserData]         = useState();
  const [userInfo, setUserInfo]         = useState();
  const [messageApi, contextHolder]     = message.useMessage();
  const [loading, setLoading]           = useState(false);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('users', JSON.stringify(userData)) 
      const getUser = localStorage.getItem("users");
      if (getUser) {
        const userDataObj = JSON.parse(getUser);
        setUserInfo(userDataObj);
        const {country, Mazhab, city,salat_method} = userDataObj;
          fetch(`https://api.aladhan.com/v1/calendarByCity/2023/${currentMonth}?city=${city}&country=${country}&method=${salat_method}school=${Mazhab}`)
          .then((response) => response.json())
          .then((data) => {
             localStorage.setItem('prayer', JSON.stringify(data));
             messageApi.info('Data Save successfully');
             setLoading(true);
          })
          .catch((err) => {
             console.log(err.message);
          });
      }
    } else {
      const getUser = JSON.parse(localStorage.getItem("users"));
      setUserInfo(getUser);
    }
  },[userData])

  // useEffect(() => {
    
  // },[])

  return (
    <div >
      <div className='topbar-content'>
         <div></div>
         <div>
           <h1><Link href='/'>Salat Tracker</Link></h1>
         </div>
         <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' className='user-pic' />
      </div> 
       
       <hr />
       <Tabs centered  defaultActiveKey={ userInfo ? "2" : "3"} items={[
                           {
                             key: '1',
                             label: 'Dashboard',
                             children: <Dashboard />,
                             disabled: userInfo ? false : true,
                           },
                           {
                             key: '2',
                             label: 'Today',
                             children: <Today />,
                             disabled: userInfo ? false : true,

                           },
                           {
                             key: '3',
                             label: 'Setting',
                             children: <div className='setting'><Form  setUserData={setUserData} contextHolder={contextHolder}/></div>,
                           },
                         ]} 
                           
       />
 
   </div>
  )
}

export default App;