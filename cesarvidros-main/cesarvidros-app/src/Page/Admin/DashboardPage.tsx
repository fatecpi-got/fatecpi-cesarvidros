import React, {lazy} from "react";

import { Layout } from 'antd';

import { ResponsiveNav } from "../../component/Aside/Aside";
const DashboardPanel = lazy(() => import('../../component/ComponentAdmin/Dashboard/DashboardPanel/DashboardPanel'))

const paths = [
    {name: 'Home', path: '/'},
    {name: 'Budgets', path: '/admin'},
    {name: 'Dashboard', path: '/admin/dashboard'}
]

const DashboardPage = () => {
    return (
        <Layout>
            <ResponsiveNav paths={paths}/>
            <Layout>
                <DashboardPanel />
            </Layout>
        </Layout>
    )
}

export default DashboardPage;