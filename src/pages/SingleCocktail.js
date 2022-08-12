import React, { useCallback, useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams()
  const [loading, setLoading] = useState (false)
  const [items, setItems] =useState(null)
  const Fetching = useCallback(async() => {
    try {
      
      setLoading(true)
    const res = await fetch(`${url}${id}`)
    const data =await res.json()
  
 
   if(data.drinks){
    const {
      strDrink:name,
      strDrinkThumb:image,
      strAlcoholic:info,
      strCategory:category,
      strGlass:glass,
      strInstructions:instructions,
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
    } =data.drinks[0]

    const ingredients = [strIngredient1,strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
    ]
    const newItems = {name,image,info,category,glass,instructions,ingredients}
    setItems(newItems)
    setLoading(false)
   }
    } catch (err) {
      setLoading(false)
      throw new Error(err)
    }
  })


  useEffect(() => {
    Fetching()
   
  }, []);

  
 if (loading) {
    return <Loading/>
 }
 if (!items) {
  return <h2 className="section-title">no cocktail To Display</h2>
}
const {name,image,info,category,glass,instructions,ingredients} = items 

 return (
 
<section className="section cocktail-section">
  <Link to="/" className="btn btn-primary">
    Back Home
  </Link>
  <h2 className="section-title">{name}</h2>
  <div className="drink">
    <img src={image} alt={name}></img>
  <div className="drink-info">
    <p>
      <span className="drink-data">
        category:{category}
      </span>
    </p>
    <p>
      <span className="drink-data">
      info:{info}
      </span>
    </p>
    <p>
      <span className="drink-data">
      glass:{glass}
      </span>
    </p>
    <p>
      <span className="drink-data">
      instructions:{instructions}
      </span>
    </p>

    <p >
      <span className="drink-data">ingredients:</span>
      {ingredients.map((item,index)=>{
        return item?<span key={index}>{item}</span>:null
      })}
    </p>
  </div>
  </div>
</section>
)
}

export default SingleCocktail
