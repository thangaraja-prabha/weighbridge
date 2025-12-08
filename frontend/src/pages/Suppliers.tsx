import React from 'react';
import DataTable from '../components/DataTable';
import Layout from '../components/Layout';

const Suppliers: React.FC = () => {
  const columns = [
    { key: 'id', label: 'ID', type: 'number' as const },
    { key: 'sname', label: 'Supplier Name' },
    { key: 'sadd', label: 'Address' },
    { key: 'snum', label: 'Phone Number' },
    { key: 'srem', label: 'Remarks' },
    { key: 'apikey', label: 'API Key' },
    { key: 'udt', label: 'Updated Date', type: 'date' as const }
  ];

  return (
    <Layout>
      <DataTable
        tableName="suppliers"
        columns={columns}
        apiEndpoint="http://localhost:4000/api/tables/suppliers"
      />
    </Layout>
  );
};

export default Suppliers;
