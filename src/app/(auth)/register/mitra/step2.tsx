"use client";

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
  storeData: any;
  setStoreData: (data: any) => void;
}

export default function Step2({
  nextStep,
  prevStep,
  storeData,
  setStoreData,
}: Step2Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full h-full py-2 max-w-[600px] gap-2"
    >
      <h2 className="text-2xl font-bold my-4">
        Pendaftaran Informasi Toko
      </h2>

      <div className="flex flex-col text-left">
        <label>Nama Toko</label>
        <input
          type="text"
          name="name"
          value={storeData.name || ""}
          onChange={handleChange}
          required
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col text-left">
        <label>
          Deskripsi Toko
        </label>
        <textarea
          name="description"
          value={storeData.description || ""}
          onChange={handleChange}
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col text-left">
        <label>Alamat Toko</label>
        <input
          type="text"
          name="address"
          value={storeData.address || ""}
          onChange={handleChange}
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col text-left">
        <label>
          Kategori Toko
        </label>
        <input
          type="text"
          name="category"
          value={storeData.category || ""}
          onChange={handleChange}
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col text-left">
        <label>
          Nomor Telepon Toko
        </label>
        <input
          type="text"
          name="phone"
          value={storeData.phone || ""}
          onChange={handleChange}
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col text-left">
        <label>Email Toko</label>
        <input
          type="email"
          name="email"
          value={storeData.email || ""}
          onChange={handleChange}
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col text-left">
        <label>
          URL Gambar Toko
        </label>
        <input
          type="text"
          name="image_url"
          value={storeData.image_url || ""}
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
        Lanjut
      </button>
    </form>
  );
}
