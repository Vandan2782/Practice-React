// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Table = () => {
//   const [data, setData] = useState([]);

 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("https://jsonplaceholder.typicode.com/users");
//         setData(res.data);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <table className="table table-striped table-bordered">
//         <thead>
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Name</th>
//             <th scope="col">Username</th>
//             <th scope="col">Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length > 0 ? (
//             data.map((user, index) => (
//               <tr key={user.id}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{user.name}</td>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="text-center">
//                 Loading...
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;


import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((user) => user.id !== id));
  };

  const handleEdit = (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      setData(
        data.map((user) =>
          user.id === id ? { ...user, name: newName } : user
        )
      );
    }
  };

  return (
    <div className="container mt-4">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user.id)} className="btn btn-sm btn-primary me-2">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
