import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Details = () => {
  const [frinedData, setfrinedData] = useState([]);

  const getAllDetails = async () => {
    const ressponse = await fetch("http://localhost:3000/friend/list", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
    });
    const data = await ressponse.json();
    setfrinedData(data);
  };
  useEffect(() => {
    getAllDetails();
  }, []);
  return (
    <>
      <Flex justify="center">
        <Box overflowY="auto" maxHeight="500px">
          <TableContainer alignItems="center">
            <Heading padding={5} size="md">
              Details
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>username</Th>
                  <Th>you owe</Th>
                  <Th>owes you</Th>
                </Tr>
              </Thead>
              <Tbody>
                {frinedData.map((ele, ind) => {
                  return (
                    <Tr key={ind}>
                      <Td>{ele["username"]}</Td>
                      <Td>{ele["youowes"]}</Td>
                      <Td>{ele["owesyou"]}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </>
  );
};

export default Details;
