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
  SimpleGrid,
} from "@chakra-ui/react";
import { FormEvent, useContext, useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { GameContext } from "../../contexts/game";
import SearchBar from "../../componentes/search-bar/search-component";
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
  const consoleType = window.location.pathname.split("/games/")[1];
  const [games, setGames] = useState<GameInterface[]>([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { gamesFilter } = useContext(GameContext);

  useEffect(() => {
    if (gamesFilter && gamesFilter.length > 0) {
      setGames(gamesFilter);
    } else {
      findTop3();
    }
  }, [gamesFilter]);

  function findTop3() {
    setIsLoading(false);
    axios
      .get("http://localhost:3000/games/bem-avaliados", {
        params: { console: consoleType },
      })
      .then((response) => {
        setGames(response.data);
        setIsLoading(true);
      })
      .finally(() => {
        setIsLoading(true);
      });
  }

  function handleCard(titulo: string, imagem: string) {
    navigate(`/games/${consoleType}/${titulo}`, {
      state: {
        gameUrl: `${imagem}`,
      },
    });
  }

  return (
    <>
      {gamesFilter.length === 0 ? (
        <Heading mt={5} ml={5}>
          Top 3 Bem Mais Avaliados - {consoleType}
        </Heading>
      ) : (
        " "
      )}
      {isLoading && games.length > 0 ? (
        <Flex
          position="relative"
          margin="0 auto"
          justifyContent={"space-around"}
        >
          <SimpleGrid columns={3} spacing={10} mt={5}>
            {games.map((elem: GameInterface, i: number) => {
              return (
                <Box>
                  <Card
                    backgroundColor={"#f6f6f6"}
                    maxW="md"
                    id={i.toString()}
                    onClick={() => {
                      handleCard(elem.titulo, elem.imagem);
                    }}
                    cursor="pointer"
                  >
                    <CardBody>
                      <Image
                        borderRadius="lg"
                        border={"solid 1px #16687f"}
                        maxH={"200px"}
                        width={"100%"}
                        objectFit={"cover"}
                        src={elem.imagem}
                        alt="foto jogo"
                      />
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{elem.titulo}</Heading>
                        <Text style={{ color: "gray" }}>{elem.resumo}</Text>
                        <Text>
                          Genero:{" "}
                          <span style={{ color: "gray" }}>
                            {" " + elem.genero}
                          </span>
                        </Text>
                        <Text>
                          Desenvolvedor:{" "}
                          <span style={{ color: "gray" }}>
                            {" " + elem.desenvolvedor}
                          </span>
                        </Text>
                        <Heading size="xs">Nota</Heading>
                        <Text fontSize={"20px"}>
                          {elem.avaliacao}
                          <span style={{ fontSize: "15px", color: "gray" }}>
                            /10{!elem.avaliacao ? " ainda não há reviews " : ""}
                          </span>
                        </Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                  </Card>
                </Box>
              );
            })}
          </SimpleGrid>
        </Flex>
      ) : isLoading ? (
        <Flex mt="50px" justifyContent={"center"} alignItems={"center"}>
          <Heading size={"md"}>Sem jogos por aqui :(</Heading>
        </Flex>
      ) : (
        <Flex mt="50px" justifyContent={"center"}>
          <Skeleton height="300px" width={"80vw"} />
        </Flex>
      )}
    </>
  );
}
