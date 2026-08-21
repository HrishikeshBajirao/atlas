import { handleCountrySubmit } from '../utils/handleCountrySubmit.js'
import Select from 'react-select'

export function SearchForm({index, setCountries, countryInput, setRecentSearches, countriesList, setNumberOfSlots}){

  const handleRemoveSearchBox = () => {
    
    setCountries((currCountries) => currCountries.filter((_, i) => i !== index))
    setNumberOfSlots((currSlots) => currSlots - 1)

  }

  return (
    <div className="w-[80%] max-w-[300px] relative my-2 mx-3">

      <button 
        type="button"
        onClick={handleRemoveSearchBox}
        className="w-5 h-5 rounded-full bg-red-800 text-sm text-white text-centers
        absolute -top-2.5 -right-2.5 z-5 hover:bg-red-500 hover:cursor-pointer"
      >X</button>

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
            `bg-slate-700 rounded-lg py-1 px-2 border ${
              isFocused ? "border-blue-500" : "border-slate-700"
            } min-h-[52px]`,
          valueContainer: () => "px-2 py-1",
          input: () => "text-white text-lg",
          singleValue: () => "text-white text-lg",
          placeholder: () => "text-slate-400 text-lg",
          menu: () => "bg-slate-700 rounded-md shadow-2xl mt-2 py-3 px-2.5",
          option: ({ isFocused, isSelected }) =>
            `${
              isSelected
                ? "bg-blue-600"
                : isFocused
                ? "bg-slate-600"
                : "bg-slate-700"
            } text-white cursor-pointer rounded-md p-1`,
          dropdownIndicator: () => "text-slate-400 hover:text-white",
          clearIndicator: () => "text-red-400 hover:text-red-600 hover:cursor-pointer",
          indicatorSeparator: () => "bg-slate-500",
        }}
        isSearchable={true}
        placeholder={`Country ${index + 1}`}
        isClearable={true}
      />
    </div>
  )
}