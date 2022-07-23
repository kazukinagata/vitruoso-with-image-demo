import { Box, chakra, Image } from "@chakra-ui/react";
import { Message } from "./utils";

interface Props {
  item: Message;
}
export const WithImageMessage: React.FC<Props> = ({ item }) => {
  return (
    <Box bgColor={item.bgColor} mb={8}>
      <chakra.h2 mb={8}>{item.title}</chakra.h2>
      <chakra.p mt={4}>{item.body}</chakra.p>
      <Box>
        <Image src={item.image} alt={item.title} width={640} height={480} />
      </Box>
    </Box>
  );
};
