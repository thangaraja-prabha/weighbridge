import React from 'react';
import DataTable from '../components/DataTable';
import Layout from '../components/Layout';

const Materials: React.FC = () => {
  const columns = [
    { key: 'id', label: 'ID', type: 'number' as const },
    { key: 'mname', label: 'Material Name' },
    { key: 'mdetail', label: 'Details' },
    { key: 'apikey', label: 'API Key' },
    { key: 'udt', label: 'Updated Date', type: 'date' as const }
  ];

  return (
    <Layout>
      <DataTable
        tableName="materials"
        columns={columns}
        apiEndpoint="http://localhost:4000/api/tables/materials"
      />
    </Layout>
  );
};

export default Materials;
