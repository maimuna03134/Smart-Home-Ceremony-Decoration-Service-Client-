// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";

// const slides = [
//     {
//         // Smart home decoration video
//         video: "https://res.cloudinary.com/dzbsfjpyf/video/upload/v1768108493/smart_hole_lighting_xshuwk.mp4",
//         title: "Smart Home Decoration",
//         subtitle: "Modern Living, Smarter Style",
//         description:
//             "Upgrade your living space with modern smart home decor, ambient lighting, and elegant interiors designed for comfort and technology.",
//     },
//     // {
//     //     // Replace these video URLs with your own decoration videos
//     //     video: "https://videos.pexels.com/video-files/7233258/7233258-uhd_2560_1440_25fps.mp4", // Wedding decoration
//     //     title: "Elegant Wedding Decoration",
//     //     subtitle: "Create Your Dream Wedding",
//     //     description: "Transform your special day with our stunning wedding stage and venue decoration services.",
//     // },
//     // {
//     //     video: "https://videos.pexels.com/video-files/6894223/6894223-hd_1920_1080_30fps.mp4", // Birthday/Party decoration
//     //     title: "Memorable Birthday Celebrations",
//     //     subtitle: "Every Moment Counts",
//     //     description: "Make birthdays unforgettable with our creative balloon decorations and themed party setups.",
//     // },
//     // {
//     //     video: "https://videos.pexels.com/video-files/3945402/3945402-uhd_2560_1440_30fps.mp4", // Corporate/Meeting room
//     //     title: "Professional Event Solutions",
//     //     subtitle: "Corporate & Meeting Spaces",
//     //     description: "Elevate your business events, seminars, and meetings with our modern decoration services.",
//     // },
// ];

// const Banner = () => {
//     const [current, setCurrent] = useState(0);
//     const navigate = useNavigate();

//     // Auto-play every 6 seconds
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrent((prev) => (prev + 1) % slides.length);
//         }, 6000);
//         return () => clearInterval(interval);
//     }, []);

//     const prevSlide = () =>
//         setCurrent((current - 1 + slides.length) % slides.length);

//     const nextSlide = () => setCurrent((current + 1) % slides.length);

//     const handleViewServices = () => {
//         navigate("/services");
//     };

//     return (
//         <>
//             <div className=" w-full flex top-0 left-0 justify-center">
//                 <div className="max-w-7xl mx-auto w-full px-4">
//                     <div className="relative w-full overflow-hidden bg-black rounded-2xl shadow-2xl">
//                         {/* Video Slides */}
//                         <div
//                             className="flex transition-transform duration-700 ease-in-out"
//                             style={{ transform: `translateX(-${current * 100}%)` }}
//                         >
//                             {slides.map((slide, i) => (
//                                 <div key={i} className="w-full shrink-0 relative">
//                                     <video
//                                         src={slide.video}
//                                         autoPlay
//                                         loop
//                                         muted
//                                         playsInline
//                                         className="w-full h-[70vh] object-cover brightness-75"
//                                     />

//                                     {/* Dark Overlay */}
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

//                                     {/* Text Content Overlay */}
//                                     <div className="absolute inset-0 flex items-center justify-center">
//                                         <div className="text-center text-white px-4 max-w-4xl mx-auto">
//                                             {/* Subtitle */}
//                                             <p
//                                                 className="text-orange-400 text-sm md:text-base uppercase tracking-wider mb-3 font-semibold animate-fade-in"
//                                                 style={{
//                                                     animationDelay: '0.2s',
//                                                     opacity: 0,
//                                                     animation: 'fadeIn 1s ease-in forwards'
//                                                 }}
//                                             >
//                                                 {slide.subtitle}
//                                             </p>

//                                             {/* Main Title */}
//                                             <h1
//                                                 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight animate-fade-in"
//                                                 style={{
//                                                     animationDelay: '0.4s',
//                                                     opacity: 0,
//                                                     animation: 'fadeIn 1s ease-in forwards',
//                                                     textShadow: '0 4px 20px rgba(0,0,0,0.5)'
//                                                 }}
//                                             >
//                                                 {slide.title}
//                                             </h1>

//                                             {/* Description */}
//                                             <p
//                                                 className="text-base md:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in"
//                                                 style={{
//                                                     animationDelay: '0.6s',
//                                                     opacity: 0,
//                                                     animation: 'fadeIn 1s ease-in forwards'
//                                                 }}
//                                             >
//                                                 {slide.description}
//                                             </p>

//                                             {/* CTA Button */}
//                                             <button
//                                                 onClick={handleViewServices}
//                                                 className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white px-8 md:px-12 py-3 md:py-4 rounded-full text-base md:text-lg font-bold shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 animate-fade-in"
//                                                 style={{
//                                                     animationDelay: '0.8s',
//                                                     opacity: 0,
//                                                     animation: 'fadeIn 1s ease-in forwards'
//                                                 }}
//                                             >
//                                                 View Our Services
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Navigation Buttons */}
//                         <button
//                             onClick={prevSlide}
//                             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
//                             aria-label="Previous slide"
//                         >
//                             <ChevronLeft className="w-6 h-6" />
//                         </button>

//                         <button
//                             onClick={nextSlide}
//                             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
//                             aria-label="Next slide"
//                         >
//                             <ChevronRight className="w-6 h-6" />
//                         </button>

//                         {/* Dots Indicator */}
//                         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
//                             {slides.map((_, i) => (
//                                 <button
//                                     key={i}
//                                     onClick={() => setCurrent(i)}
//                                     className={`h-2 rounded-full transition-all duration-300 ${current === i
//                                             ? "bg-white w-8"
//                                             : "bg-white/50 w-2 hover:bg-white/70"
//                                         }`}
//                                     aria-label={`Go to slide ${i + 1}`}
//                                 />
//                             ))}
//                         </div>

//                         {/* Decorative Elements */}
//                         <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
//                         <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white/30 rounded-br-lg" />
//                     </div>
//                 </div>
//             </div>

//             {/* Spacer to push content down */}
//             <div className="h-[75vh]"></div>

//             <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//             <div className="mb-[500px]"></div>
//         </>
//     );
// };

// export default Banner;



import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const videos = [
    "https://cdn.dribbble.com/userupload/44360845/file/4988e26dadf995df34b5bfde3d04d45d.mp4",
    "https://cdn.dribbble.com/userupload/44953456/file/76723a83e127562547a28df5001d257b.webm",
    "https://cdn.dribbble.com/userupload/16569515/file/original-d99071d642c8efd87400222a0c344e1a.mp4",
];

const Banner = () => {
    const [current, setCurrent] = useState(0);

    // Auto-play the carousel every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % videos.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const prevSlide = () =>
        setCurrent((current - 1 + videos.length) % videos.length);
    const nextSlide = () => setCurrent((current + 1) % videos.length);

    return (
        <>
            <div className="absolute w-full flex top-0 left-0 justify-center ">
                <div className="max-w-7xl mx-auto">
                    <div className="relative w-full overflow-hidden bg-black rounded-2xl shadow-2xl">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            {videos.map((src, i) => (
                                <div key={i} className="w-full shrink-0 relative">
                                    <video
                                        src={src}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-[70vh] object-cover brightness-90"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                                </div>
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Dots indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {videos.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`h-2 w-2 rounded-full transition-all ${current === i ? "bg-white w-4" : "bg-white/50"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-[300px]"></div>
        </>
    );
};

export default Banner;