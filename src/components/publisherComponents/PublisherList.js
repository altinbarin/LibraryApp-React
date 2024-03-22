import React, { useEffect, useState } from 'react'
import { Table, Space, Button,Input } from 'antd';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PublisherList = () => {
    const apiUrl = useSelector(state => state.apiUrl);
    const [result, setResult] = useState([]);
    const [searchText, setSearchText] = useState('');
  const [originalResult, setOriginalResult] = useState([]);
 const [sortedInfo, setSortedInfo] = useState({});
 const navigate = useNavigate(); 


    useEffect(() => {
        fetchresult();
    }, []);

    useEffect(() => {
        filterData(); 
      }, [searchText]); 

    const fetchresult = async () => {
        try{
            const response = await fetch(apiUrl+'Publisher/allpublishers');
            const data = await response.json();
            setResult(data.data);
            setOriginalResult(data.data); // originalResult değişkenini güncelleniyor
            // console.log(data.data);
        }catch(error){
            console.log(error);
        }
    }

        const handleChange = (pagination, filters, sorter) => {
            setSortedInfo(sorter);
        };


      const filterData = () => {
        const filteredData = originalResult.filter(item =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setResult(filteredData);
      };
    
      const handleSearch = (e) => {
        setSearchText(e.target.value); // Arama kutucuğundaki değeri günceller
      };

      const handleRowClick = (record) => {
        navigate(`/publishersbooks/${record.id}`); 
      };

    const columns = [
      {
        title: 'No',
        dataIndex: 'index',
        key: 'index',
        render: (text, record, index) => index + 1,
        width: '5%',
        align: 'center',
      },
        {
            title: 'Adı',
            dataIndex: 'name',
            key:'name',
            render: (text, record) => <a onClick={() => handleRowClick(record)}>{record.name}</a>,
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Adres',
            dataIndex: 'address',
            key:'address',
        },
        {
            title: 'Telefon Numarası',
            dataIndex: 'phone',
            key:'phone',
        },
        {
            title:'Email',
            dataIndex:'email',
            key:'email',
        }    
    ];

  return (
    <>
    <Space style={{ marginBottom: 16 }}>
        <h3>Yayınevi Ara</h3>
        <Input
          placeholder="Yayınevi adıyla ara"
          onChange={handleSearch}
          style={{ width: 200 }}
        />
      </Space>
    <Table 
    columns={columns} 
    dataSource={result} 
    onChange={handleChange}
    pagination={{ showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} kitap` }}
    />
    </>
  )
}

export default PublisherList
