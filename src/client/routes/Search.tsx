import { Box, Flex, Grid, Image } from "@chakra-ui/react";
import { Link, LoaderFunction, useLoaderData } from "react-router-dom";
import { api } from "../api";
import { QueryForm } from "../components/QueryForm/QueryForm";
import { SearchCard } from "../components/SearchCard/SearchCard";

export const Component = () => {
  const data = useLoaderData() as api.SearchResponse;
  return (
    <Box>
      <Flex as="header" gap={4} flexWrap={"wrap"} justify="center">
        <Grid as={Link} to="/" w="3rem" placeItems="center">
          <Image src="/small-logo.svg" />{" "}
        </Grid>
        <QueryForm flex="1 0 15rem" mr="auto" maxW="20rem" />
      </Flex>
      <Grid>
        {data.results.map((d) => (
          <SearchCard {...d} />
        ))}
      </Grid>
    </Box>
  );
};

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  return !q ? [] : api.search(q);
};
