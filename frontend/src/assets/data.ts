interface Product {
  id: number;
  photo: string;
  name: string;
  price: number;
  stock: number;
}

const data:Product[]= [
    {
      id: 1,
      photo:"https://m.media-amazon.com/images/I/31ilq3hPhEL._SY445_SX342_QL70_FMwebp_.jpg",
      name: "MacBook",
      price: 100,
      stock: 100,
    },
    {
      id: 2,
      
      photo:
        "https://m.media-amazon.com/images/I/71HzM0aj+9L._AC_UY327_FMwebp_QL65_.jpg",
      name: "Hp",
      price: 90,
      stock: 90,
    },
    {
      id: 3,
      photo: "https://m.media-amazon.com/images/I/61RJn0ofUsL._SX679_.jpg",
      name: "MacBook",
      price: 100,
      stock: 100,
    },

  ];

export default data