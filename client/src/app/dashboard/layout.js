// src/app/dashboard/layout.js
import React from 'react';
import DashboardNavbar from '../components/DashBoardnavbar'
const DashboardLayout = ({ children }) => {
    return (
        <div>
            <DashboardNavbar />
            <main>
                {children} {/* This will render the content of the specific dashboard page */}
            </main>
        </div>
    );
};

export default DashboardLayout;
