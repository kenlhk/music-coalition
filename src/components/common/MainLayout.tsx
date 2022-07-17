import { Col, Row, Text, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ReactNode } from "react";

const SearchBar = dynamic(() => import("./SearchBar"), { ssr: false });

interface MainLayoutProps {
  children: ReactNode;
}

const NavBar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full bg-black bg-opacity-90 p-1">
      <Row>
        <Col>
          <Text
            h2
            weight={"bold"}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
          >
            <Link href={"/"}>MusicCube</Link>
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
    <div>
      <NavBar />
      <div className="p-5">{children}</div>
    </div>
  );
};

export default MainLayout;
