export default function OrderPage() {
  return (
    <div className="w-full h-full overscroll-y-auto  flex flex-col">
      <ul className="flex flex-row border-b-2 border-slate-200 p-2 justify-around items-center">
        <li>Menu</li>
        <li>Featured</li>
        <li>Previous</li>
        <li>Favorites</li>
      </ul>
    </div>
  );
}
