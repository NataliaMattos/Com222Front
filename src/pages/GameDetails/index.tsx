import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Image,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
  HStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ReviewInterface {
  titulo: string;
  nota: number;
  texto: string;
}

export default function GameDetails() {
  const [review, setReview] = useState<ReviewInterface>({
    titulo: "",
    nota: 0,
    texto: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const gameName = window.location.pathname.split("/")[3].replaceAll('%20'," ");
  const gameUrl = useLocation().state?.gameUrl;
  const [isWaiting, setIsWaiting] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  const toast = useToast();
  const logado = localStorage.getItem("logado");

  useEffect(() => {
    setIsLoading(false);
    axios
      .get("https://backend-trabalho-com222.onrender.com/review", { params: { titulo: gameName } })
      .then((response) => {
        setReviews(response.data);
        setIsLoading(true);
      })
      .finally(() => {
        setIsLoading(true);
      });
  }, [refresh]);

  const handleSubmit = (event: FormEvent) => {
    setIsWaiting(true);
    event.preventDefault();
    axios
      .post(
        "https://backend-trabalho-com222.onrender.com/review",
        {
          titulo: gameName,
          nota: review.nota,
          texto: review.texto,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("logado")}`,
          },
        }
      )
      .then(() => {
        setRefresh(!refresh);
        toast({
          title: "Review criado com sucesso.",
          description: "Review criado com sucesso.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: error.response.data.message,
          description: "Verifique as informações e tente novamente",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsWaiting(false);
      });
  };

  const saveInputGrade = (value: any) => {
    setReview({ ...review, nota: value });
  };

  const saveInputText = (value: any) => {
    setReview({ ...review, texto: value });
  };

  return (
    <>
      <Flex flexDirection="column" w="100%" marginTop={10} px={3}>
        {isLoading ? (
          <>
            <Flex alignItems={"center"}>
              <Image
                width={"100px"}
                height={"100px"}
                src={gameUrl}
                alt="foto jogo"
                borderRadius="lg"
              />
              <Heading mb={3} ml={5}>
                {gameName}
              </Heading>
            </Flex>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Avaliação</Th>
                  <Th>Nota</Th>
                </Tr>
              </Thead>
              <Tbody>
                {reviews.map((elem: ReviewInterface, i: number) => {
                  return (
                    <Tr key={i}>
                      <Td>{elem.texto}</Td>
                      <Td>{elem.nota}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            {logado ? (
              <form onSubmit={handleSubmit} autoComplete="nope">
                <HStack m={"30px"} mt={"70px"}>
                  <FormControl isRequired width={"70%"}>
                    <FormLabel htmlFor="titulo">Adicionar Avaliação</FormLabel>
                    <Input
                      max-length="300"
                      borderColor="darkgrey"
                      border="2px"
                      type="text"
                      value={review.texto}
                      onChange={(event) => {
                        saveInputText(event?.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl isRequired width={"30%"}>
                    <FormLabel htmlFor="titulo">Adicionar Review</FormLabel>
                    <NumberInput defaultValue={0} min={0} max={10}>
                      <NumberInputField
                        max-length="300"
                        borderColor="darkgrey"
                        border="2px"
                        type="text"
                        value={review.nota}
                        onChange={(event) => {
                          saveInputGrade(event?.target.value);
                        }}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </HStack>
                <Flex mx={"40px"} justifyContent={"end"}>
                  <Button
                    colorScheme="green"
                    w={"350px"}
                    mr={3}
                    type="submit"
                    value="submit"
                    id="saveOrder"
                  >
                    {isWaiting ? (
                      <Spinner color="white.500" />
                    ) : (
                      <div> Salvar</div>
                    )}
                  </Button>
                </Flex>
              </form>
            ) : (
              ""
            )}
          </>
        ) : (
          <Stack mt="50px">
            <Skeleton height="57px" />
            <Skeleton height="57px" />
            <Skeleton height="57px" />
            <Skeleton height="57px" />
            <Skeleton height="57px" />
            <Skeleton height="57px" />
            <Skeleton height="57px" />
            <Skeleton height="57px" />
            <Skeleton height="57px" />
          </Stack>
        )}
      </Flex>
    </>
  );
}
