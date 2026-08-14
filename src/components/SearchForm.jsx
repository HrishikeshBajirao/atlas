import { handleCountrySubmit } from '../utils/handleCountrySubmit.js'
import Select from 'react-select'

export function SearchForm({index, setCountries, countryInput, setRecentSearches, countriesList, setNumberOfSlots}){

  const handleRemoveSearchBox = () => {
    
    setCountries((currCountries) => currCountries.filter((_, i) => i !== index))
    setNumberOfSlots((currSlots) => currSlots - 1)

  }

  return (
    <div className="w-[80%] max-w-[300px] relative mt-6 mx-3">

      <button 
        type="button"
        onClick={handleRemoveSearchBox}
        className="w-10 h-10 rounded-full bg-slate-800
        absolute -top-5 -right-5 z-5 hover:bg-red-500 hover:cursor-pointer"
      >🗑️</button>

      <Select
        unstyled
        options={countriesList}
        value={countriesList.find(
            option => option.value === countryInput
        )}
        onChange={(selectedOption) => {

            // WHEN CLEAR SELECTION BUTTON IS CLICKED THE STATE OBJECT FOR THAT SLOT CLEARs TOO 
            if(!selectedOption){
              setCountries((currCountries) => {
                const newCountries = [...currCountries]

                newCountries[index] = {
                  countryInput: "",
                  loading: false,
                  searched: false,
                  countryInfo: null
                };
                
                return newCountries;
              })
              return;
            }
            
            setCountries((currCountries) => {
                const newCountries = [...currCountries];
                newCountries[index] = {...newCountries[index], countryInput: selectedOption?.value || ""};
                return newCountries;
            });
            // When selectOption is not null, go forward and submit and fetch the country data
            if(selectedOption){
              handleCountrySubmit(index, selectedOption?.alpha3, setCountries, setRecentSearches)
            }
        }}
        classNames={{
          container: () => "w-full",
          control: ({ isFocused }) =>
            `bg-slate-700 rounded-xl shadow-2xl py-3 px-2.5 border ${
              isFocused ? "border-blue-500" : "border-slate-700"
            } min-h-[52px]`,
          valueContainer: () => "px-2.5 py-1",
          input: () => "text-white text-xl",
          singleValue: () => "text-white text-xl",
          placeholder: () => "text-slate-400 text-xl",
          menu: () => "bg-slate-700 rounded-xl shadow-2xl mt-2 py-3 px-2.5",
          option: ({ isFocused, isSelected }) =>
            `${
              isSelected
                ? "bg-blue-600"
                : isFocused
                ? "bg-slate-600"
                : "bg-slate-700"
            } text-white cursor-pointer `,
          dropdownIndicator: () => "text-slate-400 hover:text-white",
          clearIndicator: () => "text-red-400 hover:text-red-600 hover:cursor-pointer",
          indicatorSeparator: () => "bg-slate-500",
        }}
        isSearchable={true}
        placeholder="Type to search..."
        isClearable={true}
      />
    </div>
  )
}