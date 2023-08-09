import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // You can add any global behavior or layout components here
  useEffect(() => {
    // You can perform any initialization here
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
