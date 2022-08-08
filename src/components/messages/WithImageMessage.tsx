import { Box, chakra, Image } from "@chakra-ui/react";
import { Message } from "./utils";

interface Props {
  item: Message;
  index?: number;
}
export const WithImageMessage: React.FC<Props> = ({ item, index }) => {
  return (
    <Box bgColor={item.bgColor} p={2}>
      <chakra.h2 fontWeight={"bold"} pb={2}>
        {`${index} ${item.title}`}
      </chakra.h2>
      <chakra.p>{item.body}</chakra.p>
      {item.image && (
        <Box height="480px">
          <Image src={item.image} alt={item.title} width={640} height={480} />
        </Box>
      )}
    </Box>
  );
};
