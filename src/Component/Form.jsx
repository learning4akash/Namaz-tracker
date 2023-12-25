/* eslint-disable react/prop-types */
import { Button, Form, Input, Select } from 'antd';
import { Country, City } from 'country-state-city'
import { useState, useEffect } from 'react';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const countries = Country.getAllCountries();

const App = () => {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState({});
  const [countryCode, setCountryCode] = useState();
  const [salatMethods, setSalatMethods] = useState([]);
  const [salatMethodFind, setSalatMethodFind] = useState();

  // useEffect(() => {
  //   localStorage.setItem('users', JSON.stringify(userData));
  // },[userData]);

  const onChangeCountry = (value) => {
		setCountryCode(() => {
			const selectedCountryCode = countries.find(
				(e) => e.name === value
			);
			return selectedCountryCode.isoCode; 
		});	
	};
   
  // const date = new Date();
  // const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
  // const formattedDate = formatter.format(date);
  // console.log(formattedDate);

  const salatTime  = new Date();
  const currentMonth = salatTime.getMonth() + 1;

  // useEffect(() => {
  //     try {
  //       const userData = JSON.parse(localStorage.getItem('users'));
  //       if (userData) {
  //         setUserInfo(userData);  
  //       }
         
  //     } catch (err) {
  //       console.log(err);
  //     }  
  // },[]);


    // if (userInfo) {
    //   const findSalatCul = salatMethods.find((salat)=> salat.id == userInfo.salat_method );
    //    if (findSalatCul) {
    //       setSalatMethodFind(findSalatCul);
    //    }
    // }
  
    // useEffect(() => {

    // },[salatMethods]) 
    


  useEffect(() => {

    if (salatMethods) {
      fetch(`https://api.aladhan.com/v1/methods`)
      .then((response) => response.json())
      .then((data) => {
        setSalatMethods(Object.values(data.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
    }

  }, []);

  const onFinish = (values) => {
    localStorage.setItem('users', JSON.stringify(values));
    const getUser = localStorage.getItem("users");
    if (getUser) {
      const userData = JSON.parse(getUser);
      const {country, Mazhab, city,salat_method} = userData;
      fetch(`https://api.aladhan.com/v1/calendarByCity/2023/${currentMonth}?city=${city}&country=${country}&method=${salat_method}school=${Mazhab}`)
      .then((response) => response.json())
      .then((data) => {
         localStorage.setItem('prayer', JSON.stringify(data));
      })
      .catch((err) => {
         console.log(err.message);
      });
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const userData = JSON.parse(localStorage.getItem('users')) ?? [];
  const findSalatCul = salatMethods.find((salat)=> salat.id == userData.salat_method );

  function FormItem ({name, label, placeholder, options, onChange}) {
    return (
      <Form.Item
      name= {name}
      label= {label}
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Select
        placeholder= {placeholder}
        onChange={onChange}
        allowClear
      >
      {options.map((value, index) => (
              <Option key={index} value={value.name}>
									{value.name}
							</Option>
      ))}
      </Select>
    </Form.Item>
    )
  }
 


  return (
    
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      initialValues={{name: userData ? userData.name : "" , country: userData ? userData.country : "Select Your Country",  city: userData ? userData.city : "", Mazhab: userData ? userData.Mazhab : "", salat_method: userData ? userData.salat_method : "" }}
    >
          {/* {JSON.stringify(userInfo.name)} */}

      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: false,
          },
        ]}
      >
      <Input placeholder="Your Name"  />
      </Form.Item>
      <FormItem name="country"  label="Country" onChange={onChangeCountry} placeholder="Select Your Country" options={countries}/>
      <FormItem name="city" label="City" placeholder="Select Your City" options={City.getCitiesOfCountry(countryCode)}/>
      <Form.Item
        name="Mazhab"
        label="Mazhab"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select Your Mazhab"
          // onChange={onChangeMazhab}
          allowClear
        >
          <Option value="0">Shafi</Option>
          <Option value="1">Hanafi</Option>
          <Option value="2">Maliki</Option>
          <Option value="3">Hanbali</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name= "salat_method"
        label= "Salat Time Calculation Methods"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select Your City Salat Time Calculation Methods"
          // defaultValue={userInfo.name}
          allowClear
        >
          {
            salatMethods.map((value, index) => (
                <Option key={index} value={value.id}>
                  {value.name}
              </Option>))
          } 
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button style={{ marginRight:"20px"}} type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        
      </Form.Item>
    </Form>
  );
};
export default App;
