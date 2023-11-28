import React from 'react';
import {  Flex, Checkbox } from 'antd';
 import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import '../App.css';



const justifyOptions = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
];

const alignOptions = ['flex-start', 'center', 'flex-end'];
const Data = [
    {id: 0, namazName: 'Fazr', time: "5pm"},
    {id: 1, namazName: 'Fazr', time: "5pm"},
    {id: 2, namazName: 'Fazr', time: "5pm"},
    {id: 3, namazName: 'Fazr', time: "5pm"},
    {id: 4, namazName: 'Fazr', time: "5pm"},
]
const App = () => {
  const [justify, setJustify] = React.useState(justifyOptions[3]);
  const [alignItems, setAlignItems] = React.useState(alignOptions[1]);
  return (
    <Flex gap="middle" align="start" vertical>

        
                <Flex className='iconStyle' justify="space-around" align={alignItems}>
                    <p><FaAngleLeft style={{ width: "30px", height: "30px"}}/></p>
                    <p style={{ fontWeight: "bold"}}>20 Nov 2023</p>
                    <p><FaAngleRight style={{ width: "30px", height: "30px"}} /></p>
                </Flex>
            {Data.map(data => (
                <Flex key={data.id}  className='boxStyle' justify={justify} align={alignItems}>
                        <li>{data.namazName}</li>
                        <li>{data.time}</li>
                        <li><Checkbox ></Checkbox></li>
                             
                </Flex>
             
            )) }
    </Flex>     
  );
};
export default App;