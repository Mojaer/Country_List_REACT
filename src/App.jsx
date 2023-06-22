import { useEffect, useState } from 'react'
import './App.css'
import ListItem from './ListItem/ListItem'

function App() {
  const [countries, setCountries] = useState([])
  const [sortedCountries, setSortedCountries] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)

  useEffect(() => {
    // fetch the country
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
      .then(res => res.json())
      .then(data => {
        setCountries(data)
        if (sortedCountries.length === 0) {
          setSortedCountries(data)

        }
      })

  }, [sortedCountries])
  //function for Descending Order
  const handleDescending = () => {
    const sortedCountries = countries.sort(countries.name)
    sortedCountries.reverse()
    setSortedCountries(sortedCountries)
  }
  //function for Ascending Order
  const handleAscending = () => {
    const sortedCountries = countries.sort(countries.name)
    setSortedCountries(sortedCountries)
  }


  //functions for sorting
  const handleSmaller = () => {
    const Lithuania = countries.find(country => country.name === 'Lithuania')
    const smallerCountries = countries.filter(country => country.area < Lithuania.area)
    setSortedCountries(smallerCountries)
  }

  const regionHandle = () => {
    const oceaniaCountry = countries.filter(country => country.region === 'Oceania')
    setSortedCountries(oceaniaCountry)
  }

  const smallerInOceania = () => {
    const Lithuania = countries.find(country => country.name === 'Lithuania')
    const smallerInOceania = countries.filter(country => country.area < Lithuania.area && country.region === 'Oceania')
    setSortedCountries(smallerInOceania)
  }

  // functionality for pagination
  // const itemsPerPage = 10
  const totalPages = Math.ceil(sortedCountries.length / itemsPerPage)
  const pageNumbers = [...Array(totalPages).keys()]
  const lastItem = itemsPerPage * currentPage
  const firstItem = lastItem - itemsPerPage

  const countriesInPage = sortedCountries.slice(firstItem, lastItem)
  console.log(pageNumbers)
  const moveToPages = (page) => {
    setCurrentPage(page)
  }


  return (
    <section className='bg-green-900'>
      <nav className='flex justify-center items-center py-4'>
        <div>
          <details className=" dropdown dropdown-end">
            <summary className="m-1 btn">Sort</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li><button onClick={handleAscending}>Ascending order</button></li>
              <li><button onClick={handleDescending}>Descending order</button></li>
            </ul>
          </details>
        </div>

        <div className='ms-3 '>
          <button className='btn bg-green-200 rounded-xl p-2' onClick={handleSmaller}>Countries Smaller than Lithuania</button>
        </div>
        <div className='ms-3 '>
          <button className='btn bg-green-200 rounded-xl p-2' onClick={regionHandle} >Countries in Oceania region</button>
        </div>
        <div className='ms-3 '>
          <button className='btn bg-green-200 rounded-xl p-2' onClick={smallerInOceania} >Smaller Than Lithuania and in Oceania</button>
        </div>
      </nav>
      <div>
        {countriesInPage.map((country, index) => <ListItem key={country.name}
          index={index} country={country} ></ListItem>)}
      </div>
      <footer className='py-8 text-center'>
        <details className=" dropdown dropdown-end dropdown-left">
          <summary className="m-1 btn">Countries</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-20">
            <li><button onClick={() => setItemsPerPage(20)}>20</button></li>
            <li><button onClick={() => setItemsPerPage(30)}>30</button></li>
            <li><button onClick={() => setItemsPerPage(40)}>40</button></li>
          </ul>
        </details>
        {pageNumbers.map((page, index) => <button className='btn ms-1 rounded-3xl' onClick={() => moveToPages(page + 1)} key={index}>{page + 1}</button>)}
      </footer>
    </section>
  )
}

export default App