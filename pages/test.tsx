
import CreateSubscriptionForm from '../components/CreateSubscriptionPlan';
import { useState } from 'react';
import Layout from '../components/PadminMenu';
import '../src/app/globals.css'; 

const CreateSubscription: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
          <CreateSubscriptionForm/>
    </Layout>
  );
};

export default CreateSubscription;


