import React from 'react';
import DataTable from '../components/DataTable';
import Layout from '../components/Layout';

const Customers: React.FC = () => {
  const columns = [
    { key: 'id', label: 'ID', type: 'number' },
    { key: 'cname', label: 'Customer Name' },
    { key: 'cadd', label: 'Address' },
    { key: 'cnum', label: 'Phone Number' },
    { key: 'crem', label: 'Remarks' },
    { key: 'apikey', label: 'API Key' },
    { key: 'udt', label: 'Updated Date', type: 'date' }
  ];

  return (
    <Layout>
      <DataTable
        tableName="customers"
        columns={columns}
        apiEndpoint="http://localhost:4000/api/tables/customers"
      />
    </Layout>
  );
};

export default Customers;
