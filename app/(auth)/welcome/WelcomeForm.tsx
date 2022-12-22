"use client";

import { useForm, UseFormRegister } from "react-hook-form";

interface WelcomeFormData {
  name: string;
  username: string;
  image: string;
}

const TextInput = ({
  label,
  name,
  required,
  pattern,
  placeholder,
  startAdornment,
  register,
}: {
  label: string;
  name: string;
  placeholder?: string;
  startAdornment?: string;
  pattern?: RegExp;
  required?: boolean;
  register: UseFormRegister<any>;
}) => {
  return (
    <div
      className="
        p-4
        flex flex-col 
        border border-zinc-800 focus-within:border-zinc-500
        rounded
        group
      "
    >
      <label className="text-xs text-zinc-600 group-focus-within:text-zinc-500">
        {label}
      </label>
      <div className="text-zinc-400 group-focus-within:text-zinc-300">
        {startAdornment}
        <input
          placeholder={placeholder}
          type="text"
          className="
          placeholder:italic placeholder:text-zinc-700 
          p-0 m-0 bg-transparent border-none outline-none ring-0 focus:ring-0"
          {...register(name, {
            required,
            pattern,
          })}
        />
      </div>
    </div>
  );
};

const ErrorText = ({ children }: { children: string }) => (
  <p className="font-bold text-zinc-600">{children}</p>
);

const ParagraphInput = ({
  label,
  name,
  required,
  placeholder,
  startAdornment,
  register,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  startAdornment?: string;
  register: UseFormRegister<any>;
}) => {
  return (
    <div
      className="
        p-4
        flex flex-col 
        border border-zinc-800 focus-within:border-zinc-500
        rounded
        group
      "
    >
      <label className="text-xs text-zinc-600 group-focus-within:text-zinc-500">
        {label}
      </label>
      <div className="text-zinc-400 group-focus-within:text-zinc-300">
        {startAdornment}
        <textarea
          placeholder={placeholder}
          className="
            placeholder:italic placeholder:text-zinc-700 
            w-full
            h-24
            p-0 m-0 bg-transparent border-none outline-none ring-0 focus:ring-0"
          {...register(name, {
            required,
          })}
        />
      </div>
    </div>
  );
};

const DatePicker = ({
  name,
  label,
  required,
  register,
}: {
  label: string;
  name: string;
  required?: boolean;
  register: UseFormRegister<any>;
}) => (
  <div
    className="
        p-4
        flex flex-col 
        border border-zinc-800 focus-within:border-zinc-500
        rounded
        group
      "
  >
    <label className="text-xs text-zinc-600 group-focus-within:text-zinc-500">
      {label}
    </label>
    <div className="text-zinc-400 group-focus-within:text-zinc-300">
      <input
        type="date"
        className="
          placeholder:italic placeholder:text-zinc-700 
          p-0 m-0 bg-transparent border-none outline-none ring-0 focus:ring-0"
        {...register(name, {
          required,
        })}
      />
    </div>
  </div>
);

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
      bio: undefined,
      birthdate: undefined,
    },
  });

  const onSubmit = async (data: WelcomeFormData | any) => {
    console.log(data);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    console.log(json);
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextInput
          required
          label="Name"
          name="name"
          placeholder="Anthony Cueva"
          register={register}
        />
        {errors.name?.type === "required" && (
          <ErrorText>This field is required</ErrorText>
        )}
        {errors.name?.type === "maxLength" && (
          <ErrorText>
            The name field cannot be longer than 36 characters
          </ErrorText>
        )}
      </div>
      <div>
        <TextInput
          label="Username"
          name="username"
          required
          pattern={/^[a-zA-Z0-9\-\_]+$/}
          placeholder="cuevatnt"
          startAdornment="@"
          register={register}
        />
        {errors.username?.type === "required" && (
          <ErrorText>This field is required</ErrorText>
        )}
        {errors.username?.type === "pattern" && (
          <ErrorText>You can only use letters and digits</ErrorText>
        )}
      </div>
      <ParagraphInput
        label="Bio"
        name="bio"
        placeholder="Hello world, it's me!"
        register={register}
      />

      <DatePicker label="Birthdate" name="birthdate" register={register} />

      <input
        type="submit"
        className="
          w-full h-12 
          outline-none ring-0 focus:ring-0 
          bg-zinc-600 focus:bg-zinc-500 
          text-white font-bold text-lg
          rounded"
        value="Send"
      />
    </form>
  );
}
