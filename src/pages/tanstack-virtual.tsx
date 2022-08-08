import { Container, HStack, Button, chakra } from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import {
  generateMessages,
  initialData,
  Message,
} from "../components/messages/utils";
import { VirtualizedList } from "../components/tanstack-virtual/VitrualizedList";
import { Layout } from "../Layout";

let scrolledOnMount = false;
const SIZE = 20;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  const prependItems = async () => {
    setPrepending(true);
    await sleep(1000);
    setMessages((prev) => [
      ...generateMessages(SIZE, prev.length - 1),
      ...prev,
    ]);
    setPrependedNum({ num: SIZE });
    setPrepending(false);
  };

  const parentRef = useRef<HTMLDivElement>(null);
  const { getTotalSize, getVirtualItems, scrollToIndex } = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) =>
      messages[index] && messages[index].image ? 600 : 200,
    getItemKey: (index) => messages[index]?.id,
    enableSmoothScroll: false,
    debug: true,
    overscan: 3,
    onChange: async (instance) => {
      console.log("onchange", instance);
      // @ts-ignore
      // NOTE: instace.range is a private field
      const startIndex = instance.range.startIndex;
      if (scrolledOnMount && startIndex < 1 && !prepending) {
        console.log("prependItems!!!");
        await prependItems();
        // @ts-ignore
        console.log("scrollTo", instance.range.startIndex + SIZE);
        // @ts-ignore
        scrollToIndex(instance.range.startIndex + SIZE);
      }
    },
  });
  const items = getVirtualItems();
  const startIndex = items[0]?.index || 0;

  useEffect(() => {
    if (!messages.length) return;
    if (scrolledOnMount) return;
    scrollToIndex(messages.length - 1);
    scrolledOnMount = true;
  }, [scrollToIndex, messages.length]);

  // 上方にページネーションで追加されたらscrooToIndexで位置調整する
  // useEffect(() => {
  //   if (!prependedNum) return;
  //   console.log("scrolle to ", prependedNum.num);
  //   const num = prependedNum.num;
  //   // 何故か +1 した方が位置が合う
  //   scrollToIndex(num + 1);
  //   setPrepending(false);
  // }, [prependedNum, scrollToIndex]);

  return (
    <Layout>
      <Container maxWidth={"md"} height="600px">
        <chakra.h2 fontWeight="bold" fontSize="lg">
          Tanstack Virtual
        </chakra.h2>
        {/* 
        <HStack mb={8}>
          <Button onClick={onClickAppend}>Append</Button>
          <Button onClick={prependItems}>Prepend</Button>
        </HStack> */}
        <p>items: {messages.length}</p>
        <p>overscanStartIndex: {startIndex}</p>
        <VirtualizedList
          messages={messages}
          parentRef={parentRef}
          getTotalSize={getTotalSize}
          getVirtualItems={getVirtualItems}
        />
      </Container>
    </Layout>
  );
};

export default TanstackVirtual;
