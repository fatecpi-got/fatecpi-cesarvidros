export const fetchBudget = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    name: "João Silva",
                    email: "joao.silva@example.com",
                    phone: "(11) 98765-4321",
                    productType: "Janela de vidro",
                    dimensions: "1.5m x 2.0m",
                    additionalDetails: "Gostaria de vidro temperado com isolamento acústico.",
                    status: 'success'
                },
                {
                    name: "Maria Oliveira",
                    email: "maria.oliveira@example.com",
                    phone: "(21) 99999-8888",
                    productType: "Porta de vidro",
                    dimensions: "0.9m x 2.1m",
                    additionalDetails: "Preciso de uma porta deslizante para sala.",
                    status: 'pending'
                },
                {
                    name: "Carlos Pereira",
                    email: "carlos.pereira@example.com",
                    phone: "(31) 98888-7777",
                    productType: "Box para banheiro",
                    dimensions: "1.2m x 1.8m",
                    additionalDetails: "Preferência por vidro transparente e perfil cromado.",
                    status: 'failed'
                },
                {
                    name: "Ana Costa",
                    email: "ana.costa@example.com",
                    phone: "(41) 97777-6666",
                    productType: "Guarda-corpo de vidro",
                    dimensions: "3.0m x 1.0m",
                    additionalDetails: "Necessário instalação em área externa.",
                    status: 'pending'
                },
                {
                    name: "Pedro Santos",
                    email: "pedro.santos@example.com",
                    phone: "(51) 96666-5555",
                    productType: "Espelho decorativo",
                    dimensions: "2.0m x 1.5m",
                    additionalDetails: "Com moldura minimalista na cor preta.",
                    status: 'success'
                }
            ])
        }, 1000)
    })
}