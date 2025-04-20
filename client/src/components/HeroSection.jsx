import React from "react"
import videoFile from "./video.mp4"

// Simple reusable Button component
const Button = ({ children, onClick, className = "", variant = "default", size = "md", ...props }) => {
  const baseStyles = "rounded px-4 py-2 font-semibold transition-all"
  const sizeStyles = size === "lg" ? "text-lg py-3 px-6" : size === "icon" ? "p-2" : "text-base"
  const variantStyles = {
    default: "bg-white text-black hover:bg-white/90",
    outline: "border border-white text-white hover:bg-white/20",
    secondary: "bg-black/50 text-white hover:bg-black/70"
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles[variant] || ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default function VideoHero() {
  return (
    <section 
      className="relative w-full overflow-hidden h-[80vh]" 
      // 🔧 Adjusted height: you can change h-[80vh] as needed
    >
      {/* Video Background */}
      <div className="absolute inset-0 h-full w-full">
        <video
          id="background-video"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          poster="/placeholder.svg"
        >
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Explore the Wilderness
        </h1>
        <p className="mb-8 max-w-2xl text-lg sm:text-xl md:text-2xl italic">
          Embark on an unforgettable journey through nature's most breathtaking landscapes
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg">
            Start Your Adventure
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
