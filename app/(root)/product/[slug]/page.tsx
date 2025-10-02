
import { getProductbyslug } from "@/lib/actions/product.action"; 
import NotFoundPage from "@/app/not-found"; 
import ProductPrice from "@/components/shared/products/product-price"; 
import { Card, CardContent } from "@/components/ui/card"; 
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button"; 
import ProductImages from "@/components/shared/products/product-images"; 

const ProductDetailsPage = async ({ params }: { params: { slug: string } | Promise<{ slug: string }> }) => {
  // Await params if it is a promise (Next.js can pass params as a Promise)
  const resolvedParams = await params;
  const slug = resolvedParams.slug; // Extract slug from params

  // Fetch the product data from the backend using the slug
  const product = await getProductbyslug(slug);

  // If no product is found, render the NotFound page
  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          
          {/* Left Column: Product Images */}
          <div className="col-span-2">
            <ProductImages images={product.images} />
          </div>

          {/* Main Details Column */}
          <div className="col-span-2 flex flex-col gap-6">
            {/* Product brand and category */}
            <p>{product.brand} {product.category}</p>

            {/* Product name */}
            <h1 className="h3-bold">{product.name}</h1>

            {/* Product rating and number of reviews */}
            <p>{product.rating.toNumber()} of {product.numReviews} Reviews</p>

            {/* Price */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <ProductPrice 
                value={Number(product.price)} 
                className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2" 
              />
            </div>

            {/* Product description */}
            <div className="mt-10">
              <p className="font-semibold">Description</p>
              <p>{product.description}</p>
            </div>
          </div>

          {/* Action Column (Right side) */}
          <div>
            <Card>
              <CardContent className="p-4">

                {/* Price Section */}
                <div className="mb-2 flex justify-between">
                  <div>Price</div>
                  <div>
                    <ProductPrice value={Number(product.price)} />
                  </div>
                </div>

                {/* Stock Status Section */}
                <div className="mb-2 flex justify-between">
                  <div>Status</div>
                  {product.stock > 0 ? (
                    <Badge variant="outline">In Stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>

                {/* Add to Cart Button (only if product is in stock) */}
                {product.stock > 0 && (
                  <div className="flex-center">
                    <Button>Add To Cart</Button>
                  </div>
                )}

              </CardContent>
            </Card>
          </div>

        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage; 
