const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('./models/Property');
const User = require('./models/User');
const Booking = require('./models/Booking');
const Enquiry = require('./models/Enquiry');

// Load env vars
dotenv.config();

const users = [
  { fullName: "Omar Faruk", email: "admin@gmail.com", password: "admin123", phone: "9876543210", role: "admin", status: "active", isVerified: true },
  { fullName: "Rajesh Kumar", email: "rajesh@agent.com", password: "password123", phone: "9876543211", role: "agent", status: "active", isVerified: true },
  { fullName: "Anjali Sharma", email: "anjali@broker.com", password: "password123", phone: "9876543212", role: "broker", status: "active", isVerified: true },
  { fullName: "Vikram Singh", email: "vikram@user.com", password: "password123", phone: "9876543213", role: "customer", status: "active", isVerified: true },
  { fullName: "Priya Patel", email: "priya@user.com", password: "password123", phone: "9876543214", role: "customer", status: "blocked", isVerified: true }
];

const apartmentListings = [
  { title: "Skyline Elite Residences", category: "residential", location: "Golf Course Road, Gurgaon", bhk: "3", area: "2450", status: "Ready to Move", price: 35000000, developer: "DLF Group", rera: "HRERA-2023-001", possession: "Ready", furnishing: "Semi-Furnished", facing: "East", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop", amenities: ["Gym", "Pool", "Club House", "Security"], type: "sale", availability: "available", description: "Ultra-luxury apartments with panoramic city views." },
  { title: "The Heritage Villas", category: "residential", location: "Sushant Lok, Gurgaon", bhk: "4", area: "4200", status: "New Launch", price: 85000000, developer: "M3M India", rera: "HRERA-2023-092", possession: "6 Months", furnishing: "Unfurnished", facing: "North-East", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop", amenities: ["Private Garden", "Pool", "Power Backup"], type: "sale", availability: "available", description: "Colonial style villas with private gardens." },
  { title: "Urban Heights 2.0", category: "residential", location: "Sector 150, Noida", bhk: "2", area: "1250", status: "Under Construction", price: 12500000, developer: "Godrej Properties", rera: "UPRERA-2022-445", possession: "1 Year+", furnishing: "Semi-Furnished", facing: "East", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2070&auto=format&fit=crop", amenities: ["Jogging Track", "Security"], type: "sale", availability: "available", description: "Modern urban living with smart features." },
  { title: "Amanora Luxury Towers", category: "residential", location: "Hadapsar, Pune", bhk: "3", area: "1850", status: "Ready to Move", price: 21000000, developer: "City Group", rera: "MAHARERA-P521000", possession: "Ready", furnishing: "Furnished", facing: "West", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop", amenities: ["Spa", "Infinite Pool"], type: "sale", availability: "available", description: "Integrated township living at its best." },
  { title: "RECO Tech Plaza", category: "commercial", location: "Cyber City, Gurgaon", area: "15000", status: "Ready to Move", price: 250000000, developer: "RECO Infrastructure", rera: "COMM-HR-101", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", amenities: ["Fiber Optic", "24/7 Security"], type: "rent", availability: "available", description: "Grade A office space in Cyber City." },
  { title: "Bandra Business Bay", category: "commercial", location: "BKC, Mumbai", area: "8500", status: "Ready to Move", price: 450000000, developer: "Adani Realty", rera: "COMM-MH-882", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop", amenities: ["Double Height Lobby"], type: "sale", availability: "sold", description: "Premium boutique offices in BKC." },
  { title: "Silicon Valley Hub", category: "commercial", location: "Electronic City, Bangalore", area: "25000", status: "Under Construction", price: 650000000, developer: "Embassy Group", rera: "COMM-KA-334", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop", amenities: ["Server Rooms"], type: "rent", availability: "available", description: "The heart of tech innovation office space." },
  { title: "Noida Industrial Hub", category: "industrial", location: "Ecotech, Greater Noida", area: "20000", status: "Immediate", price: 80000000, developer: "GNIDA Authority", rera: "IND-UP-445", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop", amenities: ["HT Power"], type: "sale", availability: "available", description: "Strategically located industrial plots." },
  { title: "Golden Acres Farm Plot", category: "plots", location: "NH-8, Jaipur", area: "18000", status: "In 6 Months", price: 15000000, developer: "Rajasthan Housing", rera: "RAJ-RERA-2021", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop", amenities: ["Boundary Wall"], type: "sale", availability: "available", description: "Spacious farm plots for your dream home." }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Property.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();
    await Enquiry.deleteMany();

    const createdUsers = [];
    for (const user of users) {
      const u = await User.create(user);
      createdUsers.push(u);
    }
    const admin = createdUsers[0];
    const customer = createdUsers[3];

    const sampleProperties = apartmentListings.map(p => ({ ...p, user: admin._id }));
    const createdProperties = await Property.insertMany(sampleProperties);

    await Booking.create({
      property: createdProperties[5]._id, // Bandra Business Bay (Sold)
      user: customer._id,
      amount: 450000000,
      status: 'completed'
    });

    await Enquiry.create([
      { name: "John Doe", email: "john@example.com", phone: "9999999999", message: "Interested in Skyline Residences. Please share payment plan.", property: createdProperties[0]._id },
      { name: "Sarah Khan", email: "sarah@example.com", phone: "8888888888", message: "Is the Heritage Villa still available for site visit?", property: createdProperties[1]._id }
    ]);

    console.log('✅ Dynamic Frontend Data Synchronized to Backend Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
}
