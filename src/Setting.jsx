import { useEffect, useState } from 'react'
import './App.css'
import Form from './Component/Form'


export default function Setting () {
    const [name, setName] = useState();
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [mazhab, setMazhab] = useState();
    const [salatCalculationMethods, setSalatCalculationMethods] = useState();


    const onNameChange = (e) => {
       console.log(e.target.value);
    }

    const onCountryChange = (e) => {
        console.log(e.target);
    }

    const onCityChange = (e) => {
        console.log(e.target.value);
    }
    
    const onMazhabChange = (e) => {
        console.log(e.target.value);
    }

    const onSalatCalculationMethodsChange = (e) => {
        setSalatCalculationMethods(e.target.value);
    }


    return (
        <>
        <div className='setting'>
            <Form 
                onNameChange={onNameChange} 
                onCountryChange ={onCountryChange} 
                onCityChange={onCityChange}
                onMazhabChange={onMazhabChange}
                onSalatCalculationMethodsChange={onSalatCalculationMethodsChange}
            />
        </div>
          
        </>
    )
}