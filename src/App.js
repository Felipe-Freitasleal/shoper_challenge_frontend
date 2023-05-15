import { Grid, Typography } from "@material-ui/core";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";

function App() {
  const [listaProducts, setListProducts] = useState("");

  async function getProducts() {
    try {
      const response = await fetch("http://localhost:3003/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) throw new Error();
      const toJson = await response.json();
      setListProducts(toJson.produtos);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  console.log(listaProducts);

  return (
    <Container>
      <Box>
        <Grid>
          <Typography variant="h4">Tabela de Produtos</Typography>
        </Grid>
        <Grid>
          <Typography variant="h4">Tabela de Pacotes</Typography>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
