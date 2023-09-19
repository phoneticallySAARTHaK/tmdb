import { Flex, Grid, Image } from "@chakra-ui/react";
import { LoaderFunction } from "react-router-dom";
import { QueryInput } from "../components/QueryInput/QueryInput";

export const Component = () => {
  return (
    <Flex px={2} py={4} direction="column" align="center">
      <Image src="/logo.svg" maxW="90%" maxH="30vh" aspectRatio={1} />

      <QueryInput />

      <Grid></Grid>
    </Flex>
  );
};

export const loader: LoaderFunction = ({ request }) => {
  return null;
};
