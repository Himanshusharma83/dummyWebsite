import React, { useEffect, useState } from "react";

import Navbar from "../Navbar/Navbar";
import UserList from "./userList";

function Home() {
  return (
    <>
      <Navbar />
      <div>
        <UserList />
      </div>
    </>
  );
}

export default Home;
