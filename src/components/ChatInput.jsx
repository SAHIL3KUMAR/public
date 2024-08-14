import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';

export default function ChatInput({ handleSendMsg }) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");
  
  const handleEmojiPicker = (e) => {
    e.preventDefault();
    setShowEmoji(!showEmoji);
  };

  const handleEmojiClick = ( emojiData , event) => {
    // event.preventDefault();
    console.log(emojiData.emoji);
    let Message = msg;
    Message += emojiData.emoji
    setMsg(Message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={(e)=>handleEmojiPicker(e)} />
          {showEmoji && (
              <EmojiPicker onEmojiClick={handleEmojiClick} className='emoji-picker-react' />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)} > 
        <input
          type="text"
          placeholder="Type here..."
          value={msg}
          onClick={(e) => setShowEmoji(false)}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: transparent;
  border-top: 1px solid #3e3e3e;
  position: relative;

  .button-container {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 0.5rem;

    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -500px; /* Adjust this value as needed */
        z-index: 100;
        background-color: #080420 !important;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }

  .input-container {
    display: flex;
    align-items: center;
    flex-grow: 1;

    input {
      flex-grow: 1;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem 0 0 0.5rem;
      outline: none;
      background-color: #3e3e3e;
      color: white;
      height: 2.5rem; // Match the button height

      &::placeholder {
        color: #b9b9b9;
      }
    }

    button.submit {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;
      margin-right: 0.8rem;
      border: none;
      border-radius: 0 0.5rem 0.5rem 0;
      background-color: #00aaff;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s ease;
      height: 2.5rem; // Define button height

      &:hover {
        background-color: #0077cc;
      }

      svg {
        font-size: 1.5rem;
      }
    }
  }
`;
