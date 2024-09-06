export default function StorePage() {
  // Contoh data cabang toko
  const branches = [
    {
      id: 1,
      name: "Cabang 1",
      address: "Jalan Mawar No. 1, Jakarta",
      position: { lat: -6.2, lng: 106.816666 }, // Koordinat Jakarta
    },
    {
      id: 2,
      name: "Cabang 2",
      address: "Jalan Melati No. 2, Bandung",
      position: { lat: -6.917464, lng: 107.619123 }, // Koordinat Bandung
    },
  ];

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col">
      <div className="w-full h-auto flex justify-center p-2">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15863.673978198904!2d106.6567018!3d-6.2744472!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e553aeca8d97%3A0xd3e5d04eb554abde!2sInstitut%20Teknologi%20Tangerang%20Selatan!5e0!3m2!1sid!2sid!4v1725634701747!5m2!1sid!2sid"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <ul className="flex flex-col p-4">
        {branches.map((branch) => (
          <li key={branch.id} className="mb-2 border-b border-gray">
            <h2 className="text-xl font-semibold">{branch.name}</h2>
            <p>{branch.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
