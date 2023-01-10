import React, { useEffect } from "react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  HStack,
  Container,
  VStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  Button,
  Flex,
} from "@chakra-ui/react";
import Details from "./details";
import Friend from "./friend";
import { toast } from "react-hot-toast";

const Hero = (props) => {
  const [FmodalState, setFmodalState] = useState(false);
  const [SmodalState, setSmodalState] = useState(false);
  const [DmodalState, setDmodalState] = useState(false);
  const [newfriendname, setNewFrinedName] = useState("");
  const [friendlist, setfrinedlist] = useState([]);
  const [numChecked, setNumChecked] = useState(1);
  const [bill, setBill] = useState("");
  const [checkedValues, setCheckedValues] = useState([]);
  const [spendmoney, setSpendMoney] = useState("");

  const getFriendList = async () => {
    const response = await fetch("http://localhost:3000/friend/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
    });
    const data = await response.json();
    setfrinedlist(data);
  };

  const getSpendMoney = async () => {
    const response = await fetch("http://localhost:3000/trace/spends", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
    });
    const data = await response.json();
    let sum = 0;
    console.log(friendlist);
    friendlist.forEach((ele) => {
      sum = sum + ele["youowes"];
    });
    setSpendMoney(sum + parseInt(data));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setNumChecked((prevNumChecked) => prevNumChecked + 1);
      setCheckedValues([...checkedValues, value]);
    } else {
      setNumChecked((prevNumChecked) => prevNumChecked - 1);
      setCheckedValues(checkedValues.filter((val) => val !== value));
    }
  };

  const onSplit = async () => {
    const listofFriend = checkedValues.join("+");
    console.log(parseInt(bill) / parseInt(numChecked));
    const response = await fetch(
      `http://localhost:3000/trace/add?username=${listofFriend}&bill=${
        bill / numChecked
      }`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const OnAddNewFriend = async () => {
    try {
      const response = await fetch("http://localhost:3000/friend/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify({
          username: newfriendname.toLowerCase(),
        }),
      });
      const data = await response.json();
      if (response.status == 200) {
        toast.success("New Friend Added");
      } else if (response.status == 401) {
        toast.error(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSpendMoney();
  }, []);
  return (
    <>
      <Modal
        onClose={() => {
          setFmodalState(false);
        }}
        isOpen={FmodalState}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              onChange={(e) => {
                setNewFrinedName(e.target.value);
              }}
              placeholder="Enter Your Frined Username"
            ></Input>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                OnAddNewFriend();
                setFmodalState(false);
              }}
              ml={2}
              colorScheme="green"
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        onClose={() => {
          setSmodalState(false);
          setNumChecked(1);
          setCheckedValues([]);
          setBill(0);
        }}
        isOpen={SmodalState}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Input
                onChange={(e) => {
                  setBill(e.target.value);
                }}
                mb={4}
                placeholder="Enter Amount"
              ></Input>
              {friendlist.map((ele, ind) => {
                return (
                  <Checkbox
                    onChange={handleCheckboxChange}
                    key={ind}
                    size="lg"
                    value={ele["username"]}
                    colorScheme="red"
                  >
                    {ele["username"]}
                  </Checkbox>
                );
              })}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                onSplit();
                toast.success("Done");
                setSmodalState(false);
                console.log(numChecked);
                setNumChecked(1);
                setCheckedValues([]);
                setBill(0);
              }}
              ml={2}
              colorScheme="green"
            >
              Split
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        size="xl"
        onClose={() => {
          setDmodalState(false);
        }}
        isOpen={DmodalState}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent h="full">
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack h="full">
              <Details />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        size="xl"
        onClose={() => {
          props.setFriendmodalState(false);
        }}
        isOpen={props.FriendmodalState}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Friend setFriendmodalState={props.setFriendmodalState} />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <HStack p={20}>
        <Container>
          <Card variant="filled" size="lg" w="full">
            <CardHeader>
              <Heading size="lg"> Your Total Spend </Heading>
            </CardHeader>
            <CardBody>
              <Heading size="md"> {spendmoney} </Heading>
            </CardBody>
          </Card>
        </Container>
        <Container>
          <VStack>
            <Button
              onClick={() => {
                setFmodalState(true);
              }}
              w="xs"
              size="lg"
              colorScheme="green"
            >
              Add Friend
            </Button>
            <Button
              onClick={() => {
                getFriendList();
                setSmodalState(true);
              }}
              w="xs"
              size="lg"
              colorScheme="green"
            >
              Split Expance
            </Button>
          </VStack>
        </Container>
      </HStack>
      <Flex align="center" justify="center">
        <Button
          onClick={() => {
            setDmodalState(true);
          }}
          colorScheme="green"
          size="lg"
        >
          View Details
        </Button>
      </Flex>
    </>
  );
};

export default Hero;
