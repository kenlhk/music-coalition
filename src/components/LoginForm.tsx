import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input as StaticInput, Text } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const Input = dynamic<React.ComponentProps<typeof StaticInput>>(
  import("@nextui-org/react").then((mod) => mod.Input),
  { ssr: false }
);

interface FormData {
  username: string;
  password: string;
}

const schema = z
  .object({
    username: z.string().min(1, "Required"),
    password: z.string().min(1, "Required"),
  })
  .required();

const LoginForm = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
    reValidateMode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const onSubmit = async (form: FormData) => {
    const res = await signIn("credentials", {
      username: form.username,
      password: form.password,
      redirect: false,
    });

    if (res?.status === 200) {
      router.push("/");
    } else {
      setLoginError("Invalid username/password");
    }
  };

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
      {errors.username && <Text color="error">{errors.username?.message}</Text>}
      <Controller
        name={"password"}
        control={control}
        render={({ field }) => (
          <Input {...field} label="Password" type={"password"} size="lg" />
        )}
      />
      {errors.password && <Text color="error">{errors.password?.message}</Text>}
      <Button type="submit" className="mt-5 z-10">
        Submit
      </Button>

      {loginError && <Text color="error">{loginError}</Text>}
    </form>
  );
};

export default LoginForm;
