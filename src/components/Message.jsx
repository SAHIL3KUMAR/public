import React from 'react'
import styled from 'styled-components'

export default function Message() {
  return (
    <Container>Message</Container>
  )
}

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  max-height: 70vh;

  .message {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    max-width: 60%;
    
    &.sent {
      align-self: flex-end;
      .content {
        background-color: #4f4ffc;
        color: white;
      }
    }

    &.received {
      align-self: flex-start;
      .content {
        background-color: #e4e6eb;
        color: black;
      }
    }
    
    .content {
      padding: 0.75rem;
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      p {
        margin: 0;
      }
      span {
        font-size: 0.75rem;
        align-self: flex-end;
        color: #777;
      }
    }
  }
`;
