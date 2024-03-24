
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
  };

const AuthorDetail = () => {
  const { id } = useParams(); 
  const [authorData, setAuthorData] = useState(null);
  const apiUrl = useSelector((state) => state.apiUrl);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchMemberDetails = async () => {
      try {
        const response = await fetch(apiUrl + `Author/getauthorbyid?id=${id}`);
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setAuthorData(data.data);
      } catch (error) {
        console.error('Error fetching member details:', error);
      }
    };
    fetchMemberDetails();
  }, [ id]);

  const handleFormSubmit = async (values) => {
    try {
        const { createdDate, ...updatedValues } = values;
      const response = await fetch(apiUrl + 'Author/updateauthor', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues),
      });
      if (response.ok) {
        const result = await response.json();
        message.success(result.message);
        navigate('/authors');
      } else {
        const result = await response.json();
        const errorMessages = Object.values(result.errors).map((error) => error[0]);
        message.error(errorMessages.join(', '));
        // console.log(errorMessages);
      }
    } catch (error) {
      console.error('Member could not be updated:', error);
    }
  };

  return (
    <>
      {authorData && (
        <Form
          {...formItemLayout}
          onFinish={handleFormSubmit}
          initialValues={{
            id: authorData.id,
            name: authorData.name,
            surname: authorData.surname,
            createdDate: authorData.createdDate,
          }}
        >
          <Form.Item
            name="id"
            hidden
          />
          <Form.Item
            label="Adı"
            name="name"
            rules={[{ required: true, message: 'Lütfen üye adını girin!' }]}
          >
            <Input />
          </Form.Item>

         
          <Form.Item
            label="Soyadı"
            name="surname"
            rules={[{ required: true, message: 'Lütfen soyadı girin!' }]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="Kayıt Tarihi"
            name="createdDate"
          >
            <Input disabled />
          </Form.Item>
          
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default AuthorDetail;


