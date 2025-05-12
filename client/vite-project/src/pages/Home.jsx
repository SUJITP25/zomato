import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../comp/Navbar'
import Footer from '../comp/Footer'
export default function Home() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
