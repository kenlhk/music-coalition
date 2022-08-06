import { Text } from "@nextui-org/react";
import SignUpForm from "../../components/auth/SignUpForm";

const Signup = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center pt-10 md:pt-16 absolute left-0">
      <Text h2 className="max-w-md">
        Sign Up
      </Text>
      <SignUpForm />
    </div>
  );
};

export default Signup;
