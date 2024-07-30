import axios from "../../lib/axios";

const Portfolio = () => {
  return (
    <div className="w-full mt-5">
      <div className="flex justify-between h-max items-center">
        <h5 className="dark:text-white text-lg">Portfolio</h5>
        <button className="bg-brandLinear p-2 rounded-lg">
          Add Project
        </button>
      </div>
    </div>
  );
};

export default Portfolio;
