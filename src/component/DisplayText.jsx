import React, { useEffect, useState } from 'react';

const DisplayText = () => {
  const [content, setContent] = useState([]);

  const fetchData = async function () {
    const data = await fetch("https://chethan-admin-panel-server.vercel.app/getText", { method: "GET" });
    const dataFlow = await data.json();
    setContent(dataFlow);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {content.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-gray-800 font-bold mt-4">Rating: {item.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayText;
