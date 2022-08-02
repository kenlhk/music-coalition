import {
  Button,
  Popover,
  Progress,
  Spacer,
  Text,
  User,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { ReactNode } from "react";
import { TbBrandGithub } from "react-icons/tb";
import useBurgerMenuStore from "../../stores/useBurgerMenuStore";
import useLoadingStore from "../../stores/useLoadingStore";

const BurgerMenu = dynamic(() => import("./BurgerMenu"));
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
  const router = useRouter();

  Router.events.on("routeChangeStart", () => {
    setLoading(true);
    setOpen(false);
  });

  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });

  return (
    <nav className="sticky top-0 z-50 w-full bg-black bg-opacity-90 pb-1">
      <div className="flex flex-col">
        {/* Progress Bar */}
        <div className="w-full mb-0.5">
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

        <div className="flex w-full px-3">
          <div className="flex items-center w-1/2 md:w-1/3">
            <div className="hidden md:inline-block">
              <Logo />
            </div>
            <div className="inline-block absolute bottom-0 h-full md:hidden w-1/2">
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
          </div>

          <div className="hidden md:inline-block flex items-end w-1/3">
            <SearchBar bordered />
          </div>

          <div className="flex justify-end items-center w-1/2 md:w-1/3">
            {status === "authenticated" ? (
              <Popover>
                <Popover.Trigger>
                  <User
                    as="button"
                    src={session?.user?.image || "/Avatar_Placeholder.png"}
                    name={session?.user?.name}
                    size="lg"
                    bordered
                  />
                </Popover.Trigger>
                <Popover.Content>
                  <div>
                    <Button auto color={"gradient"} onPress={() => signOut()}>
                      Log Out
                    </Button>
                  </div>
                </Popover.Content>
              </Popover>
            ) : (
              <Button auto color={"gradient"} onPress={() => signIn()}>
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <div className="w-full p-1 z-40 flex justify-center bg-black bg-opacity-90">
      <Text>Developed by Ken</Text>
      <Spacer x={0.5} />
      <a
        href={"https://github.com/kenlhk/music-coalition"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-inherit"
      >
        <TbBrandGithub size={30} />
      </a>
    </div>
  );
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col justify-between min-h-screen min-w-screen">
      <NavBar />
      <main className="flex flex-col justify-between flex-grow">
        <div className="px-8 py-2">{children}</div>
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
