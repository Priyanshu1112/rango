import { LoaderCircle } from "lucide-react";

const Loader = ({ size = 20 }: { size?: number }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoaderCircle className="rotate" size={size} />
    </div>
  );
};

export default Loader;
