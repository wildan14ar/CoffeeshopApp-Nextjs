import ProductForm from '@/components/ProductForm'

export default function EditProduct({ params }) {
  return (
    <div>
      <ProductForm productId={params.id} />
    </div>
  )
}