import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { Message } from "../messages/utils";
import { WithImageMessage } from "../messages/WithImageMessage";

interface Props {
  messages: Message[];
  parentRef: React.RefObject<HTMLDivElement>;
  getTotalSize: () => number;
  getVirtualItems: () => VirtualItem<unknown>[];
}

export const VirtualizedList: React.FC<Props> = ({
  messages,
  parentRef,
  getTotalSize,
  getVirtualItems,
}) => {
  return (
    <>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: getTotalSize(),
            width: "100%",
            position: "relative",
          }}
        >
          {getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              ref={virtualRow.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <WithImageMessage
                item={messages[virtualRow.index]}
                index={virtualRow.index}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
