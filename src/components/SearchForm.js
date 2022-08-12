import React, { useRef } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {setSearch,search} = useGlobalContext()
  const SearVl = useRef(null)
  const HandleSubmit = (e)=>{
    e.preventDefault()
    // console.log("potato")
    setSearch(SearVl.current.value)
 
  }
  return (
   <section className="section search">
    <form className="search-form" onSubmit={HandleSubmit}>
      <div className="form-control">
        <label htmlFor="name">Search Whatever you want</label>
        <input type="text"  id="name" name="name" ref={SearVl} onChange={()=>{
          setSearch(SearVl.current.value)
          
        }}></input>
      </div>
    </form>
   </section>


  )
}

export default SearchForm
