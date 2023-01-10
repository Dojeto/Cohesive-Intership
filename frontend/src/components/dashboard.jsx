import React, { useState } from "react";
import Navbar from "./navbar";
import Details from "./details";
import Hero from "./Hero";
const Dashboard = () => {
  const [FriendmodalState, setFriendmodalState] = useState(false);
  return (
    <>
      <Navbar setFriendmodalState={setFriendmodalState} />
      <Hero
        FriendmodalState={FriendmodalState}
        setFriendmodalState={setFriendmodalState}
      />
    </>
  );
};

export default Dashboard;
