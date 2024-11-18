
import { useState } from 'react';
import '../src/app/globals.css'; 
import Layout from './testn';
import ContentList from '../components/ContentList';

const CreateSubscription: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
          <ContentList/>
    </Layout>
  );
};

export default CreateSubscription;


