import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import {
  FormContainer,
  FormTitle,
  Form,
  FormInputContainer,
  FormInput,
  FormButton,
} from './styles.js';

const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <FormContainer>
      <FormTitle>Login</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormInputContainer>
          <FaUser />
          <FormInput type="text" placeholder="Username" />
        </FormInputContainer>
        <FormInputContainer>
          <FaLock />
          <FormInput type="password" placeholder="Password" />
        </FormInputContainer>
        <FormButton type="submit">Login</FormButton>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;
