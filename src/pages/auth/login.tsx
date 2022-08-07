import { Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div className="flex flex-col items-center py-24">
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
