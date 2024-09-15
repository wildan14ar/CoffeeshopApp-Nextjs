"use client";

interface Step3Props {
  prevStep: () => void;
  storeData: any;
  setStoreData: (data: any) => void;
}

export default function Step3({
  prevStep,
  storeData,
  setStoreData,
}: Step3Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(storeData),
    });

    if (res.ok) {
      alert("Pendaftaran berhasil!");
    } else {
      const errorData = await res.json();
      alert("Error: " + errorData.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full h-full py-2 max-w-[600px] gap-2"
    >
      <h2 className="text-2xl font-bold my-4">
        Detail Tambahan Toko
      </h2>

      <div className="flex flex-col text-left">
        <label>Latitude</label>
        <input
          type="text"
          name="latitude"
          value={storeData.latitude || ""}
          onChange={handleChange}
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col text-left">
        <label>Longitude</label>
        <input
          type="text"
          name="longitude"
          value={storeData.longitude || ""}
          onChange={handleChange}
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col text-left">
        <label>WhatsApp</label>
        <input
          type="text"
          name="whatsapp"
          value={storeData.whatsapp || ""}
          onChange={handleChange}
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col text-left">
        <label>Instagram</label>
        <input
          type="text"
          name="instagram"
          value={storeData.instagram || ""}
          onChange={handleChange}
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col text-left">
        <label>Facebook</label>
        <input
          type="text"
          name="facebook"
          value={storeData.facebook || ""}
          onChange={handleChange}
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="button"
        className="bg-red-600 hover:bg-red-700 text-white p-3 mt-5 w-full rounded-md"
        onClick={prevStep}
      >
        Kembali
      </button>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white p-3 mt-3 w-full rounded-md"
      >
        Daftar
      </button>
    </form>
  );
}
