import { Container, HStack, Button } from "@chakra-ui/react";
import { useVirtualizer, Range } from "@tanstack/react-virtual";
import { NextPage } from "next";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  generateMessages,
  initialData,
  Message,
} from "../components/messages/utils";
import { VirtualizedList } from "../components/tanstack-virtual/VitrualizedList";

let scrolledOnMount = false;
const SIZE = 20;

const TanstackVirtual: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prepending, setPrepending] = useState(false);
  const [prependedNum, setPrependedNum] = useState<{ num: number }>();
  useEffect(() => {
    setMessages(initialData);
  }, []);

  const onClickAppend = () => {
    setMessages((prev) => [...prev, ...generateMessages(1, prev.length - 1)]);
  };

  const prependItems = () => {
    setPrepending(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...generateMessages(SIZE, prev.length - 1),
        ...prev,
      ]);
      setPrependedNum({ num: SIZE });
    }, 1000);
  };

  const parentRef = useRef<HTMLDivElement>(null);
  const { getTotalSize, getVirtualItems, scrollToIndex, scrollElement } =
    useVirtualizer({
      count: messages.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 500,
      getItemKey: (index) => messages[index]?.id,
      enableSmoothScroll: false,
      // observeElementOffset: (instance, cb) => {}
    });

  useEffect(() => {
    if (!scrollElement) return;
    if (!scrolledOnMount) return;
    console.log(scrollElement.scrollTop, prepending);
    if (scrollElement.scrollTop < 200 && !prepending) {
      console.log("prependItem!");
      prependItems();
    }
  });
  useEffect(() => {
    if (!messages.length) return;
    if (scrolledOnMount) return;
    scrollToIndex(messages.length - 1);
    scrolledOnMount = true;
  }, [scrollToIndex, messages.length]);

  useEffect(() => {
    if (!prependedNum) return;
    scrollToIndex(SIZE);
    setPrepending(false);
  }, [prependedNum, scrollToIndex]);

  return (
    <Container maxWidth={"md"} height="640px">
      <HStack mb={8}>
        <Button onClick={onClickAppend}>Append</Button>
        <Button onClick={prependItems}>Prepend</Button>
      </HStack>
      <p>items: {messages.length}</p>
      <VirtualizedList
        messages={messages}
        parentRef={parentRef}
        getTotalSize={getTotalSize}
        getVirtualItems={getVirtualItems}
      />
    </Container>
  );
};

export default TanstackVirtual;
