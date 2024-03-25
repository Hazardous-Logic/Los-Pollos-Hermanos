function Story() {
  return (
    <div className="container mx-auto my-10 rounded-xl w-full md:w-2/3 lg:w-3/4">
      <div className="flex flex-col md:flex-row mb-10 rounded-xl shadow-xl bg-yellow-300">
        <div className="md:w-1/2">
          {/* Picture on the left, text on the right */}
          <img src="bell.jpg" alt="Description" className="rounded-xl" />
        </div>
        <div className="md:w-1/2 p-10 font-serif flex font-semibold items-center justify-center text-xl">
          {/* Text on the left */}
          <p>In the little village where I was born, life moved 
            at a slower pace, yet felt all the richer for it.</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-10 rounded-xl shadow-xl bg-yellow-300">
      <div className="md:w-1/2 p-10 font-serif flex font-semibold items-center justify-center text-xl">
          {/* Text on the right */}
          <p>There, my two uncles were known far and wide for
             their delicious cooking. They seasoned their zesty 
             chicken using only the freshest herbs and spices. 
             People call them Los Pollos Hermanos: the chicken
              brothers.</p>
        </div>
        <div className="md:w-1/2">
          {/* Picture on the right, text on the left */}
          <img src="brothers.jpg" alt="Description" className="rounded-xl" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-10 rounded-xl shadow-xl bg-yellow-300">
        <div className="md:w-1/2">
          {/* Picture on the left, text on the right */}
          <img src="spices.jpg" alt="Description" className="rounded-xl" />
        </div>
        <div className="md:w-1/2 p-10 font-serif font-semibold flex items-center justify-center text-xl">
          {/* Text on the left */}
          <p>Today we carry on their tradition in a manner 
            that would make my uncles proud. The finest 
            ingredients are brought together with love and 
            care, then slow cooked to perfection.</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-10 rounded-xl shadow-xl bg-yellow-300">
      <div className="md:w-1/2 p-10 font-serif font-semibold flex items-center justify-center text-xl">
          {/* Text on the right */}
          <p>Yes, the old ways are still best at Los 
            Pollos Hermanos. But don’t take my word 
            for it. One taste, and you’ll know.</p>
        </div>
        <div className="md:w-1/2">
          {/* Picture on the right, text on the left */}
          <img src="madrigal.jpg" alt="Description" className="rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default Story;
