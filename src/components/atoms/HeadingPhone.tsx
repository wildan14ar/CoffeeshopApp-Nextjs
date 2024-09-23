import { BackButton } from "./ButtonBack";

export default function HeadingPhone({name}) {
    return (
        <div className="flex flex-row justify-between items-center h-[80px] text-xl font-bold sticky top-0 p-2 md:hidden border-b-2 border-stink-900 z-10 bg-white dark:bg-black">
        <BackButton />
        <h2 className="gradient-text">{name}</h2>
      </div>
    )
}