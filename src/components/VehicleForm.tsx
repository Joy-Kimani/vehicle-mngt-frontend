import React, { useState } from 'react';
import {vehicleApi } from '../features/Api/VehicleApi';
// import { uploadToCloudinary } from ""

const VehicleForm: React.FC<{ onDone?: () => void }> = ({ onDone }) => {
  const [form, setForm] = useState({
    name: '',
    brand: '',
    transmission: 'Manual' as 'Manual' | 'Auto',
    fuel_type: 'Petrol' as 'Petrol' | 'Diesel',
    seat_number: 4,
    is_available: true,
    price: 1000,
    rating: 4.0,
    year: 1970
  });

  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [sideFile, setSideFile] = useState<File | null>(null);
  const [interiorFile, setInteriorFile] = useState<File | null>(null);

  const [createVehicle, { isLoading }] = vehicleApi.useCreateVehicleMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Upload files in parallel (if provided)
      const uploads = await Promise.all([
        frontFile ? uploadToCloudinary(frontFile) : Promise.resolve(null),
        backFile ? uploadToCloudinary(backFile) : Promise.resolve(null),
        sideFile ? uploadToCloudinary(sideFile) : Promise.resolve(null),
        interiorFile ? uploadToCloudinary(interiorFile) : Promise.resolve(null)
      ]);

      const body = {
        ...form,
        front_image_url: uploads[0],
        back_image_url: uploads[1],
        side_image_url: uploads[2],
        interior_image_url: uploads[3]
      };

      await createVehicle(body).unwrap();
      alert('Created');
      if (onDone) onDone();
    } catch (err: any) {
      console.error(err);
      alert('Failed: ' + (err?.message || err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-zinc-800 rounded-lg space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
        <select value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value as any })}>
          <option>Manual</option><option>Auto</option>
        </select>
        <select value={form.fuel_type} onChange={(e) => setForm({ ...form, fuel_type: e.target.value as any })}>
          <option>Petrol</option><option>Diesel</option>
        </select>
        <input type="number" value={form.seat_number} onChange={(e) => setForm({ ...form, seat_number: Number(e.target.value) })} />
        <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label>Front Image <input type="file" accept="image/*" onChange={(e) => setFrontFile(e.target.files?.[0] || null)} /></label>
        <label>Back Image <input type="file" accept="image/*" onChange={(e) => setBackFile(e.target.files?.[0] || null)} /></label>
        <label>Side Image <input type="file" accept="image/*" onChange={(e) => setSideFile(e.target.files?.[0] || null)} /></label>
        <label>Interior Image <input type="file" accept="image/*" onChange={(e) => setInteriorFile(e.target.files?.[0] || null)} /></label>
      </div>

      <button type="submit" disabled={isLoading} className="bg-amber-600 py-2 px-4 rounded">
        {isLoading ? 'Creating...' : 'Create Vehicle'}
      </button>
    </form>
  );
};

export default VehicleForm;
function uploadToCloudinary(frontFile: File): any {
  throw new Error('Function not implemented.');
}

