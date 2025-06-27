import ProductForm from '@/components/ProductForm'

export default async function EditProduct(props) {
  const params = await props.params;
  return (
    <div>
      <ProductForm productId={params.id} />
    </div>
  )
}