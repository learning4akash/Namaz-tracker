import { Link,  } from "react-router-dom";
import { Tabs,message } from 'antd'
import Today from "./today";
import Dashboard from './Dashboard'
import { useState, useEffect } from "react";   
import Form from './Component/Form'
import './App.css'

const salatTime    = new Date();
const currentYear = salatTime.getFullYear();
const currentMonth = salatTime.getMonth() + 1;
const App = () => {
  const [userData, setUserData]         = useState();
  const [userInfo, setUserInfo]         = useState();
  const [messageApi, contextHolder]     = message.useMessage();
  const [loading, setLoading]           = useState(false);
  const [prayers, setPrayers]           = useState({});

  useEffect(() => {
    if (userData) {
      localStorage.setItem('users', JSON.stringify(userData)) 
      const getUser = JSON.parse(localStorage.getItem("users"));
      let url = `https://api.aladhan.com/v1/calendarByAddress/${currentYear}/${currentMonth}?address=${getUser.country}&method=${getUser.salat_method}school=${getUser.mazhab}`;
      if (getUser.hasOwnProperty('city')) {
        url = `https://api.aladhan.com/v1/calendarByCity/${currentYear}/${currentMonth}?city=${getUser.city}&country=${getUser.country}&method=${getUser.salat_method}school=${getUser.mazhab}`;
      }
      if (getUser) {
          fetch(url)
          .then((response) => {
            if (! response.ok) throw new Error('status code 400')
            return response.json();
          })
          .then((data) => {
            localStorage.setItem('prayer', JSON.stringify(data));
            const getPrayersData = JSON.parse(localStorage.getItem("prayer"));
            setPrayers(getPrayersData);
            setUserInfo(getUser);
            messageApi.info('Data Save successfully');
            setLoading(true);
          })
          .catch((error) => {
            localStorage.removeItem("prayer");
            const getPrayersData = JSON.parse(localStorage.getItem("prayer"));
            setPrayers(getPrayersData);
             messageApi.info('your country prayer data not found');
          });
      }
    } else {
      const getUser = JSON.parse(localStorage.getItem("users"));
      setUserInfo(getUser);
      const getPrayersData = JSON.parse(localStorage.getItem("prayer"));
      setPrayers(getPrayersData);
    }
  },[userData])

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
       <Tabs centered  defaultActiveKey={ userInfo ? "2" : "3"}
        items={[
                           {
                             key: '1',
                             label: 'Dashboard',
                             children: <Dashboard />,
                             disabled: userInfo && prayers ? false : true,
                           },
                           {
                             key: '2',
                             label: 'Today',
                             children: <Today />,
                             disabled: userInfo && prayers ? false : true,

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