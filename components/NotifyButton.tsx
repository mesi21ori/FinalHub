import { useRouter } from 'next/router';

export default function NotifyButton() {
  const router = useRouter();

  const handleNotify = async () => {
    try {
      const response = await fetch('/api/institutions/notify-pending', {
        method: 'GET',  // Change to GET request
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      // Redirect to the notification page or show a success message
      router.push('/notify-pending');
    } catch (error) {
      console.error('Failed to notify:', error);
      // Optionally show an error message to the user
    }
  };

  return <button onClick={handleNotify}>Notify Pending Institutions</button>;
}
