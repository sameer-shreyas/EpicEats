import React,{useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
//import Carousal from '../components/Carousal'

export default function Home() {
  
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const [search, setsearch] = useState('');
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-type' : 'application/json'
      }
    });
    response = await response.json();

    setfoodItem(response[0]);
    setfoodCat(response[1]);
    //console.log(response[0], response[1]);
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <div> 
    <div> <Navbar /> </div>
    <div>
    <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{objectFit : "contain !important"}}
      >
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{zIndex: "10"}}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {setsearch(e.target.value)}}
              />
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">
                Search
              </button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg"
              className="d-block w-100"
              alt="..."
              style={{filter : "brightness(30%)"}}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.simplyrecipes.com/thmb/KE6iMblr3R2Db6oE8HdyVsFSj2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-1024x682-583b275444104ef189d693a64df625da.jpg"
              className="d-block w-100"
              alt="..."
              style={{filter : "brightness(30%)"}}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.thespruceeats.com/thmb/UnVh_-znw7ikMUciZIx5sNqBtTU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steamed-momos-wontons-1957616-hero-01-1c59e22bad0347daa8f0dfe12894bc3c.jpg"
              className="d-block w-100"
              alt="..."
              style={{filter : "brightness(30%)"}}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
        </div> 
    </div>
    <div className='container'>
      {
         foodCat !==[]
         ? foodCat.map((data) => {
          return(
            <div className='row mb-3'>
              <div key={data._id} className='fs-3 m-3'>
                {data.CategoryName}
              </div>
              <hr />
              {foodItem !== [] 
              ?
              foodItem.filter( (item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))) 
              .map(filterItems => {
                return (
                  <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                    <Card 
                      foodItem={filterItems}
                      options= {filterItems.options[0]}
                      
                    > </Card>
                  </div>
                )
              }) : <div> No such data found </div>}
          </div>
          )
         })
         : "" 
      }
    </div>
    <Footer />
    </div>
  )
}
