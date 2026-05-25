function FilterButtons({ setFilter }) {

  return (

    <div className="flex justify-center gap-2 mt-4">

      <button
        onClick={() => setFilter("all")}
        className="bg-gray-300 text-black px-3 py-1 rounded-lg"
      >
        All
      </button>

      <button
        onClick={() =>
          setFilter("completed")
        }
        className="bg-green-300 text-black px-3 py-1 rounded-lg"
      >
        Completed
      </button>

      <button
        onClick={() =>
          setFilter("pending")
        }
        className="bg-yellow-300 text-black px-3 py-1 rounded-lg"
      >
        Pending
      </button>

    </div>
  );
}

export default FilterButtons;