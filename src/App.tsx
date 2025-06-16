import { useState } from 'react'
import { Search, Filter, Car, Phone, Mail, Star, ChevronRight } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Separator } from './components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'

interface Car {
  id: number
  name: string
  brand: string
  year: number
  price: number
  mileage: number
  fuel: string
  transmission: string
  image: string
  rating: number
  reviews: number
  features: string[]
  description: string
}

const SAMPLE_CARS: Car[] = [
  {
    id: 1,
    name: "Model S Plaid",
    brand: "Tesla",
    year: 2024,
    price: 129990,
    mileage: 0,
    fuel: "Electric",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
    rating: 4.9,
    reviews: 156,
    features: ["Autopilot", "Premium Interior", "Supercharging", "Over-the-air Updates"],
    description: "The most powerful sedan ever built. Tri-motor all-wheel drive with torque vectoring."
  },
  {
    id: 2,
    name: "AMG GT 63 S",
    brand: "Mercedes-Benz",
    year: 2024,
    price: 165000,
    mileage: 1200,
    fuel: "Gasoline",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    rating: 4.8,
    reviews: 89,
    features: ["AMG Performance", "Active Suspension", "Panoramic Roof", "Bang & Olufsen Sound"],
    description: "Handcrafted AMG 4.0L V8 biturbo engine delivering extraordinary performance."
  },
  {
    id: 3,
    name: "911 Carrera",
    brand: "Porsche",
    year: 2023,
    price: 115000,
    mileage: 8500,
    fuel: "Gasoline",
    transmission: "Manual",
    image: "https://images.unsplash.com/photo-1611821064430-077bebcc8494?w=800&q=80",
    rating: 4.9,
    reviews: 234,
    features: ["Sport Chrono", "Active Suspension", "Porsche Communication", "LED Headlights"],
    description: "The quintessential sports car with legendary Porsche DNA and precision engineering."
  },
  {
    id: 4,
    name: "i8",
    brand: "BMW",
    year: 2022,
    price: 148500,
    mileage: 12000,
    fuel: "Hybrid",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    rating: 4.6,
    reviews: 67,
    features: ["eDrive Technology", "Carbon Fiber Body", "Laser Headlights", "Harman Kardon Audio"],
    description: "Revolutionary hybrid sports car combining efficiency with breathtaking performance."
  },
  {
    id: 5,
    name: "Huracan EVO",
    brand: "Lamborghini",
    year: 2023,
    price: 245000,
    mileage: 3400,
    fuel: "Gasoline",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    rating: 4.7,
    reviews: 45,
    features: ["V10 Engine", "All-Wheel Drive", "Active Aerodynamics", "Racing Exhaust"],
    description: "Pure Italian supercar with naturally aspirated V10 and legendary Lamborghini design."
  },
  {
    id: 6,
    name: "Vantage",
    brand: "Aston Martin",
    year: 2023,
    price: 139000,
    mileage: 6800,
    fuel: "Gasoline",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
    rating: 4.8,
    reviews: 78,
    features: ["Twin-Turbo V8", "Adaptive Suspension", "Premium Leather", "Bang & Olufsen"],
    description: "British grand tourer combining raw power with sophisticated luxury and craftsmanship."
  }
]

function App() {
  const [cars] = useState<Car[]>(SAMPLE_CARS)
  const [, setSelectedCar] = useState<Car | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")

  const brands = ["all", ...Array.from(new Set(cars.map(car => car.brand)))]
  
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = selectedBrand === "all" || car.brand === selectedBrand
    return matchesSearch && matchesBrand
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-slate-900" />
              <h1 className="text-2xl font-bold text-slate-900">EliteAuto</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button size="sm">
                Schedule Test Drive
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6">
            Discover Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Dream Car
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Premium vehicles, exceptional service, and unmatched quality. 
            Find the perfect car that matches your lifestyle.
          </p>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-slate-300 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-4 py-3 rounded-md border border-slate-300 focus:border-blue-500 focus:outline-none bg-white min-w-[150px]"
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand === "all" ? "All Brands" : brand}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900">
              Featured Vehicles ({filteredCars.length})
            </h3>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <Card key={car.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {car.brand}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{car.rating}</span>
                      <span className="text-xs text-slate-500">({car.reviews})</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{car.name}</CardTitle>
                  <div className="text-2xl font-bold text-slate-900">
                    {formatPrice(car.price)}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 mb-4">
                    <div>Year: {car.year}</div>
                    <div>Mileage: {car.mileage.toLocaleString()} mi</div>
                    <div>Fuel: {car.fuel}</div>
                    <div>Trans: {car.transmission}</div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full group"
                        onClick={() => setSelectedCar(car)}
                      >
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{car.brand} {car.name}</DialogTitle>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <div><strong>Year:</strong> {car.year}</div>
                              <div><strong>Mileage:</strong> {car.mileage.toLocaleString()} mi</div>
                            </div>
                            <div className="space-y-2">
                              <div><strong>Fuel:</strong> {car.fuel}</div>
                              <div><strong>Transmission:</strong> {car.transmission}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="text-3xl font-bold text-slate-900">
                            {formatPrice(car.price)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{car.rating}</span>
                            <span className="text-slate-500">({car.reviews} reviews)</span>
                          </div>
                          
                          <p className="text-slate-600">{car.description}</p>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Key Features</h4>
                            <div className="flex flex-wrap gap-2">
                              {car.features.map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-3">
                            <Button className="w-full" size="lg">
                              Schedule Test Drive
                            </Button>
                            <div className="grid grid-cols-2 gap-3">
                              <Button variant="outline" size="sm">
                                <Phone className="h-4 w-4 mr-2" />
                                Call Now
                              </Button>
                              <Button variant="outline" size="sm">
                                <Mail className="h-4 w-4 mr-2" />
                                Email
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6" />
                <h3 className="text-xl font-bold">EliteAuto</h3>
              </div>
              <p className="text-slate-400">
                Your trusted partner in finding the perfect luxury vehicle.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Vehicle Sales</li>
                <li>Test Drives</li>
                <li>Financing</li>
                <li>Insurance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Brands</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Tesla</li>
                <li>Mercedes-Benz</li>
                <li>Porsche</li>
                <li>BMW</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-400">
                <li>1-800-ELITE-AUTO</li>
                <li>info@eliteauto.com</li>
                <li>123 Luxury Lane</li>
                <li>Beverly Hills, CA 90210</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-slate-700" />
          <div className="text-center text-slate-400">
            <p>&copy; 2024 EliteAuto. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App