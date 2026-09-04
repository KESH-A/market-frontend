import Ip1 from "../assets/ProductImg1.avif";
import Ip2 from "../assets/ProductImg2.avif";
import Ip3 from "../assets/ProductImg3.avif";

export const sampleProduct = {
  id: "prod-1",
  name: "Light Hooded Tracksuit",
  brand: "WinterElegance",
  price: 1231.00,
  originalPrice: 1600.00,
  images: [Ip1, Ip2, Ip3],
  inStock: true,
  description: "Premium cotton blend hoodie designed for maximum comfort and modern urban style.",
  sizes: ["S", "M", "L", "XL"]
};

export const productsData = [
  {
    id: "prod-1",
    name: "Light Hooded Tracksuit",
    category: "Clothing",
    brand: "WinterElegance",
    price: 1231.00,
    originalPrice: 1600.00,
    images: [Ip1, Ip2, Ip3],
    inStock: true,
    description: "Premium cotton blend hoodie designed for maximum comfort and modern urban style.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "prod-2",
    name: "Wireless ANC Headphones",
    category: "Headphones",
    brand: "SoundPeak",
    price: 299.00,
    originalPrice: 350.00,
    images: [Ip2, Ip1, Ip3],
    inStock: true,
    description: "Active noise cancelling headphones with immersive sound and all-day battery life.",
    sizes: ["One Size"]
  },
  {
    id: "prod-3",
    name: "Smart Watch Series 9",
    category: "Smartwatches",
    brand: "TechTime",
    price: 450.00,
    originalPrice: 500.00,
    images: [Ip3, Ip1, Ip2],
    inStock: true,
    description: "Track your health and stay connected with an always-on display and multi-day battery.",
    sizes: ["41mm", "45mm"]
  },
  {
    id: "prod-4",
    name: "Nova Air Smartphone",
    category: "Phones",
    brand: "Nova",
    price: 899.00,
    originalPrice: 999.00,
    images: [Ip2, Ip3, Ip1],
    inStock: true,
    description: "A slim flagship phone with an all-day battery and a pro-grade camera system.",
    sizes: ["128GB", "256GB", "512GB"]
  },
  {
    id: "prod-5",
    name: "Cortex UltraBook 14",
    category: "Laptops",
    brand: "Cortex",
    price: 1299.00,
    originalPrice: 1499.00,
    images: [Ip3, Ip2, Ip1],
    inStock: true,
    description: "A featherlight 14 inch laptop built for long work sessions and fast multitasking.",
    sizes: ["8GB / 256GB", "16GB / 512GB"]
  },
  {
    id: "prod-6",
    name: "PixelEdge Action Cam X2",
    category: "Cameras",
    brand: "PixelEdge",
    price: 249.00,
    originalPrice: 299.00,
    images: [Ip1, Ip3, Ip2],
    inStock: true,
    description: "Waterproof 4K action camera with image stabilization for every angle of your day.",
    sizes: ["One Size"]
  },
  {
    id: "prod-7",
    name: "SkyLite Mini Drone",
    category: "Drones",
    brand: "SkyLite",
    price: 179.00,
    originalPrice: 220.00,
    images: [Ip2, Ip1, Ip3],
    inStock: true,
    description: "A pocket sized drone with stabilized footage and a 20 minute flight time.",
    sizes: ["One Size"]
  },
  {
    id: "prod-8",
    name: "HomeCore Smart Hub",
    category: "Smart Home",
    brand: "HomeCore",
    price: 89.00,
    originalPrice: 120.00,
    images: [Ip3, Ip1, Ip2],
    inStock: true,
    description: "Control lights, locks and sensors from one hub with fast, reliable local automation.",
    sizes: ["One Size"]
  },
  {
    id: "prod-9",
    name: "EchoWave Portable Speaker",
    category: "Speakers",
    brand: "EchoWave",
    price: 129.00,
    originalPrice: 159.00,
    images: [Ip1, Ip2, Ip3],
    inStock: true,
    description: "Rich, room filling sound in a rugged, splash proof body that travels anywhere.",
    sizes: ["One Size"]
  }
];

export const categories = ['Clothing', 'Phones', 'Tablets', 'Laptops', 'Headphones', 'TV & Monitors', 'Smartwatches', 'Gaming Consoles', 'Cameras', 'Drones', 'Smart Home', 'Speakers', 'Accessories'];