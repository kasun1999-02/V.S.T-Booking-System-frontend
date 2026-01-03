import React, { useState, useEffect } from 'react';
import { Table, Tag, message } from 'antd';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const UserHome = () => {
  const [posts, setPosts] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
      retrievePosts(email);
    } else {
      message.warning('Please login to view your reservations');
    }
  }, []);

  const retrievePosts = (email) => {
    if (!email) return;
    
    axios.get(`http://localhost:5000/posts/user/${encodeURIComponent(email)}`)
      .then((res) => {
        if (res.data.success) {
          setPosts(res.data.existingPosts);
        }
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
        message.error('Failed to load your reservations');
      });
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
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow bg-gray-800 bg-opacity-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            My Reservations
          </h1>
          {userEmail && (
            <p className="text-white text-center mb-4">
              Viewing reservations for: <strong>{userEmail}</strong>
            </p>
          )}
          <div className="bg-gray-800 bg-opacity-75 rounded-lg shadow-xl p-6 mb-4">
            <div className="flex justify-center items-center mb-4">
              <Link 
                to="/reservation" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Book New Reservation
              </Link>
            </div>
            {posts.length === 0 ? (
              <div className="text-center text-white py-8">
                <p>No reservations found. Book a reservation to see it here!</p>
                <Link 
                  to="/reservation" 
                  className="text-blue-400 hover:text-blue-300 underline mt-4 inline-block"
                >
                  Book Now
                </Link>
              </div>
            ) : (
              <Table 
                columns={columns} 
                dataSource={posts}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: true }}
                className="admin-table"
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
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

export default UserHome;
