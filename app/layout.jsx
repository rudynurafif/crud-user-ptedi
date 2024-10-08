'use client'

import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import { HelmetProvider } from 'react-helmet-async';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <HelmetProvider>
          <Layout>
            {children}
            <ToastContainer />
          </Layout>
        </HelmetProvider>
      </body>
    </html>
  );
}
