import Image from "next/image"
import { formatNumber } from "../utils"

type CardProps ={
  flags: string
  name: string
  population: number,
  region: string,
  capital: string,
  index: number
}

const Card = ({ index, name, region, capital, population, flags }: CardProps) => {
  return (
    <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transform transition-all duration-200 ease-in-out">

      <div className="aspect-video w-full">
        <Image 
          src={flags} 
          alt={`Flag of ${name}`} 
          width={500}
          height={300}
          className="w-full h-full object-cover"
          priority={index < 12}
        />
      </div>

      <div className="p-6 text-sm text-gray-600">

        <h2 className="text-xl font-semibold mb-4">{name}</h2>

        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <span className="font-semibold">Capital:</span>
            <span>{capital}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">Region:</span>
            <span>{region}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">Population:</span>
            <span>{formatNumber(population)}</span>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Card