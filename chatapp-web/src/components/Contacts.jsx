/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  AiOutlineUsergroupAdd,
  AiOutlineUserAdd,
  AiOutlineSearch,
} from "react-icons/ai";

import Logout from "./Logout";
import { Avatar } from "antd";

export default function Contacts({
  contacts,
  constactsgroups,
  changeChat,
  openModal,
}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [selectedGroup, setSelectedGroup] = useState(false);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    setSelectedGroup(false);
    changeChat(contact, false);
  };
  const changeCurrentChatGroup = (index, contact) => {
    setCurrentSelected(index);
    setSelectedGroup(true);
    changeChat(contact, true);
   
  };

  const handleOpenModalGroup = (isModalOpen) => {
    openModal(isModalOpen);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <div className="avatar">
              <img
                src={`https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png`}
                alt="avatar"
              />
            </div>
            <div className="findFriend">
              <AiOutlineSearch size={26} className="icon-default" />
              <input
                type="text"
                placeholder="Search"
                name="textsearch"
                className="input_search"
              />
            </div>

            <div className="group_btn">
              <button className="btn-default">
                <AiOutlineUserAdd size={26} className="icon-default" />
              </button>
              <button className="btn-default">
                <AiOutlineUsergroupAdd
                  size={26}
                  className="icon-default"
                  onClick={() => handleOpenModalGroup(true)}
                />
              </button>
            </div>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    selectedGroup
                      ? ""
                      : index === currentSelected
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <Avatar
                      size={40}
                      icon={<img src={`${contact.avatarImage}`} />}
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
            {constactsgroups.map((contactgroup, index) => {
              return (
                <div
                  key={contactgroup._id}
                  className={`contact ${
                    selectedGroup
                      ? index === currentSelected
                        ? "selected"
                        : ""
                      : ""
                  }`}
                  onClick={() => changeCurrentChatGroup(index, contactgroup)}
                >
                  <div className="avatar">
                    <Avatar
                      size={40}
                      icon={<img src={`${contactgroup.avatarImage}`} />}
                    />
                  </div>
                  <div className="username">
                    <h3>{contactgroup.groupname}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="Logout">
            <Logout />
            {/* <div className="avatar">
              <img
                // src={`${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div> */}
          </div>
          <div></div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    margin: 0px 20px;
    gap: 1rem;
    justify-content: space-between;

    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
    .findFriend,
    .group_btn {
      display: flex;
      align-items: center;
    }
    .input_search {
      height: 28px;
      margin: 0 5px;
    }
    .btn-default {
      background-color: #080420;
      border: none;
      border-radius: 10px;
      padiding: 5px;
      margin: 5px;
    }
    .btn-default: hover {
      cursor: pointer;
      background-color: #ffff;
    }
    .icon-default {
      color: #fff;
      border-radius: 10px;
      magin: 0;
    }
    .icon-default: hover {
      color: #080420;
      background-color: #ffff;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3,
        h2 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .Logout {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
