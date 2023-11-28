import { Button, Form, Input, Select } from 'antd';
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
  
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };

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
            required: true,
          },
        ]}
      >
        <Input placeholder="Your Name" />
      </Form.Item>
      <Form.Item
        name="city"
        label="City"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select Your city"
          
          allowClear
        >
          <Option value="1">Dhaka</Option>
          <Option value="2">Doha</Option>
          <Option value="3">Kolkata</Option>
        </Select>
      </Form.Item>
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
         
          allowClear
        >
          <Option value="0">hanfi</Option>
          <Option value="1">Maliki</Option>
          <Option value="2">Shafi'i</Option>
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
          <Option value="0">hanfi</Option>
          <Option value="1">Maliki</Option>
          <Option value="2">Shafi'i</Option>
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