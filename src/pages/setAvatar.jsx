import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIroutes';
import { Buffer } from 'buffer';

const api = "https://api.multiavatar.com/456789";

const SetAvatar = () => {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOption);
      return;
    }
    const user = JSON.parse(localStorage.getItem("chat-app-user"));
    if (!user || !user._id) {
      toast.error("No user found. Please log in again.", toastOption);
      return;
    }

    try {
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate('/');
      } else {
        toast.error("Error setting avatar. Please try again", toastOption);
      }
    } catch (error) {
      toast.error("Error setting avatar. Please try again", toastOption);
      console.error("Error setting avatar:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`, { responseType: 'arraybuffer' });
          const base64Image = Buffer.from(response.data, 'binary').toString('base64');
          data.push(`data:image/svg+xml;base64,${base64Image}`);
        }
        setAvatars(data);
      } catch (error) {
        console.error("Error fetching the images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const checkUser = () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate('/login');
      }
    };

    fetchData();
    checkUser();
  }, [navigate]);

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an avatar as profile picture</h1>
        </div>
        {isLoading ? (
          <img src={loader} alt="loader" />
        ) : (
          <div className="avatars">
            {avatars.map((avatar, idx) => (
              <div
                key={idx}
                className={`avatar ${selectedAvatar === idx ? 'selected' : ''}`}
                onClick={() => setSelectedAvatar(idx)}
              >
                <img src={avatar} alt={`avatar-${idx}`} />
              </div>
            ))}
          </div>
        )}
        <button onClick={setProfilePicture} className="submit-btn">
          Set as Profile Picture
        </button>
      </Container>
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 2rem;
  background-color: #131324;
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        cursor: pointer;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar;
