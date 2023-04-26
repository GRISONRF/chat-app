import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { setAvatarRoute } from "../utils/APIRoutes";
import {Buffer} from 'buffer';



export default function SetAvatar() {
    const api = 'https://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position:"bottom-right",
        autoClose: 8000, 
        pauseOnHover: true, 
        draggable: true,
        theme: "dark"
    };

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
          toast.error("Please select an avatar", toastOptions);
        }
        else{
          const user=await JSON.parse(localStorage.getItem("chat-app-user"));
          const {data}=await axios.post(`${setAvatarRoute}/${user._id}`,{
            image:avatars[selectedAvatar],
          });

          console.log(data);

          if(data.isSet){
            user.isAvatatImageSet=true;
            user.avatarImage=data.image;
            localStorage.setItem("chat-app-user",JSON.stringify(user));
            navigate("/");
          }
          else{
            toast.error("Error in setting avatar,Please try again",toastOptions);
          }
        }
    };
    
    
    useEffect(() => {
        const data = [];
        async function fetchData() {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
          setAvatars(data);
          setIsLoading(false);
        }
        for (var i = 0; i < 5; i++) {
          fetchData();
        }
      }, []);
      

      return (
        <>
          {isLoading ? (
            <Container style={{backgroundColor:"black"}}>
              <img src={loader} alt="loader" className="loader" />
            </Container>
          ) : (
            <Container>
              <div className="title-container">
                <h1>Set your profile pic</h1>
                <div className="avatars">
                  {avatars.map((avatar, index) => {
                    return (
                      <div
                        key={index}
                        className={`avatar ${
                          selectedAvatar === index ? "selected" : ""
                        }`}
                      >
                        <img
                          src={`data:image/svg+xml;base64,${avatar}`}
                          alt="avatar"
                          onClick={() => setSelectedAvatar(index)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <button className="submit-btn" onClick={setProfilePicture}>
                Set Profile Pic
              </button>
            </Container>
          )}
          <ToastContainer />
        </>
      );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-direction: column;
  background-color: #131324;
  .loader {
    max-inline-size: 100%;
  }
  .loader{
    width:25vw;
    height:50vh;
    border-radius:50%;
  }
  .title-container {
    h1 {
      color: white;
      text-align: center;
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
      transition: all 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0;
    }
  }
  .submit-btn {
    padding: 0.5rem;
    background-color: purple;
    color: white;
    letter-spacing: 2px;
    border: none;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.3rem;
    transition: all 0.4s;
    &:hover {
      background-color: grey;
      color: white;
    }
  }
`;