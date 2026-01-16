import React from 'react'
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"

interface IFormInput {
  title: string;
  description: string;
}


const CreateTodo = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

    return (
    <div className='flex bg-gray-100 w-full flex-col items-center justify-center '>
        <h1>Create Todo</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)} className='bg-red-300 flex flex-col justify-center  text-2xl w-[70vw] h-[60vh] rounded-md p-5'>
            <label htmlFor="title"> Title : </label>
          <input type="text" id='title' placeholder="Title" {...register("title", { required: true })} />
           <label htmlFor="description"> Description : </label>
          <input type="text"  id='description' placeholder="Description" {...register("description", { required: true })} />
          <input type="submit" value={"add todo"} />
        </form>
    </div>
  )
}

export default CreateTodo
