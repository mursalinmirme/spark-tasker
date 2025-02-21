import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { authContext } from "../../authProvider/AuthProvider";
const AddAnewTask = () => {
  const [selectPriority, setSelectPriority] = useState("");
  const { user } = useContext(authContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (selectPriority === "") {
      toast.error("Please select a Priority");
      return;
    }
    const taskUser = user?.email;
    const status = "todo";
    const newTask = { ...data, selectPriority, status, taskUser };
    axios
      .post(`https://spark-tasker-server.vercel.app/add-tasks`, newTask)
      .then((res) => {
        console.log(res.data.acknowledged);
        if (res.data.acknowledged) {
          Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Your task added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePriority = (e) => {
    setSelectPriority("");
    console.log(e.target.value);
    setSelectPriority(e.target.value);
  };
  //   console.log(watch("example"))
  return (
    <div className="lg:w-2/3 mx-auto border shadow p-10 mb-20 mt-10">
      <h4 className="text-center text-3xl font-bold">Add A New Task</h4>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label className="font-medium" htmlFor="">
          Title:
        </label>
        <input
          className="w-full border px-3 py-2.5 text-lg mt-1 mb-6 rounded-md"
          placeholder="Enter your title"
          {...register("title", { required: true })}
        />

        {/* include validation with required or other standard HTML validation rules */}
        <label className="font-medium" htmlFor="">
          Description:
        </label>
        <input
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
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddAnewTask;
