// components/EidCard.tsx
"use client";

import { Button, Card } from "antd";
import {
  ArrowBigDown,
  ArrowBigLeft,
  ArrowBigRight,
  ArrowBigUp,
  CloudDownload,
  CloudUpload,
  Image as LucidImage,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { toPng, toSvg } from "html-to-image";

export default function EidCard() {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<any>(null);

  const gifRef = useRef<any>(null);

  const move = (dx: any, dy: any) => {
    setPosition((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPhotoPreview(url);

    return () => URL.revokeObjectURL(url);
  };

  const handleButtonClick = () => {
    photoRef?.current.click(); // open file dialog
  };

  const handleConvertToImage = async () => {
    if (gifRef.current === null) return;

    try {
      const dataUrl = await toPng(gifRef.current, { pixelRatio: 5 });
      const link = document.createElement("a");
      link.download = "eid-mubarak.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to convert HTML to image", err);
    }
  };

  return (
    <>
      <div className="bg-gray-50 w-full flex flex-col justify-start items-center h-screen p-4">
        <div className="w-full h-[430px] sm:w-[515px] card mb-4">
          <div ref={gifRef} className="w-full h-full relative">
            <Image
              src={"/images/Eid-card.gif"}
              alt="Profile picture"
              width={500}
              height={300}
              priority
              objectFit="cover"
              className="z-10 border border-gray-200 rounded absolute max-h-[430px] w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />

            <div className="absolute top-5/7 left-1/2 -translate-x-1/2 -translate-y-4/7">
              {photoPreview ? (
                <Image
                  src={photoPreview || ""}
                  alt="zoom"
                  width={500}
                  height={500}
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                    transition: "transform 0.1s",
                  }}
                  className="max-h-27 w-auto"
                />
              ) : (
                <LucidImage className="text-gray-500 text-4xl" />
              )}
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
            <input
              ref={photoRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
            <Button
              size="large"
              type="primary"
              style={{
                backgroundColor: "#303490",
              }}
              onClick={handleButtonClick}
            >
              <CloudUpload />
              Upload
            </Button>
            <Button size="large" onClick={handleConvertToImage}>
              <CloudDownload />
              Download
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
