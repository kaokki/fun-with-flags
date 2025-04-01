import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

type Props = {
  count: number, 
  search: string, 
  setSearch: (search: string) => void
}

const Search = ({ count, search, setSearch }: Props) => {
  
  return (
    <div className="md:w-1/3 w-full">
      <div className="relative mb-2">
        <input 
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:border-1 focus:border-blue-500 focus:outline-none border-gray-300"
          value={search}
          onChange={({target})=> setSearch(target.value)}
          placeholder="Search by country name..."
          type="text" 
        />
        <span className="absolute inset-y-0 right-4 flex items-center"><MagnifyingGlassIcon className="size-4" /></span>
      </div>
      <span className="text-gray-600 text-sm pl-4">Showing {count} {count <= 1 ? 'country' : 'countries'}</span>
      
    </div>
  )
}

export default Search