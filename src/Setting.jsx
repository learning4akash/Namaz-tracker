import { useEffect, useState } from 'react'
import './App.css'
import Form from './Component/Form'


export default function Setting () {
    const [name, setName] = useState();


     useEffect(() => {
    //     fetch('https://api.aladhan.com/v1/calendarByCity/2023/11?city=Dhaka&country=Bangladesh&method=1&school=1')
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log(data)
    //     })
    //     .catch((err) => {
    //         console.err(err.message);
    //     })
        console.log('Hello world');
    }, [name]);


    return (
        <>
        <div className='setting'>
            <Form />
        </div>
          
        </>
    )
}