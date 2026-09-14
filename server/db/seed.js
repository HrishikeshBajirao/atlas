import { getCountriesList } from '../services/getCountriesData.js'
import { db, conn } from './index.js'
import { countries } from './schema.js'

let countriesList = await getCountriesList()
countriesList = countriesList.map((a) => ({id: a.alpha3, name: a.value}))

await db
    .insert(countries)
    .values(countriesList)

await conn.end()