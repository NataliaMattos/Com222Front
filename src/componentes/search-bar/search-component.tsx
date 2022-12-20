import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import { Box, Skeleton } from "@chakra-ui/react";
import "../../pages/Main/style.css";
import { GameContext } from "../../contexts/game";

interface GameInterface {
  titulo: string;
  resumo: string;
  genero: string;
  desenvolvedor: string;
  console: string;
  imagem: string;
  avaliacao: number;
}

interface SearchItemsInterface {
  id: number;
  name: string;
  param: string;
  tituloPuro: string;
}

function SearchBar() {
  const consoleType = window.location.pathname.split("/games/")[1];
  const [gameNames, setGameNames] = useState<SearchItemsInterface[]>([]);
  const [developerNames, setDeveloperNames] = useState<SearchItemsInterface[]>(
    []
  );
  const [genderNames, setGenderNames] = useState<SearchItemsInterface[]>([]);
  const [items, setItems] = useState<GameInterface[]>([]);
  const [teste, setTeste] = useState(false);
  const { setGamesFilter } = useContext(GameContext);

  useEffect(() => {
    axios
      .get(`https://backend-trabalho-com222.onrender.com/user/games/console?console=${consoleType}`)
      .then((response) => {
        setItems(response.data);

        var gamesNamesAux: SearchItemsInterface[] = [];
        var developerNamesAux: SearchItemsInterface[] = [];
        var genderNamesAux: SearchItemsInterface[] = [];

        items.forEach((game: GameInterface, i: number) => {
          gamesNamesAux.push({
            id: i,
            name: `Jogo: ${game.titulo}`,
            param: "titulo",
            tituloPuro: game.titulo,
          });
          developerNamesAux.push({
            id: i,
            name: `Estúdio: ${game.desenvolvedor}`,
            param: "desenvolvedor",
            tituloPuro: game.desenvolvedor,
          });
          genderNamesAux.push({
            id: i,
            name: `Gênero: ${game.genero}`,
            param: "genero",
            tituloPuro: game.genero,
          });
        });

        setGameNames(gamesNamesAux);
        setDeveloperNames(developerNamesAux);
        setGenderNames(genderNamesAux);
      });
  }, [teste]);

  const handleOnFocus = () => {
    setTeste(!teste);
  };

  const handleSearch = (selectedItem: any) => {
    if (selectedItem.id === 0) {
      setGamesFilter([]);
    } else {
      axios
        .get(
          `https://backend-trabalho-com222.onrender.com/user/games/pesquisa/?${selectedItem.param}=${selectedItem.tituloPuro}`
        )
        .then((response) => {
          setGamesFilter(response.data);
        });
    }
  };

  const handleValue = (value: any) => {
    if(value === ''){
      setGamesFilter([]);
    }
  };

  return (
    <Box zIndex={1}>
      {items.length > 0 ? (
        <Box position="relative" margin="0 auto">
          <div style={{ width: 200 }}>
            <ReactSearchAutocomplete
              items={[
                ...gameNames,
                ...developerNames,
                ...genderNames,
                { id: 0, name: "Top 3 bem mais avaliados" },
              ]}
              onFocus={handleOnFocus}
              onSelect={handleSearch}
              onSearch={handleValue}
            />
          </div>
        </Box>
      ) : (
        <Skeleton height="30px" width={"200px"} />
      )}
    </Box>
  );
}
export default SearchBar;
