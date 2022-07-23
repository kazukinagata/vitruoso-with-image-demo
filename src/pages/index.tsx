import { Button, Container, HStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { generateMessages, initialData, Message } from "../messages/utils";
import { VirtualizedList } from "../VirtualizedList";

const SIZE = 20;
const FIRST_ITEM_INDEX = 10000;

const Home: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [firstItemIndex, setFirstItemIndex] =
    useState<number>(FIRST_ITEM_INDEX);
  useEffect(() => {
    setMessages(initialData);
  }, []);

  const onClickAppend = () => {
    setMessages((prev) => [
      ...prev,
      ...generateMessages(SIZE, prev.length - 1),
    ]);
  };

  const onClickPrepend = () => {
    setMessages((prev) => [
      ...generateMessages(SIZE, prev.length - 1),
      ...prev,
    ]);
    setFirstItemIndex((prev) => prev - SIZE);
  };

  return (
    <Container maxWidth={"md"}>
      <HStack mb={8}>
        <Button onClick={onClickAppend}>Append</Button>
        <Button onClick={onClickPrepend}>Prepend</Button>
      </HStack>
      {messages.length && (
        <VirtualizedList
          height={"640px"}
          messages={messages}
          firstItemIndex={firstItemIndex}
        />
      )}
    </Container>
  );
};

export default Home;
