import { Text } from "@nextui-org/react";
import SignUpForm from "../../components/auth/SignUpForm";

const Signup = () => {
  return (
    <div className="flex flex-col items-center py-16">
      <Text h2 className="max-w-md">
        Sign Up
      </Text>
      <SignUpForm />
    </div>
  );
};

export default Signup;
