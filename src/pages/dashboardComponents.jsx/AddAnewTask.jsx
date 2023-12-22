import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const AddAnewTask = () => {
    const [selectPriority, setSelectPriority] = useState('');
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => {
        if(selectPriority === ""){
            toast.error('Please select a Priority');
            return
        }
        

        
      }
    const handlePriority = (e) => {
        setSelectPriority('');
        console.log(e.target.value);
        setSelectPriority(e.target.value);
    }
    //   console.log(watch("example"))
    return (
    <div className="w-2/3 mx-auto border shadow p-10 mb-20 mt-10">
        <h4 className="text-center text-3xl font-bold">Add A New Task</h4>
    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
    {/* register your input into the hook by invoking the "register" function */}
    <label className="font-medium" htmlFor="">Title:</label>
    <input className="w-full border px-3 py-2.5 text-lg mt-1 mb-6 rounded-md" placeholder="Enter your title" {...register("title", { required: true })} />

    {/* include validation with required or other standard HTML validation rules */}
    <label className="font-medium" htmlFor="">Description:</label>
    <input className="w-full border px-3 py-2.5 text-lg mb-6 rounded-md" placeholder="Enter task description" {...register("descriptions", { required: true })} />
    {/* errors will return when field validation fails  */}
    {errors.exampleRequired && <span>This field is required</span>}
    {/* include validation with required or other standard HTML validation rules */}
    <label className="font-medium" htmlFor="">Deadlines:</label>
    <input type="datetime-local" className="w-full border px-3 py-2.5 mb-6 text-lg rounded-md" placeholder="Enter deadlines" {...register("deadlines", { required: true })} />
    {/* errors will return when field validation fails  */}
    {errors.exampleRequired && <span>This field is required</span>}
    <label className="font-medium" htmlFor="">Priority:</label>
    <select onChange={handlePriority} className="w-full border px-3 py-2.5 text-lg mb-8 rounded-md" name="" id="">
        <option value="">Select a priority</option>
        <option value="Low">Low</option>
        <option value="Moderate">Moderate</option>
        <option value="high">high</option>
    </select>
    <button className="w-full bg-[#006D77] text-lg font-semibold text-white btn" type="submit">Add Task</button>
    </form>
    </div>
    );
};

export default AddAnewTask;