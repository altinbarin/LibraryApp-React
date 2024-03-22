import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, message } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
};

const BookDetail = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const apiUrl = useSelector((state) => state.apiUrl);
  const [genres, setGenres] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        setter(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(`${apiUrl}Book/getbookdetails?id=${id}`, setBookData);
    fetchData(`${apiUrl}Genre/allgenres`, setGenres);
    fetchData(`${apiUrl}Publisher/allpublishers`, setPublishers);
    fetchData(`${apiUrl}Author/allauthors`, setAuthors);
  }, [id, apiUrl]);

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch(`${apiUrl}Book/updatebook`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          genreId: genres.find((genre) => genre.name === values.genreName)?.id,
          publisherId: publishers.find((publisher) => publisher.name === values.publisherName)?.id,
          authorId: authors.find((author) => `${author.name} ${author.surname}` === values.authorFullName)?.id,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        message.success(result.message);
        navigate('/books');
      } else {
        const result = await response.json();
        const errorMessages = Object.values(result.errors).map((error) => error[0]);
        message.error(errorMessages.join(', '));
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <>
      {bookData && (
        <Form {...formItemLayout} onFinish={handleFormSubmit} initialValues={bookData}>
          <Form.Item name="id" hidden />
          <Form.Item label="Kitap Adı" name="name" rules={[{ required: true, message: 'Lütfen kitap adını girin!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Toplam Stok" name="totalStock" rules={[{ required: true, message: 'Lütfen toplam stoku girin!' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Bölüm" name="section" rules={[{ required: true, message: 'Lütfen bölümü girin!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Tür" name="genreName">
            <Select>
              {genres.map((genre) => (
                <Option key={genre.id} value={genre.name}>
                  {genre.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Yayınevi" name="publisherName">
            <Select>
              {publishers.map((publisher) => (
                <Option key={publisher.id} value={publisher.name}>
                  {publisher.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Yazar" name="authorFullName">
            <Select>
              {authors.map((author) => (
                <Option key={author.id} value={`${author.name} ${author.surname}`}>
                  {`${author.name} ${author.surname}`}
                </Option>
              ))}
            </Select>
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

export default BookDetail;


// import React, { useEffect, useState } from 'react';
// import { Button, Form, Input, InputNumber, Select, message } from 'antd';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const { Option } = Select;

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 6 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 14 },
//   },
// };

// const BookDetail = () => {
//   const { id } = useParams(); // URL'den id'yi al
//   const [bookData, setBookData] = useState(null);
//   const apiUrl = useSelector((state) => state.apiUrl);
//   const [genres, setGenres] = useState([]);
//   const [publishers, setPublishers] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const response = await fetch(apiUrl+`Book/getbookdetails?id=${id}`);
//         if (!response.ok) {
//           throw new Error('API request failed');
//         }
//         const data = await response.json();
//         setBookData(data.data);
//       } catch (error) {
//         console.error('Error fetching book details:', error);
//       }
//     };

//     const fetchGenres = async () => {
//       try {
//         const response = await fetch(apiUrl+'Genre/allgenres');
//         if (!response.ok) {
//           const result = await response.json();
//           message.error(result.message);
//         }
//         const data = await response.json();
//         setGenres(data.data);
//       } catch (error) {
//         console.error('Error fetching genres:', error);
//       }
//     };

//     const fetchPublishers = async () => {
//       try {
//         const response = await fetch(apiUrl+'Publisher/allpublishers');
//         if (!response.ok) {
//           const result = await response.json();
//           message.error(result.message);
//         }
//         const data = await response.json();
//         setPublishers(data.data);
//       } catch (error) {
//         console.error('Error fetching publishers:', error);
//       }
//     };

//     const fetchAuthors = async () => {
//       try {
//         const response = await fetch(apiUrl+'Author/allauthors');
//         if (!response.ok) {
//           const result = await response.json();
//           message.error(result.message);
//         }
//         const data = await response.json();
//         setAuthors(data.data);
//       } catch (error) {
//         console.error('Error fetching authors:', error);
//       }
//     };

//     fetchGenres();
//     fetchPublishers();
//     fetchAuthors();
//     fetchBookDetails();
//   }, [id]);

//   const handleFormSubmit = async (values) => {
//     try {
//       const response = await fetch(apiUrl+'Book/updatebook',{
//         method: 'PUT',
//         headers:{
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...values,
//           genreId: genres.find(genre => genre.name === values.genreName)?.id,
//           publisherId: publishers.find(publisher => publisher.name === values.publisherName)?.id,
//           authorId: authors.find(author => author.name + ' ' + author.surname === values.authorFullName)?.id,
//         }),
//       });
//       if (response.ok) {
//         const result = await response.json();
//         message.success(result.message);
//         navigate('/books');
//       } else {
//         const result = await response.json();
//         message.error(result.message);
//       }
//     } catch (error) {
//       console.error('Kitap Güncellenemedi:', error);
//     }
//   };

//   return (
//     <>
//       {bookData && (
//         <Form
//           {...formItemLayout}
//           onFinish={handleFormSubmit}
//           initialValues={{
//             id: bookData.id,
//             name: bookData.name,
//             totalStock: bookData.totalStock,
//             inStock: bookData.inStock,
//             section: bookData.section,
//             genreName: bookData.genreName,
//             publisherName: bookData.publisherName,
//             authorFullName: bookData.authorFullName,
//           }}
//         >
//           <Form.Item
//             name="id"
//             hidden
//           />
//           <Form.Item
//             label="Kitap Adı"
//             name="name"
//             rules={[{ required: true, message: 'Lütfen kitap adını girin!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Toplam Stok"
//             name="totalStock"
//             rules={[{ required: true, message: 'Lütfen toplam stoku girin!' }]}
//           >
//             <InputNumber style={{ width: '100%' }} />
//           </Form.Item>
//           <Form.Item
//             label="Mevcut Stok"
//             name="inStock"
//             rules={[{ required: true, message: 'Lütfen mevcut stoku girin!' }]}
//           >
//             <InputNumber style={{ width: '100%' }} />
//           </Form.Item>
//           <Form.Item
//             label="Bölüm"
//             name="section"
//             rules={[{ required: true, message: 'Lütfen bölümü girin!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Tür"
//             name="genreName"
//           >
//             <Select>
//               {genres.map(genre => (
//                 <Option key={genre.id} value={genre.name}>{genre.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label="Yayınevi"
//             name="publisherName"
//           >
//             <Select>
//               {publishers.map(publisher => (
//                 <Option key={publisher.id} value={publisher.name}>{publisher.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label="Yazar"
//             name="authorFullName"
//           >
//             <Select>
//               {authors.map(author => (
//                 <Option key={author.id} value={author.name + ' ' + author.surname}>{author.name} {author.surname}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
//             <Button type="primary" htmlType="submit">
//               Güncelle
//             </Button>
//           </Form.Item>
//         </Form>
//       )}
//     </>
//   );
// };

// export default BookDetail;


