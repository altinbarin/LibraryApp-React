import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Input } from 'antd';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const GenreList = () => {
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
            const response = await fetch(apiUrl+'Genre/allgenres');
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
    navigate(`/genresbooks/${record.id}`); 
  };

    const columns = [
        {
            title: 'Adı',
            dataIndex: 'name',
            key:'name',
            render: (text, record) => <a onClick={() => handleRowClick(record)}>{record.name}</a>,
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },     
    ];

  return (
    <>
    <Space style={{ marginBottom: 16 }}>
        <h3>Tür Ara</h3>
        <Input
          placeholder="Yazar adıyla ara"
          onChange={handleSearch}
          style={{ width: 200 }}
        />
      </Space>
    <Table columns={columns} dataSource={result} onChange={handleChange}/>
    </>
  )
}

export default GenreList
