import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MyContainer from "../../components/container/MyContainer";
import { FaSearch } from "react-icons/fa";

const Coverage = () => {
  const serviceCenters = [
    {
      region: "Dhaka",
      district: "Dhaka",
      city: "Dhaka",
      covered_area: ["Uttara", "Dhanmondi", "Mirpur", "Mohammadpur"],
      status: "active",
      flowchart: "https://example.com/dhaka-flowchart.png",
      longitude: 90.4125,
      latitude: 23.8103,
    },
    {
      region: "Dhaka",
      district: "Gazipur",
      city: "Gazipur",
      covered_area: ["Tongi", "Joydevpur", "Kaliakair", "Sreepur"],
      status: "active",
      flowchart: "https://example.com/gazipur-flowchart.png",
      longitude: 90.4203,
      latitude: 23.9999,
    },
    {
      region: "Chittagong",
      district: "Chittagong",
      city: "Chittagong",
      covered_area: ["Agrabad", "Pahartali", "Patenga", "Halishahar"],
      status: "active",
      flowchart: "https://example.com/chittagong-flowchart.png",
      longitude: 91.8311,
      latitude: 22.3569,
    },
    {
      region: "Rajshahi",
      district: "Rajshahi",
      city: "Rajshahi",
      covered_area: ["Boalia", "Shaheb Bazar", "Motihar", "Rajpara"],
      status: "active",
      flowchart: "https://example.com/rajshahi-flowchart.png",
      longitude: 88.6011,
      latitude: 24.3745,
    },
    {
      region: "Khulna",
      district: "Khulna",
      city: "Khulna",
      covered_area: ["Sonadanga", "Khalishpur", "Daulatpur", "Rupsha"],
      status: "active",
      flowchart: "https://example.com/khulna-flowchart.png",
      longitude: 89.5403,
      latitude: 22.8456,
    },
    {
      region: "Sylhet",
      district: "Sylhet",
      city: "Sylhet",
      covered_area: ["Zindabazar", "Ambarkhana", "Uposhohor", "Bandar Bazar"],
      status: "active",
      flowchart: "https://example.com/sylhet-flowchart.png",
      longitude: 91.8833,
      latitude: 24.8949,
    },
    {
      region: "Barisal",
      district: "Barisal",
      city: "Barisal",
      covered_area: ["Band Road", "Sadar Road", "Rupatoli", "Nathullabad"],
      status: "active",
      flowchart: "https://example.com/barisal-flowchart.png",
      longitude: 90.3696,
      latitude: 22.701,
    },
    {
      region: "Rangpur",
      district: "Rangpur",
      city: "Rangpur",
      covered_area: ["Jahaj Company", "Satmatha", "Dhap", "Mahiganj"],
      status: "active",
      flowchart: "https://example.com/rangpur-flowchart.png",
      longitude: 89.2514,
      latitude: 25.7439,
    },
    {
      region: "Dhaka",
      district: "Narayanganj",
      city: "Narayanganj",
      covered_area: ["Chashara", "Fatullah", "Siddhirganj", "Bandar"],
      status: "active",
      flowchart: "https://example.com/narayanganj-flowchart.png",
      longitude: 90.5,
      latitude: 23.6238,
    },
    {
      region: "Mymensingh",
      district: "Mymensingh",
      city: "Mymensingh",
      covered_area: ["Charpara", "Maskanda", "Akua", "Ganginarpar"],
      status: "active",
      flowchart: "https://example.com/mymensingh-flowchart.png",
      longitude: 90.4074,
      latitude: 24.7471,
    },
  ];
  const position = [23.685, 90.3563];

  // console.log(serviceCenters);
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];

      mapRef.current.flyTo(coord, 14);
    }
  };

  return (
    <div className="min-h-screen py-16">
      <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Service Coverage
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are proud to serve across{" "}
            <span className="font-bold text-primary">
              {serviceCenters.length}+ major districts
            </span>{" "}
            in Bangladesh with professional decoration services
          </p>
        </div>
        <div className="mb-12 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="search"
                  className="grow w-full px-6 py-4 pr-12 border-2 border-gray-300 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-orange-500 
                  focus:border-transparent text-lg shadow-md"
                  name="location"
                  placeholder="Search for your district (e.g., Dhaka, Chittagong)..."
                />
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              </div>
            </div>
          </form>
          <p className="text-sm text-gray-500 mt-3 text-center">
            💡 Try searching: Dhaka, Chittagong, Sylhet, Rajshahi, Khulna...
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-secondary font-bold">
            We deliver almost all over Bangladesh
          </h3>
          <div className="border w-full h-[500px] relative z-0">
            <MapContainer
              center={position}
              zoom={8}
              scrollWheelZoom={false}
              className="h-[500px] z-0"
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {serviceCenters.map((center, index) => (
                <Marker
                  key={index}
                  position={[center.latitude, center.longitude]}
                >
                  <Popup>
                    <strong>{center.district}</strong>
                    <br />
                    Service Area: {center.covered_area.join(", ")}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Coverage;
