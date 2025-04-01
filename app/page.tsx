"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Error, Loading, Search, Select } from "./components";
import { countriesApi } from "./services";

type Country = {
  cca3: string,
  flags: {
    svg: string
  },
  name: {
    common: string
  },
  population: number,
  region: string,
  capital: string[]
}

export default function Home() {
  const [ countries, setCountries ] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState("All regions")

  useEffect(()=> {
    const fetchCountries = async () => {
      const [response, error] = await countriesApi.getAll();
      setLoading(false)

      if(error) {
        setError(error)
        return
      }

      setCountries(response)
    }
        
    fetchCountries();
  }, [])

  if (loading) return <Loading text="Loading countries..." />
  if (error) return <Error text={error} />

  const regions = ["All regions", ...new Set(countries.map(({ region }) => region))]

  const sortedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common, 'en-US'))

  const filteredCountries = sortedCountries.filter(({ name, region }) => {
    const nameMatches = name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const regionMatches = selected === "All regions" || region === selected;

    return nameMatches && regionMatches;
  });


  return (
    <>
    <div className="mb-8 flex flex-col-reverse gap-4 md:flex-row justify-between">
      <Search search={search} setSearch={setSearch} count={filteredCountries.length} />
      <Select
        options={regions}
        selected={selected}
        setSelected={setSelected}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredCountries.map(({ name, region, capital, population, cca3, flags }, index) => {
        const { svg: flag } = flags ?? {}
        const { common: countryName } = name ?? {}
        const [ capitalName ] = capital ?? []

        return (
          <Link href={`/country/${cca3}`} key={cca3}>
            <Card
              index={index}
              flags={flag}
              name={countryName}
              region={region}
              population={population}
              capital ={capitalName}
            />
          </Link>
        )
      })}
    </div>
    </>
  );
}
