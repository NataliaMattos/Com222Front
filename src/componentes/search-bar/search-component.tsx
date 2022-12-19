import axios from "axios";
import { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import { Box } from "@chakra-ui/react";
import "../../pages/Main/style.css";

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

export default function SearchBar() {
  const consoleType = window.location.pathname.split("/games/")[1];
  const [gameNames, setGameNames] = useState<SearchItemsInterface[]>([]);
  const [developerNames, setDeveloperNames] = useState<SearchItemsInterface[]>([]);
  const [genderNames, setGenderNames] = useState<SearchItemsInterface[]>([]);
  const [items, setItems] = useState<GameInterface[]>([]);
  const [teste, setTeste] = useState(false);

  useEffect(() => {
    console.log("refresh");
    axios
      .get(`https://backend-trabalho-com222.onrender.com/games/console?console=${consoleType}`)
      .then((response) => {

        setItems(response.data);

        var gamesNamesAux: SearchItemsInterface[] = [];
        var developerNamesAux: SearchItemsInterface[] = [];
        var genderNamesAux: SearchItemsInterface[] = [];

        console.log(items);
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
    console.log(selectedItem)
    
    axios
    .get(`https://backend-trabalho-com222.onrender.com/games/?${selectedItem.param}=${selectedItem.tituloPuro}`)
    .then((response) => {
      var games = response.data;
    })
  };

  return (
    <Box position="relative" margin="0 auto">
      <div style={{ width: 200 }}>
        <ReactSearchAutocomplete
          items={[...gameNames, ...developerNames, ...genderNames]}
          onFocus={handleOnFocus}
          onSelect={handleSearch}
        />
      </div>
    </Box>
  );
}
