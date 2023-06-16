import { AttachFile, MoreVert } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";

function ChatScreen({ chat, messages }: any) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  // const chatsRef = doc(db, "chats", router.query.id);
  // const q = query(
  //   collection(chatsRef, "messages"),
  //   orderBy("timestamp", "asc")
  // );
  // const [messageSnapshot] = useCollection(q);

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>Rec email</h3>
          <p>last seen 3 hours ago</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {/* show messages */}
        <EndOfMessage />
      </MessageContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;
const HeaderIcons = styled.div``;
const MessageContainer = styled.div``;

const EndOfMessage = styled.div``;

//HeaderIcons
