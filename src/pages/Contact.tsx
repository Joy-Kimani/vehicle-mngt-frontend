import React, { useState } from 'react';
import { Mail, MapPin, Phone, MessageSquare, Map } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

//interface for form values
interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// type for validation errors
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  // basic email validation
  const validateEmail = (email: string): boolean => {
    // regex for email format
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // validation logic
  const validate = (values: ContactFormValues): FormErrors => {
    const newErrors: FormErrors = {};
    if (!values.name) {
      newErrors.name = 'Your name is required for consultation scheduling.';
    }
    if (!values.email) {
      newErrors.email = 'A valid email is required for our response.';
    } else if (!validateEmail(values.email)) {
      newErrors.email = 'Please ensure the email format is correct.';
    }
    if (!values.subject) {
      newErrors.subject = 'Subject is required.';
    }
    if (!values.message) {
      newErrors.message = 'Please detail your project requirements.';
    }
    return newErrors;
  };

  // clear errors
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormValues(prev => ({ ...prev, [id]: value }));
    // auto correct
    if (errors[id as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null); // clear previous messages
    const validationErrors = validate(formValues);
    setErrors(validationErrors);

    // if there are errors, stop the submission
    if (Object.keys(validationErrors).length > 0) {
      setSubmitMessage('Please correct the validation errors above before proceeding.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call for consultation request
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      console.log('Consultation request submitted:', formValues);
      setSubmitMessage('🎉 Thank you for reaching out! A Curatorial Concierge will contact you within one business day.');
      
      // Reset form values
      setFormValues({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmitMessage('An unexpected error occurred while submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-zinc-900 font-serif py-20 px-6 flex justify-center text-gray-100">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* CONTACT INFO SIDE */}
        <div className="flex flex-col justify-center space-y-8 bg-zinc-800 rounded-2xl shadow-2xl p-12 border border-amber-600/30">
          <h2 className="text-2xl font-bold text-white mb-2">
            Curatorial Consultation
          </h2>
          <p className="text-md text-gray-400">
            For specialized inquiries, please use the form or contact us directly.
          </p>

          <div className="space-y-6 text-gray-300 mt-6">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <p className="text-md">
                <span className="font-semibold text-white">Headquarters & Archives:</span><br/>
                1776 Provenance Lane, Beverly Hills, CA 90210
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <p className="text-md font-mono">
                <a className="hover:text-amber-400 transition">+1 (123) 456-7890</a> 
                <span className="text-sm text-gray-500 ml-2">(Specialist Line)</span>
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <p className="text-md">
                <a href="mailto:curation@mccormick.com" className="hover:text-amber-400 transition">contact@mccormick.com</a>
              </p>
            </div>
          </div>

          {/* map block */}
          <div className="mt-8 pt-4 border-t border-zinc-700">
            <p className="text-sm text-gray-500 mb-3 font-medium flex items-center space-x-2">
              <Map className="w-4 h-4 text-amber-500" />
              <span>Viewing Location (By Appointment Only):</span>
            </p>
            <a
              href="https://maps.app.goo.gl/9AYSWskbakG36yDh9" 
              target="_blank"
              className="block w-full h-48 bg-zinc-700 rounded-xl flex items-center justify-center text-gray-400 hover:bg-zinc-600 transition duration-300 text-sm"
              rel="noopener noreferrer"
            >
              View Restricted Access Facility on Map
            </a>
          </div>
        </div>


        {/* FORM SECTION */}
        <div className="flex flex-col items-center">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-white">
              Request Your Consultation
            </h1>
            <p className="text-md text-gray-400 mt-2">
              Please provide details about your project or required vehicle.
            </p>
          </div>

          {/* Form Card */}
          <div className="w-full max-w-lg p-10 bg-zinc-800 shadow-2xl rounded-2xl border border-zinc-700">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Success/Error Message Display */}
              {submitMessage && (
                <div
                  className={`p-4 rounded-md text-sm font-medium ${
                    submitMessage.startsWith('🎉') ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700' }`} >
                  {submitMessage}
                </div>
              )}

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Your Full Name</label>
                <input
                  id="name"
                  type="text"
                  className={`mt-1 block w-full bg-zinc-700 text-white rounded-lg p-3 border ${
                    errors.name ? 'border-red-500' : 'border-zinc-700 focus:ring-amber-500 focus:border-amber-500'
                  }`}
                  placeholder="Luke LandWalker"
                  value={formValues.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Professional Email Address</label>
                <input
                  id="email"
                  type="email"
                  className={`mt-1 block w-full bg-zinc-700 text-white rounded-lg p-3 border ${
                    errors.email ? 'border-red-500' : 'border-zinc-700 focus:ring-amber-500 focus:border-amber-500'
                  }`}
                  placeholder="curator@museum.org"
                  value={formValues.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject (e.g., Vehicle Model, Project Name)</label>
                <input
                  id="subject"
                  type="text"
                  className={`mt-1 block w-full bg-zinc-700 text-white rounded-lg p-3 border ${
                    errors.subject ? 'border-red-500' : 'border-zinc-700 focus:ring-amber-500 focus:border-amber-500'
                  }`}
                  placeholder="Inquiry: 1964 DB5 for Feature Film"
                  value={formValues.subject}
                  onChange={handleChange}
                />
                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Project Details / Requirements</label>
                <textarea
                  id="message"
                  rows={6}
                  className={`mt-1 block w-full bg-zinc-700 text-white rounded-lg p-3 border resize-none ${
                    errors.message ? 'border-red-500' : 'border-zinc-700 focus:ring-amber-500 focus:border-amber-500'
                  }`}
                  placeholder="Please specify dates, location, required documentation, and any unique constraints."
                  value={formValues.message}
                  onChange={handleChange}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-500 text-zinc-900 font-bold py-3 rounded-full shadow-xl disabled:opacity-50 transition duration-300 uppercase tracking-wider"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-zinc-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending Request...</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5" />
                    <span>Schedule Consultation</span>
                  </>
                )}
              </button>



       

            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Contact;



