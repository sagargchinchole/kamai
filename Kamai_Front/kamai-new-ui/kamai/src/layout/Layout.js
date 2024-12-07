import React from 'react'
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet } from 'react-router-dom';
export default function Layout() {
  return (
    <DashboardLayout defaultSidebarCollapsed= {true}>
        <Outlet/>
    </DashboardLayout>
  )
}
