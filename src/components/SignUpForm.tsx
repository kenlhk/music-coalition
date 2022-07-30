import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input as StaticInput, Text } from "@nextui-org/react";
import dynamic from "next/dynamic";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const Input = dynamic<React.ComponentProps<typeof StaticInput>>(
  import("@nextui-org/react").then((mod) => mod.Input),
  { ssr: false }
);

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = z
  .object({
    username: z.string().min(6, { message: "Must be at least 6 characters" }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Must be at least 6 characters" }),
  })
  .required();

const SignUpForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    reValidateMode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full sm:w-96 h-auto p-5 gap-y-1"
    >
      <Controller
        name={"username"}
        control={control}
        render={({ field }) => <Input {...field} label="Username" size="lg" />}
      />
      {errors.username && <Text color="error">{errors.username.message}</Text>}
      <Controller
        name={"email"}
        control={control}
        render={({ field }) => <Input {...field} label="Email" size="lg" />}
      />
      {errors.email && <Text color="error">{errors.email.message}</Text>}
      <Controller
        name={"password"}
        control={control}
        render={({ field }) => (
          <Input {...field} label="Password" type={"password"} size="lg" />
        )}
      />
      {errors.password && <Text color="error">{errors.password.message}</Text>}
      <Controller
        name={"confirmPassword"}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Confirm Password"
            type={"password"}
            size="lg"
          />
        )}
      />
      {errors.confirmPassword && (
        <Text color="error">{errors.confirmPassword?.message}</Text>
      )}
      <Button type="submit" className="mt-5 z-10">
        Submit
      </Button>
    </form>
  );
};

export default SignUpForm;
