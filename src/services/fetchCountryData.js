import getCountry from "../api/restcountries"

export default async function fetchCountryData(
  countryInput,
  setSearched,
  setLoading,
  setCountryInfo,
  setRecentSearches) 
{
  setSearched(true);
  setLoading(true);
  setCountryInfo(null);

  try {
    const foundCountry = await getCountry(countryInput.toLowerCase().trim());
    setCountryInfo(foundCountry);
    console.log(foundCountry);
    if(foundCountry){
      setRecentSearches((currentRecentSearches) => [
        { name: foundCountry.names.common, code: foundCountry.codes.alpha_2 },
        ...currentRecentSearches
          .filter((item) => item.name !== foundCountry.names.common)
          .slice(0, 4),
      ]);
    } 
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}