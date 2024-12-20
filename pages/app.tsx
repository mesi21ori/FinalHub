// // src/pages/_app.tsx
// import { SessionProvider } from 'next-auth/react';
// import { AppProps } from 'next/app';
// import '../src/app/globals.css';
// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <SessionProvider session={pageProps.session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// }

// export default MyApp;

import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import '../src/app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

// Use the proper type for the context parameter
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);  // Get the session server-side
  return {
    props: {
      session,  // Pass the session to your page
    },
  };
}

export default MyApp;
