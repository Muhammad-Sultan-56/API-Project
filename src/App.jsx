import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  // delete function
  const deleteTask = (taskId) => {
    axios
      .delete(`https://674d3d9454e1fca9290ecfd2.mockapi.io/tasks/${taskId}`)
      .then((response) => {
        console.log(response.data);
        setIsDeleted(true);
      })
      .catch((er) => {
        console.log(er.messsage);
      })
      .finally(() => {});
  };

  useEffect(() => {
    axios
      .get("https://674d3d9454e1fca9290ecfd2.mockapi.io/tasks")
      .then((response) => {
        setTasks(response.data);
        setIsDeleted(false);
      });
  }, [isDeleted]);

  return (
    <>
      <div className="container">
        <h1 className="text-center mb-3">Tasks Application</h1>
        <div className="task-list">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Task Detail</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                return (
                  <tr key={task.id}>
                    <th scope="row">{task.id}</th>
                    <td>{task.detail}</td>
                    <td>
                      {task.isCompleted == true ? (
                        <span className="text-success fw-bold">Done</span>
                      ) : (
                        <span className="text-danger">Pending</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          deleteTask(task.id);
                        }}
                        className="btn btn-danger btn-sm me-2"
                      >
                        Del
                      </button>
                      <button className="btn btn-info btn-sm">Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
