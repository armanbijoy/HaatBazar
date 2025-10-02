
import ProductList from "@/components/shared/products/product-list"
import { Button } from "@/components/ui/button"
import sampleData from "@/db/sample-data"
import { getLatestProducts } from "@/lib/actions/product.action"
const HomePage = async () => {
const latestProducts = await getLatestProducts()
  return (
      <>
       <ProductList data={latestProducts} title="News Arrival"/>
      </>
   
  )
}

export default HomePage
