import React, { useState } from 'react'
import UserLayOut from '../../components/userDashboard/UserLayOut'

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  language: string;
  country: string;
  time_zone: string;
  location: string;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  language?: string;
  country?: string;
  time_zone?: string;
  location?: string;
}

const Settings:React.FC = () => {
      const [formValues, setFormValues] = useState<FormValues>({
        first_name: '',
        last_name: '',
        email: '',
        language: '',
        country: '',
        time_zone: '',
        location: '',
      });
    
      const [errors, setErrors] = useState<FormErrors>({});
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [success, setSuccess] = useState<string | null>(null);
    
      // changes
      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setErrors({ ...errors, [name]: '' });
      };
    
      // Validation logic
      const validateForm = (values: FormValues): FormErrors => {
        const newErrors: FormErrors = {};
    
        if (!values.first_name.trim()) newErrors.first_name = "First name is required";
        if (!values.last_name.trim()) newErrors.last_name = "Last name is required";
        if (!values.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(values.email))
          newErrors.email = "Invalid email format";
    
        if (!values.language) newErrors.language = "Language is required";
        if (!values.country) newErrors.country = "Country is required";
        if (!values.time_zone) newErrors.time_zone = "Time zone is required";
        if (!values.location.trim()) newErrors.location = "Location is required";
    
        return newErrors;
      };
    
      // submit API
      const updateProfileApi = async (data: FormValues) => {
        return new Promise((resolve) =>
          setTimeout(() => resolve("Profile updated"), 1200)
        );
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(null);
        setIsSubmitting(true);
    
        const validationErrors = validateForm(formValues);
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
          const response: any = await updateProfileApi(formValues);
          setSuccess(response);
        }
    
        setIsSubmitting(false);
      };
    
  return (
    <UserLayOut>
      <div className="max-w-2xl mx-auto p-6 bg-zinc-900 shadow rounded-xl  mt-8 items-center justify-between">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Profile Settings</h1>

      {success && (
        <div className="p-3 bg-green-100 text-green-700 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className='flex gap-8'>
        {/* left */}
        <div className='flex-1'>
        {/* first name */}
        <div>
          <label className="font-medium">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formValues.first_name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
        </div>
        {/* last_name */}
        <div>
          <label className="font-medium">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formValues.last_name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
        </div>
        {/* email */}
        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        {/* language */}
        <div>
          <label className="font-medium">Language</label>
          <select
            name="language"
            value={formValues.language}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded bg-zinc-700"
          >
            <option value="">Select language</option>
            <option value="english">English</option>
            <option value="swahili">Swahili</option>
            <option value="french">French</option>
          </select>
          {errors.language && <p className="text-red-500 text-sm">{errors.language}</p>}
        </div>
        </div>
        {/* right */}
        <div className='flex-1'>
        {/* country */}       
          <label className="font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formValues.country}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        {/* timezone */}
        <div>
          <label className="font-medium">Time Zone</label>
          <input
            type="text"
            name="time_zone"
            value={formValues.time_zone}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.time_zone && <p className="text-red-500 text-sm">{errors.time_zone}</p>}
        </div>
        {/* location */}
        <div>
          <label className="font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formValues.location}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>

        </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
      </div>
    </UserLayOut>
  )
}

export default Settings

