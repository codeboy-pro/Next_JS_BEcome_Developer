import React from 'react'
type ProductPageProps = {
  params: { id: string };
};

const Products: React.FC<ProductPageProps> = ({ params }) => (
  <div className="p-4">
    <h1>Product id: {params.id}</h1>
  </div>
);

export default Products