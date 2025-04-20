import React from "react"
import { Link } from "react-router-dom"
import {
  Search,
  ShoppingCart,
  CreditCard,
  PackageCheck,
  ArrowRight,
} from "lucide-react"

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[url('https://alpineecotrek.com/wp-content/uploads/2023/01/abc-pokhara-gal1.webp')] bg-cover bg-center py-24">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">How Our Rental Process Works</h1>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Get the gear you need for your adventure without the hassle of buying and storing equipment.
          </p>
          
        </div>
      </section>

      {/* Process Steps */}
      <section id="steps" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Four Simple Steps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: Search, title: "Explore", desc: "Browse our collection of high-quality trekking gear." },
              { icon: ShoppingCart, title: "Add to Cart", desc: "Choose dates and gear with a few clicks." },
              { icon: CreditCard, title: "Buy", desc: "Securely check out with flexible payment options." },
              { icon: PackageCheck, title: "Returns", desc: "Hassle-free return after your adventure." },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="mb-4 flex items-center justify-center w-16 h-16 bg-[#4f45e4]/10 text-[#4f45e4] rounded-full">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{i + 1}. {step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#4f45e4] py-16 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Browse our extensive collection of premium trekking gear and get ready to conquer the trails.
        </p>
        <Link
          to="/browse-gear"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-white text-[#4f45e4] hover:bg-gray-100 rounded"
        >
          Browse Gear <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}

export default HowItWorks
