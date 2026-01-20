import { Roboto ,Poppins , Gravitas_One} from "next/font/google";
import React from "react";
import localFont from "next/font/local";
const roboto=Roboto({
    weight:["100","200","300","400","500","600","700","800","900"],
    subsets:["latin"],

});
const poppins=Poppins({
    weight:["100","200","300","400","500","600","700","800","900"],
    subsets:["latin"], 

});

const gravitasOne = Gravitas_One({
    weight: "400",
    subsets: ["latin"],
});
const myFont=localFont({
    src: "../../public/fonts/loveday.ttf"
});
const FontExample = () => {
  return (
    <div>
      <h1 className={`text-4xl ${myFont.className}`}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error,
        aliquid.
      </h1>

      <p className={` ${gravitasOne.className}`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id fuga non
        soluta ipsa quisquam architecto vitae fugit a quibusdam nobis harum
        cumque nemo amet mollitia, exercitationem illo eveniet. Deleniti, eos.
        Expedita ipsa perferendis architecto impedit, sed ullam nemo amet cum
        suscipit sit, in rerum. Reiciendis perspiciatis blanditiis voluptatum
        vitae repellat voluptates. Quidem, rerum? Molestias laboriosam, quam, ex
        ipsa odio non reprehenderit a magni eos voluptas aspernatur dicta
        voluptatibus veritatis in et? Laborum, velit accusantium doloremque
        inventore tempora voluptatibus consectetur harum?
      </p>
    </div>
  );
};

export default FontExample;
