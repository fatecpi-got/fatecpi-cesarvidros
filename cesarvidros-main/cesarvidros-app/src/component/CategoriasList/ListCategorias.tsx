import React from "react";
import { CardCategoria } from "../CardCategoria/CardCategoria";
import { useCategoria } from "../../hooks/useCategoria";
import { Layout } from "antd";

import '../../styles/ServicesPage/ServicePage.css'

export const ListCategorias: React.FC = () => {
    const categorias = useCategoria();

    return (
        <Layout.Content className="list-categorias">
            {categorias.map((categoria) => <CardCategoria {...categoria}/>)}
        </Layout.Content>
    )
}