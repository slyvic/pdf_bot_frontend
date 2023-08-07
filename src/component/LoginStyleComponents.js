import styled from 'styled-components';

export const FormContainer = styled.div`
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormTitle = styled.h2`
  margin-bottom: 20px;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;

  svg {
    margin-right: 10px;
  }
`;

export const FormInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: 10px 5px;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

export const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #0056b3;
  }
`;