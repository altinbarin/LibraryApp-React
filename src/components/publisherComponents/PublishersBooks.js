import React, { useEffect, useState } from 'react';
import { Table, Space, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const PublishersBooks = () => {
  const { id } = useParams();
  const apiUrl = useSelector(state => state.apiUrl);
  const [result, setResult] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [originalResult, setOriginalResult] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchResult();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchText]);

  const fetchResult = async () => {
    try {
      const response = await fetch(`${apiUrl}Book/getbookswithpublisherid?id=${id}`);
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
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setResult(filteredData);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value); 
  };

  const handleRowClick = (record) => {
    navigate(`/book-detail/${record.id}`); 
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
      key: 'name',
      render: (text, record) => <a onClick={() => handleRowClick(record)}>{record.name}</a>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Toplam Stok',
      dataIndex: 'totalStock',
      key: 'totalStock',
    },
    {
      title: 'Stokta',
      dataIndex: 'inStock',
      key: 'inStock',
    },
    {
      title: 'Bölüm',
      dataIndex: 'section',
      key: 'section',
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <h3>Kitap Ara</h3>
        <Input
          placeholder="Kitap adıyla ara"
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
  );
};

export default PublishersBooks;

