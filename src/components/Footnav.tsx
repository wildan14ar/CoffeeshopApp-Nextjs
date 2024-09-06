import { FaHome, FaBox, FaStore, FaUser } from "react-icons/fa";
import { CiMemoPad } from "react-icons/ci";

export default function Footnav() {
  return (
    <ul className="md:hidden flex flex-row items-center justify-between p-3 bg-green-600">
      <li className="text-2xl">
        <FaHome title="Home" />
      </li>
      <li className="text-2xl">
        <FaBox title="Products" />
      </li>
      <li className="text-2xl">
        <CiMemoPad title="Order" />
      </li>
      <li className="text-2xl">
        <FaStore title="Store" />
      </li>
      <li className="text-2xl">
        <FaUser title="Account" />
      </li>
    </ul>
  );
}
