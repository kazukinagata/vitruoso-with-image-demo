import { chakra, Box } from "@chakra-ui/react";
import { Message } from "./utils";

interface Props {
  item: Message;
  index?: number;
}
export const TextOnlyMessage: React.FC<Props> = ({ item, index }) => {
  return (
    <Box bgColor={item.bgColor} p={2}>
      <chakra.h2 fontWeight={"bold"}>{`${item.title}`}</chakra.h2>
      <Box display={"flex"}>
        <Box>{item.body}</Box>
      </Box>
    </Box>
  );
};
