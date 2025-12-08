import React from 'react';
import DataTable from '../components/DataTable';
import Layout from '../components/Layout';

const Transporters: React.FC = () => {
  const columns = [
    { key: 'id', label: 'ID', type: 'number' as const },
    { key: 'tnum', label: 'Transporter Number' },
    { key: 'tname', label: 'Transporter Name' },
    { key: 'tadd', label: 'Address' },
    { key: 'tmob', label: 'Mobile Number' },
    { key: 'trem', label: 'Remarks' },
    { key: 'apikey', label: 'API Key' },
    { key: 'udt', label: 'Updated Date', type: 'date' as const }
  ];

  return (
    <Layout>
      <DataTable
        tableName="transporters"
        columns={columns}
        apiEndpoint="http://localhost:4000/api/tables/transporters"
      />
    </Layout>
  );
};

export default Transporters;
