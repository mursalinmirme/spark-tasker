import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { authContext } from "../../authProvider/AuthProvider";
const MyTodoList = () => {
  const { user } = useContext(authContext);
  const [updateId, setUpdateId] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [mineTodos, setMineTodos] = useState([]);
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: myTasks = [], refetch } = useQuery({
    queryKey: ["mineTasks"],
    queryFn: async () => {
      const fetchMyTodos = await axios.get(
        `https://spark-tasker-server.vercel.app/my-todos?email=${user?.email}`
      );
      const result = fetchMyTodos.data;
      const getMineTodos = result.filter((todo) => todo.status === "todo");
      setMineTodos(getMineTodos);
      const ongoingToods = result.filter((todo) => todo.status === "ongoing");
      setOngoingTasks(ongoingToods);
      const completedTodos = result.filter(
        (todo) => todo.status === "completed"
      );
      setCompletedTasks(completedTodos);
      console.log("all todos are", getMineTodos);
      return result;
    },
  });

  // const handle task delete
  const handleTaskDelete = (deleteId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete the task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://spark-tasker-server.vercel.app/delete-task/${deleteId}`
          )
          .then((res) => {
            if (res.data.acknowledged) {
              Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };

  // update task
  const handleUpdateTask = (updateId) => {
    setUpdateId("");
    document.getElementById("my_modal_3").showModal();
    setUpdateId(updateId);
  };
  const { data: updateTask = [], refetch: updateRefetch } = useQuery({
    queryKey: ["updateTasks"],
    enabled: !!updateId,
    queryFn: async () => {
      const updateFetch = await axios.get(
        `https://spark-tasker-server.vercel.app/update-task/${updateId}`
      );
      const result = updateFetch.data;
      setSelectPriority(result?.selectPriority);
      return result;
    },
  });

  const [selectPriority, setSelectPriority] = useState("");
  useEffect(() => {
    setSelectPriority(updateTask?.selectPriority);
  }, []);
  const handlePriority = (e) => {
    setSelectPriority("");
    console.log(e.target.value);
    setSelectPriority(e.target.value);
  };

  //   hanldle update close
  const handleUpdateCross = () => {
    setUpdateId("");
  };

  const onSubmit = (data) => {
    setUpdateLoading(true);
    if (selectPriority === "") {
      toast.error("Please select a Priority");
      setUpdateLoading(false);
      return;
    }
    const taskUser = user?.email;
    const status = updateTask?.status;
    const newUpdateTask = { ...data, selectPriority, status, taskUser };
    console.log(newUpdateTask);
    axios
      .put(
        `https://spark-tasker-server.vercel.app/update-task/${updateTask?._id}`,
        newUpdateTask
      )
      .then((res) => {
        console.log(res.data.acknowledged);
        if (res.data.acknowledged) {
          Swal.fire({
            position: "top-right",
            icon: "success",
            title: "Your task Updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setUpdateLoading(false);
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
        setUpdateLoading(false);
      });
  };
  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log("drag id catch", result);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // let add;
    // let todolist = myTasks;
    // let ongoing = ongoingTasks;
    // let complete = completedTasks;

    // if (source.droppableId === "todoList") {
    //   add = todolist[source.index];
    //   todolist.splice(source.index, 1);
    // } else if (source.droppableId === "ongoing") {
    //   add = ongoing[source.index];
    //   ongoing.splice(source.index, 1);
    // } else {
    //   add = complete[source.index];
    //   complete.splice(source.index, 1);
    // }

    // if (destination.droppableId === "todoList") {
    //   todolist.splice(destination.index, 0, add);
    // } else if (destination.droppableId === "ongoing") {
    //   ongoing.splice(destination.index, 0, add);
    // } else {
    //   complete.splice(destination.index, 0, add);
    // }

    // setMineTodos(todolist);
    // setOngoingTasks(ongoing);
    // setCompletedTasks(complete);

    if (result.destination.droppableId === "todoList") {
      axios
        .put(
          `https://spark-tasker-server.vercel.app/update-todo/${result.draggableId}`,
          { status: "todo" }
        )
        .then((res) => {
          console.log("update todo respoanse is", res);
          if (res.data.acknowledged) {
            refetch();
          }
        })
        .catch((err) => {
          console.log("Update todo response error is", err);
        });
    }
    if (result.destination.droppableId === "ongoing") {
      axios
        .put(
          `https://spark-tasker-server.vercel.app/update-todo/${result.draggableId}`,
          { status: "ongoing" }
        )
        .then((res) => {
          console.log("update todo respoanse is", res);
          if (res.data.acknowledged) {
            refetch();
          }
        })
        .catch((err) => {
          console.log("Update todo response error is", err);
        });
    }
    if (result.destination.droppableId === "completed") {
      axios
        .put(
          `https://spark-tasker-server.vercel.app/update-todo/${result.draggableId}`,
          { status: "completed" }
        )
        .then((res) => {
          console.log("update todo respoanse is", res);
          if (res.data.acknowledged) {
            refetch();
          }
        })
        .catch((err) => {
          console.log("Update todo response error is", err);
        });
    }
  };
  return (
    <div>
      <div className="text-center py-3">
        <h2 className="text-2xl inline-block bg-[#FFDDD2] px-5 font-bold py-2 text-center rounded-xl">
          My Todo List
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 px-5 lg:px-0">
        <DragDropContext onDragEnd={onDragEnd}>
          {/* my to do list */}
          <div>
            <Droppable droppableId="todoList">
              {(provided, snapshot) => (
                <div
                  className={`${snapshot.isDraggingOver && "bg-[#83C5BE]"}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className={`text-2xl font-bold text-center`}>
                    Todo List
                  </h3>
                  {mineTodos.map((task, index) => (
                    <Draggable
                      key={task?._id}
                      draggableId={task?._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          key={task?._id}
                          className="border mt-4 shadow p-3"
                        >
                          <h6 className="text-base">
                            <span className="font-medium">Title:</span>{" "}
                            {task?.title}
                          </h6>
                          <p className="mt-1">
                            <span className="font-medium">Description:</span>{" "}
                            {task?.descriptions}
                          </p>
                          <p className="mt-1">
                            <span className="font-medium">Priority:</span>{" "}
                            {task?.selectPriority}
                          </p>
                          <p className="mt-1">
                            <span className="font-medium">Deadline:</span>{" "}
                            {moment(task?.deadlines).format("lll")}
                          </p>
                          <div className="flex justify-end gap-5 pt-3">
                            <MdDeleteForever
                              onClick={() => handleTaskDelete(task?._id)}
                              className="text-xl hover:text-red-500"
                            />
                            <AiFillEdit
                              onClick={() => handleUpdateTask(task?._id)}
                              className="text-xl hover:text-red-500"
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          {/* my ongoing tasks */}

          <div>
            <Droppable droppableId="ongoing">
              {(provided, snapshot) => (
                <div
                  className={`${snapshot.isDraggingOver && "bg-[#83C5BE]"}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className="text-2xl font-bold text-center">On Going</h3>
                  {ongoingTasks.map((task, index) => (
                    <Draggable
                      key={task?._id}
                      draggableId={task?._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          key={task?._id}
                          className="border mt-4 shadow p-3"
                        >
                          <h6 className="text-base">
                            <span className="font-medium">Title:</span>{" "}
                            {task?.title}
                          </h6>
                          <p className="mt-1">
                            <span className="font-medium">Description:</span>{" "}
                            {task?.descriptions}
                          </p>
                          <p className="mt-1">
                            <span className="font-medium">Priority:</span>{" "}
                            {task?.selectPriority}
                          </p>
                          <p className="mt-1">
                            <span className="font-medium">Deadline:</span>{" "}
                            {moment(task?.deadlines).format("lll")}
                          </p>
                          <div className="flex justify-end gap-5 pt-3">
                            <MdDeleteForever
                              onClick={() => handleTaskDelete(task?._id)}
                              className="text-xl hover:text-red-500"
                            />
                            <AiFillEdit
                              onClick={() => handleUpdateTask(task?._id)}
                              className="text-xl hover:text-red-500"
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          {/* my completed tasks */}
          <div>
            <Droppable droppableId="completed">
              {(provided, snapshot) => (
                <div
                  className={`${snapshot.isDraggingOver && "bg-[#83C5BE]"}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className="text-2xl font-bold text-center">Compeleted</h3>
                  {completedTasks.map((task, index) => (
                    <Draggable
                      key={task?._id}
                      draggableId={task?._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          key={task?._id}
                          className="border mt-4 shadow p-3"
                        >
                          <h6 className="text-base">
                            <span className="font-medium">Title:</span>{" "}
                            {task?.title}
                          </h6>
                          <p className="mt-1">
                            <span className="font-medium">Description:</span>{" "}
                            {task?.descriptions}
                          </p>
                          <p className="mt-1">
                            <span className="font-medium">Priority:</span>{" "}
                            {task?.selectPriority}
                          </p>
                          <p className="mt-1">
                            <span className="font-medium">Deadline:</span>{" "}
                            {moment(task?.deadlines).format("lll")}
                          </p>
                          <div className="flex justify-end gap-5 pt-3">
                            <MdDeleteForever
                              onClick={() => handleTaskDelete(task?._id)}
                              className="text-xl hover:text-red-500"
                            />
                            <AiFillEdit
                              onClick={() => handleUpdateTask(task?._id)}
                              className="text-xl hover:text-red-500"
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal">
        <div className="lg:w-2/3 bg-white p-10 relative mx-5 lg:mx-0">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={handleUpdateCross}
              className="btn btn-lg btn-circle bg-red-600 text-white absolute right-2 top-2 border-none outline-none"
            >
              ✕
            </button>
          </form>
          <h4 className="text-center text-2xl font-bold">Update Task</h4>
          <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <label className="font-medium" htmlFor="">
              Title:
            </label>
            <input
              defaultValue={updateTask?.title}
              className="w-full border px-3 py-2.5 text-lg mt-1 mb-6 rounded-md"
              placeholder="Enter your title"
              {...register("title", { required: true })}
            />

            {/* include validation with required or other standard HTML validation rules */}
            <label className="font-medium" htmlFor="">
              Description:
            </label>
            <input
              defaultValue={updateTask?.descriptions}
              className="w-full border px-3 py-2.5 text-lg mb-6 rounded-md"
              placeholder="Enter task description"
              {...register("descriptions", { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            {/* include validation with required or other standard HTML validation rules */}
            <label className="font-medium" htmlFor="">
              Deadlines:
            </label>
            <input
              defaultValue={updateTask?.deadlines}
              type="datetime-local"
              className="w-full border px-3 py-2.5 mb-6 text-lg rounded-md"
              placeholder="Enter deadlines"
              {...register("deadlines", { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            <label className="font-medium" htmlFor="">
              Priority:
            </label>
            <select
              onChange={handlePriority}
              value={selectPriority}
              className="w-full border px-3 py-2.5 text-lg mb-8 rounded-md"
              name=""
              id=""
            >
              <option value="">Select a priority</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="high">high</option>
            </select>
            <button
              className="w-full bg-[#006D77] text-lg font-semibold text-white btn"
              type="submit"
            >
              {updateLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Update Task"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyTodoList;
