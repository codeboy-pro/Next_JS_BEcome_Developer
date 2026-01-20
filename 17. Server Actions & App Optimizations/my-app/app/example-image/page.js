import React from "react";
import Image from "next/image";

const ExampleImage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        src={
          "https://imgs.search.brave.com/6me2v7S4vlP5EtJ9XV2BV1qj66EKM5RQ8l343gN0H1k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWct/Y29ycC5jb20vaW1h/Z2VzL3NsaWRlcy9C/WUYtSGVhZGVyLmpw/Zw"
        }
        alt="Example image"
        width={500}
        height={500}
      />
    </div>
  );
};

export default ExampleImage;
