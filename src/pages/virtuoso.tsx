import { Button, chakra, Container, HStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  generateMessages,
  initialData,
  Message,
} from "../components/messages/utils";
import { VirtualizedList } from "../components/virtuoso/VirtualizedList";
import { Layout } from "../Layout";

const SIZE = 20;
const FIRST_ITEM_INDEX = 10000;

const Virtuoso: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [firstItemIndex, setFirstItemIndex] =
    useState<number>(FIRST_ITEM_INDEX);
  useEffect(() => {
    setMessages(initialData);
  }, []);

  const onClickAppend = () => {
    setMessages((prev) => [...prev, ...generateMessages(1, prev.length - 1)]);
  };

  const prependItems = () => {
    setTimeout(() => {
      setMessages((prev) => [
        ...generateMessages(SIZE, prev.length - 1),
        ...prev,
      ]);
      setFirstItemIndex((prev) => prev - SIZE);
    }, 1000);
  };

  return (
    <Layout>
      <Container maxWidth={"md"} height="600px">
        <chakra.h2 fontWeight="bold" fontSize="lg">
          React Virtuoso
        </chakra.h2>

        {/* <HStack mb={8}>
          <Button onClick={onClickAppend}>Append</Button>
        </HStack> */}
        {messages.length && (
          <VirtualizedList
            height={"100%"}
            messages={messages}
            firstItemIndex={firstItemIndex}
            startReached={prependItems}
          />
        )}
      </Container>
    </Layout>
  );
};

export default Virtuoso;
