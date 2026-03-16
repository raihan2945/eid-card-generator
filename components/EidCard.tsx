// components/EidCard.tsx
"use client";

import { Button, Card } from "antd";
import {
  ArrowBigDown,
  ArrowBigLeft,
  ArrowBigLeftDash,
  ArrowBigRight,
  ArrowBigUp,
  ChevronLeft,
  ChevronRight,
  CloudDownload,
  CloudUpload,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";

export default function EidCard() {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // ← card with photo
  const [croppedBlobUrl, setCroppedBlobUrl] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const CARD_WIDTH = 1200;
  const CARD_HEIGHT = 800;

  // Where the black square / photo frame is located in your template
  const PHOTO_X = 380; // ← you need to measure this
  const PHOTO_Y = 220;
  const PHOTO_W = 440;
  const PHOTO_H = 400;

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const move = (dx: any, dy: any) => {
    setPosition((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
  };

  return (
    <>
      <div className="bg-[#FCF4EB] w-full flex flex-col justify-start items-center h-screen p-4">
        <div className="w-full h-[430px] sm:w-[515px] card mb-4">
          <div className="w-full h-full relative">
            <Image
              src="/images/Eid-card.gif"
              alt="Profile picture"
              width={500}
              height={300}
              priority
              objectFit="cover"
              className="z-10 absolute max-h-[430px] w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />

            <div className="absolute top-5/7 left-1/2 -translate-x-1/2 -translate-y-4/7">
              <Image
                src="/images/du2.jpg"
                alt="zoom"
                width={500}
                height={500}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                  transition: "transform 0.1s",
                }}
                className="max-h-27 w-auto"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Card className="w-full">
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="range range-secondary w-full text-green-500"
            />
            <div className="space-x-2 mt-3">
              <Button onClick={() => move(0, -5)}>
                <ArrowBigUp />
              </Button>
              <Button onClick={() => move(0, 5)}>
                <ArrowBigDown />
              </Button>
              <Button onClick={() => move(-5, 0)}>
                <ArrowBigLeft />
              </Button>
              <Button onClick={() => move(5, 0)}>
                <ArrowBigRight />
              </Button>
            </div>
          </Card>

          <div className="flex gap-3 mt-4">
            <Button
              size="large"
              type="primary"
              style={{
                backgroundColor: "#303490",
              }}
            >
              <CloudUpload />
              Upload
            </Button>
            <Button
              // style={{
              //   backgroundColor: "#303490",
              // }}
              size="large"
              // type="primary"
            >
              <CloudDownload />
              Download
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
