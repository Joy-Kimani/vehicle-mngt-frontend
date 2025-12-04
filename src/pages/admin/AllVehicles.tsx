import React, { useState } from "react";
import AdminLayout from "../../components/adminDashboard/AdminLayout";
import { vehicleApi } from "../../features/Api/VehicleApi";
import { PlusIcon } from "lucide-react";

const CLOUD_NAME = "dhgs8rydb";
const UPLOAD_PRESET = "vintage_vehicle_managment_key";

const AllVehicles: React.FC = () => {
  const { data: vehicles = [], isLoading: isVehicleLoading } =
    vehicleApi.useGetAllVehiclesQuery();

  const [createVehicleSpec] = vehicleApi.useCreateVehicleWithSpecMutation();
  //const [createVehicle] = vehicleApi.useCreateVehicleMutation();
  const [updateVehicle] = vehicleApi.useUpdateVehicleMutation();
  const [deleteVehicle] = vehicleApi.useDeleteVehicleMutation();

  const [filterCars, setFilterCars] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(vehicles.length / pageSize);

  const paginatedCars = vehicles.slice((page - 1) * pageSize, page * pageSize);

  //vehicle spec form data
  const [specForm, setSpecForm] = useState<any>({
    manufacturer: "",
    model: "",
    year: "",
    fuel_type: "",
    engine_capacity: "",
    seating_capacity: "",
    transmission: "",
    color: "",
    features: "",
  });

  //vehicle form data
  const [formData, setFormData] = useState<any>({
    vehicle_spec_id: "",
    rental_rate: "",
    availability: true,
    front_image_url: "",
    back_image_url: "",
    side_image_url: "",
    interior_image_url: "",
  });

  const handleOpenCreate = () => {
    setIsEditing(false);

    setSpecForm({
      manufacturer: "",
      model: "",
      year: "",
      fuel_type: "",
      engine_capacity: "",
      seating_capacity: "",
      transmission: "",
      color: "",
      features: "",
    });

    setFormData({
      rental_rate: "",
      availability: true,
      front_image_url: "",
      back_image_url: "",
      side_image_url: "",
      interior_image_url: "",
    });

    setShowModal(true);
  };


const handleOpenEdit = (v: any) => {
  setIsEditing(true);

  setSpecForm({
    vehicle_spec_id: v.vehicle_spec_id,   
    manufacturer: v.manufacturer,
    model: v.model,
    year: v.year,
    fuel_type: v.fuel_type,
    engine_capacity: v.engine_capacity,
    seating_capacity: v.seating_capacity,
    transmission: v.transmission,
    color: v.color,
    features: v.features,                 
  });

  setFormData({
    vehicle_id: v.vehicle_id,
    vehicle_spec_id: v.vehicle_spec_id,   
    rental_rate: v.rental_rate,
    availability: v.availability,
    front_image_url: v.front_image_url,
    back_image_url: v.back_image_url,
    side_image_url: v.side_image_url,
    interior_image_url: v.interior_image_url,
  });

  setShowModal(true);
};


const uploadImage = async (file: File | undefined, field: string) => {
  if (!file) return;

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    setFormData((prev: any) => ({
      ...prev,
      [field]: data.secure_url,
    }));

    console.log("Uploaded:", data.secure_url);
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
  }
};


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (isEditing) {
      await updateVehicle({
        vehicle_id: formData.vehicle_id,
        vehicle_spec: {
          vehicle_spec_id: specForm.vehicle_spec_id,
          manufacturer: specForm.manufacturer,
          model: specForm.model,
          fuel_type: specForm.fuel_type,
          engine_capacity: specForm.engine_capacity,
          year: Number(specForm.year),
          color: specForm.color,
          features: specForm.features,
          transmission: specForm.transmission,
          seating_capacity: Number(specForm.seating_capacity),
        },
        vehicle: {
          vehicle_id: formData.vehicle_id,
          vehicle_spec_id: specForm.vehicle_spec_id, 
          rental_rate: Number(formData.rental_rate),
          availability: formData.availability,
          front_image_url: formData.front_image_url,
          back_image_url: formData.back_image_url,
          side_image_url: formData.side_image_url,
          interior_image_url: formData.interior_image_url,
        },
      }).unwrap();
      
    } else {
      // vehicle with specs
      await createVehicleSpec({vehicle_spec: { ...specForm, year: Number(specForm.year), seating_capacity: Number(specForm.seating_capacity),},
        vehicle: {...formData,rental_rate: Number(formData.rental_rate), availability: Boolean(formData.availability),},}).unwrap();
      }

    setShowModal(false);
  } catch (error) {
    console.error("Submit error:", error);
  }
};


  const handleDelete = async (vehicle_id: number) => {
    try {
      await deleteVehicle(vehicle_id).unwrap();
      console.log("Vehicle deleted");
    } catch (err) {
      console.log("Delete error", err);
    }
  };
  
  const filtered = filterCars === "all" ? paginatedCars : paginatedCars.filter((v) => v.model === filterCars);

  return (
    <AdminLayout>
      <div className="p-6">
        {/* header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Vehicle Management</h1>
          <button className="btn btn-primary" onClick={handleOpenCreate}>
            <PlusIcon className="w-5 h-5 mr-2" /> Add Vehicle
          </button>
        </div>

        {/* filter */}
        <div className="mb-4">
          <select
            className="select select-bordered"
            value={filterCars}
            onChange={(e) => setFilterCars(e.target.value)}
          >
            <option value="all">All Models</option>
            {[...new Set(vehicles.map((v) => v.model))].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* vehicle grid */}
        {isVehicleLoading ? (
          <div className="flex justify-center mt-16">
            <span className="loading loading-lg loading-spinner text-primary"></span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((v) => (
                <div key={v.vehicle_id} className="card bg-base-100 shadow-xl">
                  <figure>
                    <img
                      src={v.front_image_url}
                      className="h-48 w-full object-cover"
                    />
                  </figure>

                  <div className="card-body">
                    <h2 className="card-title">
                      {v.manufacturer} {v.model}
                    </h2>

                    <p>Year: {v.year}</p>
                    <p>Fuel: {v.fuel_type}</p>
                    <p>Rate: {v.rental_rate}</p>

                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleOpenEdit(v)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDelete(v.vehicle_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* pagination */}
            <div className="flex justify-center mt-6">
              <div className="join">
                <button
                  className="btn join-item"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Prev
                </button>

                <button className="btn join-item btn-disabled">
                  Page {page} / {totalPages}
                </button>

                <button
                  className="btn join-item"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {/* modals */}
        {showModal && (
          <dialog open className="modal modal-open">
            <div className="modal-box max-w-3xl">
              <h3 className="font-bold text-xl mb-4">
                {isEditing ? "Edit Vehicle" : "Create New Vehicle"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(!isEditing || specForm.vehicle_spec_id) && (
                  <>
                    <h2 className="text-lg font-bold col-span-2">Vehicle Specs</h2>
                
                    {Object.keys(specForm).map((key) =>
                      key === "vehicle_spec_id" ? null : (
                        <input
                          key={key}
                          type="text"
                          value={specForm[key]}
                          placeholder={key.replace("_", " ").toUpperCase()}
                          onChange={(e) =>
                            setSpecForm({ ...specForm, [key]: e.target.value })
                          }
                          className="input input-bordered w-full"
                        />
                      )
                    )}
                
                    <h2 className="text-lg font-bold col-span-2 mt-6">Vehicle Details</h2>
                  </>
                )}


                {/* vehicle upload files*/}
                <input
                  type="number"
                  placeholder="Rental Rate"
                  value={formData.rental_rate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rental_rate: Number(e.target.value),
                    })
                  }
                  className="input input-bordered w-full"
                />

                <select
                  className="select select-bordered w-full"
                  value={formData.availability ? "true" : "false"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      availability: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">Available</option>
                  <option value="false">Unavailable</option>
                </select>

                {/* image uploads */}
                {[
                  { key: "front_image_url", label: "Front Image" },
                  { key: "back_image_url", label: "Back Image" },
                  { key: "side_image_url", label: "Side Image" },
                  { key: "interior_image_url", label: "Interior Image" },
                ].map((img) => (
                  <div key={img.key}>
                    <label className="label">{img.label}</label>
                    <input
                      type="file"
                      className="file-input file-input-bordered w-full"
                      onChange={(e) =>
                        uploadImage(e.target.files?.[0], img.key)
                      }
                    />
                    {formData[img.key] && (
                      <img src={formData[img.key]} className="w-24 mt-2 rounded-md" />
                    )}
                  </div>
                ))}
              </div>
              {/* cancel button */}
              <div className="modal-action">
                <button className="btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  {isEditing ? "Save Changes" : "Create Vehicle"}
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </AdminLayout>
  );
};

export default AllVehicles;


// {(!isEditing || specForm.vehicle_spec_id) && (
//   <>
//     <h2 className="text-lg font-bold col-span-2">Vehicle Specs</h2>

//     {Object.keys(specForm).map((key) =>
//       key === "vehicle_spec_id" ? null : (
//         <input
//           key={key}
//           type="text"
//           value={specForm[key]}
//           placeholder={key.replace("_", " ").toUpperCase()}
//           onChange={(e) =>
//             setSpecForm({ ...specForm, [key]: e.target.value })
//           }
//           className="input input-bordered w-full"
//         />
//       )
//     )}

//     <h2 className="text-lg font-bold col-span-2 mt-6">Vehicle Details</h2>
//   </>
// )}
