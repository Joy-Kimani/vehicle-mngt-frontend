import React from 'react'; 
import { Link } from 'react-router';

interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The 300 SL arrived in concours condition with all the required provenance documents. Flawless support for our museum exhibition—truly specialists in this field.",
    name: "Dr. Evelyn K.",
    location: "Automotive Historian, London",
  },
  {
    quote: "Securing the 1932 Roadster for our period film shoot was seamless. The Curatorial Concierge service handled all logistics, making the process effortless and reliable.",
    name: "Robert P.",
    location: "Film Production Designer, LA",
  },
  {
    quote: "The attention to detail is unmatched. The car was not only beautiful but came with the full service history required for our research paper. A vital resource.",
    name: "Jonathan H.",
    location: "Collector & Researcher, Geneva",
  },
];

const WhatTheySayAboutUs: React.FC = () => { 
  return (
    <div className='py-20 bg-zinc-900 font-serif'> 
      <div className='text-center mb-12'> 
        <p className="text-amber-500 text-sm uppercase tracking-widest mb-2">Authenticated Feedback</p>
        <h2 className="text-4xl font-bold text-white"> 
          Endorsements from the Industry
        </h2>

        <p className="text-base text-gray-400 max-w-xl mx-auto mt-3"> 
          Hear from curators, producers, and collectors who trust our exclusive inventory.
        </p>
      </div>

      <div className='flex flex-col md:flex-row justify-center gap-8 p-10 mx-auto max-w-7xl'> 
        
        {testimonials.map((t, index) => (
          <div 
            key={index} 
            className="card card-dash bg-zinc-800 text-gray-100 rounded-xl w-full md:w-1/3 shadow-2xl hover:shadow-amber-500/30 transition duration-300" // Updated styling
          >
            <div className="card-body items-center text-center p-8"> 
              
              
              <div className="text-2xl text-amber-500 mb-4"> 
                ★★★★★
              </div> 
              
              <p className="italic text-lg mb-6 text-gray-200"> 
                "{t.quote}"
              </p>
              
              <div className="card-actions flex flex-col items-center">
                <h3 className="text-lg font-semibold text-white mt-2"> 
                  {t.name}
                </h3>

                <p className="text-sm text-gray-400"> 
                  {t.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='text-center p-8'>
         
          <Link  to='/vehicles' 
          className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-zinc-900 font-bold rounded-full transition duration-300 shadow-lg" >
            Explore Our Curated Inventory
          </Link>
            
         
      </div>
    </div>
  );
}

export default WhatTheySayAboutUs;
