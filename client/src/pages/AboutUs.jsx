import React from "react"

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-24"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#4f45e4]/90 to-[#4f45e4]/70"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            About TrailGear
          </h1>
          <p className="text-lg text-white/90">
            We're passionate about making trekking affordable and accessible
            through high-quality gear rentals and friendly support.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Our Mission & Values
          </h2>
          <p className="text-gray-600 max-w-2xl text-center mx-auto mb-12">
            At TrailGear, we believe everyone should experience the mountains
            without owning expensive gear. We focus on accessibility,
            sustainability, and community.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md p-6 rounded-lg text-center">
              <div className="text-[#4f45e4] text-4xl mb-4">🏕️</div>
              <h3 className="text-xl font-semibold mb-2">Adventure for All</h3>
              <p className="text-gray-600 text-sm">
                We ensure budget-friendly access to essential trekking gear so
                every explorer can start their journey.
              </p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg text-center">
              <div className="text-[#4f45e4] text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Quality & Safety</h3>
              <p className="text-gray-600 text-sm">
                All gear is cleaned and inspected after each use, so you trek
                worry-free.
              </p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg text-center">
              <div className="text-[#4f45e4] text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600 text-sm">
                Renting reduces waste. We support sustainable practices in the
                outdoor gear community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              TrailGear began with a small team of trekkers who realized that
              many friends wanted to explore but were limited by gear costs.
            </p>
            <p className="text-gray-600 mb-4">
              What started with a few tents and backpacks has grown into
              Nepal’s trusted gear rental platform. From city hikers to alpine
              climbers, we serve adventurers of all kinds.
            </p>
            <p className="text-gray-600">
              Our dream is simple: break barriers, build community, and fuel
              your passion for the trails.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://st2.depositphotos.com/1017986/7761/i/950/depositphotos_77612174-stock-photo-group-of-friends-with-backpacks.jpg"
              alt="Our team on trek"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#4f45e4] text-white py-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 text-center gap-6">
          <div>
            <p className="text-4xl font-bold">5+</p>
            <p className="text-white/80">Years in service</p>
          </div>
          <div>
            <p className="text-4xl font-bold">10,000+</p>
            <p className="text-white/80">Happy trekkers</p>
          </div>
          <div>
            <p className="text-4xl font-bold">2,000+</p>
            <p className="text-white/80">Gears available</p>
          </div>
          <div>
            <p className="text-4xl font-bold">4.9★</p>
            <p className="text-white/80">Average Rating</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="bg-gradient-to-r from-[#4f45e4] to-[#6c63ff] text-white text-center p-10 rounded-xl max-w-5xl mx-auto shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="max-w-xl mx-auto text-white/90 mb-6">
            Explore Nepal’s rugged beauty with reliable, affordable gear. Start
            your adventure now with TrailGear.
          </p>
          <a
            href="/browse-gear"
            className="inline-block bg-white text-[#4f45e4] font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
          >
            Browse Gear
          </a>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
