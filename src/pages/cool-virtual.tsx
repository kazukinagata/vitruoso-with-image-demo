import { Button, chakra, Container, HStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import useVirtual from "react-cool-virtual";
import { VirtualizedList } from "../components/cool-virtual/VirtualizedList";
import {
  generateMessages,
  initialData,
  Message,
} from "../components/messages/utils";
import { Layout } from "../Layout";

const SIZE = 20;
let scrolledOnMount = false;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const fetchData = async (setMessages: Dispatch<SetStateAction<Message[]>>) => {
  await sleep(500);
  setMessages((prev) => [...generateMessages(SIZE, prev.length - 1), ...prev]);
};

const CoolVirtual: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prepending, setPrepending] = useState(false);
  useEffect(() => {
    setMessages(initialData);
  }, []);

  const onClickAppend = () => {
    setMessages((prev) => [...prev, ...generateMessages(1, prev.length - 1)]);
  };

  const { outerRef, innerRef, items, startItem, scrollToItem } =
    useVirtual<HTMLDivElement>({
      itemCount: messages.length,
      itemSize: 256, // The unmeasured item sizes will refer to this value (default = 50)
      onScroll: ({ scrollForward, scrollOffset }) => {
        // Tweak the threshold of data fetching that you want
        if (!scrollForward && scrollOffset < 50 && !prepending) {
          setPrepending(true);
          fetchData(setMessages);
        }
      },
    });

  useEffect(() => {
    if (scrolledOnMount) return;
    if (!messages.length) return;
    console.log("scrollToItem", messages.length - 1);
    scrollToItem(messages.length - 1);
    scrolledOnMount = true;
  }, [scrollToItem, messages]);

  useLayoutEffect(() => {
    // After the list updated, maintain the previous scroll position for the user
    startItem(SIZE, () => {
      console.log("startItem called", SIZE);
      setPrepending(false);
    });
  }, [startItem]);

  // console.log({ messages });

  return (
    <Layout>
      <Container maxWidth={"md"} height="600px">
        <chakra.h2 fontWeight="bold" fontSize="lg">
          React Cool Virtual
        </chakra.h2>
        {/* <HStack mb={8}>
          <Button onClick={onClickAppend}>Append</Button>
          <Button
            onClick={() => {
              scrollToItem(messages.length - 1);
            }}
          >
            Scroll to bottom
          </Button>
        </HStack> */}
        <p>items: {messages.length}</p>
        <VirtualizedList
          messages={messages}
          outerRef={outerRef}
          innerRef={innerRef}
          items={items}
        />
      </Container>
    </Layout>
  );
};

export default CoolVirtual;
