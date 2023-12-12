import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { api } from "../../api";
import { getPosterUrl } from "../../utils";

export type SearchCardProps = api.QueryResult;

export const SearchCard: FC<SearchCardProps> = (props) => {
  return (
    <Card>
      <CardBody display="grid" gap={4} gridTemplateColumns="1fr 1fr">
        <Image
          src={getPosterUrl(props.poster_path, 154)}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          w={{ base: "3rem", xs: "5rem" }}
        />
        <Stack spacing="3">
          <Heading size="md">{props.title}</Heading>
          <Text>{props.overview}</Text>
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
