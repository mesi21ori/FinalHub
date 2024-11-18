
import CreateSubscriptionForm from '../components/CreateSubscriptionPlan';
import { useState } from 'react';

import '../src/app/globals.css'; 
import Layout from './testn';
import FileUpload from '../components/FileUpload';

const CreateSubscription: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
          <FileUpload/>
    </Layout>
  );
};

export default CreateSubscription;


