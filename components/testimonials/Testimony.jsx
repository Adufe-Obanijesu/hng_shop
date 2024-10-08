import Image from "next/image";
import { GoStarFill } from "react-icons/go";

export default function Testimony({ img, text, name, career }) {
  return (
    <div className="bg-white h-full md:pr-8 md:pl-10 pr-4 pl-6 pb-10 pt-8 grid grid-cols-5 md:gap-8 gap-3 rounded-lg">
      <div className="col-span-2 relative">
        <div className="flex justify-end relative z-10">
          <Image
            src={`/img/testimonies/${img}`}
            alt={name}
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-full md:h-full lg:h-full xl:h-full sm:h-full h-28 absolute md:-bottom-3 top-3 -left-3 bg-gray-300"></div>
      </div>

      <div className="col-span-3 space-y-4">
        <div className="space-y-2">
          <p className="font-semibold text-sm">
            &quot;
            {text}
            &quot;
          </p>

          <div className="flex gap-1">
            <GoStarFill className="text-orange-400 text-sm" />
            <GoStarFill className="text-orange-400 text-sm" />
            <GoStarFill className="text-orange-400 text-sm" />
            <GoStarFill className="text-orange-400 text-sm" />
            <GoStarFill className="text-orange-400 text-sm" />
          </div>
        </div>

        <hr className="w-1/2 border-[1.2px] text-gray-800" />

        <div>
          <h3 className="font-bold md:text-3xl text-xl">{name}</h3>
          <h5 className="font-semibold text-sm">{career}</h5>
        </div>
      </div>
    </div>
  );
}
