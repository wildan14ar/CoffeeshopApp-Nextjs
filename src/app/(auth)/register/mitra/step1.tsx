"use client";

interface Step1Props {
  nextStep: () => void;
  storeData: any;
  setStoreData: (data: any) => void;
}

export default function Step1({
  nextStep,
  storeData,
  setStoreData,
}: Step1Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-[600px] gap-2"
    >
      <h2 className="text-2xl font-bold my-4">
        Pendaftaran Akun
      </h2>

      <div className="flex flex-col text-left">
        <label>Nama Anda</label>
        <input
          type="text"
          name="userName"
          value={storeData.userName || ""}
          onChange={handleChange}
          required
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col text-left">
        <label>Email Anda</label>
        <input
          type="email"
          name="userEmail"
          value={storeData.userEmail || ""}
          onChange={handleChange}
          required
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col text-left">
        <label>Password</label>
        <input
          type="password"
          name="userPassword"
          value={storeData.userPassword || ""}
          onChange={handleChange}
          required
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white p-3 mt-5 w-full rounded-md"
      >
        Lanjut
      </button>
    </form>
  );
}
