import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

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

export interface Games {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  branch: string;
}

interface GameContextData {
  games: Games[];
  refresh: boolean;
  setRefresh: (value: boolean) => void;
  isLoading: boolean;
}

export const GameContext = createContext({} as GameContextData);

export function GameProvider({ children }: GameProviderProps) {
  const [games, setGames] = useState<Games[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("http://backend-trabalho-com222.onrender.com/games").then((response) => {
      setGames(response.data);
      setIsLoading(true);
    });
  }, [refresh]);

  return (
    <GameContext.Provider value={{ games, refresh, setRefresh, isLoading }}>
      {children}
    </GameContext.Provider>
  );
}
