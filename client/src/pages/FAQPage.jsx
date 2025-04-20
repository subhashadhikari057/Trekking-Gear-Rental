import React from "react"

const FAQPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Title */}
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
        <p className="text-gray-600">Answers to common questions about our rental services</p>
      </div>

      {/* Accordion Section */}
      <div className="space-y-8">
        {/* Rental Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#4f45e4]">Rental Information</h2>
          <details className="border rounded-md p-4">
            <summary className="cursor-pointer font-medium">What are your rental durations?</summary>
            <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
              <li>Daily rentals (24-hour period)</li>
              <li>Weekend rentals (Friday 4pm - Monday 10am)</li>
              <li>Weekly rentals (7 days)</li>
              <li>Monthly rentals (30 days)</li>
            </ul>
          </details>
          <details className="border rounded-md p-4 mt-2">
            <summary className="cursor-pointer font-medium">What equipment is available?</summary>
            <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
              <li>Tents, sleeping bags, backpacks</li>
              <li>Cooking gear, hiking boots, winter gear</li>
              <li>Photography & drone rentals</li>
            </ul>
          </details>
        </div>

        {/* Policies */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#4f45e4]">Reservations & Policies</h2>
          <details className="border rounded-md p-4">
            <summary className="cursor-pointer font-medium">How do I make a reservation?</summary>
            <ol className="list-decimal pl-6 mt-2 text-sm text-gray-700">
              <li>Select items and rental dates</li>
              <li>Proceed to checkout</li>
              <li>Get confirmation email</li>
            </ol>
          </details>
          <details className="border rounded-md p-4 mt-2">
            <summary className="cursor-pointer font-medium">What is your cancellation policy?</summary>
            <p className="text-sm text-gray-700 mt-2">
              Free cancellation up to 48 hours before pickup. After that, partial refunds apply.
            </p>
          </details>
        </div>

        {/* Gear Handling */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#4f45e4]">Gear Handling</h2>
          <details className="border rounded-md p-4">
            <summary className="cursor-pointer font-medium">Is the gear cleaned after every use?</summary>
            <p className="text-sm text-gray-700 mt-2">
              Yes, all gear is professionally cleaned and inspected after each rental to ensure quality and hygiene.
            </p>
          </details>
          <details className="border rounded-md p-4 mt-2">
            <summary className="cursor-pointer font-medium">What if gear gets damaged?</summary>
            <p className="text-sm text-gray-700 mt-2">
              Minor wear and tear is okay. For major damage, charges may apply depending on the repair/replacement.
            </p>
          </details>
        </div>

        {/* Delivery & Pickup */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#4f45e4]">Delivery & Pickup</h2>
          <details className="border rounded-md p-4">
            <summary className="cursor-pointer font-medium">Do you offer delivery services?</summary>
            <p className="text-sm text-gray-700 mt-2">
              Yes, we offer delivery and pickup within Kathmandu Valley. Charges may apply based on distance.
            </p>
          </details>
          <details className="border rounded-md p-4 mt-2">
            <summary className="cursor-pointer font-medium">Can I pick up my gear from your store?</summary>
            <p className="text-sm text-gray-700 mt-2">
              Absolutely. Visit our office between 9am and 6pm, Mon–Sat, to collect or return gear.
            </p>
          </details>
        </div>
      </div>

      {/* Contact Section */}
      <div className="border-t pt-10 mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
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

          
          {/* <form className="bg-white p-6 rounded-lg shadow space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="border p-2 rounded w-full" disabled />
              <input type="email" placeholder="Email" className="border p-2 rounded w-full" disabled />
            </div>
            <input type="text" placeholder="Subject" className="border p-2 rounded w-full" disabled />
            <textarea rows="4" placeholder="Your message..." className="border p-2 rounded w-full" disabled></textarea>
            
          </form> */}
        </div>
      </div>
    </div>
  )
}

export default FAQPage
