import Link from "next/link";

export default function CardCart() {
    return (
        <div className="absolute b-70 w-full max-w-[400px] bg-purple-600">
            <Link href="/cart">
            <button>Cart</button>
            </Link>
            Cart
        </div>
    )
}