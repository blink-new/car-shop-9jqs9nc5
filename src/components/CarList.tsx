import React from 'react';

interface Car {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const cars: Car[] = [
  {
    id: 1,
    name: 'Grotti Carbonizzare',
    price: 150000,
    imageUrl: 'https://via.placeholder.com/300x200',
  },
  {
    id: 2,
    name: 'Pegassi Zentorno',
    price: 750000,
    imageUrl: 'https://via.placeholder.com/300x200',
  },
  {
    id: 3,
    name: 'Progen T20',
    price: 2200000,
    imageUrl: 'https://via.placeholder.com/300x200',
  },
];

const CarList: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={car.imageUrl} alt={car.name} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
              <p className="text-gray-700">${car.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;