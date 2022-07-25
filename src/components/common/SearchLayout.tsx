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
    <nav className="sticky top-0 z-50 w-full bg-black bg-opacity-90">
      <Row justify="space-between">
        <Text h3 css={{ alignSelf: "end" }}>
          Results for:{" "}
          <Text color="primary" span>
            {prompt}
          </Text>{" "}
        </Text>
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
      </Row>

      <div>{children}</div>
    </nav>
  );
};

export default SearchLayout;
