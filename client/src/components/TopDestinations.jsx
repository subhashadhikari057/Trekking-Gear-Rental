import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Mountain, Backpack } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Everest Base Camp",
    description:
      "Trek to the foot of the world's highest mountain through stunning Sherpa villages and dramatic valleys.",
    image: "https://cdn.pixabay.com/photo/2019/09/15/07/31/everest-base-camp-4477525_640.jpg",
    difficulty: "Challenging",
    duration: "14 days",
    elevation: "5,364m",
    gearRecommendations: ["High-altitude sleeping bag", "Trekking poles", "Down jacket"],
  },
  {
    id: 2,
    name: "Annapurna Circuit",
    description:
      "A diverse trek through different landscapes, crossing the challenging Thorong La Pass with breathtaking views.",
    image: "https://pictures.altai-travel.com/1920x0/hikers-during-the-annapurna-circuit-trek-1030.jpg",
    difficulty: "Moderate to Challenging",
    duration: "12-18 days",
    elevation: "5,416m",
    gearRecommendations: ["Microspikes", "Thermal layers", "UV protection sunglasses"],
  },
  {
    id: 3,
    name: "Langtang Valley",
    description:
      "A less crowded trek offering spectacular mountain views, diverse flora and fauna, and rich cultural experiences.",
    image: "https://himalayan-masters.com/wp-content/uploads/2022/09/Kyanjin-Gompa.webp",
    difficulty: "Moderate",
    duration: "7-10 days",
    elevation: "3,870m",
    gearRecommendations: ["Waterproof backpack cover", "Hiking boots", "Fleece jacket"],
  },
  {
    id: 4,
    name: "Manaslu Circuit",
    description:
      "Remote and pristine trek around the world's eighth highest mountain with authentic cultural experiences.",
    image: "https://www.nepalfootprintholiday.com/wp-content/uploads/2024/10/manaslu-trek-photo.webp",
    difficulty: "Challenging",
    duration: "14-16 days",
    elevation: "5,106m",
    gearRecommendations: ["Crampons", "Four-season sleeping bag", "Altitude sickness medication"],
  },
  {
    id: 5,
    name: "Upper Mustang",
    description:
      "Journey through an ancient forbidden kingdom with unique desert-like landscape and Tibetan culture.",
    image: "https://highlightstourism.com/wp-content/uploads/2020/09/upper-mustang.jpg",
    difficulty: "Moderate",
    duration: "10-14 days",
    elevation: "3,840m",
    gearRecommendations: ["Dust mask", "Windproof jacket", "Trekking gaiters"],
  },
]

const TopDestinations = () => {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [visibleItems, setVisibleItems] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleItems(1)
      else if (window.innerWidth < 1024) setVisibleItems(2)
      else setVisibleItems(3)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === destinations.length - visibleItems ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, visibleItems])

  useEffect(() => {
    if (isAutoPlaying) return
    const timeout = setTimeout(() => setIsAutoPlaying(true), 10000)
    return () => clearTimeout(timeout)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? destinations.length - visibleItems : prev - 1))
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === destinations.length - visibleItems ? 0 : prev + 1))
    setIsAutoPlaying(false)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className="py-12 px-4 md:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 flex items-center">
              <Mountain className="mr-2 h-8 w-8 text-[#4f45e4]" />
              Top Trekking Destinations in Nepal
            </h2>
            <p className="text-slate-600 max-w-2xl">
              Explore Nepal's most breathtaking trails with TrailGear's premium equipment rental service. Trek with
              confidence knowing you have the right gear for every adventure.
            </p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <button
              onClick={() => navigate("/browse-gear")}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-black rounded hover:bg-black hover:text-white transition"
            >
              <Backpack className="h-4 w-4" />
              Browse Gear
            </button>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 z-10 flex items-center">
            <button
              onClick={goToPrevious}
              className="h-10 w-10 rounded-full bg-white/80 shadow-md hover:bg-white flex items-center justify-center"
            >
              <ChevronLeft className="h-6 w-6 text-[#4f45e4]" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 z-10 flex items-center">
            <button
              onClick={goToNext}
              className="h-10 w-10 rounded-full bg-white/80 shadow-md hover:bg-white flex items-center justify-center"
            >
              <ChevronRight className="h-6 w-6 text-[#4f45e4]" />
            </button>
          </div>

          {/* Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
            >
              {destinations.map((d) => (
                <div key={d.id} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 p-3">
                  <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all bg-white">
                    <div className="relative h-64 w-full">
                      <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="bg-[#4f45e4] text-xs px-2 py-1 rounded mb-2 inline-block">
                          {d.difficulty}
                        </span>
                        <h3 className="text-xl font-bold">{d.name}</h3>
                        <p className="text-sm">{d.duration} • Max elevation: {d.elevation}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-slate-600 mb-2">{d.description}</p>
                      <h4 className="text-sm font-semibold flex items-center mb-2">
                        <Backpack className="h-4 w-4 mr-1 text-[#4f45e4]" />
                        TrailGear Recommendations:
                      </h4>
                      <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4">
                        {d.gearRecommendations.map((gear, i) => (
                          <li key={i}>{gear}</li>
                        ))}
                      </ul>
                      {/* ✅ New CTA section */}
  <div className="mt-5 text-center">
    <p className="text-sm text-[#4f45e4] font-medium mb-2">
      Explore this place with TrailGear
    </p>
    <button
      onClick={() => navigate("/browse-gear")}
      className="flex items-center justify-center gap-2 px-4 py-2 text-sm border border-black rounded hover:bg-black hover:text-white transition"
    >
      <Backpack className="h-4 w-4" />
      Browse Gear
    </button>
  </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: destinations.length - visibleItems + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentIndex === index ? "bg-[#4f45e4] w-6" : "bg-slate-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopDestinations
