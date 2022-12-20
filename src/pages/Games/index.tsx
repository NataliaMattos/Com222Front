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
  const navigate = useNavigate();
  const { refresh, setRefresh } = useContext(GameContext);

  useEffect(() => {
    setIsLoading(false);
    axios
      .get("http://localhost:3000/games/bem-avaliados", {
        params: { console: consoleType },
      })
      .then((response) => {
        console.log(response.data);
        setGames(response.data);
        setIsLoading(true);
      })
      .finally(() => {
        setIsLoading(true);
      });
  }, [refresh]);

  function handleCard(titulo: string, imagem: string) {
    navigate(`/games/${consoleType}/${titulo}`, {
      state: {
        gameUrl: `${imagem}`,
      },
    });
  }

  return (
    <>
      <Heading mt={5} ml={5}>Top 3 Bem Mais Avaliados - {consoleType}</Heading>
      <Flex position="relative" margin="0 auto" justifyContent={"space-around"}>
        <SimpleGrid columns={3} spacing={10} mt={5}>
          {isLoading && games.length > 0 ? (
            games.map((elem: GameInterface, i: number) => {
              return (
                <Box>
                  <Card
                    maxW="sm"
                    id={i.toString()}
                    onClick={() => {
                      handleCard(elem.titulo, elem.imagem);
                    }}
                    cursor="pointer"
                  >
                    <CardBody>
                      <Box
                        borderRadius="lg"
                        border={"solid 1px #16687f"}
                        objectFit={"cover"}
                        width={"100%"}
                        height={"100px"}
                        display="flex"
                        justifyContent={"center"}
                        backgroundColor="#daf1ff"
                      >
                        <Image
                          height={"100px"}
                          src={elem.imagem}
                          alt="foto jogo"
                        />
                      </Box>
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{elem.titulo}</Heading>
                        <Text>{elem.resumo}</Text>
                        <Text>genero: {" " + elem.genero}</Text>
                        <Text>desenvolvedor: {" " + elem.desenvolvedor}</Text>
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
            })
          ) : isLoading ? (
            <Flex mt="50px" justifyContent={"center"} alignItems={"center"}>
              <Heading size={"md"}>Sem jogos por aqui :(</Heading>
            </Flex>
          ) : (
            <Flex mt="50px" justifyContent={"center"}>
              <Skeleton height="84vh" width={"90vw"} />
            </Flex>
          )}
        </SimpleGrid>
      </Flex>
    </>
  );
}
