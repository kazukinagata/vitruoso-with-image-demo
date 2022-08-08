import { Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { VariableSizeList, ListOnItemsRenderedProps } from "react-window";
import {
  generateMessages,
  initialData,
  Message,
} from "../components/messages/utils";
import AutoSizer from "react-virtualized-auto-sizer";
import { WithImageMessage } from "../components/messages/WithImageMessage";

const SIZE = 20;
let scrolledOnMount = false;

interface RowProps {
  data: Message[];
  index: number;
  setSize: (index: number | string, size: number) => void;
}
const Row: React.FC<RowProps> = ({ data, index, setSize }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
  const message = data[index];
  useEffect(() => {
    if (rowRef.current) {
      setSize(message.id, rowRef.current.getBoundingClientRect().height);
    }
  }, [setSize, message]);

  return (
    <div
      ref={rowRef}
      style={{
        backgroundColor: isEven ? "rgba(0, 0, 255, .1)" : "transparent",
      }}
    >
      <WithImageMessage item={data[index]} index={index} />
    </div>
  );
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ReactWindowSimple: NextPage = () => {
  const listRef = useRef<VariableSizeList>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [prepending, setPrepending] = useState(false);
  const [prependedNum, setPrependedNum] = useState<{ num: number }>();

  useEffect(() => {
    setMessages(initialData);
  }, []);

  // const onClickAppend = () => {
  //   setMessages((prev) => [...prev, ...generateMessages(1, prev.length - 1)]);
  // };

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

  const handleItemsRendered = useCallback(
    async ({ visibleStartIndex }: ListOnItemsRenderedProps) => {
      // console.log({ visibleStartIndex });
      if (!scrolledOnMount) return;
      if (visibleStartIndex < 1 && !prepending) {
        await prependItems();
        listRef.current?.scrollToItem(visibleStartIndex + SIZE);
      }
    },
    [prepending]
  );

  const sizeMap = useRef<Record<string | number, number>>({});
  const setSize = useCallback((id: string | number, size: number) => {
    sizeMap.current = { ...sizeMap.current, [id]: size };
    listRef.current?.resetAfterIndex(0);
  }, []);
  const getSize = (index: number) => {
    const message = messages[index];
    return sizeMap.current[message.id]
      ? sizeMap.current[message.id]
      : message.image
      ? 600
      : 100;
  };

  useEffect(() => {
    if (!messages.length) return;
    if (scrolledOnMount) return;
    if (!listRef.current) return;
    listRef.current.scrollToItem(messages.length - 1);
    scrolledOnMount = true;
  }, [messages.length]);

  return (
    <Container maxWidth={"md"} height="640px">
      <p>items: {messages.length}</p>

      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeList
            ref={listRef}
            height={height}
            width={width}
            itemCount={messages.length}
            itemSize={getSize}
            onItemsRendered={handleItemsRendered}
            itemData={messages}
          >
            {({ data, index, style }) => (
              <div style={style}>
                <Row data={data} index={index} setSize={setSize} />
              </div>
            )}
          </VariableSizeList>
        )}
      </AutoSizer>
    </Container>
  );
};

export default ReactWindowSimple;
