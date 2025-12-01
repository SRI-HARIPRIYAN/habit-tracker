import React from "react";
import Navbar from "../habits/Navbar";
import TodayHabits from "../habits/TodayHabits";

const Home = () => {
  return (
    <div>
      <Navbar />
      <TodayHabits />
    </div>
  );
};

export default Home;
