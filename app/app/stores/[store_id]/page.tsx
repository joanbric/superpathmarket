export default function StorePage({ params }: { params: { store_id: string } }) {
  return (
    <div>
      <h1>Store {params.store_id}</h1>
    </div>
  )
}
