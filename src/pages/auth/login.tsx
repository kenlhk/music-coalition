import { Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div className="w-screen h-screen flex flex-col items-center pt-10 md:pt-16 absolute left-0">
      <Text h2 className="max-w-md">
        Log In
      </Text>
      <LoginForm />
      {error && (
        <Text color="error" className="pb-2">
          {error}
        </Text>
      )}
      <Link href={"/auth/signup"}>No account? Please sign up</Link>
    </div>
  );
};

export default Login;
