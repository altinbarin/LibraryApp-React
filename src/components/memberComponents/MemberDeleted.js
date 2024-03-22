
import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Input, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MemberDeleted = () => {
  const apiUrl = useSelector(state => state.apiUrl);
  const [result, setResult] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [originalResult, setOriginalResult] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [activateConfirmVisible, setActivateConfirmVisible] = useState(false);
  const [memberToActivate, setMemberToActivate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResult();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchText]);

  const fetchResult = async () => {
    try {
      const response = await fetch(apiUrl + 'Member/allmembersdeleted');
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

  const handleActivate = memberId => {
    setMemberToActivate(memberId);
    setActivateConfirmVisible(true);
  };

  const handleConfirmActivate = async () => {
    try {
      const response = await fetch(`${apiUrl}Member/activatemember?id=${memberToActivate}`, {
        method: 'POST',
      });
      if (response.ok) {
        // Üye başarıyla aktive edildi, tabloyu güncelle
        await fetchResult();
      } else {
        // Aktivasyon işlemi başarısız oldu
        console.error('Üye aktive edilemedi');
      }
    } catch (error) {
      console.error('Üye aktive edilirken bir hata oluştu:', error);
    } finally {
      // Aktivasyon işlemi tamamlandı, onay iletişim kutusunu kapat
      setActivateConfirmVisible(false);
    }
  };

  const handleCancelActivate = () => {
    // Kullanıcı aktivasyonu iptal etti, onay iletişim kutusunu kapat
    setActivateConfirmVisible(false);
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
          <Button onClick={() => handleActivate(record.id)} type="primary">
            Aktive Et
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
        title="Üye Aktive Et"
        visible={activateConfirmVisible}
        onOk={handleConfirmActivate}
        onCancel={handleCancelActivate}
        okText="Aktive Et"
        cancelText="İptal"
      >
        <p>Üyeyi tekrar aktif etmek istediğinize emin misiniz?</p>
      </Modal>
    </>
  );
};

export default MemberDeleted;





// import React, { useEffect, useState } from 'react';
// import { Table, Space, Button, Input, Modal } from 'antd';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const MemberDeleted = () => {
//   const apiUrl = useSelector(state => state.apiUrl);
//   const [result, setResult] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [originalResult, setOriginalResult] = useState([]);
//   const [sortedInfo, setSortedInfo] = useState({});
//   const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
//   const [memberToDelete, setMemberToDelete] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchResult();
//   }, []);

//   useEffect(() => {
//     filterData();
//   }, [searchText]);

//   const fetchResult = async () => {
//     try {
//       const response = await fetch(apiUrl + 'Member/allmembersdeleted');
//       const data = await response.json();
//       setResult(data.data);
//       setOriginalResult(data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleChange = (pagination, filters, sorter) => {
//     setSortedInfo(sorter);
//   };

//   const filterData = () => {
//     const filteredData = originalResult.filter(item =>
//       (item.name + ' ' + item.surname).toLowerCase().includes(searchText.toLowerCase())
//     );
//     setResult(filteredData);
//   };

//   const handleSearch = e => {
//     setSearchText(e.target.value);
//   };

//   const handleRowClick = record => {
//     navigate(`/member-detail/${record.id}`);
//   };

//   const handleDelete = memberId => {
//     setMemberToDelete(memberId);
//     setDeleteConfirmVisible(true);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       const response = await fetch(`${apiUrl}Member/deletemember?id=${memberToDelete}`, {
//         method: 'POST',
//       });
//       if (response.ok) {
//         await fetchResult();
//       } else {
//         console.error('Üye silinemedi');
//       }
//     } catch (error) {
//       console.error('Üye silinirken bir hata oluştu:', error);
//     } finally {
//       setDeleteConfirmVisible(false);
//     }
//   };

//   const handleCancelDelete = () => {
//     // Kullanıcı silmeyi iptal etti, onay iletişim kutusunu kapat
//     setDeleteConfirmVisible(false);
//   };

//   const columns = [
//     {
//       title: 'Adı',
//       dataIndex: 'name',
//       key: 'name',
//       render: (text, record) => (
//         <a onClick={() => handleRowClick(record)}>{record.name}</a>
//       ),
//       sorter: (a, b) => a.name.localeCompare(b.name),
//       sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
//       ellipsis: true,
//     },
//     {
//       title: 'Soyadı',
//       dataIndex: 'surname',
//       key: 'surname',
//       render: (text, record) => record.surname,
//       sorter: (a, b) => a.surname.localeCompare(b.surname),
//       sortOrder: sortedInfo.columnKey === 'surname' ? sortedInfo.order : null,
//       ellipsis: true,
//     },
//     {
//       title: 'T.C. Kimlik No',
//       dataIndex: 'tckno',
//       key: 'tckno',
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//     },
//     {
//       title: 'Telefon Numarası',
//       dataIndex: 'phone',
//       key: 'phone',
//     },
//     {
//       title: 'Adres',
//       dataIndex: 'address',
//       key: 'address',
//     },
//     {
//       title: 'İşlem',
//       key: 'action',
//       render: (text, record) => (
//         <Space size="middle">
//           <Button onClick={() => handleDelete(record.id)} danger>
//             Sil
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Space style={{ marginBottom: 16 }}>
//         <h3>Üye Ara</h3>
//         <Input
//           placeholder="Üye ad ve soyadıyla ara"
//           onChange={handleSearch}
//           style={{ width: 200 }}
//         />
//       </Space>
//       <Table columns={columns} dataSource={result} onChange={handleChange} />
//       <Modal
//         title="Üye Sil"
//         visible={deleteConfirmVisible}
//         onOk={handleConfirmDelete}
//         onCancel={handleCancelDelete}
//         okText="Sil"
//         cancelText="İptal"
//       >
//         <p>Üyeyi silmek istediğinize emin misiniz?</p>
//       </Modal>
//     </>
//   );
// };

// export default MemberDeleted;