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
const App = () => {
  const [form] = Form.useForm();
  const [ country, setCountry ] = useState();
  const [userData, setUserData] = useState([]);
  const [countryCode, setCountryCode] = useState();
  let getCountry = Country.getAllCountries();

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(userData));
  },[userData]);


  const onChangeCountry = (value) => {
		setCountry(value);
		setCountryCode(() => {
			const selectedCountryCode = getCountry.find(
				(e) => e.name === value
			);
			return selectedCountryCode.isoCode; 
		});	
	};
 

  const onFinish = (values) => {
    setUserData(values)
  };
 
  const onReset = () => {
    form.resetFields();
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
    >
      <Form.Item
        name="name"
        label="Name"
      
        rules={[
          {
            required: false,
          },
        ]}
      >
      <Input placeholder="Your Name" name='name'  value="name"/>
      </Form.Item>
      <FormItem name="country" label="Country" onChange={onChangeCountry} placeholder="Select Your Country" options={getCountry}/>
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
        name="salat method"
        label="Salat Time Calculation Methods"
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
          <Option value="01">University of Scinece, Karachi</Option>
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
