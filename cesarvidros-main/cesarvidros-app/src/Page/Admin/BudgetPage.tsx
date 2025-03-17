import React, {lazy} from "react";

const RequestsBudgets = lazy(() => import('../../component/ComponentAdmin/RequestsBudgets/ResquestBudget'))

const BudgetPage = () => {
    return (
        <RequestsBudgets />
    )
}

export default BudgetPage;