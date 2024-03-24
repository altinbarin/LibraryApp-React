import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, message, Space, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BorrowedBookList = () => {
    const apiUrl = useSelector(state => state.apiUrl);
    const [result, setResult] = useState([]);
    const [selectedBorrowedBookId, setSelectedBorrowedBookId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [originalResult, setOriginalResult] = useState([]);
    const [sortedInfo, setSortedInfo] = useState({});

    useEffect(() => {
        fetchResult();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchText, originalResult]);

    const fetchResult = async () => {
        try {
            const response = await fetch(apiUrl + 'BorrowedBook/allborrowedbooks');
            const data = await response.json();
            const formattedData = data.data.map(item => ({
                ...item,
                borrowDate: new Date(item.borrowDate).toLocaleString(),
            }))
            setResult(formattedData);
            setOriginalResult(formattedData);

        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    const filterData = () => {
        const filteredData = originalResult.filter(item =>
            item && item.memberFullName && item.memberFullName.toLowerCase().includes(searchText.toLowerCase())
        );
        setResult(filteredData);
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const handleConfirmReturn = async () => {
        if (selectedBorrowedBookId) {
            try {
                const response = await fetch(`${apiUrl}BorrowedBook/bookreturn?borrowedBookId=${selectedBorrowedBookId}`, {
                    method: 'POST'
                });

                if (response.ok) {
                    const result = await response.json();
                    message.success(result.message);
                    navigate('/returnedbooks');
                } else {
                    const result = await response.json();
                    message.error(result.message);
                }
            } catch (error) {
                console.log(error);
                message.error('İade işlemi sırasında bir hata oluştu.');
            }
        }
        setModalVisible(false);
    }

    const showModal = (borrowedBookId) => {
        setSelectedBorrowedBookId(borrowedBookId);
        setModalVisible(true);
    }

    const handleCancel = () => {
        setModalVisible(false);
    }

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
            title: 'Üye Adı-Soyadı',
            dataIndex: 'memberFullName',
            key: 'memberFullName',
            sorter: (a, b) => a.memberFullName.localeCompare(b.memberFullName),
            sortOrder: sortedInfo.columnKey === 'memberFullName' ? sortedInfo.order : null,
            render: (text, record) => <span>{record.memberFullName}</span>,
            ellipsis: true,
        },
        {
            title: 'Üye TCKNO',
            dataIndex: 'memberTckno',
            key: 'memberTckno',
        },
        {
            title: 'Kitap Adı',
            dataIndex: 'bookName',
            key: 'bookName',
        },
        {
            title: 'Ödünç Alma Tarihi',
            dataIndex: 'borrowDate',
            key: 'borrowDate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button onClick={() => showModal(record.id)}>Kitabı İade Al</Button>
            ),
        }
    ];

    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <h3>Ödünç verilen kitaplarda ara</h3>
                <Input
                    placeholder="Üye adı ve soyadıyla ara"
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
            <Modal
                title="Kitabı İade Al"
                visible={modalVisible}
                onOk={handleConfirmReturn}
                onCancel={handleCancel}
            >
                <p>Kitabı iade almak istediğinizden emin misiniz?</p>
            </Modal>
        </>
    )
}

export default BorrowedBookList;


