import React, { useEffect, useState } from 'react';
import { Table, Input, Space } from 'antd';
import { useSelector } from 'react-redux';

const ReturnedBookList = () => {
    const apiUrl = useSelector(state => state.apiUrl);
    const [result, setResult] = useState([]);
    const [searchTextMember, setSearchTextMember] = useState('');
    const [searchTextTCKNO, setSearchTextTCKNO] = useState('');
    const [originalResult, setOriginalResult] = useState([]);
    const [sortedInfo, setSortedInfo] = useState({});

    useEffect(() => {
        fetchResult();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchTextMember, searchTextTCKNO, originalResult]);

    const fetchResult = async () => {
        try {
            const response = await fetch(apiUrl + 'BorrowedBook/allbooksreturned');
            const data = await response.json();
            const formattedData = data.data.map(item => ({
                ...item,
                borrowDate: new Date(item.borrowDate).toLocaleString(),
                returnDate: new Date(item.returnDate).toLocaleString(),
            }))
            setResult(formattedData);
            setOriginalResult(formattedData);
        } catch (error) {
            console.log(error);
        }
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    const filterData = () => {
        let filteredData = originalResult;
        if (searchTextMember) {
            filteredData = filteredData.filter(item =>
                item && item.memberFullName && item.memberFullName.toLowerCase().includes(searchTextMember.toLowerCase())
            );
        }
        if (searchTextTCKNO) {
            filteredData = filteredData.filter(item =>
                item && item.memberTckno && item.memberTckno.includes(searchTextTCKNO)
            );
        }
        setResult(filteredData);
    };

    const handleSearchMember = (e) => {
        setSearchTextMember(e.target.value);
    };

    const handleSearchTCKNO = (e) => {
        setSearchTextTCKNO(e.target.value);
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
            title: 'Üye Adı-Soyadı',
            dataIndex: 'memberFullName',
            key: 'memberFullName',
            sorter: (a, b) => a.memberFullName.localeCompare(b.memberFullName),
            sortOrder: sortedInfo.columnKey === 'memberFullName' ? sortedInfo.order : null,
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
            title:'İade Tarihi',
            dataIndex:'returnDate',
            key:'returnDate',
        }, 
    ];

    return (
        <>
            <Space style={{ marginBottom: 16 }}>
            <h3>Üye Ara</h3>
                <Input
                    placeholder="Üye adı ve soyadıyla ara"
                    onChange={handleSearchMember}
                    style={{ width: 200 }}
                />
             <h3></h3>
                <Input
                    placeholder="Üye TCKNO ile ara"
                    onChange={handleSearchTCKNO}
                    style={{ width: 200 }}
                />
            </Space>
            <Table
                columns={columns}
                dataSource={result}
                onChange={handleTableChange}
                pagination={{ showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} kitap` }}
            />
        </>
    )
}

export default ReturnedBookList;




//tckno ile arama yok

// import React, { useEffect, useState } from 'react';
// import { Table, Input, Space } from 'antd';
// import { useSelector } from 'react-redux';

// const ReturnedBookList = () => {
//     const apiUrl = useSelector(state => state.apiUrl);
//     const [result, setResult] = useState([]);
//     const [searchText, setSearchText] = useState('');
//     const [originalResult, setOriginalResult] = useState([]);
//     const [sortedInfo, setSortedInfo] = useState({});

//     useEffect(() => {
//         fetchResult();
//     }, []);

//     useEffect(() => {
//         filterData();
//     }, [searchText, originalResult]);

//     const fetchResult = async () => {
//         try {
//             const response = await fetch(apiUrl + 'BorrowedBook/allbooksreturned');
//             const data = await response.json();
//             const formattedData = data.data.map(item => ({
//                 ...item,
//                 borrowDate: new Date(item.borrowDate).toLocaleString(),
//                 returnDate: new Date(item.returnDate).toLocaleString(),
//             }))
//             setResult(formattedData);
//             setOriginalResult(formattedData);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const handleTableChange = (pagination, filters, sorter) => {
//         setSortedInfo(sorter);
//     };

//     const filterData = () => {
//         let filteredData = originalResult;
//         if (searchText) {
//             filteredData = filteredData.filter(item =>
//                 item && item.memberFullName && item.memberFullName.toLowerCase().includes(searchText.toLowerCase())
//             );
//         }
//         setResult(filteredData);
//     };

//     const handleSearch = (e) => {
//         setSearchText(e.target.value);
//     };

//     const columns = [
//         {
//             title: 'Üye Adı-Soyadı',
//             dataIndex: 'memberFullName',
//             key: 'memberFullName',
//             sorter: (a, b) => a.memberFullName.localeCompare(b.memberFullName),
//             sortOrder: sortedInfo.columnKey === 'memberFullName' ? sortedInfo.order : null,
//         },
//         {
//             title: 'Üye TCKNO',
//             dataIndex: 'memberTckno',
//             key: 'memberTckno',
//         },
//         {
//             title: 'Kitap Adı',
//             dataIndex: 'bookName',
//             key: 'bookName',
//         },
//         {
//             title: 'Ödünç Alma Tarihi',
//             dataIndex: 'borrowDate',
//             key: 'borrowDate',
//         },
//         {
//             title:'İade Tarihi',
//             dataIndex:'returnDate',
//             key:'returnDate',
//         }, 
//     ];

//     return (
//         <>
//             <Space style={{ marginBottom: 16 }}>
//             <h3>Üye Ara</h3>
//                 <Input
//                     placeholder="Üye adı ve soyadıyla ara"
//                     onChange={handleSearch}
//                     style={{ width: 200 }}
//                 />
//             </Space>
//             <Table
//                 columns={columns}
//                 dataSource={result}
//                 onChange={handleTableChange}
//             />
//         </>
//     )
// }

// export default ReturnedBookList;




