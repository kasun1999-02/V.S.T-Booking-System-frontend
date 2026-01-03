import React, { useState, useEffect } from 'react';
import { Table, Button, message, Tag } from 'antd';
import axios from 'axios';
import { DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const Admin = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    retrievePosts();
  }, []);

  const retrievePosts = () => {
    axios.get("http://localhost:5000/posts").then((res) => {
      if (res.data.success) {
        setPosts(res.data.existingPosts);
      }
    });
  };

  const onDelete = (id) => {
    console.log(id);
    axios.delete(`http://localhost:5000/post/${id}`).then((res) => {
      message.success('Deleted Successfully');
      retrievePosts();
    });
  };

  const onApprove = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/post/${id}/approve`);
      if (res.data.success) {
        message.success('Reservation approved successfully');
        retrievePosts();
      }
    } catch (error) {
      message.error('Failed to approve reservation');
      console.error(error);
    }
  };

  const onReject = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/post/${id}/reject`);
      if (res.data.success) {
        message.success('Reservation rejected successfully');
        retrievePosts();
      }
    } catch (error) {
      message.error('Failed to reject reservation');
      console.error(error);
    }
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      pending: { color: 'orange', text: 'Pending' },
      approved: { color: 'green', text: 'Approved' },
      rejected: { color: 'red', text: 'Rejected' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns = [
    { title: '#', key: 'index', render: (text, record, index) => index + 1 },
    { title: 'Full Name', dataIndex: 'fullname', key: 'fullname' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone Number', dataIndex: 'phonenumber', key: 'phonenumber' },
    { title: 'Vehicle Type', dataIndex: 'vehicaletype', key: 'vehicaletype' },
    { title: 'Vehicle Number', dataIndex: 'vehicalenumber', key: 'vehicalenumber' },
    { title: 'Service', dataIndex: 'selectservice', key: 'selectservice' },
    { title: 'Branch', dataIndex: 'branch', key: 'branch' },
    { title: 'Date', dataIndex: 'fromdate', key: 'fromdate' },
    { title: 'Comments', dataIndex: 'comments', key: 'comments', ellipsis: true },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => getStatusTag(status || 'pending')
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {record.status !== 'approved' && (
            <Button 
              type="primary" 
              success
              onClick={() => onApprove(record._id)}
              icon={<CheckOutlined />}
              style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
            >
              Approve
            </Button>
          )}
          {record.status !== 'rejected' && (
            <Button 
              type="primary" 
              danger
              onClick={() => onReject(record._id)}
              icon={<CloseOutlined />}
            >
              Reject
            </Button>
          )}
          <Button 
            type="primary" 
            danger 
            onClick={() => onDelete(record._id)}
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{backgroundImage: "url('https://images.unsplash.com/photo-1616322956650-f5314607332a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
      <div className="min-h-screen bg-black bg-opacity-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Appointment Details
          </h1>
          <div className="bg-gray-800 bg-opacity-75 rounded-lg shadow-xl p-6">
            <Table 
              columns={columns} 
              dataSource={posts}
              rowKey="_id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: true }}
              className="admin-table"
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .admin-table {
          color: white;
        }
        .admin-table .ant-table {
          background-color: transparent;
          color: white;
        }
        .admin-table .ant-table-thead > tr > th {
          background-color: rgba(45, 55, 72, 0.8);
          color: white;
        }
        .admin-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid rgba(74, 85, 104, 0.8);
        }
        .admin-table .ant-table-tbody > tr:hover > td {
          background-color: rgba(74, 85, 104, 0.8) !important;
        }
        .admin-table .ant-table-tbody > tr > td {
          background-color: transparent !important;
        }
        .admin-table .ant-pagination-item {
          background-color: rgba(74, 85, 104, 0.8);
          border-color: #718096;
        }
        .admin-table .ant-pagination-item-active {
          border-color: #63b3ed;
        }
        .admin-table .ant-pagination-item a {
          color: white;
        }
        .admin-table .ant-pagination-prev .ant-pagination-item-link,
        .admin-table .ant-pagination-next .ant-pagination-item-link {
          background-color: rgba(74, 85, 104, 0.8);
          color: white;
          border-color: #718096;
        }
      `}</style>
    </div>
  );
};

export default Admin;