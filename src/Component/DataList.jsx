import React from 'react';
import { Button, Flex, Segmented, Checkbox } from 'antd';
 import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const boxStyle = {
//   width: '600px',
//   margin: "auto",
  borderRadius: 6,
  color: "black",
  padding: "10px 10px",
  listStyle: "none",
  backgroundColor: "#dcdcdc",
  borderBottom: "1px solid black",
  borderTop: "1px solid black",
//   boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",

  
};
const iconStyle = {
    marginBottom: "10px",
    cursor: "pointer",
    
}

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

        <div style={{ width: "600px", margin: "auto", marginTop: "40px",}}>
                <Flex style={iconStyle} justify="space-around" align={alignItems}>
                    <p><FaAngleLeft style={{ width: "30px", height: "30px"}}/></p>
                    <p style={{ fontWeight: "bold"}}>20 Nov 2023</p>
                    <p><FaAngleRight style={{ width: "30px", height: "30px"}} /></p>
                </Flex>
            {Data.map(data => (
                <Flex key={data.id} style={boxStyle} justify={justify} align={alignItems}>
                        <li style={{}}>{data.namazName}</li>
                        <li>{data.time}</li>
                        <li><Checkbox ></Checkbox></li>     
                </Flex>
            )) }
            
    
        </div>
    </Flex>     
  );
};
export default App;