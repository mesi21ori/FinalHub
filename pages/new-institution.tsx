
import CreateSubscriptionForm from '../components/CreateSubscriptionPlan';
import { useState } from 'react';
import Layout from '../components/PadminMenu';
import '../src/app/globals.css'; 
import NotifyPendingPage from '../components/notify-pending';

const NotifyPending: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
          <NotifyPendingPage/>
    </Layout>
  );
};

export default NotifyPending;


