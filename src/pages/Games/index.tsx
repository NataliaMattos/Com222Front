import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useColorMode,
  useColorModeValue,
  useToast,
  ButtonGroup,
  Card,
  CardBody,
  Divider,
  CardFooter,
  Text,
  Table,
  Tr,
  Td,
  Skeleton,
} from "@chakra-ui/react";
import { FormEvent, useContext, useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { GameContext } from "../../contexts/game";
import axios from "../../services/axios";

interface GameInterface {
  titulo: string;
  resumo: string;
  genero: string;
  desenvolvedor: string;
  console: string;
  imagem: string;
  avaliacao: number;
}

export default function Games() {
  const [isLoading, setIsLoading] = useState(false);
  const consoleType = window.location.pathname.split('/games/')[1];
  const [games, setGames] = useState<GameInterface[]>([]);
  const navigate = useNavigate();
  const { refresh, setRefresh } = useContext(GameContext);

  useEffect(() => {
    setIsLoading(false);
    axios
      .get("http://localhost:3000/games/bem-avaliados", {
        params: { console: console },
      })
      .then((response) => {
        setGames(response.data);
        setIsLoading(true);
      })
      .finally(() => {
        setIsLoading(true);
      });
  }, [refresh]);

  function handleCard(titulo: string) {
    navigate(`/games/${consoleType}/${titulo}`, {
      state: {
        gameUrl:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      },
    });
  }

  return (
    <Box position="relative" margin="0 auto">
      {isLoading && games.length > 0 ? (
        games.map((elem: GameInterface, i: number) => {
          return (
            <Card maxW="sm" id={i.toString()} onClick={() => {handleCard(elem.titulo)}} cursor="pointer">
              <CardBody>
                <Image
                  src={elem.imagem}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{elem.titulo}</Heading>
                  <Text>{elem.resumo}</Text>
                  <Text>genero: {" " + elem.genero}</Text>
                  <Text>desenvolvedor: {" " + elem.desenvolvedor}</Text>
                  <Heading size="xs">Nota</Heading>
                  <Text fontSize={"20px"}>
                    {elem.avaliacao}
                    <span style={{ fontSize: "15px", color: "gray" }}>/10</span>
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
            </Card>
          );
        })
      ) : isLoading ? (
        <Flex mt="50px" justifyContent={'center'} alignItems={'center'}>
          <Heading size={'md'}>Sem jogos por aqui :(</Heading>
        </Flex>
      ) : (
        <Flex mt="50px" justifyContent={'center'}>
          <Skeleton height="84vh" width={"90vw"} />
        </Flex>
      )}
    </Box>
  );
}
