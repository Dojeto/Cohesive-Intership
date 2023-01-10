import React, { useEffect, useState } from "react";
import { Button, Select } from "@chakra-ui/react";
import { toast } from "react-hot-toast";

const FrinedList = (props) => {
  const [frinedData, setfrinedData] = useState([]);
  const [friendName, setfrineName] = useState("");

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

  const OnRemoveFriend = async () => {
    if (friendName == "") {
      return toast.error("Please Select valid option");
    }
    const response = await fetch("http://localhost:3000/friend/delete", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
      body: JSON.stringify({
        username: friendName,
      }),
    });
    const data = await response.json();
    toast.success("Remove Successfully");
  };

  useEffect(() => {
    getAllDetails();
  }, []);
  return (
    <>
      <Select
        onChange={(e) => {
          setfrineName(e.target.value);
        }}
        placeholder="Select option"
      >
        {frinedData.map((ele, ind) => {
          return (
            <option key={ind} value={ele["username"]}>
              {ele["username"]}
            </option>
          );
        })}
      </Select>
      <Button
        onClick={() => {
          OnRemoveFriend();
          props.setFriendmodalState(false);
        }}
        colorScheme="green"
      >
        Remove
      </Button>
    </>
  );
};

export default FrinedList;
