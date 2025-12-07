import React, { useEffect, useState } from "react";
import CircleLoader from "react-spinners/CircleLoader";

export default function Loader({ size = 80, color = "#3b82f6" }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 10000);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-full bg-white">
      <CircleLoader loading={loading} size={size} color={color} />
    </div>
  );
}
