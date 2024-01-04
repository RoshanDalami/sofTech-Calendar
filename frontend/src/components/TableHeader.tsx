import { useEffect, useRef } from "react";

export default function TableHeader({ title }: { title: string }) {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    titleRef.current?.classList.add("animate-drop");
  }, []);
  return (
    <div className="mx-4 pt-4 md:mx-0">
      <div className="flex flex-col gap-4 rounded-lg bg-gray-300 px-5 pt-4 shadow-xl">
        <div
          ref={titleRef}
          className="flex items-center justify-center py-6 text-3xl font-medium italic"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            color: "#333",
            position: "relative",
          }}
        >
          <div
            className="absolute top-0 h-1 w-full bg-gradient-to-r from-blue-500 to-pink-500"
            style={{ zIndex: -1 }}
          ></div>
          {title}
          <div
            className="absolute bottom-0 h-1 w-full bg-gradient-to-r from-pink-500 to-blue-500"
            style={{ zIndex: -1 }}
          ></div>
        </div>
        <div className="flex justify-center text-gray-500">
          <span className="mx-1 h-2 w-2 rounded-full bg-gray-500"></span>
          <span className="mx-1 h-2 w-2 rounded-full bg-gray-500"></span>
          <span className="mx-1 h-2 w-2 rounded-full bg-gray-500"></span>
        </div>
        <hr />
      </div>
      <br />
    </div>
  );
}
