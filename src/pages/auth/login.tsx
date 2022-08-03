import { Text } from "@nextui-org/react";
import Link from "next/link";
import LoginForm from "../../components/auth/LoginForm";

const login = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center pt-10 md:pt-16 absolute left-0">
      <Text h2 className="max-w-md">
        Log In
      </Text>
      <LoginForm />
      <Link href={"/auth/signup"}>No account? Please sign up</Link>
    </div>
  );
};

export default login;
