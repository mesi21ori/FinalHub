// pages/institution-list.tsx
import InstitutionList from '../components/InstitutionList';
import { useState } from 'react';
import Layout from '../components/PadminMenu';
import '../src/app/globals.css'; 

const InstitutionListPage: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      <InstitutionList />
    </Layout>
  );
};

export default InstitutionListPage;
