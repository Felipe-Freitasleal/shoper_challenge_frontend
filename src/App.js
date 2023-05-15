import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  NumberInput,
  NumberInputField,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [listProducts, setListProducts] = useState("");
  const [listPacks, setListPacks] = useState("");
  const [codeProduct, setCodeProduct] = useState(0);
  const [priceProduct, setPriceProduct] = useState(0.0);
  const [atualizar, setAtualizar] = useState("");

  async function getProducts() {
    try {
      const response = await axios.get("http://localhost:3003/products");
      if (response.status !== 200) throw new Error();

      setListProducts(response.data.produtos);
    } catch (error) {
      console.log(error);
    }
  }

  async function getPacks() {
    try {
      const response = await axios.get("http://localhost:3003/packs");
      if (response.status !== 200) throw new Error();
      setListPacks(response.data.packs);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendNewPrice() {
    const body = {
      code: Number(codeProduct),
      new_price: Number(priceProduct),
    };

    try {
      const response = await axios.put("http://localhost:3003/products", body);
      if (response.status !== 200) throw new Error();
      console.log(response);

      setAtualizar("atualizar");
    } catch (error) {
      console.log(error);
      setAtualizar(error.response.data);
    }
  }

  useEffect(() => {
    getProducts();
    getPacks();
  }, []);

  const refreshPage = () => {
    setCodeProduct(0);
    setPriceProduct(0);
    setAtualizar("");
    window.location.reload();
  };

  return (
    <Box padding={4}>
      <Grid>
        <form
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "end",
            width: "98vw",
            padding: "12px",
          }}
        >
          <FormControl width={20} mx={1}>
            <FormLabel>Código</FormLabel>
            <NumberInput defaultValue={0}>
              <NumberInputField
                onChange={(e) => setCodeProduct(e.target.value)}
              />
            </NumberInput>
          </FormControl>
          <FormControl width={28} mx={1}>
            <FormLabel>Novo Preço</FormLabel>
            <NumberInput defaultValue={0} precision={2}>
              <NumberInputField
                onChange={(e) => setPriceProduct(e.target.value)}
              />
            </NumberInput>
          </FormControl>
          <Button colorScheme="blue" onClick={() => sendNewPrice()} mx={1}>
            VALIDAR
          </Button>
          {atualizar === "atualizar" ? (
            <Button colorScheme="blue" onClick={() => refreshPage()} mx={1}>
              ATUALIZAR
            </Button>
          ) : atualizar === "" ? (
            <></>
          ) : (
            <Alert status="error" width={"50%"} mx={1}>
              <AlertIcon />
              <AlertTitle>Erro!</AlertTitle>
              <AlertDescription>{atualizar}</AlertDescription>
            </Alert>
          )}
        </form>
      </Grid>
      <Grid padding={4}>
        <Stack>
          <Heading as="h2" size="xl">
            Lista de Produtos
          </Heading>
          {listProducts.length > 1 && (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Código</Th>
                  <Th>Name</Th>
                  <Th>Preço de custo</Th>
                  <Th>Preço de venda</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listProducts.map((item) => (
                  <Tr key={item.code}>
                    <Td>{item.code}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.cost_price}</Td>
                    <Td>{item.sales_price}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Stack>
      </Grid>
      <hr />
      <Grid padding={4}>
        <Stack>
          <Heading as="h2" size="xl">
            Lista de Pacotes
          </Heading>
          {listPacks.length > 1 && (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID Pacote</Th>
                  <Th>ID Produto</Th>
                  <Th>Quantidade</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listPacks.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.pack_id}</Td>
                    <Td>{item.product_id}</Td>
                    <Td>{item.qty}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Stack>
      </Grid>
      <hr />
    </Box>
  );
}

export default App;
