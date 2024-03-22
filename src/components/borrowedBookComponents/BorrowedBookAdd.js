import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Input, Modal, message } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const BorrowedBookAdd = () => {
  const apiUrl = useSelector(state => state.apiUrl);
  const { id , name} = useParams(); 
  const [result, setResult] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [originalResult, setOriginalResult] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResult();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchText]);

  const fetchResult = async () => {
    try {
      const response = await fetch(apiUrl + 'Member/allmembers');
      const data = await response.json();
      setResult(data.data);
      setOriginalResult(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const filterData = () => {
    const filteredData = originalResult.filter(item =>
      (item.name + ' ' + item.surname).toLowerCase().includes(searchText.toLowerCase())
    );
    setResult(filteredData);
  };

  const handleSearch = e => {
    setSearchText(e.target.value);
  };

  const handleSelectMember = (record) => {
    setSelectedMember(record);
    setModalVisible(true);
  };

  const handleConfirmBorrow = async () => {
    const apiData = {
      bookId: id,
      memberId: selectedMember.id,
    };
    try {
      const response = await fetch(apiUrl + 'BorrowedBook/createborrowedbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
      if (response.ok) {
        const result = await response.json(); 
        // console.log(result);
        message.success(result.message);
        navigate('/borrowedbooks');
      } else {
        const result = await response.json(); 
        message.error(result.message);
      }
    } catch (error) {
      console.error('Ödünç verme işlemi başarısız:', error);
      message.error('Ödünç verme işlemi sırasında bir hata oluştu.');
    }
  };
  

  const columns = [
    {
      title: 'Adı',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => record.name,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Soyadı',
      dataIndex: 'surname',
      key: 'surname',
      render: (text, record) => record.surname,
      sorter: (a, b) => a.surname.localeCompare(b.surname),
      sortOrder: sortedInfo.columnKey === 'surname' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'T.C. Kimlik No',
      dataIndex: 'tckno',
      key: 'tckno',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Adres',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Seç',
      key: 'select',
      render: (text, record) => (
        <Button type="primary" onClick={() => handleSelectMember(record)}>Seç</Button>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <h3>Üye Ara</h3>
        <Input
          placeholder="Üye ad ve soyadıyla ara"
          onChange={handleSearch}
          style={{ width: 200 }}
        />
      </Space>
      <Table columns={columns} dataSource={result} onChange={handleChange} />

      <Modal
        title={`'${selectedMember ? selectedMember.name : ''}' adlı üyeye '${name}' adlı kitabı ödünç verelecek`}
        visible={modalVisible}
        onOk={handleConfirmBorrow}
        onCancel={() => setModalVisible(false)}
      >
        Onaylıyor musunuz?
      </Modal>
    </>
  );
};

export default BorrowedBookAdd;


