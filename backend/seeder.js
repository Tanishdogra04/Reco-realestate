const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('./models/Property');
const User = require('./models/User');

// Load env vars
dotenv.config();

// Expanded Premium Data (Synchronized with frontend/src/data/properties.js)
const properties = [
  // RESIDENTIAL
  { id: 1, title: "Skyline Elite Residences", category: "residential", location: "Golf Course Road, Gurgaon", bhk: "3", area: 2450, status: "Ready to Move", price: 35000000, developer: "DLF Group", rera: "HRERA-2023-001", possession: "Ready", furnishing: "Semi-Furnished", facing: "East", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop", amenities: ["Gym", "Pool", "Club House", "Security"] },
  { id: 2, title: "The Heritage Villas", category: "residential", location: "Sushant Lok, Gurgaon", bhk: "4", area: 4200, status: "New Launch", price: 85000000, developer: "M3M India", rera: "HRERA-2023-092", possession: "6 Months", furnishing: "Unfurnished", facing: "North-East", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop", amenities: ["Garden", "Pool", "Power Backup"] },
  { id: 3, title: "Urban Heights 2.0", category: "residential", location: "Sector 150, Noida", bhk: "2", area: 1250, status: "Under Construction", price: 12500000, developer: "Godrej Properties", rera: "UPRERA-2022-445", possession: "1 Year+", furnishing: "Semi-Furnished", facing: "East", image: "https://images.unsplash.com/photo-1567684014761-b618b6983527?q=80&w=2070&auto=format&fit=crop", amenities: ["Gym", "Security", "Parking"] },
  { id: 4, title: "Amanora Luxury Towers", category: "residential", location: "Hadapsar, Pune", bhk: "3", area: 1850, status: "Ready to Move", price: 21000000, developer: "City Group", rera: "MAHARERA-P521000", possession: "Ready", furnishing: "Furnished", facing: "West", image: "https://images.unsplash.com/photo-1460317442991-0ec239397148?q=80&w=2070&auto=format&fit=crop", amenities: ["Spa", "Pool", "Gym"] },
  { id: 5, title: "Palm Jumeirah Suites", category: "residential", location: "Whitefield, Bangalore", bhk: "4", area: 3600, status: "Ready to Move", price: 55000000, developer: "Prestige Group", rera: "PRM/KA/RERA/1251", possession: "Ready", furnishing: "Semi-Furnished", facing: "East", image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop", amenities: ["Garden", "Gym", "Pool", "Club House"] },
  { id: 6, title: "The Address Worli", category: "residential", location: "Worli, Mumbai", bhk: "3", area: 2100, status: "New Launch", price: 120000000, developer: "Lodha Group", rera: "MAHARERA-P519000", possession: "6 Months", furnishing: "Furnished", facing: "South", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1984&auto=format&fit=crop", amenities: ["Sea View", "Pool", "Gym"] },
  { id: 7, title: "Eden Gardens Estate", category: "residential", location: "New Town, Kolkata", bhk: "3", area: 1650, status: "Ready to Move", price: 9500000, developer: "Ambuja Neotia", rera: "WBRERA-2023-005", possession: "Ready", furnishing: "Unfurnished", facing: "North", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", amenities: ["Lake View", "Badminton Court", "Library"] },

  // COMMERCIAL
  { id: 8, title: "RECO Tech Plaza", category: "commercial", location: "Cyber City, Gurgaon", area: 15000, status: "Ready to Move", price: 250000000, developer: "RECO Infrastructure", rera: "COMM-HR-101", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", amenities: ["Fiber Optic", "24/7 Security", "Food Court"] },
  { id: 9, title: "Bandra Business Bay", category: "commercial", location: "BKC, Mumbai", area: 8500, status: "Ready to Move", price: 450000000, developer: "Adani Realty", rera: "COMM-MH-882", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop", amenities: ["Double Height Lobby", "Valet Parking"] },
  { id: 10, title: "Silicon Valley Hub", category: "commercial", location: "Electronic City, Bangalore", area: 25000, status: "Under Construction", price: 650000000, developer: "Embassy Group", rera: "COMM-KA-334", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop", amenities: ["Server Rooms", "Recreation Zone"] },
  { id: 11, title: "The Financial District", category: "commercial", location: "Gachibowli, Hyderabad", area: 12000, status: "Ready to Move", price: 180000000, developer: "Phoenix Group", rera: "COMM-TS-551", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop", amenities: ["Conference Center", "Business Lounge"] },
  { id: 12, title: "Retail Junction Mall", category: "commercial", location: "Salt Lake, Kolkata", area: 5500, status: "New Launch", price: 120000000, developer: "Forum Projects", rera: "COMM-WB-772", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop", amenities: ["Central AC", "Fire Safety"] },
  { id: 13, title: "Capital Business Park", category: "commercial", location: "Sector 62, Noida", area: 22000, status: "Ready to Move", price: 320000000, developer: "Bhutani Infra", rera: "COMM-UP-991", image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop", amenities: ["Terrace Garden", "Smart Lighting"] },
  { id: 14, title: "Prestige Trade Center", category: "commercial", location: "MG Road, Pune", area: 9000, status: "In 6 Months", price: 210000000, developer: "Prestige Group", rera: "COMM-PN-443", image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=2070&auto=format&fit=crop", amenities: ["Board Rooms", "Executive Lounge"] },

  // INDUSTRIAL/PLOTS (Mapped as 'industrial' or 'plots' to match schema enum)
  { id: 15, title: "Noida Industrial Hub", category: "industrial", location: "Ecotech, Greater Noida", area: 20000, status: "Immediate", price: 80000000, developer: "GNIDA Authority", rera: "IND-UP-445", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop", amenities: ["HT Power", "Internal Roads"] },
  { id: 16, title: "Golden Acres Plot", category: "plots", location: "NH-8, Jaipur", area: 18000, status: "In 6 Months", price: 15000000, developer: "Rajasthan Housing", rera: "RAJ-RERA-2021", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop", amenities: ["Boundary Wall", "Gated Entry"] },
  { id: 17, title: "Logistics Park Land", category: "industrial", location: "Bhiwandi, Thane", area: 45000, status: "Immediate", price: 120000000, developer: "IndoSpace", rera: "IND-MH-332", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop", amenities: ["Truck Parking", "CCTV Hub"] },
  { id: 18, title: "Heritage Orchard Plots", category: "plots", location: "Solan, Himachal", area: 10800, status: "Ready to Move", price: 8500000, developer: "HIMUDA", rera: "HP-RERA-2023", image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=2071&auto=format&fit=crop", amenities: ["Hill View", "Fencing"] },
  { id: 19, title: "Pharma City Industrial", category: "industrial", location: "Sultanpur, Hyderabad", area: 25000, status: "New Launch", price: 55000000, developer: "TSIIC", rera: "IND-TS-112", image: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=2070&auto=format&fit=crop", amenities: ["ETP Plant", "Gas Pipeline"] },
  { id: 20, title: "Aerocity Gated Plots", category: "plots", location: "Mohali, Chandigarh", area: 2250, status: "Immediate", price: 14500000, developer: "GMADA", rera: "PB-RERA-552", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop", amenities: ["Street Lights", "Sewerage"] },
  { id: 21, title: "Dholera SIR Strategic", category: "industrial", location: "Dholera, Gujarat", area: 50000, status: "Immediate", price: 35000000, developer: "DSIRDA", rera: "GUJ-RERA-992", image: "https://images.unsplash.com/photo-1541888941259-792739460a3b?q=80&w=2070&auto=format&fit=crop", amenities: ["Smart Infra", "Power Grid"] }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Property.deleteMany();
    await User.deleteMany();

    const adminUser = await User.create({
      fullName: 'RECO Admin',
      email: 'admin@reco.com',
      password: 'password123',
      phone: '+91 9999999999',
      role: 'client'
    });

    const sampleProperties = properties.map(p => ({
      ...p,
      user: adminUser._id
    }));

    await Property.insertMany(sampleProperties);
    console.log('✅ 21 Premium Properties Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Property.deleteMany();
    await User.deleteMany();
    console.log('🗑️ Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  destroyData();
}
