import React, { useState, useEffect } from 'react';
import { Button, Form, Input, InputNumber, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const BookAdd = () => {
  const [genres, setGenres] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();
  const apiUrl = useSelector((state) => state.apiUrl);


  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(apiUrl+'Genre/allgenres');
        if (!response.ok) {
          const result = await response.json();
            message.error(result.message);
        }
        const data = await response.json();
        data.data.sort((a, b) => a.name.localeCompare(b.name));
        setGenres(data.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    const fetchPublishers = async () => {
      try {
        const response = await fetch(apiUrl+'Publisher/allpublishers');
        if (!response.ok) {
            const result = await response.json();
            message.error(result.message);
        }
        const data = await response.json();
        data.data.sort((a, b) => a.name.localeCompare(b.name));
        setPublishers(data.data);
      } catch (error) {
        console.error('Error fetching publishers:', error);
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await fetch(apiUrl+'Author/allauthors');
        if (!response.ok) {
            const result = await response.json();
            message.error(result.message);
        }
        const data = await response.json();
        data.data.sort((a, b) => a.name.localeCompare(b.name));
        setAuthors(data.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchGenres();
    fetchPublishers();
    fetchAuthors();
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch(apiUrl+'Book/createbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const result = await response.json();
        // console.log(result.message);
        message.success(result.message);
        navigate('/books');
      }
      else{
        const result = await response.json();
        message.error(result.message);
      }
    } catch (error) {
      console.error('Kitap oluşturulamadı:', error);
    }
  };


  

  return (
    <Form
      {...formItemLayout}
      variant="filled"
      style={{ maxWidth: 600 }}
      onFinish={handleFormSubmit}
    >
      <Form.Item
        label="Kitap Adı"
        name="name"
        rules={[{ required: true, message: 'Lütfen kitap adını girin!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Toplam Stok"
        name="totalStock"
        rules={[{ required: true, message: 'Lütfen toplam stoku girin!' }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Bölüm"
        name="section"
        rules={[{ required: true, message: 'Lütfen bölümü girin!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Tür"
        name="genreId"
        rules={[{ required: true, message: 'Lütfen kitabın türünü seçin!' }]}
      >
        <Select>
          {genres.map(genre => (
            <Option key={genre.id} value={genre.id}>{genre.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Yayınevi"
        name="publisherId"
        rules={[{ required: true, message: 'Lütfen yayınevi seçin!' }]}
      >
        <Select>
          {publishers.map(publisher => (
            <Option key={publisher.id} value={publisher.id}>{publisher.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Yazar"
        name="authorId"
        rules={[{ required: true, message: 'Lütfen yazar seçin!' }]}
      >
        <Select>
          {authors.map(author => (
            <Option key={author.id} value={author.id}>{author.name} {author.surname}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BookAdd;
