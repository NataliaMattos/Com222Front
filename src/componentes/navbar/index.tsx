import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../search-bar/search-component";

interface Links {
  navItem: string;
  route: string;
}

const NavLink = ({ to, children }: { to: any; children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={to}
  >
    {children}
  </Link>
);

export default function NavBar({ children, showSearchBar}: { children: ReactNode, showSearchBar?: boolean }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [login, setLogin] = useState<any>();
  let Links;
  
  if(login){
    Links = [
      { navItem: "Jogos", route: "/" },
      { navItem: "Criar jogo", route: "/createGame" },
    ];
  }else{
    Links = [
      { navItem: "Jogos", route: "/" },
    ];
  }



  useEffect(() => {
    setLogin(localStorage.getItem("logado"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("logado");
    navigate("/", {
      replace: true,
    });
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link: Links) => (
                <NavLink to={link.route} key={link.route}>
                  {link.navItem}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <HStack spacing={8} alignItems={"center"}>
            {showSearchBar ? <SearchBar/> : <></>}
            {!login ? (
              <>
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Logar
                </Button>
                <Button
                  onClick={() => {
                    navigate("/cadastrar");
                  }}
                >
                  Cadastrar
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  handleLogout();
                }}
              >
                Sair
              </Button>
            )}
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink to={link.route} key={link.route}>
                  {link.navItem}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box>{children}</Box>
    </>
  );
}
