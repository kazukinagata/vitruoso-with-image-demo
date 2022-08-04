import { Box, chakra, Image } from "@chakra-ui/react";
import { Message } from "./utils";

interface Props {
  item: Message;
}
export const WithImageMessage: React.FC<Props> = ({ item }) => {
  return (
    <Box bgColor={item.bgColor}>
      <chakra.h2>{item.title}</chakra.h2>
      <chakra.p>{item.body}</chakra.p>
      {item.image && (
        <Box>
          <Image src={item.image} alt={item.title} width={640} height={480} />
        </Box>
      )}
    </Box>
  );
};
