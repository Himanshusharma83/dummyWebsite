import React from 'react';
import Button from './Button';


function AllRent() {
  return (
    <div>
      <section
        className="h-[86.7vh] bg-cover bg-center font-[Poppins] md:bg-top"
        style={{ backgroundImage: `url(https://plus.unsplash.com/premium_photo-1679920911499-830b98b8b17e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1lbWJlcnNoaXB8ZW58MHx8MHx8fDA%3D)` }}
      >
        <div className="flex flex-col justify-center text-center items-center h-3/4">
          <h2 className="text-white text-2xl font-medium">Movies Tips</h2>
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

export default AllRent;
