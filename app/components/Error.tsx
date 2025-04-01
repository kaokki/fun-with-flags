import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

type Props = {
  text: string
}

const Error = ({ text }: Props) => {
  return (
    <div className="flex flex-col m-auto items-center gap-2">
      <ExclamationCircleIcon className="size-6" />
      <span className="text-sm mb-1">Oops, something went wrong!</span>
      <span className="text-sm">{text}</span>
    </div>
  )
}

export default Error