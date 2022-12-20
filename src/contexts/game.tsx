import axios from "axios";
import { createContext, ReactNode, useState } from "react";

export interface Game {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  branch: string;
}

interface GameProviderProps {
  children: ReactNode;
}

interface Games {
  titulo: string;
  resumo: string;
  genero: string;
  desenvolvedor: string;
  console: string;
  imagem: string;
  avaliacao: number;
}

interface GameContextData {
  gamesFilter: Games[];
  setGamesFilter:(value: Games[]) => void;
}

export const GameContext = createContext({} as GameContextData);

export function GameProvider({ children }: GameProviderProps) {
  const [gamesFilter, setGamesFilter] = useState<Games[]>([]);

  return (
    <GameContext.Provider value={{gamesFilter, setGamesFilter }}>
      {children}
    </GameContext.Provider>
  );
}
