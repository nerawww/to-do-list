import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Item from "../components/Item";
import TaskModal from "../components/TaskModal";

const API_URL = import.meta.env.VITE_API_URL;

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [headline, setHeadline] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const response = await fetch(`${API_URL}/task`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setTasks(data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = () => {
    setHeadline("Ajouter une tâche");
    setTitle("");
    setIsEdit(false);
    setIsChecked(false);
    setId("");
    document.getElementById("my_modal_3").showModal();
  };

  const handleEdit = (task) => {
    setHeadline("Modifier une tâche");
    setTitle(task.title);
    setIsEdit(true);
    setIsChecked(task.status);
    setId(task._id);
    document.getElementById("my_modal_3").showModal();
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${API_URL}/task/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      fetchTasks();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      const response = await fetch(`${API_URL}/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: title, status: isChecked }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        fetchTasks();
      }
      document.getElementById("my_modal_3").close();
    } else {
      const response = await fetch(`${API_URL}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTitle("");
        fetchTasks();
      }
      document.getElementById("my_modal_3").close();
    }
  };

  return (
    <div className="w-[500px] m-auto p-5 shadow-2xl rounded">
      <h1 className="text-3xl text-center my-3">Liste de tâches</h1>
      <button type="button">
        <MdAdd
          className="size-5 cursor-pointer text-green-500 hover:text-green-700 bg-slate-900 border rounded mx-2.5"
          onClick={handleAdd}
        />
      </button>
      {tasks.map((task) => (
        <Item
          key={task._id}
          task={task}
          handleEdit={() => handleEdit(task)}
          handleDelete={() => handleDelete(task._id)}
        />
      ))}
      <TaskModal
        headline={headline}
        title={title}
        isEdit={isEdit}
        isChecked={isChecked}
        handleSubmit={handleSubmit}
        onChangeTitle={(e) => setTitle(e.target.value)}
        onChangeStatus={(e) => setIsChecked(e.target.checked)}
      />
    </div>
  );
}
