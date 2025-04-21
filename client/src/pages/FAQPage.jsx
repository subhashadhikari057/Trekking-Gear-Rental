import React from "react"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
  }),
}

const FAQPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Title */}
      <motion.div
        className="text-center space-y-2 mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
        <p className="text-gray-600">Answers to common questions about our rental services</p>
      </motion.div>

      {/* Accordion Section */}
      <div className="space-y-12">
        {[
          {
            title: "Rental Information",
            items: [
              {
                q: "What are your rental durations?",
                a: (
                  <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
                    <li>Daily rentals (24-hour period)</li>
                    <li>Weekend rentals (Friday 4pm - Monday 10am)</li>
                    <li>Weekly rentals (7 days)</li>
                    <li>Monthly rentals (30 days)</li>
                  </ul>
                ),
              },
              {
                q: "What equipment is available?",
                a: (
                  <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
                    <li>Tents, sleeping bags, backpacks</li>
                    <li>Cooking gear, hiking boots, winter gear</li>
                    <li>Photography & drone rentals</li>
                  </ul>
                ),
              },
            ],
          },
          {
            title: "Reservations & Policies",
            items: [
              {
                q: "How do I make a reservation?",
                a: (
                  <ol className="list-decimal pl-6 mt-2 text-sm text-gray-700">
                    <li>Select items and rental dates</li>
                    <li>Proceed to checkout</li>
                    <li>Get confirmation email</li>
                  </ol>
                ),
              },
              {
                q: "What is your cancellation policy?",
                a: (
                  <p className="text-sm text-gray-700 mt-2">
                    Free cancellation up to 48 hours before pickup. After that, partial refunds apply.
                  </p>
                ),
              },
            ],
          },
          {
            title: "Gear Handling",
            items: [
              {
                q: "Is the gear cleaned after every use?",
                a: (
                  <p className="text-sm text-gray-700 mt-2">
                    Yes, all gear is professionally cleaned and inspected after each rental to ensure quality and hygiene.
                  </p>
                ),
              },
              {
                q: "What if gear gets damaged?",
                a: (
                  <p className="text-sm text-gray-700 mt-2">
                    Minor wear and tear is okay. For major damage, charges may apply depending on the repair/replacement.
                  </p>
                ),
              },
            ],
          },
          {
            title: "Delivery & Pickup",
            items: [
              {
                q: "Do you offer delivery services?",
                a: (
                  <p className="text-sm text-gray-700 mt-2">
                    Yes, we offer delivery and pickup within Kathmandu Valley. Charges may apply based on distance.
                  </p>
                ),
              },
              {
                q: "Can I pick up my gear from your store?",
                a: (
                  <p className="text-sm text-gray-700 mt-2">
                    Absolutely. Visit our office between 9am and 6pm, Mon–Sat, to collect or return gear.
                  </p>
                ),
              },
            ],
          },
        ].map((section, idx) => (
          <motion.div
            key={section.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={idx + 1}
            variants={fadeUp}
          >
            <h2 className="text-2xl font-semibold mb-4 text-[#4f45e4]">{section.title}</h2>
            {section.items.map((item, i) => (
              <details key={i} className={`border rounded-md p-4 ${i > 0 ? "mt-2" : ""}`}>
                <summary className="cursor-pointer font-medium">{item.q}</summary>
                {item.a}
              </details>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Contact Section */}
      <motion.div
        className="border-t pt-10 mt-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <p className="font-bold text-[#4f45e4]">Email</p>
              <p>support@trailgear.com</p>
            </div>
            <div>
              <p className="font-bold text-[#4f45e4]">Phone</p>
              <p>+977-9800000000</p>
            </div>
            <div>
              <p className="font-bold text-[#4f45e4]">Support Hours</p>
              <p>Mon–Sat: 9am – 7pm</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQPage;
