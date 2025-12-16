import { Link } from "react-router";

const Card = ({ service }) => {
  const { _id, name, price, image } = service || {};
  console.log(service);
  return (
    <Link
      to={`/service/${_id}`}
      className="col-span-1 cursor-pointer group shadow-xl rounded-xl max-w-md mx-auto p-3"
    >
      <div className="flex flex-col gap-2 w-full">
        {/* Image */}
        <div
          className="
              aspect-square
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            "
        >
          <img
            src={image}
            alt="4BHK Modern Interior"
            className="
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition"
          />
          <div
            className="
              absolute
              top-3
              right-3"
          >
            <span className="bg-gray-800 hover:bg-white text-white hover:text-gray-800 px-3 py-2 rounded-full text-xs font-bold shadow-lg transition-all duration-300">
              category
            </span>
          </div>
        </div>
        <div className="p-3 pt-3">
          {/* service name */}
          <h2 className="text-lg font-bold text-primary ">{name}</h2>

          {/* category */}
          {/* description */}
          <p className="text-sm text-gray-600 font-base mt-1">
            Living Room, Dining Room, Foyer, ...
          </p>

          <div className="flex items-center px-1  justify-between gap-6 mt-2 text-gray-700">
            {/* unit */}
            <div>
              <p className="text-base text-gray-700 hover:text-primary font-semibold mt-1">
                4-BHK
              </p>
            </div>
            {/* pricing */}
            <div>
              <p className="text-base text-rose-600 font-semibold mt-1">
                {price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
