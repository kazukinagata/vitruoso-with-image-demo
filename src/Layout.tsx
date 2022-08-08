import {
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Stack,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Container maxW="container.lg">
        <Button onClick={onOpen}>Menu</Button>
        {children}
      </Container>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <Stack py={8}>
              <NextLink href="/virtuoso" passHref>
                <Button as={"a"} width="100%">
                  React Virtuoso
                </Button>
              </NextLink>
              <NextLink href="/tanstack-virtual" passHref>
                <Button as={"a"} width="100%">
                  Tanstack Virtual
                </Button>
              </NextLink>
              <NextLink href="/react-window" passHref>
                <Button as={"a"} width="100%">
                  React Window
                </Button>
              </NextLink>
              <NextLink href="/cool-virtual" passHref>
                <Button as={"a"} width="100%">
                  React Cool Virtual
                </Button>
              </NextLink>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
