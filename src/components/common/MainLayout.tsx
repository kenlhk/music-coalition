import {
  Col,
  Container,
  FormElement,
  Input,
  Row,
  Text,
  User,
} from "@nextui-org/react";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  ReactNode,
  useState,
} from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const onChange = (e: ChangeEvent<FormElement>) => {
    setQuery(e.currentTarget.value);
  };

  const onKeyDown = (e: KeyboardEvent<FormElement>) => {
    if (e.key === "Enter" && query) {
      router.push(
        {
          pathname: "/search/[prompt]/tracks",
          query: { prompt: query },
        },
        undefined,
        { shallow: false, scroll: true }
      );
    }
  };

  return (
    <Input
      type={"search"}
      size="xl"
      width="100%"
      onKeyDown={onKeyDown}
      onChange={onChange}
      labelPlaceholder="Search"
      animated={false}
    />
  );
};

const NavBar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full bg-black bg-opacity-90 p-1">
      <Row>
        <Col>
          <Text h2 weight={"bold"} color="primary">
            MusicCube
          </Text>
        </Col>
        <Col>
          <SearchBar />
        </Col>
        <Col>
          <User
            src={session?.user?.image as string | undefined}
            name={session?.user?.name}
            size="lg"
            className="absolute right-0"
          />
        </Col>
      </Row>
    </nav>
  );
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
