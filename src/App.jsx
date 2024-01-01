import { Link } from "react-router-dom";
import { Tabs,message } from 'antd'
import Today from "./today";
import Dashboard from './Dashboard'
import { useState,  } from "react";   
import Form from './Component/Form'
import './App.css'
import { useEffect } from "react";
import { getUserData, getPrayersData } from "./localStorage";

const App = () => {
  const [userInfoData, setUserInfoData] = useState();
  const [prayers, setPrayers]           = useState({});
  const [ActiveKey, setActiveKey]       = useState("3");

  useEffect(() => {
    setUserInfoData(getUserData());
    setPrayers(getPrayersData());
  }, [])
  
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
       <Tabs centered  activeKey={ActiveKey} 
          onTabClick={(activeKey) => {
            setActiveKey(activeKey)
          }}
        items={[
                           {
                             key: '1',
                             label: 'Dashboard',
                             children: <Dashboard />,
                             disabled: userInfoData && prayers ? false : true,
                           },
                           {
                             key: '2',
                             label: 'Today',
                             children: <Today />,
                             disabled: userInfoData && prayers ? false : true,

                           },
                           {
                             key: '3',
                             label: 'Settings',
                             children: <div className='setting'>
                                <Form  
                                  setPrayers      ={setPrayers}
                                  setActiveKey    ={setActiveKey} 
                                  setUserInfoData ={setUserInfoData}
                                />
                              </div>,
                           },
                         ]} 
                           
       />
 
   </div>
  )
}

export default App;