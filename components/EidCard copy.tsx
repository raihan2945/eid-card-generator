// components/EidCard.tsx
import { Button } from "antd";
import Image from "next/image";

export default function EidCard() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center h-full p-4">
        <div className="w-full sm:w-[515px] card m-8 rounded border border-1 border-gray-200">
          <Image
            src="/images/Eid-card.gif"
            alt="Profile picture"
            width={500}
            height={300}
            priority
          />
        </div>
        <div>
          <Button>Upload</Button>
          <Button  type="primary">Download</Button>
        </div>
      </div>
    </>
  );
}
