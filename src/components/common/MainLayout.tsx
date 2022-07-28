import { Progress, Text, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Router } from "next/router";
import { ReactNode } from "react";
import useBurgerMenuStore from "../../stores/useBurgerMenuStore";
import useLoadingStore from "../../stores/useLoadingStore";
import BurgerMenu from "./BurgerMenu";

const SearchBar = dynamic(() => import("./SearchBar"), { ssr: false });

interface MainLayoutProps {
  children: ReactNode;
}

const Logo = () => {
  return (
    <Text
      h2
      weight={"bold"}
      css={{
        textGradient: "45deg, $blue600 -20%, $pink600 50%",
      }}
    >
      <Link href={"/"}>MusicCube</Link>
    </Text>
  );
};

const NavBar = () => {
  const { data: session, status } = useSession();

  const { isLoading, setLoading } = useLoadingStore();

  const { setOpen } = useBurgerMenuStore();

  Router.events.on("routeChangeStart", () => {
    setLoading(true);
    setOpen(false);
  });

  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });

  return (
    <nav className="sticky top-0 z-50 w-full bg-black bg-opacity-90">
      <div className="flex flex-col">
        <div className="w-full">
          {isLoading ? (
            <Progress
              indeterminated
              value={50}
              color="primary"
              css={{ background: "none" }}
              size={"xs"}
            />
          ) : (
            <Progress
              value={0}
              color="primary"
              size={"xs"}
              css={{ background: "none" }}
            />
          )}
        </div>

        <div className="flex w-full pl-1 pr-1">
          <div className="hidden md:inline-block w-1/3">
            <Logo />
          </div>
          <div className="inline-block md:hidden w-1/2">
            <BurgerMenu>
              <div className="absolute top-0 left-2 p-0">
                <Logo />
              </div>
              <div className="flex flex-col w-full pt-5">
                <SearchBar status="primary" />
                <div className="py-5 px-2">
                  <Link href={"/"}>
                    <a>
                      <Text size={20}>Home</Text>
                    </a>
                  </Link>
                </div>
              </div>
            </BurgerMenu>
          </div>
          <div className="hidden md:inline-block w-1/3">
            <SearchBar />
          </div>
          <div className="flex justify-end w-1/2 md:w-1/3">
            <User
              src={session?.user?.image as string | undefined}
              name={session?.user?.name}
              size="lg"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <NavBar />
      <div className="py-5 px-2">{children}</div>
    </div>
  );
};

export default MainLayout;
