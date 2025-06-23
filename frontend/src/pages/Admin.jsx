import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { MdLogout, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Admin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch {
    return <Navigate to="/" />;
  }

  if (decoded.role !== "admin") {
    return <Navigate to="/" />;
  }

  const fetchUser = async () => {
    const response = await fetch(`${API_URL}/admin/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const confirmDelete = (id) => {
    console.log(id);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button className="btn btn-square" onClick={logout}>
          <MdLogout className="size-5 cursor-pointer bg-slate-900 border rounded" />
        </button>
      </div>
      <table>
        <thead className="text-3xl">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.email !== localStorage.getItem("email"))
            .map((user) => (
              <tr key={user._id || user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => confirmDelete(user._id)}
                  >
                    <MdDelete className="size-5 cursor-pointer text-red-500 hover:text-red-700 bg-slate-900 border rounded" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
