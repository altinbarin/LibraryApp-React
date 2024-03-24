import React, { useState } from 'react';
import { Button, Form, Input, Card, message } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 
const PublisherAdd = () => {
  const apiUrl = useSelector((state) => state.apiUrl);
  const navigate = useNavigate();
  const [componentSize, setComponentSize] = useState('default');
  
 
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
 
  
  const onFinish = async (values) => {
    const apiData = {
        name: values.name,
        address: values.address,
        phone: values.phone,
        email : values.email,
    };
           
    try {
      const response = await fetch(apiUrl + 'Publisher/createpublisher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
 
      if (response.ok) {
        const result = await response.json();
        message.success(result.message);
        navigate('/publishers'); 
      } else {
        const result = await response.json();
        message.error(result.message);
      }
    } catch (error) {
      console.error('API isteği sırasında bir hata oluştu', error);
    }
  
  };
 
  return (
      <Card
        title="Yayınevi Ekleme"
        bordered
        style={{
          maxWidth: '900px',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          onFinish={onFinish}
        >
              <Form.Item
                label="Adı"
                name="name"
                rules={[{ required: true, message: 'Lütfen adını giriniz!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Adres"
                name="address"
                rules={[{ required: true, message: 'Lütfen adres giriniz!' }]}
              >
                <Input />
              </Form.Item>


              <Form.Item
                label="Telefon Numarası"
                name="phone"
                rules={[{ required: true, message: 'Lütfen telefon numarası giriniz!' }]}
              >
                <Input />
              </Form.Item>


              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Lütfen email adresi giriniz!' }]}
              >
                <Input />
              </Form.Item>
 
          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Şirketi Ekle
            </Button>
          </Form.Item>
        </Form>
      </Card>
  );
};
 
export default PublisherAdd;
 