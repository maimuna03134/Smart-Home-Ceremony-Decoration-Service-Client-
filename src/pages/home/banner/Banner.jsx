
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../shared/button/Button";

const titles = [
    { title: "Smart Home Decoration", subtitle: "Modern Living, Smarter Style" },
    { title: "Professional Event Solutions", subtitle: "Corporate & Meeting Spaces" },
    { title: "Memorable Birthday Celebrations", subtitle: "Every Moment Counts" },
    { title: "Elegant Wedding Decoration", subtitle: "Create Your Dream Wedding" },
];

const videoSrc = "https://res.cloudinary.com/dzbsfjpyf/video/upload/v1768128906/smartHome_ugfrey.mp4";

const Banner = () => {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();

    // Auto slide every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % titles.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const prevSlide = () =>
        setCurrent((current - 1 + titles.length) % titles.length);

    const nextSlide = () => setCurrent((current + 1) % titles.length);

    return (
        <>
            <div className="absolute top-0 left-0 w-full flex justify-center">
                <div className="w-full">
                    <div className="relative w-full overflow-hidden rounded-b-2xl shadow-2xl bg-black">

                        {/* Single Video Background */}
                        <video
                            src={videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="w-full h-[90vh] object-cover"
                           
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

                        {/* Text Slider - Only titles change */}
                        <div className="absolute bottom-20 left-10 text-white max-w-xl">
                            <div
                                className="md:ms-10 transition-all duration-700 ease-in-out"
                                key={current}
                                style={{
                                    animation: 'fadeIn 0.7s ease-in-out'
                                }}
                            >
                                <h1 className=" text-2xl md:text-3xl lg:4xm font-bold leading-tight">
                                    {titles[current].title}
                                </h1>
                                <p className="mt-3 text-sm md:text-base text-gray-200">
                                    {titles[current].subtitle}
                                </p>

                                {/* CTA Button */}
                                <div className="mt-6">
                                    <Button
                                        label="Browse Services"
                                        onClick={() => navigate("/services")}
                                        icon={ArrowRight}
                                        small
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-transparent hover:bg-white/40 text-white p-3 rounded-full backdrop-blur transition hidden md:block"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-3 h-3" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent hover:bg-white/40 text-white p-3 rounded-full backdrop-blur transition hidden md:block"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-3 h-3" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {titles.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`h-2 rounded-full transition-all ${current === i ? "w-6 bg-white" : "w-2 bg-white/50"
                                        }`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer */}
            <div className="mb-[95vh] md:mb-[85vh]" />

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </>
    );
};

export default Banner;