import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { UserContext } from "../../contexts/user";

interface UserInterface {
  name: string;
  email: string;
  password: string;

}

function CadastrarUsuario() {
  const [user, setUser] = useState<UserInterface>({
    name: "",
    email: "",
    password: "",
  });
  const [isWaiting, setIsWaiting] = useState(false);
  const { refresh, setRefresh} = useContext(UserContext);

  const toast = useToast();

  const handleSubmit = (event: FormEvent) => {
    setIsWaiting(true);
    event.preventDefault();
    axios
      .post("https://backend-trabalho-com222.onrender.com/user", {
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .then(() => {
        setRefresh(!refresh);
        toast({
          title: "Usuario criado com sucesso.",
          description: "Usuario criado com sucesso.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Erro desconhecido",
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

  const saveInputTitle = (value: any) => {
    setUser({ ...user, name: value });
  };

  const saveInputSumary = (value: any) => {
    setUser({ ...user, email: value });
  };

  const saveInputGenre = (value: any) => {
    setUser({ ...user, password: value });
  };

  return (
    <>
      <Text fontSize="3xl" fontWeight={"bold"} w="100%" ml={8} mt={5}>
        Cadastrar usuario
      </Text>
      <form onSubmit={handleSubmit} autoComplete="nope">
        <Box mx={"200px"}>
          <Flex flexDirection="column" w="100%" marginTop={5}>
            <Box flex="1">
              <FormControl isRequired>
                <FormLabel htmlFor="name">name</FormLabel>
                <Input
                  max-length="300"
                  borderColor="darkgrey"
                  border="2px"
                  type="text"
                  value={user.name}
                  onChange={(event) => {
                    saveInputTitle(event?.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="name">email</FormLabel>
                <Input
                  max-length="300"
                  borderColor="darkgrey"
                  border="2px"
                  type="text"
                  value={user.email}
                  onChange={(event) => {
                    saveInputSumary(event?.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="name">password</FormLabel>
                <Input
                  max-length="300"
                  borderColor="darkgrey"
                  border="2px"
                  type="text"
                  value={user.password}
                  onChange={(event) => {
                    saveInputGenre(event?.target.value);
                  }}
                />
              </FormControl>
            </Box>
          </Flex>
          <Flex justifyContent={"center"} mt={'40px'}>
            <Button
              width={"200px"}
              color="#fff"
              backgroundColor="#16687f"
              mr={3}
              type="submit"
              value="submit"
              id="saveUser"
            >
              {isWaiting ? <Spinner color="white.500" /> : <div> Salvar</div>}
            </Button>
            <Button width={"200px"} colorScheme="red" id="cancelUser">
              Cancelar
            </Button>
          </Flex>
        </Box>
      </form>
    </>
  );
}
export default CadastrarUsuario;
