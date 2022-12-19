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
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import logoLogin from "../../assets/images/logologin.png";
import "./style.css";
// import { AuthContext } from '../../contexts/AuthContext';

// import { Flex, animationFlex, itemAnimation } from '../../components/Styles/motion-animate/animate';
import { FiMoon, FiSun } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios";

export default function Main() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const { colorMode, toggleColorMode } = useColorMode();

  // useEffect(() => {
  //   const userType = localStorage.getItem("userType");

  //   if (!userType) return;

  //   navigate("/Demand");
  // }, [navigate]);

  return (
    <Box
      className="main"
      position="relative"
      margin="0 auto"
      width="100vw"
      height="100vh"
    >
      <Flex justifyContent={'center'} alignItems={'center'} width="100vw" height="100vh">
        <ButtonGroup gap="4">
          <Button
            colorScheme="whiteAlpha"
            onClick={() => {
              navigate("/games/xbox");
            }}
          >
            Xbox
          </Button>
          <Button
            colorScheme="blackAlpha"
            onClick={() => {
              navigate("/games/playstation");
            }}
          >
            Playstation
          </Button>
          <Button
            colorScheme="blackAlpha"
            onClick={() => {
              navigate("/games/switch");
            }}
          >
            Switch
          </Button>
          <Button
            colorScheme="blackAlpha"
            onClick={() => {
              navigate("/games/pc");
            }}
          >
            PC
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}
