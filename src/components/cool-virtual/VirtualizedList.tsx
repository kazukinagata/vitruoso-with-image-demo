import { Item } from "react-cool-virtual";
import { Message } from "../messages/utils";
import { WithImageMessage } from "../messages/WithImageMessage";
import { TextOnlyMessage } from "../messages/TextOnlyMessage";

interface Props {
  messages: Message[];
  outerRef: React.MutableRefObject<HTMLDivElement | null>;
  innerRef: React.MutableRefObject<HTMLDivElement | null>;
  items: Item[];
}
export const VirtualizedList: React.FC<Props> = ({
  messages,
  outerRef,
  innerRef,
  items,
}) => {
  return (
    <div style={{ height: "100%", overflow: "auto" }} ref={outerRef}>
      <div ref={innerRef}>
        {items.length ? (
          items.map(({ index, size, measureRef }) => {
            const data = messages[index];
            return (
              <div
                key={data.id}
                ref={measureRef} // It will measure the item size for us
              >
                <WithImageMessage item={data} index={index} />
              </div>
            );
          })
        ) : (
          <div>⏳ Loading...</div>
        )}
      </div>
    </div>
  );
};
