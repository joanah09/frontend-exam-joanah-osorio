import { useState, useEffect } from "react"

function ProductDetails() {
    const [productData, setProductData] = useState({})
    const [activeSize, setActiveSize] = useState([])
    const [sizeId, setSizeId] = useState('')
    const [toggle, setToggle] = useState(false)
    const [cartData, setCartData] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    
    useEffect(() => {
        async function getData() {
            const result = await fetch("https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product")
            const data = await result.json()
            setProductData(data)
        }
        getData()
    }, [])

    function sizeBtn(event) {
        const size = productData.sizeOptions.filter(size => event.target.id.toString() === size.id.toString())
        setActiveSize(size[0].label)
        setSizeId(event.target.id)
        setErrorMessage('') 
    }

    function addToCart() {
        console.log(sizeId)
        if(!sizeId) {
            setErrorMessage("Please select Size") 
            return
        }

        const addCart = {
            sizeId: sizeId,
            name: productData.title,
            image: productData.imageURL,
            price: productData.price,
            size: activeSize
        }
        let data = cartData
        data.push(addCart)
        setCartData(data)
        // reset cart size
        setActiveSize([]) 
        setSizeId('') 
    }

    function cart(event) {
        console.log(event)
        setToggle(!toggle)       
    }
    
    return (
        <main>
            <section className="container mx-auto mt-4 mb-10 position-relative">
               <article className="bg-white border-2 border-slate-700 absolute top-3 right-3">
                <button className="text-1xl p-3 float-right bg-white hover:bg-black text-slate-900 hover:text-white duration-200" onClick={(event) => cart(event)}>My Cart</button> 
                {toggle ? 
                <div className="position-absolute px-10">
                    {cartData.map((item, id) => {
                        return (
                            <div className="w-64 flex flex-row mb-10" key={id}>
                                <div className="basis-1/3">
                                    <img className="lg:w-24" src={item.image} alt={item.title} />
                                </div>
                                <div className="basis-2/3 pl-3">
                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price}</p>
                                    <span>Size: {item.size}</span>
                                </div>
                            </div>
                        )
                    })}
                </div> 
                : null}
               </article>
            </section>

            <section className="container mx-auto mb-10 pt-10 px-10 lg:flex lg:flex-row">
                <article className=" basis-full lg:basis-1/3">
                    <img className="h-96 sm:h-5/6" src={productData && productData.imageURL} alt={productData && productData.title}/>
                </article>
                <article className="lg:basis-2/3">  
                    <h2 className="text-2xl pt-5 lg:text-4xl font-medium">{productData && productData.title}</h2>
                    <h3 className="font-medium text-xl py-2 lg:py-5">$ {productData && productData.price}.00</h3>
                    <p className="text-gray-500 text-sm lg:text-base my-2 lg:my-5">{productData && productData.description}</p>
                    <div className="mb-7">
                        <h3 className="uppercase font-medium text-sm lg:text-base text-gray-500 py-3">Size <span className="text-red-600">*</span> {activeSize}</h3>
                        {productData && productData.sizeOptions && productData.sizeOptions.map((size) => {
                            return (
                                <button id={size.id} key={size.id} onClick={(event) => sizeBtn(event)}
                                    className={`py-1 px-4 mr-2 border-4 ${sizeId.toString() === size.id.toString() ? "border-gray-900" : "border-gray-400"}`}>
                                    {size.label}
                                </button>
                            )
                        })}
                        {errorMessage && (
                            <p className="text-red-600 pt-2"> {errorMessage} </p>
                        )}
                    </div>
                    <button className="border-4 border-black bg-white hover:bg-black text-slate-900 hover:text-white px-8 py-2 uppercase font-medium duration-200" onClick={(event) => addToCart(event)}>Add to Cart</button>
                </article>
              
            </section> 
        </main>
    )
}

export default ProductDetails