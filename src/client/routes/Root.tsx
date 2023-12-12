import { Flex, Image } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { QueryForm } from "../components/QueryForm/QueryForm";

export const Component = () => {
  return (
    <Flex px={2} py={4} direction="column" align="center">
      <Image src="/logo.svg" maxW="90%" maxH="25vh" aspectRatio={1} />
      <QueryForm />

      <Outlet />
    </Flex>
  );
};
