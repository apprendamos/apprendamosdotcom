"use client";

import { useForm } from "react-hook-form";

interface WelcomeFormData {
  name: string;
  username: string;
  image: string;
}

export default function WelcomeForm() {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "Anthony Cueva",
      username: "cuevatnt",
    },
  });

  const onSubmit = (data: WelcomeFormData | any) => {
    console.log(data);
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <label>Name</label>
        <input
          type="text"
          {...register("name", {
            required: true,
            maxLength: 36,
          })}
        />
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && (
          <p>The name field cannot be longer than 36 characters</p>
        )}
      </div>
      <div className="flex justify-between">
        <label>Username</label>
        <input
          type="text"
          {...register("username", {
            required: true,
            pattern: /^[a-zA-Z0-9\-\_]+$/,
          })}
        />
      </div>
      {errors.username?.type === "required" && <p>This field is required</p>}
      {errors.username?.type === "pattern" && (
        <p>You can only use letters and digits</p>
      )}
      <input type="submit" value="Send" />
    </form>
  );
}
