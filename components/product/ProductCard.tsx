// import Image from "next/image";

interface Props {
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ name, price }: Props) {
  return (
    <div className="border p-4 rounded-xl">
      {/* <Image  /> */}

      <h3 className="text-lg font-semibold">{name}</h3>

      <p>${price}</p>

      <button className="mt-3 bg-black text-white px-4 py-2 rounded">
        Agregar al carrito
      </button>
    </div>
  );
}
