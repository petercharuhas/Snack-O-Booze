import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { Coffee, PlusCircle, Utensils, Beer } from 'lucide-react';

// Types for our menu items
interface MenuItem {
  id: string;
  name: string;
  description: string;
  recipe: string;
  serve: string;
}

// Initial sample data
const initialSnacks: MenuItem[] = [
  {
    id: "nachos",
    name: "Nachos",
    description: "An authentic Mexican appetizer with crispy tortilla chips",
    recipe: "Tortilla chips, cheese, beans, guacamole",
    serve: "Served hot with sour cream and salsa"
  },
  {
    id: "hummus",
    name: "Hummus",
    description: "A healthy Mediterranean dip",
    recipe: "Chickpeas, tahini, olive oil, garlic",
    serve: "Served with warm pita bread and vegetables"
  }
];

const initialDrinks: MenuItem[] = [
  {
    id: "margarita",
    name: "Margarita",
    description: "A classic tequila-based cocktail",
    recipe: "Tequila, triple sec, lime juice, salt rim",
    serve: "Served on the rocks with a lime wedge"
  },
  {
    id: "mojito",
    name: "Mojito",
    description: "A refreshing Cuban highball",
    recipe: "White rum, sugar, lime juice, soda water, mint",
    serve: "Served with crushed ice and fresh mint"
  }
];

// Components for different routes
const Home = ({ snackCount, drinkCount }: { snackCount: number; drinkCount: number }) => (
  <div className="text-center">
    <h1 className="text-4xl font-bold mb-4">Welcome to Silicon Valley's premier dive cafe!</h1>
    <p className="text-xl text-gray-300 mb-8">Your favorite spot for snacks and drinks</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
      <div className="bg-gray-800 p-6 rounded-lg">
        <Utensils className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Snacks Available</h2>
        <p className="text-4xl font-bold text-blue-400">{snackCount}</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <Beer className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Drinks Available</h2>
        <p className="text-4xl font-bold text-blue-400">{drinkCount}</p>
      </div>
    </div>
  </div>
);

// Generic menu component for both snacks and drinks
const Menu = ({ items, type }: { items: MenuItem[]; type: 'snacks' | 'drinks' }) => {
  const navigate = useNavigate();
  const title = type.charAt(0).toUpperCase() + type.slice(1);
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Our {title}</h2>
        <button
          onClick={() => navigate('/add')}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add New {title.slice(0, -1)}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
            <p className="text-gray-300 mb-4">{item.description}</p>
            <Link
              to={`/${type}/${item.id}`}
              className="text-blue-400 hover:text-blue-300 inline-flex items-center"
            >
              View Details
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// Generic item detail component
const ItemDetail = ({ items, type }: { items: MenuItem[]; type: 'snacks' | 'drinks' }) => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const id = path.split('/').pop();
  const item = items.find(item => item.id === id);

  if (!item) {
    return <Navigate to={`/${type}`} />;
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">{item.name}</h2>
      <p className="text-xl text-gray-300 mb-6">{item.description}</p>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Recipe</h3>
          <p className="text-gray-300">{item.recipe}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Serving Instructions</h3>
          <p className="text-gray-300">{item.serve}</p>
        </div>
      </div>
      <button
        onClick={() => navigate(`/${type}`)}
        className="mt-8 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Back to {type}
      </button>
    </div>
  );
};

interface AddItemProps {
  onAddItem: (item: MenuItem, type: string) => void;
}

const AddItem = ({ onAddItem }: AddItemProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    recipe: '',
    serve: '',
    type: 'snacks'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new item with a simple ID based on the name
    const newItem: MenuItem = {
      id: formData.name.toLowerCase().replace(/\s+/g, '-'),
      name: formData.name,
      description: formData.description,
      recipe: formData.recipe,
      serve: formData.serve
    };

    // Add the item with its type
    onAddItem(newItem, formData.type);

    // Navigate back to the appropriate list
    navigate(`/${formData.type}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg">
        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
          >
            <option value="snacks">Snack</option>
            <option value="drinks">Drink</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Recipe</label>
          <textarea
            value={formData.recipe}
            onChange={(e) => setFormData({ ...formData, recipe: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Serving Instructions</label>
          <textarea
            value={formData.serve}
            onChange={(e) => setFormData({ ...formData, serve: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
            rows={3}
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

const NotFound = () => (
  <div className="text-center">
    <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
    <p className="text-xl text-gray-300 mb-8">Sorry, the page you're looking for doesn't exist.</p>
    <Link
      to="/"
      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
    >
      Return Home
    </Link>
  </div>
);

function App() {
  const [snacks, setSnacks] = useState<MenuItem[]>(initialSnacks);
  const [drinks, setDrinks] = useState<MenuItem[]>(initialDrinks);

  const handleAddItem = (newItem: MenuItem, type: string) => {
    if (type === 'drinks') {
      setDrinks(prev => [...prev, newItem]);
    } else {
      setSnacks(prev => [...prev, newItem]);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <nav className="bg-gray-800 p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Coffee className="h-6 w-6" />
              <span className="text-xl font-bold">Snack or Booze</span>
            </Link>
            <div className="flex space-x-4">
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/snacks" className="hover:text-gray-300">Snacks</Link>
              <Link to="/drinks" className="hover:text-gray-300">Drinks</Link>
              <Link to="/add" className="hover:text-gray-300">Add Item</Link>
            </div>
          </div>
        </nav>
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home snackCount={snacks.length} drinkCount={drinks.length} />} />
            <Route path="/snacks" element={<Menu items={snacks} type="snacks" />} />
            <Route path="/drinks" element={<Menu items={drinks} type="drinks" />} />
            <Route path="/snacks/:id" element={<ItemDetail items={snacks} type="snacks" />} />
            <Route path="/drinks/:id" element={<ItemDetail items={drinks} type="drinks" />} />
            <Route path="/add" element={<AddItem onAddItem={handleAddItem} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;