import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()


const AppProvider = ({ children }) => {

  const FetchData = async()=>{
    const res = await fetch(`${url}${search}`)
    const data =  await res.json()
   
   
   if(data.drinks){
      setLoading(false)
      setItems(data.drinks.map(item=>{
        const {
          idDrink,
          strDrink,
          strDrinkThumb,
          strAlcoholic,
          strGlass,
        } = item
  
        return {
          id: idDrink,
          name: strDrink,
          image: strDrinkThumb,
          info: strAlcoholic,
          glass: strGlass,
        }
       }))
      }else{
        setItems([])
      }
      }
   
  const [items,setItems] = useState([{}])
const [loading,setLoading] = useState(true)
const [search,setSearch] = useState("a")
useEffect(()=>{
  FetchData()
  
},[search])

  return <AppContext.Provider value={
    {
      items,search,loading,setSearch

    }
  }>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
