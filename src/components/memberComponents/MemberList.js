import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Input, Modal, message } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MemberList = () => {
  const apiUrl = useSelector(state => state.apiUrl);
  const [result, setResult] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [originalResult, setOriginalResult] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
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

  const handleRowClick = record => {
    navigate(`/member-detail/${record.id}`);
  };

  const handleDelete = memberId => {
    setMemberToDelete(memberId);
    setDeleteConfirmVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${apiUrl}Member/deletemember?id=${memberToDelete}`, {
        method: 'POST',
      });
      if (response.ok) {
        const result = await response.json();
        message.success(result.message);
        await fetchResult();
      } else {
        const result = await response.json();
        message.error(result.message);
      }
    } catch (error) {
      console.error('Üye silinirken bir hata oluştu:', error);
    } finally { 
      setDeleteConfirmVisible(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmVisible(false);
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
      render: (text, record) => (
        <a onClick={() => handleRowClick(record)}>{record.name}</a>
      ),
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
      title: 'İşlem',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleDelete(record.id)} danger>
            Sil
          </Button>
        </Space>
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
      <Table 
      columns={columns} 
      dataSource={result} 
      onChange={handleChange}
      pagination={{ showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} kitap` }}
       />
      <Modal
        title="Üye Sil"
        visible={deleteConfirmVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Sil"
        cancelText="İptal"
      >
        <p>Üyeyi silmek istediğinize emin misiniz?</p>
      </Modal>
    </>
  );
};

export default MemberList;



// import React, { useEffect, useState } from 'react'
// import { Table, Space, Button ,Input} from 'antd';
// import {useSelector} from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const MemberList = () => {
//     const apiUrl = useSelector(state => state.apiUrl);
//     const [result, setResult] = useState([]);
//     const [searchText, setSearchText] = useState('');
//     const [originalResult, setOriginalResult] = useState([]);
//    const [sortedInfo, setSortedInfo] = useState({});
//    const navigate = useNavigate(); 


//     useEffect(() => {
//         fetchresult();
//     }, []);

//     useEffect(() => {
//         filterData(); 
//       }, [searchText]); 

//     const fetchresult = async () => {
//         try{
//             const response = await fetch(apiUrl+'Member/allmembers');
//             const data = await response.json();
//             setResult(data.data);
//             setOriginalResult(data.data); 
//             // console.log(data.data);
//         }catch(error){
//             console.log(error);
//         }
//     }

//     const handleChange = (pagination, filters, sorter) => {
//         setSortedInfo(sorter);
//     };


//     const filterData = () => {
//         const filteredData = originalResult.filter(item =>
//           (item.name + " " + item.surname).toLowerCase().includes(searchText.toLowerCase())
//         );
//         setResult(filteredData);
//       };
      

//   const handleSearch = (e) => {
//     setSearchText(e.target.value); // Arama kutucuğundaki değeri günceller
//   };

//   const handleRowClick = (record) => {
//     navigate(`/member-detail/${record.id}`); 
//   };


//     const columns = [
//         {
//             title: 'Adı',
//             dataIndex: 'name',
//             key:'name',
//             render: (text, record) => <a onClick={() => handleRowClick(record)}>{record.name}</a>,
//             sorter: (a, b) => a.name.localeCompare(b.name),
//             sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
//             ellipsis: true,
//         },
//         {
//             title: 'Soyadı',
//             dataIndex: 'surname',
//             key:'surname',
//             render: (text, record) => record.surname,
//             sorter: (a, b) => a.surname.localeCompare(b.surname),
//             sortOrder: sortedInfo.columnKey === 'surname' ? sortedInfo.order : null,
//             ellipsis: true,
//         },
//         {
//             title: 'T.C. Kimlik No',
//             dataIndex: 'tckno',
//             key:'tckno',
//         },
//         {
//             title:'Email',
//             dataIndex:'email',
//             key:'email',
//         },    
//         {
//             title:'Telefon Numarası',
//             dataIndex:'phone',
//             key:'phone',
//         },    
//         {
//             title:'Adres',
//             dataIndex:'address',
//             key:'address',
//         },    
//     ];

//   return (
//     <>
//     <Space style={{ marginBottom: 16 }}>
//         <h3>Üye Ara</h3>
//         <Input
//           placeholder="Üye ad ve soyadıyla ara"
//           onChange={handleSearch}
//           style={{ width: 200 }}
//         />
//       </Space>
//     <Table columns={columns} dataSource={result} onChange={handleChange}/>
//     </>
//   )
// }

// export default MemberList






