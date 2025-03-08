import React, { useState } from "react";
import '../../styles/Budget/Budget.css'

// I define here the type of the form data
// This will help me to validate the form and to reset the form after submission
interface BudgetFormData {
  name: string;
  email: string;
  phone: string;
  productType: string;
  dimensions: string;
  additionalDetails: string;
}

// Here is the component that will render the form
export const BudgetForm: React.FC = () => {
  // I use the useState hook to store the form data in the component's state
  const [formData, setFormData] = useState<BudgetFormData>({
    name: "",
    email: "",
    phone: "",
    productType: "",
    dimensions: "",
    additionalDetails: "",
  });

  // I use the useState hook to store the form errors in the component's state
  // I use the Partial type to make all properties optional
  const [errors, setErrors] = useState<Partial<BudgetFormData>>({});

  // I define a function to handle the form submission
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // I destructure the name and value from the event target
    const { name, value } = e.target;
    // I take the current form data and update the value of the field that changed
    // the [] notation is used to access the property of the object using a variable
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // I define a function to validate the form
  const validateForm = (): boolean => {
    const { name, email, phone, productType, dimensions } = formData;
    const errors: Partial<BudgetFormData> = {};

    if (!name) {
      errors.name = "O nome é obrigatório";
    }

    if (!email) {
      errors.email = "O e-mail é obrigatório";
    }

    if (!phone) {
      errors.phone = "O telefone é obrigatório";
    }

    if (!productType) {
      errors.productType = "O tipo de produto é obrigatório";
    }

    if (!dimensions) {
      errors.dimensions = "As dimensões são obrigatórias";
    }

    setErrors(errors);

    // The form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate sending the data to the server or displaying a success message
      alert("Orçamento enviado com sucesso!");
      console.log("Dados do formulário:", formData);

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        productType: "",
        dimensions: "",
        additionalDetails: "",
      });
    } else {
      console.log("Erros no formulário:", errors);
    }
  };

  return (
    <div className="budget-form-container">
      <h2>Orçamento Online - César Vidros</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu e-mail"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Digite seu telefone"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="productType">Tipo de Produto:</label>
          <input
            type="text"
            id="productType"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            placeholder="Ex: Janela de vidro, Porta de vidro"
          />
          {errors.productType && (
            <span className="error">{errors.productType}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dimensions">Dimensões (Largura x Altura):</label>
          <input
            type="text"
            id="dimensions"
            name="dimensions"
            value={formData.dimensions}
            onChange={handleChange}
            placeholder="Ex: 1.5m x 2.0m"
          />
          {errors.dimensions && (
            <span className="error">{errors.dimensions}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="additionalDetails">Detalhes Adicionais:</label>
          <textarea
            id="additionalDetails"
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleChange}
            placeholder="Descreva outros detalhes ou especificações"
          />
        </div>

        <button type="submit">Enviar Orçamento</button>
      </form>
    </div>
  );
};

export default BudgetForm;
