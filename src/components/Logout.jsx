import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {BiPowerOff} from 'react-icons/bi'

export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        navigate('/login');
    };
  return (
    <Button onClick={handleClick}>
        <BiPowerOff />
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: #f44336;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  svg {
    color: white;
    font-size: 1.5rem;
  }

  &:hover {
    background-color: #d32f2f;
  }

  &:focus {
    outline: none;
  }
`;