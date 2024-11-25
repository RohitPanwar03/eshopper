import React from 'react'
import Footer from './Footer';
import Header from './Header';
import { Toaster } from "react-hot-toast"

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main style={{ minHeight: "70vh" }}>
                {children}
            </main>
            <Toaster />
            <Footer />
        </>
    )
}

export default Layout
