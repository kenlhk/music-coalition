import { Text } from "@nextui-org/react";

const MoreButton = () => (
  <div className="fixed bottom-0 w-full flex justify-center">
    <button
      disabled
      className="animate-bounce my-1 px-5 py-2 bg-blue-600 bg-opacity-80 text-white font-bold rounded-full"
    >
      <Text h5>More</Text>
    </button>
  </div>
);

export default MoreButton;
