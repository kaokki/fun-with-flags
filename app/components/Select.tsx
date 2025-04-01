'use client'

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react"

type Props = {
  options: string[],
  selected: string, 
  setSelected: (selected: string) => void
}

const Select = ({ options, selected, setSelected }: Props) => {
  const listRef = useRef<HTMLUListElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  useEffect(()=> {
    if(isOpen){
      listRef.current?.focus();
      setFocusedIndex(0)
    } else {
      setFocusedIndex(-1)
    }
  }, [isOpen])

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if(event.key === "Enter" || event.key === "Space"){
      event.preventDefault();
      setIsOpen(!isOpen)
    }
  }
  const handleListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    event.preventDefault();

    switch (event.code) {
      case "ArrowUp":
        setFocusedIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : options.length -1);
        break;
      case "ArrowDown":
        setFocusedIndex((prevIndex) => prevIndex < options.length - 1 ? prevIndex + 1 : 0);
        break;
      case "Enter":
      case "Space":{
        setSelected(options[focusedIndex])
        setIsOpen(false)
        break;
      }
      case "Escape":
        setIsOpen(false)
        break;
      case "Tab":
        event.preventDefault();
        break
    }
  }
  
  return (
    <div className="md:w-1/3 w-full relative z-10">
      <button 
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="listbox"
        className={`w-full text-left px-4 py-2 border shadow-sm focus:border-1 focus:border-blue-500 focus:outline-none border-gray-300 flex justify-between items-center ${isOpen ? "rounded-t-lg" : "rounded-lg"}`}
        onClick={()=> setIsOpen(!isOpen)}
        onKeyDown={handleButtonKeyDown}
      >
        {selected}
        {isOpen ? (<ChevronUpIcon className="size-4" />) : (<ChevronDownIcon className="size-4" />)}
        
      </button>
      {isOpen && (
        <ul 
          ref={listRef}
          className="absolute w-full bg-white border rounded-b-lg shadow-md border-gray-300 overflow-hidden focus:border-1 focus:border-blue-500 focus:outline-none"
          id="listbox"
          role="listbox"
          aria-activedescendant={`option-${focusedIndex}`}
          tabIndex={0}
          onKeyDown={handleListKeyDown}
        >
          {options.map((option, index) => (
            <li
              key={option}
              onClick={()=> {
                setSelected(option)
                setIsOpen(false)
              }}
              role="option"
              id={`option-${index}`}
              aria-selected={option === selected}
              className={`px-4 py-2 text-left cursor-pointer ${focusedIndex === index ? "bg-blue-100" : "hover:bg-gray-100"}`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select