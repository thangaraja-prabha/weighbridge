import React from 'react';
import DataTable from '../components/DataTable';
import Layout from '../components/Layout';

const Users: React.FC = () => {
  const columns = [
    { key: 'id', label: 'ID', type: 'number' as const },
    { key: 'uname', label: 'Username' },
    { key: 'fname', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'rid', label: 'Role ID', type: 'number' as const },
    { key: 'pid', label: 'Permission ID', type: 'number' as const },
    { key: 'apikey', label: 'API Key' },
    { key: 'udt', label: 'Updated Date', type: 'date' as const }
  ];

  return (
    <Layout>
      <DataTable
        tableName="users"
        columns={columns}
        apiEndpoint="http://localhost:4000/api/tables/users"
        canAdd={false}
        canEdit={false}
        canDelete={false}
      />
    </Layout>
  );
};

export default Users;
