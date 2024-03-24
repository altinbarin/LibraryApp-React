import { Button, Form, Input, InputNumber, message } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const MemberAdd = () => {
    const apiUrl = useSelector((state)=>state.apiUrl);
    const navigate = useNavigate();


    const onFinish = async (values) => {
      const data = {
          name: values.name,
          tckno: values.tckno.toString(),
          surname: values.surname,
          email: values.email,
          phone: values.phone.toString(),
          address: values.address,
      };
  
      try {
          const response = await fetch(`${apiUrl}Email/sendverificationcode?email=${data.email}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
          if (response.ok) {
              const verificationResult = await response.json();
              navigate('/memberconfirmation', { state: { ...data, verificationCode: verificationResult } });
              message.success('Doğrulama kodu gönderildi');
          } else {
              message.error('Doğrulama kodu gönderilemedi');
          }
      } catch (error) {
          console.error('Fetch işlemi sırasında bir hata oluştu:', error);
      }
  };
      

    

  return (
    <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
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
                label="Soyadı"
                name="surname"
                rules={[{ required: true, message: 'Lütfen soyadını giriniz!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="T.C. Kimlik No"
                name="tckno"
                rules={[{ 
                    required: true,
                     message: 'Lütfen TCKNO giriniz!'
                     },
                ]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{
                     required: true, 
                     message: 'Lütfen email giriniz!' 
                    },
                    {
                        type: 'email',
                        message: 'Geçersiz email'
                    },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Telefon Numarası"
                name="phone"
                rules={[{ 
                    required: true,
                     message: 'Lütfen telefon numarası giriniz!'
                     }
                ]}
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
 
          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Üye Ekle
            </Button>
          </Form.Item>
        </Form>

  )
}

export default MemberAdd





// import { Button, Form, Input, InputNumber, message } from 'antd';
// import React from 'react'
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';


// const MemberAdd = () => {
//     const apiUrl = useSelector((state)=>state.apiUrl);
//     const navigate = useNavigate();

//     const onFinish = async (values) =>{
//         const apiData ={
//             name:values.name,
//             tckno: values.tckno.toString(),
//             surname: values.surname,
//             email: values.email,
//             phone: values.phone.toString(),
//             address: values.address,
//         };
    //     try{
    //         const response = await fetch(apiUrl+'Member/createmember',
    //         {
    //             method: 'POST',
    //             headers:{
    //                 'Content-Type':'application/json',
    //             },
    //             body: JSON.stringify(apiData),
    //         });
    //         if(response.ok){
    //             const result = await response.json();
    //             message.success(result.message);
    //             navigate('/members');
    //         }else{
    //           const result = await response.json();
    //           const errorMessages = Object.values(result.errors).map((error) => error[0]);
    //           message.error(errorMessages.join(', '));
    //         }
    //     }
    //     catch(error){
    //         console.error('Üye oluşturulamadı', error);
    //     }
    // };

//   return (
//     <Form
//           labelCol={{ span: 6 }}
//           wrapperCol={{ span: 14 }}
//           layout="horizontal"
//           onFinish={onFinish}
//         >
//               <Form.Item
//                 label="Adı"
//                 name="name"
//                 rules={[{ required: true, message: 'Lütfen adını giriniz!' }]}
//               >
//                 <Input />
//               </Form.Item>

//               <Form.Item
//                 label="Soyadı"
//                 name="surname"
//                 rules={[{ required: true, message: 'Lütfen soyadını giriniz!' }]}
//               >
//                 <Input />
//               </Form.Item>

//               <Form.Item
//                 label="T.C. Kimlik No"
//                 name="tckno"
//                 rules={[{ 
//                     required: true,
//                      message: 'Lütfen TCKNO giriniz!'
//                      },
//                 ]}
//               >
//                 <InputNumber style={{ width: '100%' }} />
//               </Form.Item>

//               <Form.Item
//                 label="Email"
//                 name="email"
//                 rules={[{
//                      required: true, 
//                      message: 'Lütfen email giriniz!' 
//                     },
//                     {
//                         type: 'email',
//                         message: 'Geçersiz email'
//                     },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>

//               <Form.Item
//                 label="Telefon Numarası"
//                 name="phone"
//                 rules={[{ 
//                     required: true,
//                      message: 'Lütfen telefon numarası giriniz!'
//                      }
//                 ]}
//               >
//                 <Input />

//               </Form.Item>

//               <Form.Item
//                 label="Adres"
//                 name="address"
//                 rules={[{ required: true, message: 'Lütfen adres giriniz!' }]}
//               >
//                 <Input />
//               </Form.Item>
 
//           <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
//             <Button type="primary" htmlType="submit">
//               Üye Ekle
//             </Button>
//           </Form.Item>
//         </Form>
//   )
// }

// export default MemberAdd
