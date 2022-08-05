import { Spacer, Text } from "@nextui-org/react";
import { TbBrandGithub } from "react-icons/tb";

const Footer = () => {
  return (
    <div className="w-full z-20 flex justify-center bg-black bg-opacity-90 p-2">
      <Text>Developed by Ken</Text>
      <Spacer x={0.5} />
      <a
        href={"https://github.com/kenlhk/"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-inherit"
      >
        <TbBrandGithub size={30} />
      </a>
    </div>
  );
};

export default Footer;
