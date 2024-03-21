import React, { useEffect, useState } from 'react'
import { Table, Space, Button } from 'antd';
import {useSelector} from 'react-redux';

const BorrowedBookList = () => {
    const apiUrl = useSelector(state => state.apiUrl);
    const [result, setResult] = useState([]);

    useEffect(() => {
        fetchresult();
    }, []);

    const fetchresult = async () => {
        try{
            const response = await fetch(apiUrl+'BorrowedBook/allborrowedbooks');
            const data = await response.json();
            setResult(data.data);
            // console.log(data.data);
        }catch(error){
            console.log(error);
        }
    }

    const columns = [
        {
            title: 'Adı',
            dataIndex: 'name',
            key:'name',
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
    <Table columns={columns} dataSource={result} />
    </>
  )
}

export default BorrowedBookList
