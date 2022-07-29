import { Button, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface SearchLayoutProps {
  children: ReactNode;
}

const SearchLayout = ({ children }: SearchLayoutProps) => {
  const router = useRouter();
  const prompt = router.query.prompt;
  const section = router.asPath.split("/").pop();
  const CATEGORIES = ["tracks", "artists", "albums"];

  return (
    <nav className="sticky top-0 z-0 w-full bg-black bg-opacity-90">
      <div className="flex flex-wrap justify-between">
        <div>
          <Text h3 css={{ alignSelf: "end" }}>
            Results for:{" "}
            <Text color="primary" span>
              {prompt}
            </Text>{" "}
          </Text>
        </div>
        <div>
          <Button.Group color="gradient">
            {CATEGORIES.map((category, index) => (
              <Button
                key={index}
                onPress={() => router.push(`/search/${prompt}/${category}`)}
                bordered={category !== section}
                css={(category === section && { pointerEvents: "none" }) || {}}
              >
                <Text h5 css={{ textTransform: "capitalize" }}>
                  {category}
                </Text>
              </Button>
            ))}
          </Button.Group>
        </div>
      </div>

      <div>{children}</div>
    </nav>
  );
};

export default SearchLayout;
