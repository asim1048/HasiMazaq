import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import * as EmailValidator from "email-validator";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { query, serverTimestamp, where } from "firebase/firestore";
import Loader from "./Loader";
import Chat from "./Chat";

function Sidebar() {
  const [user, loading]: any = useAuthState(auth);

  const q = query(
    collection(db, "chats"),
    where("users", "array-contains", user.email)
  );
  const [chatsSnapshot, chatsLoading] = useCollection(q);

  if (loading) return <Loader />;

  const chatAlreadyExists = async (email: any) =>
    !!chatsSnapshot?.docs.find(
      (chat: any) =>
        chat.data().users.find((user: any) => user === email)?.length > 0
    );

  const createChat = async () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return alert("Please enter a email address");
    if (input === user.email)
      return alert("Masti krr reya ein, koi aur email daal");
    if (!EmailValidator.validate(input))
      return alert("Please enter a valid email address");
    if (await chatAlreadyExists(input)) return alert("Chat already exists");

    user &&
      (await addDoc(collection(db, "chats"), {
        users: [user.email, input],
        // lastSeen: serverTimestamp(),
        // photoURL: user.photoURL,
      }));
  };

  // a.manzoor743@gmail.com

  const logout = () => {
    signOut(auth);
  };

  return (
    <Container>
      <Header>
        <UserAvatar src={user?.photoURL} onClick={logout} />
        <IconContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <SideabarButton onClick={createChat}>Start a new chat</SideabarButton>

      {/* List of chats */}
      {chatsLoading ? (
        <Loader height="100px" />
      ) : (
        chatsSnapshot?.docs.map((chat: any) => (
          <Chat
            key={chat.id}
            id={chat.id}
            users={chat.data().users}
            user={user}
          />
        ))
      )}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  width: 30%;
`;
// const Container = styled.div``;

const SideabarButton = styled(Button)`
  width: 100%;
  color: #000;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  margin: 16px;
  padding: 7px;
  border-radius: 2px;
  background-color: #e9eaeb77;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  background-color: #e9eaeb44;
  padding-left: 15px;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 50px;
  border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
  margin: 10px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconContainer = styled.div``;
