'use client'

import { Error, Loading } from "@/app/components"
import { countriesApi } from "@/app/services"
import { formatNumber } from "@/app/utils"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

type Country = {
  flags: {
    svg: string
  },
  name: {
    common: string,
    official: string
  },
  population: number,
  region: string,
  capital: string[],
  languages: {
    [key: string]: string
  },
  tld: string[],
  borders: string[],
  currencies: Record<string, { name: string, symbol: string }>
}


export default function Country(){
  const params = useParams()
  const [ country, setCountry ] = useState<Country>();
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(()=> {
    if(params?.id && params.id !== id) {
      setId(params.id as string)
    }
  }, [params, id])

  useEffect(()=> {
    const fetchCountry = async () => {
      const [response, error] = await countriesApi.getCountry(id);
      setLoading(false)

      if(error) {
        setError(error)
        return
      }

      setCountry(response)
    }
        
    if(id) {
      fetchCountry();
    }
  }, [id])

  if (loading) return <Loading text="Loading country info..." />
  if (error) return <Error text={error} />
  const {
    name,
    region, 
    capital, 
    population, 
    flags,
    languages,
    borders,
    currencies,
    tld
  } = country ?? {};

  const { svg: flag } = flags ?? {}
  const { common: countryName, official: officialName } = name ?? {}
  const [ capitalName ] = capital ?? []
  const languageNames = Object.values(languages ?? {}).join(", ")
  const currencyNames = Object.values(currencies ?? {}).map(({ name, symbol })=> `${name} (${symbol})`).join(" ")
  const [ topLevelDomain ] = tld ?? []
  const bordersId = borders ?? []

  return (
    <>
      <div className="mb-8">
        <Link href="/" className="bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-4 rounded mb-2 inline-block">Back</Link>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
        <div className="md:max-w-[400px] flex items-center">
          <Image 
            src={flag || "https://placehold.co/600x400"} 
            alt={`Flag of ${name}`}
            width={500}
            height={300}
            className="rounded-lg max-h-80 object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-sm text-gray-600">

        <h2 className="text-xl font-semibold mb-4">{countryName} ({id})</h2>

        <div className="space-y-2">
          <div>
            <span className="font-semibold">Official name:</span> {officialName}
          </div>
          <div>
            <span className="font-semibold">Capital:</span> {capitalName}
          </div>
          <div>
            <span className="font-semibold">Region:</span> {region}
          </div>
          <div>
            <span className="font-semibold">Population:</span> {formatNumber(population)}
          </div>
          <div>
            <span className="font-semibold">Languages:</span> {languageNames}
          </div>
          <div>
            <span className="font-semibold">Currencies:</span> {currencyNames}
          </div>
          <div>
            <span className="font-semibold">Top Level Domain:</span> {topLevelDomain}
          </div>
          <div className="md:max-w-80">
            <span className="font-semibold">Borders:</span> {bordersId.length > 0 ? bordersId.map(borderId => (
              <Link key={borderId} href={`/country/${borderId}`} className="bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded mb-1 mr-1 inline-block text-xs">{borderId}</Link>
            )) : "None"}
          </div>
        </div>

      </div>
      </div>
    </>
  )
}