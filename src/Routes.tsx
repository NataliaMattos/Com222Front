import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./componentes/navbar";
import Login from "./pages/Login";
import Main from "./pages/Main";
import GameDetails from "./pages/GameDetails";
import Games from "./pages/Games";
import CreateGame from "./pages/CreateGame";
import CadastrarUsuario from "./pages/cadastrarUsuario";
import { Box } from "@chakra-ui/react";
import { GameProvider } from "./contexts/game";

//FUNÇÃO QUE VERIFICA AS ROTAS PRIVADAS
function RequireAuth({ children}: { children: JSX.Element}) {
  const logado = localStorage.getItem("logado");

  if(!logado){
      return <Navigate to="/" replace />;
  }else{
    return children;
  }
}

export function Routess() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      
      <Route path="/" element={
        <Box overflowX={'hidden'}>
          <NavBar >
            <Main />
          </NavBar>
        </Box>
      } />
      
      <Route path="/games" element={
        <Box overflowX={'hidden'}>
          <GameProvider>
            <NavBar >
              <Main />
            </NavBar>
          </GameProvider>
        </Box>
      } />

      <Route path="/login"
        element={
          <NavBar>
            <Login />
          </NavBar>
       } />

      <Route path="/cadastrar"
        element={
          <NavBar>
            <CadastrarUsuario />
          </NavBar>
       } />

      <Route path="/createGame"
        element={
          <RequireAuth>
            <NavBar>
              <CreateGame />
            </NavBar>
          </RequireAuth>
       } />

      <Route path="/games/:console"
        element={
          <GameProvider>
          <NavBar showSearchBar={true}>
            <Games />
          </NavBar>
          </GameProvider>
       } />

      <Route path="/games/:console/:id"
        element={
          <NavBar>
            <GameDetails />
          </NavBar>
       } />

    </Routes>
  );
}

