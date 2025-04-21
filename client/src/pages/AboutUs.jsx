import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            About TrailGear
          </h1>
          <p className="text-lg text-white/90">
            We're passionate about making trekking affordable and accessible
            through high-quality gear rentals and friendly support.
          </p>
        </motion.div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl font-bold text-center text-gray-900 mb-4"
          >
            Our Mission & Values
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-gray-600 max-w-2xl text-center mx-auto mb-12"
          >
            At TrailGear, we believe everyone should experience the mountains
            without owning expensive gear. We focus on accessibility,
            sustainability, and community.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏕️",
                title: "Adventure for All",
                desc: "We ensure budget-friendly access to essential trekking gear so every explorer can start their journey.",
              },
              {
                icon: "🛡️",
                title: "Quality & Safety",
                desc: "All gear is cleaned and inspected after each use, so you trek worry-free.",
              },
              {
                icon: "🌿",
                title: "Eco-Friendly",
                desc: "Renting reduces waste. We support sustainable practices in the outdoor gear community.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx + 2}
                className="bg-white shadow-md p-6 rounded-lg text-center"
              >
                <div className="text-[#4f45e4] text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            className="w-full md:w-1/2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
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
          </motion.div>
          <motion.div
            className="w-full md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
          >
            <img
              src="https://st2.depositphotos.com/1017986/7761/i/950/depositphotos_77612174-stock-photo-group-of-friends-with-backpacks.jpg"
              alt="Our team on trek"
              className="rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <motion.section
        className="bg-[#4f45e4] text-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 text-center gap-6">
          {[
            ["5+", "Years in service"],
            ["10,000+", "Happy trekkers"],
            ["2,000+", "Gears available"],
            ["4.9★", "Average Rating"],
          ].map(([num, label], i) => (
            <motion.div key={i} custom={i} variants={fadeUp}>
              <p className="text-4xl font-bold">{num}</p>
              <p className="text-white/80">{label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
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
      </motion.section>
    </div>
  );
};

export default AboutUs;
