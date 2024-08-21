// import React, { useEffect, useState } from 'react';

// const DisplayText = () => {
//   const [content, setContent] = useState([]);

//   const fetchData = async function () {
//     const data = await fetch("https://chethan-admin-panel-server.vercel.app/getText", { method: "GET" });
//     const dataFlow = await data.json();
//     setContent(dataFlow);
//   };

//   const deleteText = async (id) => {
//     try {
//       const response = await fetch(`https://chethan-admin-panel-server.vercel.app/deleteText/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         // Remove the deleted item from the state
//         setContent(content.filter(item => item._id !== id));
//         console.log('Item deleted successfully');
//       } else {
//         console.error('Failed to delete item');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {content.map((item, index) => (
//           <div key={index} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
//             <p className="text-gray-600">{item.description}</p>
//             <p className="text-gray-800 font-bold mt-4">Rating: {item.rating}</p>
//             <button 
//               onClick={() => deleteText(item._id)}
//               className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300">
//               Delete
//             </button>
            
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DisplayText;

import React, { useEffect, useState } from 'react';

const DisplayText = () => {
  const [content, setContent] = useState([]);
  const [editableContent, setEditableContent] = useState({});

  const fetchData = async () => {
    const data = await fetch("https://chethan-admin-panel-server.vercel.app/getText", { method: "GET" });
    const dataFlow = await data.json();
    setContent(dataFlow);
  };

  const handleInputChange = (id, field, value) => {
    setEditableContent({
      ...editableContent,
      [id]: {
        ...editableContent[id],
        [field]: value,
      },
    });
  };

  const saveChanges = async (id) => {
    try {
      const updatedData = editableContent[id];
      const response = await fetch(`https://chethan-admin-panel-server.vercel.app/updateText/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        // Update the content state with the new data
        setContent(content.map(item => item._id === id ? { ...item, ...updatedData } : item));
        console.log('Item updated successfully');
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteText = async (id) => {
    try {
      const response = await fetch(`https://chethan-admin-panel-server.vercel.app/deleteText/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContent(content.filter(item => item._id !== id));
        console.log('Item deleted successfully');
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {content.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <input
              type="text"
              className="text-xl font-semibold text-gray-800 mb-2 w-full"
              value={editableContent[item._id]?.title || item.title}
              onChange={(e) => handleInputChange(item._id, 'title', e.target.value)}
            />
            <textarea
              className="text-gray-600 w-full mb-2"
              value={editableContent[item._id]?.description || item.description}
              onChange={(e) => handleInputChange(item._id, 'description', e.target.value)}
            />
            <input
              type="number"
              className="text-gray-800 font-bold w-full mb-4"
              value={editableContent[item._id]?.rating || item.rating}
              onChange={(e) => handleInputChange(item._id, 'rating', e.target.value)}
            />
            <button 
              onClick={() => deleteText(item._id)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300">
              Delete
            </button>
            <button 
              onClick={() => saveChanges(item._id)}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300">
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayText;
