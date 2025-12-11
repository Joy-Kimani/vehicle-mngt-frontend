import React from 'react';
import { Shield, Award, Map, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router';
import Chat from '../components/Chat';
import ChatWidget from '../components/ChatWidget';

const About:React.FC = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-zinc-900 text-gray-100 font-serif py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
        {/* Hook */}
        <header className="text-center mb-20">
          <p className="text-lg text-amber-500 uppercase tracking-widest mb-4 font-sans font-semibold">
            The Specialist in Historic Vehicle Access
          </p>
          <h1 className="text-lg sm:text-3xl font-bold text-white mb-6">
            The Authority in Exhibition-Grade Automotive Rental
          </h1>
          <p className="text-lg text-gray-400 max-w-4xl mx-auto">
            We don't rent cars; we curate access to moving history. Our service is exclusively tailored for film production, museum curators, and serious historical researchers who require guaranteed provenance, meticulous condition, and world-class logistical support.
          </p>
        </header>
        
        {/* Pillars of Service */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Integrity */}
          <div className="bg-zinc-800 p-8 rounded-xl shadow-2xl hover:shadow-amber-500/20 transition duration-300 transform hover:-translate-y-1">
            <div className="text-4xl text-amber-500 mb-4 flex justify-center"><Shield className="w-8 h-8"/></div>
            <h3 className="text-lg font-bold text-white mb-2 text-center">Provenance Integrity</h3>
            <p className="text-sm text-gray-400 text-center">
              Every vehicle includes verifiable documentation, chain of ownership, and comprehensive historical archives essential for any academic or curatorial display.
            </p>
          </div>
          
          {/* Condition Guaranteed */}
          <div className="bg-zinc-800 p-8 rounded-xl shadow-2xl hover:shadow-amber-500/20 transition duration-300 transform hover:-translate-y-1">
            <div className="text-4xl text-amber-500 mb-4 flex justify-center"><Award className="w-8 h-8"/></div>
            <h3 className="text-lg font-bold text-white mb-2 text-center">Concours Condition Guaranteed</h3>
            <p className="text-sm text-gray-400 text-center">
              Our cars are maintained to the highest standards, ensuring they are show-ready and mechanically sound for dynamic operational requirements.
            </p>
          </div>
          
          {/* Curatorial Concierge */}
          <div className="bg-zinc-800 p-8 rounded-xl shadow-2xl hover:shadow-amber-500/20 transition duration-300 transform hover:-translate-y-1">
            <div className="text-4xl text-amber-500 mb-4 flex justify-center"><Map className="w-8 h-8"/></div>
            <h3 className="text-lg font-bold text-white mb-2 text-center">Curatorial Concierge</h3>
            <p className="text-sm text-gray-400 text-center">
              Access 24/7 dedicated support for specialized logistics, secure enclosed transport coordination, and on-site handling advice for delicate assets.
            </p>
          </div>
    
          {/* Zero-Downtime Logistics */}
          <div className="bg-zinc-800 p-8 rounded-xl shadow-2xl hover:shadow-amber-500/20 transition duration-300 transform hover:-translate-y-1">
            <div className="text-4xl text-amber-500 mb-4 flex justify-center"><Clock className="w-8 h-8"/></div>
            <h3 className="text-lg font-bold text-white mb-2 text-center">Zero-Downtime Logistics</h3>
            <p className="text-sm text-gray-400 text-center">
              We coordinate precise delivery and retrieval to align perfectly with tight show schedules and production timelines, minimizing risk and waiting time.
            </p>
          </div>
        </div>
    
        <hr className="my-20 border-zinc-700" />
    
        {/* Meet the Team */}
        <section className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            🤝 Driven by History, Dedicated to Preservation
          </h2>
    
          <div className="bg-zinc-800 p-10 rounded-xl shadow-2xl">
            <p className="text-md text-gray-300 leading-relaxed">
              Founded in the waning days of the Empire by L. Skywalker, a singular figure with a profound, almost spiritual connection to archaic velocity and salvaged mechanisms, our institution was quietly conceived to consecrate the machinery of pivotal galactic events.

             We are a highly specialized coterie of master restorers and historical purveyors. Our mission is an act of devotion: to ensure that these indelible, often battle-scarred, pieces of engineering history endure, continuing to inform and inspire generations of researchers and enthusiasts with their quiet testament to a bygone age of movement.
            </p>
          </div>
        </section>
    
        <hr className="my-20 border-zinc-700" />
    
        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Consult with Our Team
          </h2>
          <p className="text-base text-gray-400 mb-8">
            Discuss your specific project requirements, required documentation, and logistics needs with a specialist today.
          </p>
    
          <Link
            to = "/contact"
            className="inline-block px-10 py-4 text-base font-semibold text-zinc-900 bg-amber-600 rounded-full shadow-lg hover:bg-amber-500 transition duration-300 uppercase tracking-wider"
          >
            Request a Consultation
          </Link>
          
        </section>
        <ChatWidget />
    
      </div>
    </div>
    <Footer />
    </>
  )
}

export default About;