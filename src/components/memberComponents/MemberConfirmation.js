import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { useSelector } from 'react-redux';

const MemberConfirmation = () => {
    const apiUrl = useSelector((state)=>state.apiUrl);
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state;

    const [confirmationCode, setConfirmationCode] = useState('');

    const handleConfirmation = async () => {
        console.log(confirmationCode, userData.verificationCode);
        if (parseInt(confirmationCode) === userData.verificationCode) {
            try {
                const apiData = {
                    name: userData.name,
                    tckno: userData.tckno,
                    surname: userData.surname,
                    email: userData.email,
                    phone: userData.phone,
                    address: userData.address
                };

                const response = await fetch(apiUrl + 'Member/createmember', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(apiData),
                });

                if (response.ok) {
                    const result = await response.json();
                    message.success(result.message);
                    navigate('/members');
                } else {
                    const result = await response.json();
                    console.log(result);
                    message.error(result.message);
                }
            } catch (error) {
                console.error('Üye oluşturulamadı', error);
            }
        } else {
            message.error('Doğrulama kodu yanlış!');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Üye Onayı</h1>
            <p>Lütfen e-posta adresinize gönderilen doğrulama kodunu girin:</p>
            <Form>
                <Form.Item>
                    <Input
                        placeholder="Doğrulama Kodu"
                        value={confirmationCode}
                        onChange={(e) => setConfirmationCode(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleConfirmation}>
                        Onayla
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default MemberConfirmation;
