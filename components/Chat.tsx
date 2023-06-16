import { Avatar } from "@mui/material";
import { collection, where, query } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { db } from "../firebase";
import { getRecepientEmail } from "../utils/getRecepientEmail";

function Chat({ id, users, user }: any) {
  const router = useRouter();
  const [recepientSnapshot] = useCollection(
    query(
      collection(db, "users"),
      where("email", "==", getRecepientEmail(users, user))
    )
  );

  const recepient = recepientSnapshot?.docs?.[0]?.data();

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      {recepient ? (
        <UserAvatar src={recepient?.photoURL} />
      ) : (
        <UserAvatar>{getRecepientEmail(users, user)[0]}</UserAvatar>
      )}
      <p>{getRecepientEmail(users, user)}</p>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
