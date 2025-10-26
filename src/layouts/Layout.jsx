import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
            <Header />
            <main className="grow">
                {children}
            </main>
            <Footer />
            <BackToTop/>
        </div>
    );
}
