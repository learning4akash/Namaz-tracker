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

const App = ({setUserData, contextHolder}) => {
  const [form]                          = Form.useForm();
  const [userInfo, setUserInfo]         = useState({});
  const [countryCode, setCountryCode]   = useState();
  const [country, setCountry]           = useState([]);
  const [city, setCity]                 = useState([]);
  const [salatMethods, setSalatMethods] = useState([]);
  const [loading, setLoading]           = useState(true);

  const onChangeCountry = (value) => {
    if (value) {
      setCountry(value);
      setCountryCode(() => {
        const selectedCountryCode = countries.find(
          (e) => e.name === value
        );
        return selectedCountryCode.isoCode; 
      });
    }
    setCity([]);
	};

  useEffect(() => {
    if (countryCode) {
      const cities = City.getCitiesOfCountry(countryCode);
      setCity(cities);
    }
  },[countryCode])

  useEffect(() => {
    if (! Object.keys(userInfo).length) {
      const data = JSON.parse(localStorage.getItem('users')) ?? [];
      const findCountry = countries.find(country => country.name == data.country);
      if (findCountry) {
        setCountryCode(findCountry.isoCode);
      }
      setUserInfo(data);
      setLoading(false);
    }  
  }, []);
  
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
    setUserData(values);
  };

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
        showSearch
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
    
    <>
       {contextHolder}
      {!loading && <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          initialValues={{...userInfo}}
        >

        <Form.Item
            name="name"
            label="Name"
            placeholder="Your Name"
            rules={[
              {
                required: false,
              },
            ]}
          >
          <Input  placeholder="Your Name" />
        </Form.Item>
        <FormItem name="country"  label="Country" onChange={onChangeCountry} placeholder="Select Your Country" options={countries}/>
        { city.length ? (<Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select Your City"
            allowClear
            showSearch
          >
             {
              city.map((value, index) => (
                <Option key={index} value={value.name}>
                    {value.name}
                </Option>
            ))
           }
          </Select>
        </Form.Item>) : ""}
        
        <Form.Item
          name="mazhab"
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
        </Form.Item> 
      </Form>
      }
    </>
  );
};
export default App;
