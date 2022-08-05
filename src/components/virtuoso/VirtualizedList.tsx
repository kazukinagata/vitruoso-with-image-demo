import { Virtuoso } from "react-virtuoso";
import { Message } from "../messages/utils";
import { WithImageMessage } from "../messages/WithImageMessage";

export const VirtualizedList: React.FC<{
  height?: string | number;
  width?: string | number;
  messages: Message[];
  firstItemIndex?: number;
  startReached: () => void;
}> = ({ width, height, messages, firstItemIndex, startReached }) => {
  return (
    <Virtuoso
      style={{ height, width }}
      data={messages}
      itemContent={(index, data) => (
        <WithImageMessage item={data} index={index} />
      )}
      alignToBottom
      followOutput
      firstItemIndex={firstItemIndex}
      initialTopMostItemIndex={{ index: "LAST" }}
      // isScrolling={setIsScrolling}
      atTopStateChange={(atTop) => {
        console.log("atTopStateChange called", { atTop });
      }}
      atBottomStateChange={(atBottom) => {
        console.log("atBottomStateChange called", { atBottom });
      }}
      endReached={(index) => {
        console.log("endReached called", { index });
      }}
      startReached={startReached}
    />
  );
};
