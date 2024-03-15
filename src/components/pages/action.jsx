import React from "react";
import Button from "./Button";

function Action() {
  return (
    <div>
      <section
        className="h-[86.7vh]  bg-cover
      font-[Poppins] md:bg-top bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1562424292-1fa536217c58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFjdGlvbnxlbnwwfHwwfHx8MA%3D%3D)`,
        }}
      >
        <div className="flex flex-col justify-center text-center items-center h-3/4">
          <h2 className="text-white text-2xl font-medium ">Movies Tips</h2>
          <h1 className="md:text-5xl text-3xl text-white font-semibold py-5">
            It's Show Time
          </h1>
          <div className="text-xl">
            <Button />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Action;
