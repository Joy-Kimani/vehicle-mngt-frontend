import React from 'react';
import {
  Shield,
  Award,
  Headphones,
} from "lucide-react";

const Values:React.FC = () => {
  return (
    
    <section className="py-20 bg-zinc-900 text-gray-100 font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-500 text-sm uppercase tracking-widest mb-2">Our Classic Commitment</p>
          <h2 className="text-4xl font-bold text-white mb-4">
            The Provenance of Prestige
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Specializing in authenticated, exhibition-ready vehicles for show grounds, film production, and historical research.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Authenticity and Integrity */}
          <div className="p-8 text-center bg-zinc-800 rounded-xl shadow-2xl hover:bg-zinc-700 transition duration-300 transform hover:scale-[1.02]">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Shield className="h-8 w-8 text-zinc-900" />
            </div>
            <h3 className="text-2xl text-amber-500 mb-3 font-semibold">Provenance Insured</h3>
            <p className="text-gray-300 text-base">
              Every vehicle comes with documented history, guaranteed authenticity, and detailed provenance reports essential for museum-grade research.
            </p>
          </div>

          {/*Show Quality */}
          <div className="p-8 text-center bg-zinc-800 rounded-xl shadow-2xl hover:bg-zinc-700 transition duration-300 transform hover:scale-[1.02]">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Award className="h-8 w-8 text-zinc-900" />
            </div>
            <h3 className="text-2xl text-amber-500 mb-3 font-semibold">Exhibition Grade</h3>
            <p className="text-gray-300">
              Meticulous detailing and maintenance ensure our classics are in concours quality, ready to win awards or impress audiences immediately.
            </p>
          </div>

          {/* Specialist Support */}
          <div className="p-8 text-center bg-zinc-800 rounded-xl shadow-2xl hover:bg-zinc-700 transition duration-300 transform hover:scale-[1.02]">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Headphones className="h-8 w-8 text-zinc-900" />
            </div>
            <h3 className="text-2xl text-amber-500 mb-3 font-semibold">Curatorial Concierge</h3>
            <p className="text-gray-300">
              Dedicated 24/7 specialist support for event logistics, transport coordination, and access to historical motoring archives.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Values;
