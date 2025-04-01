import { ArrowPathIcon } from "@heroicons/react/24/solid"

type Props = {
  text: string
}

const Loading = ({ text }: Props) => {
  return (
    <div className="flex flex-col m-auto items-center gap-2">
      <ArrowPathIcon className="size-6 animate-[spin_1.2s_linear_infinite]" />
      <span className="text-sm">{text}</span>
    </div>
  )
}

export default Loading