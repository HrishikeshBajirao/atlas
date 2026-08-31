export async function getCountry(code){
    try{
        const response = await fetch(`https://countries.dev/alpha/${code}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch the selected country: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data)
        const countryInfo = {
            alpha3Code: data.alpha3Code,
            numericCode: data.numericCode,
            name: data.name,
            flag: data.flags,
            population: data.population,
            capital: data.capital,
            languages: data.languages.map((language) => language.name),
            area: data.area,
            region: data.region,
            currency: data.currencies.map((currency) => `${currency.symbol} - ${currency.name}`)
        }
        // console.log(country)
        return countryInfo
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function getCountriesList(){
    try{
        const response = await fetch("https://countries.dev/countries");

        if (!response.ok) {
            throw new Error(`Failed to fetch countries: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data)
        const countries = data.map((country) => {
            return {
                value: country.name, 
                label: country.name, 
                alpha3: country.alpha3Code
            }
        })
        // console.log(countries)
        return countries;
    } catch (err) {
        console.log(err)
        throw err
    }
}

