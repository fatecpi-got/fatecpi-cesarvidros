import React, {lazy} from "react";
import { Layout } from 'antd';

import { ResponsiveNav } from "../../component/Aside/Aside";
const RequestsBudgets = lazy(() => import('../../component/ComponentAdmin/RequestsBudgets/ResquestBudget'))

const paths = [
    {name: 'Home', path: '/'},
    {name: 'Budgets', path: '/admin'},
    {name: 'Dashboard', path: '/admin/dashboard'}
]

const BudgetPage = () => {
    return (
        <Layout>
            <ResponsiveNav paths={paths}/>
            <Layout.Content>
                <RequestsBudgets/>
            </Layout.Content>
        </Layout>
    )
}

export default BudgetPage;