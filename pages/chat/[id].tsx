import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import Head from "next/head";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import { getRecepientEmail } from "../../utils/getRecepientEmail";

function Chat({ chat, messages }: any) {
  const [user, loading]: any = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>Chat with {getRecepientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />

      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context: any) {
  const docRef = doc(db, "chats", context.query.id);

  // PREP the messages on the server
  const q = query(collection(docRef, "messages"), orderBy("timestamp", "asc"));
  const docSnap = await getDocs(q);

  const messages = docSnap.docs
    .map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages: any) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  // PREP the chats
  const chatRes = await getDoc(docRef);
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  console.log(chat, messages);

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
