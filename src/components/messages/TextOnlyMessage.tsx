import { chakra, Box } from "@chakra-ui/react";
import { Message } from "./utils";

interface Props {
  item: Message;
  isScrolling?: boolean;
}
export const TextOnlyMessage: React.FC<Props> = ({ item }) => {
  return (
    <Box bgColor={item.bgColor}>
      <chakra.h2>{item.title}</chakra.h2>
      <Box display={"flex"}>
        <Box>{item.body}</Box>
      </Box>
    </Box>
  );
};
