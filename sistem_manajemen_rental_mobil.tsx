import React, { useState, useEffect, useMemo } from 'react';
import {
  Car,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  FileText,
  LogOut,
  Settings,
  Shield,
  Edit2,
  Trash2,
  Eye,
  ArrowRight,
  TrendingUp,
  Menu,
  X,
  Database,
  Copy,
  Check,
  Building,
  Key,
  UserCheck,
  Navigation
} from 'lucide-react';


// Default Seed Data for 10 Vehicles
const INITIAL_VEHICLES = [
  { id: 'v-1', vehicle_code: 'MOB-001', plate_number: 'B 1234 SJA', brand: 'Toyota', model: 'Avanza Grand New', year: 2022, color: 'Hitam', general_status: 'ACTIVE', notes: 'Servis rutin berkala aman.' },
  { id: 'v-2', vehicle_code: 'MOB-002', plate_number: 'B 5678 TPK', brand: 'Toyota', model: 'Innova Reborn Diesel', year: 2023, color: 'Putih Metalik', general_status: 'ACTIVE', notes: 'Favorit luar kota.' },
  { id: 'v-3', vehicle_code: 'MOB-003', plate_number: 'B 9101 CKN', brand: 'Mitsubishi', model: 'Xpander Ultimate', year: 2023, color: 'Abu-abu', general_status: 'ACTIVE', notes: 'Kondisi prima.' },
  { id: 'v-4', vehicle_code: 'MOB-004', plate_number: 'B 1122 RNF', brand: 'Honda', model: 'CR-V Turbo', year: 2021, color: 'Hitam', general_status: 'ACTIVE', notes: 'AC super dingin.' },
  { id: 'v-5', vehicle_code: 'MOB-005', plate_number: 'B 3344 MKI', brand: 'Daihatsu', model: 'Great New Xenia', year: 2020, color: 'Silver', general_status: 'ACTIVE', notes: 'Irit bahan bakar.' },
  { id: 'v-6', vehicle_code: 'MOB-006', plate_number: 'B 5566 PLM', brand: 'Toyota', model: 'Fortuner VRZ 4x2', year: 2023, color: 'Hitam Doft', general_status: 'ACTIVE', notes: 'Unit VIP.' },
  { id: 'v-7', vehicle_code: 'MOB-007', plate_number: 'B 7788 TUV', brand: 'Hyundai', model: 'Stargazer Prime', year: 2023, color: 'Merah', general_status: 'ACTIVE', notes: 'Fitur keselamatan lengkap.' },
  { id: 'v-8', vehicle_code: 'MOB-008', plate_number: 'B 9900 WXY', brand: 'Suzuki', model: 'Ertiga Hybrid', year: 2022, color: 'Putih', general_status: 'MAINTENANCE', notes: 'Ganti oli & ganti kanvas rem di bengkel.' },
  { id: 'v-9', vehicle_code: 'MOB-009', plate_number: 'B 1357 ZAA', brand: 'Toyota', model: 'Alphard Transformer', year: 2022, color: 'Hitam', general_status: 'ACTIVE', notes: 'Sewa khusus plus pengemudi/bebas.' },
  { id: 'v-10', vehicle_code: 'MOB-010', plate_number: 'B 2468 BBB', brand: 'Honda', model: 'Brio RS Auto', year: 2021, color: 'Kuning', general_status: 'INACTIVE', notes: 'Cadangan / surat masih diproses.' },
];

// Default Seed Data for 10 Customers
const INITIAL_CUSTOMERS = [
  { id: 'c-1', name: 'Budi Santoso', phone: '081234567890', address: 'Jl. Sudirman No. 45, Jakarta Selatan', notes: 'Pelanggan tetap corporate.' },
  { id: 'c-2', name: 'Siti Rahmawati', phone: '081987654321', address: 'Griya Asri Blok C2 No. 10, Tangerang', notes: 'Pembayaran selalu tepat waktu.' },
  { id: 'c-3', name: 'Ahmad Fauzi', phone: '085678901234', address: 'Jl. Gatot Subroto Kumuning 12, Jakarta Timur', notes: 'Sewa mingguan.' },
  { id: 'c-4', name: 'Dewi Lestari', phone: '087711223344', address: 'Perum Grand Wisata Cluster Fiesta B5, Bekasi', notes: 'Dokumen terverifikasi.' },
  { id: 'c-5', name: 'Eko Prasetyo', phone: '082133445566', address: 'Jl. Kemang Raya No. 88, Jakarta Selatan', notes: 'Sering sewa mobil SUV.' },
  { id: 'c-6', name: 'Fitriani Indah', phone: '083899001122', address: 'Apt. Mediterania Tower B 1205, Jakarta Barat', notes: 'Kontak WhatsApp aktif.' },
  { id: 'c-7', name: 'Rudi Hermawan', phone: '081344556677', address: 'Jl. Raya Bogor KM 24, Ciracas', notes: 'Pernah minta kirim ke stasiun.' },
  { id: 'c-8', name: 'Maya Saphira', phone: '085211335577', address: 'Jl. Radio Dalam No. 15, Kebayoran Baru', notes: 'Member Gold.' },
  { id: 'c-9', name: 'Hendrik Wijaya', phone: '081808080808', address: 'Kavling DKI Blok 4 No. 2, Sunter', notes: 'Customer korporat CV Maju Bersama.' },
  { id: 'c-10', name: 'Anisa Putri', phone: '089677889900', address: 'Jl. Margonda Raya No. 200, Depok', notes: 'Sewa harian lepas kunci.' },
];

// Date helper for generating relative dates
const getFormattedToday = () => new Date().toISOString().split('T')[0];

const formatDateIndo = (dateStr) => {
  if (!dateStr) return '-';
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const [year, month, day] = dateStr.split('-');
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
};

const addDays = (dateStr, days) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

// Initial Rentals Generator for realistic operational testing
const generateInitialRentals = () => {
  const today = getFormattedToday();
  const yesterday = addDays(today, -1);
  const tomorrow = addDays(today, 1);
  const inTwoDays = addDays(today, 2);

  return [
    {
      id: 'r-101',
      rental_code: 'RENT-2026-001',
      customer_id: 'c-1',
      vehicle_id: 'v-2',
      pickup_date: yesterday,
      pickup_time: '08:00',
      return_date: today,
      return_time: '17:00',
      pickup_method: 'DELIVERY',
      return_method: 'DRIVER_PICKUP',
      operational_address: 'Hotel Indonesia Kempinski, Menteng, Jakarta Pusat',
      status: 'RETURN_TODAY',
      notes: 'Penjemputan sore jam 17:00 WIB.',
      pic: 'Bambang (Driver)',
    },
    {
      id: 'r-102',
      rental_code: 'RENT-2026-002',
      customer_id: 'c-2',
      vehicle_id: 'v-3',
      pickup_date: today,
      pickup_time: '09:00',
      return_date: tomorrow,
      return_time: '09:00',
      pickup_method: 'CUSTOMER_PICKUP',
      return_method: 'CUSTOMER_RETURN',
      operational_address: 'Garage Utama (Customer Datang)',
      status: 'ONGOING',
      notes: 'Customer sudah ambil mobil tadi pagi.',
      pic: 'Admin Garage',
    },
    {
      id: 'r-103',
      rental_code: 'RENT-2026-003',
      customer_id: 'c-3',
      vehicle_id: 'v-4',
      pickup_date: today,
      pickup_time: '14:00',
      return_date: inTwoDays,
      return_time: '14:00',
      pickup_method: 'DELIVERY',
      return_method: 'CUSTOMER_RETURN',
      operational_address: 'Gedung Menara Astra Lt. 12, Sudirman',
      status: 'BOOKING',
      notes: 'Siapkan unit bersih wangi.',
      pic: 'Dedi (Driver)',
    },
    {
      id: 'r-104',
      rental_code: 'RENT-2026-004',
      customer_id: 'c-4',
      vehicle_id: 'v-6',
      pickup_date: tomorrow,
      pickup_time: '10:00',
      return_date: addDays(today, 3),
      return_time: '10:00',
      pickup_method: 'CUSTOMER_PICKUP',
      return_method: 'CUSTOMER_RETURN',
      operational_address: 'Garage Utama',
      status: 'BOOKING',
      notes: 'Booking untuk luar kota Bandung.',
      pic: 'Admin Garage',
    },
    {
      id: 'r-105',
      rental_code: 'RENT-2026-005',
      customer_id: 'c-5',
      vehicle_id: 'v-1',
      pickup_date: addDays(today, -5),
      pickup_time: '09:00',
      return_date: addDays(today, -3),
      return_time: '18:00',
      pickup_method: 'CUSTOMER_PICKUP',
      return_method: 'CUSTOMER_RETURN',
      operational_address: 'Garage Utama',
      status: 'COMPLETED',
      notes: 'Selesai tanpa kendala.',
      pic: 'Admin Garage',
    }
  ];
};

const generateInitialActivities = (rentals) => {
  const activities = [];
  rentals.forEach(r => {
    // Pickup Activity
    activities.push({
      id: `act-p-${r.id}`,
      rental_id: r.id,
      activity_type: r.pickup_method,
      scheduled_at: `${r.pickup_date} ${r.pickup_time}`,
      actual_at: r.status === 'ONGOING' || r.status === 'RETURN_TODAY' || r.status === 'COMPLETED' ? `${r.pickup_date} ${r.pickup_time}` : null,
      pic: r.pic || 'Admin Garage',
      status: r.status === 'ONGOING' || r.status === 'RETURN_TODAY' || r.status === 'COMPLETED' ? 'DONE' : 'PENDING',
      address: r.pickup_method === 'DELIVERY' ? r.operational_address : 'Garage Utama',
      notes: `Pengambilan kendaraan (${r.pickup_method})`
    });

    // Return Activity
    activities.push({
      id: `act-r-${r.id}`,
      rental_id: r.id,
      activity_type: r.return_method,
      scheduled_at: `${r.return_date} ${r.return_time}`,
      actual_at: r.status === 'COMPLETED' ? `${r.return_date} ${r.return_time}` : null,
      pic: r.pic || 'Admin Garage',
      status: r.status === 'COMPLETED' ? 'DONE' : (r.status === 'RETURN_TODAY' ? 'PENDING' : 'PENDING'),
      address: r.return_method === 'DRIVER_PICKUP' ? r.operational_address : 'Garage Utama',
      notes: `Pengembalian kendaraan (${r.return_method})`
    });
  });
  return activities;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState(getFormattedToday());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({ name: 'Admin Rental', role: 'ADMIN', email: 'admin@rental.com' });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Core Data States
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [rentals, setRentals] = useState(() => generateInitialRentals());
  const [activities, setActivities] = useState(() => generateInitialActivities(generateInitialRentals()));

  // Alert & Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Computed property: Calculates vehicle availability dynamically based on rental overlap
  const getCalculatedVehicleStatus = (vehicleId, dateStr = selectedDate) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return 'NONAKTIF';
    if (vehicle.general_status === 'INACTIVE') return 'NONAKTIF';
    if (vehicle.general_status === 'MAINTENANCE') return 'MAINTENANCE';

    // Find active non-cancelled/completed rentals overlapping dateStr
    const activeRental = rentals.find(r => {
      if (r.vehicle_id !== vehicleId) return false;
      if (r.status === 'CANCELLED' || r.status === 'COMPLETED') return false;

      // Check date range overlap
      return dateStr >= r.pickup_date && dateStr <= r.return_date;
    });

    if (!activeRental) return 'READY';

    if (activeRental.status === 'ONGOING' || activeRental.status === 'RETURN_TODAY') {
      return 'DISEWA';
    }

    if (activeRental.status === 'BOOKING') {
      return 'BOOKING';
    }

    return 'READY';
  };

  const checkDoubleBooking = (vehicleId, pickupDate, pickupTime, returnDate, returnTime, excludeRentalId = null) => {
    const newStart = new Date(`${pickupDate}T${pickupTime || '00:00'}`).getTime();
    const newEnd = new Date(`${returnDate}T${returnTime || '23:59'}`).getTime();

    if (newEnd <= newStart) {
      return { hasConflict: true, message: 'Tanggal & jam pengembalian harus setelah tanggal pengambilan.' };
    }

    const conflict = rentals.find(r => {
      if (r.id === excludeRentalId) return false;
      if (r.vehicle_id !== vehicleId) return false;
      if (r.status === 'CANCELLED' || r.status === 'COMPLETED') return false;

      const existingStart = new Date(`${r.pickup_date}T${r.pickup_time}`).getTime();
      const existingEnd = new Date(`${r.return_date}T${r.return_time}`).getTime();

      // Overlap formula: startA < endB && endA > startB
      return newStart < existingEnd && newEnd > existingStart;
    });

    if (conflict) {
      return {
        hasConflict: true,
        message: `Mobil sudah memiliki booking aktif/disewa pada periode tersebut (${conflict.rental_code}: ${conflict.pickup_date} s/d ${conflict.return_date}).`
      };
    }

    return { hasConflict: false };
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 font-sans antialiased">
      {/* Toast Notification Banner */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all transform animate-bounce ${
          toast.type === 'error' 
            ? 'bg-rose-50 border-rose-200 text-rose-800' 
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          {toast.type === 'error' ? <AlertTriangle className="w-5 h-5 text-rose-600" /> : <CheckCircle className="w-5 h-5 text-emerald-600" />}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
        user={user}
        onLogout={() => setIsLoggedIn(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-4 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                {activeTab === 'dashboard' && 'Dashboard Operasional'}
                {activeTab === 'vehicles' && 'Master Mobil'}
                {activeTab === 'customers' && 'Data Customer'}
                {activeTab === 'rentals' && 'Data Sewa & Booking'}
                {activeTab === 'history' && 'Riwayat Transaksi'}
                {activeTab === 'settings' && 'Pengaturan & Database Supabase'}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Sistem Operasional Rental Mobil • 1 Garage Terpusat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700">
              <Building className="w-3.5 h-3.5 text-blue-600" />
              <span>Garasi Utama (Pusat)</span>
            </div>

            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                AD
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold leading-tight">{user.name}</p>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">ADMIN</span>
              </div>
            </div>
          </div>
        </header>

        {/* View Switcher Container */}
        <main className="p-4 md:p-6 flex-1 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <DashboardView 
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              vehicles={vehicles}
              rentals={rentals}
              activities={activities}
              setActivities={setActivities}
              setRentals={setRentals}
              getCalculatedVehicleStatus={getCalculatedVehicleStatus}
              customers={customers}
              showToast={showToast}
            />
          )}

          {activeTab === 'vehicles' && (
            <VehiclesView 
              vehicles={vehicles} 
              setVehicles={setVehicles} 
              getCalculatedVehicleStatus={getCalculatedVehicleStatus}
              showToast={showToast}
            />
          )}

          {activeTab === 'customers' && (
            <CustomersView 
              customers={customers} 
              setCustomers={setCustomers} 
              rentals={rentals}
              showToast={showToast}
            />
          )}

          {activeTab === 'rentals' && (
            <RentalsView 
              rentals={rentals} 
              setRentals={setRentals}
              vehicles={vehicles}
              customers={customers}
              activities={activities}
              setActivities={setActivities}
              checkDoubleBooking={checkDoubleBooking}
              showToast={showToast}
            />
          )}

          {activeTab === 'history' && (
            <HistoryView 
              rentals={rentals}
              vehicles={vehicles}
              customers={customers}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView 
              vehicles={vehicles}
              customers={customers}
              rentals={rentals}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function Sidebar({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen, user, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Calendar },
    { id: 'vehicles', label: 'Master Mobil', icon: Car },
    { id: 'customers', label: 'Customer', icon: Users },
    { id: 'rentals', label: 'Data Sewa', icon: FileText },
    { id: 'history', label: 'Riwayat', icon: Clock },
    { id: 'settings', label: 'Pengaturan & Supabase', icon: Settings },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Body */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-slate-900 text-slate-300 flex flex-col justify-between
        transform transition-transform duration-200 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                R
              </div>
              <div>
                <h2 className="font-extrabold text-white tracking-wide text-sm uppercase">RentCar System</h2>
                <p className="text-[11px] text-slate-400">Internal Admin v1.0</p>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all
                    ${isActive 
                      ? 'bg-blue-600 text-white font-semibold shadow-sm' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/60 rounded-xl p-3 mb-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Garage Online
            </div>
            <p className="text-slate-400">1 Garage Aktif (Utama)</p>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 font-medium text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function DashboardView({ 
  selectedDate, 
  setSelectedDate, 
  vehicles, 
  rentals, 
  activities, 
  setActivities, 
  setRentals,
  getCalculatedVehicleStatus,
  customers,
  showToast 
}) {
  // Navigation for date filter
  const handlePrevDay = () => setSelectedDate(addDays(selectedDate, -1));
  const handleNextDay = () => setSelectedDate(addDays(selectedDate, 1));
  const handleToday = () => setSelectedDate(getFormattedToday());

  const activeVehiclesCount = vehicles.filter(v => v.general_status === 'ACTIVE').length;
  
  // Real-time status array on selectedDate
  const vehicleStatusesOnDate = useMemo(() => {
    return vehicles.map(v => ({
      id: v.id,
      status: getCalculatedVehicleStatus(v.id, selectedDate)
    }));
  }, [vehicles, rentals, selectedDate]);

  const readyCount = vehicleStatusesOnDate.filter(v => v.status === 'READY').length;
  const rentedCount = vehicleStatusesOnDate.filter(v => v.status === 'DISEWA').length;
  const bookingCount = vehicleStatusesOnDate.filter(v => v.status === 'BOOKING').length;
  const maintenanceCount = vehicles.filter(v => v.general_status === 'MAINTENANCE').length;

  // Operational Count filters for selectedDate
  const pickupsToday = rentals.filter(r => r.pickup_date === selectedDate && r.status !== 'CANCELLED');
  const returnsToday = rentals.filter(r => r.return_date === selectedDate && r.status !== 'CANCELLED');

  // Ready Vehicles List for Section A
  const readyVehiclesList = vehicles.filter(v => getCalculatedVehicleStatus(v.id, selectedDate) === 'READY');

  // Filter Pickup / Delivery Activities for Section B
  const pickupActivities = activities.filter(act => {
    const r = rentals.find(rent => rent.id === act.rental_id);
    if (!r || r.status === 'CANCELLED') return false;
    return r.pickup_date === selectedDate && (act.activity_type === 'CUSTOMER_PICKUP' || act.activity_type === 'DELIVERY');
  }).sort((a, b) => {
    const rentA = rentals.find(r => r.id === a.rental_id);
    const rentB = rentals.find(r => r.id === b.rental_id);
    return (rentA?.pickup_time || '').localeCompare(rentB?.pickup_time || '');
  });

  // Filter Return / Driver Pickup Activities for Section C
  const returnActivities = activities.filter(act => {
    const r = rentals.find(rent => rent.id === act.rental_id);
    if (!r || r.status === 'CANCELLED') return false;
    return r.return_date === selectedDate && (act.activity_type === 'CUSTOMER_RETURN' || act.activity_type === 'DRIVER_PICKUP');
  }).sort((a, b) => {
    const rentA = rentals.find(r => r.id === a.rental_id);
    const rentB = rentals.find(r => r.id === b.rental_id);
    return (rentA?.return_time || '').localeCompare(rentB?.return_time || '');
  });

  // Activity Status Handler
  const handleUpdateActivityStatus = (actId, newStatus) => {
    setActivities(prev => prev.map(a => {
      if (a.id === actId) {
        return { 
          ...a, 
          status: newStatus,
          actual_at: newStatus === 'DONE' ? `${selectedDate} ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}` : a.actual_at 
        };
      }
      return a;
    }));

    // Cascade rental status updates
    const targetAct = activities.find(a => a.id === actId);
    if (targetAct) {
      const parentRental = rentals.find(r => r.id === targetAct.rental_id);
      if (parentRental) {
        // If pickup activity completed -> change rental to ONGOING
        if ((targetAct.activity_type === 'CUSTOMER_PICKUP' || targetAct.activity_type === 'DELIVERY') && newStatus === 'DONE') {
          setRentals(prev => prev.map(r => r.id === parentRental.id ? { ...r, status: 'ONGOING' } : r));
          showToast(`Penyerahan mobil (${parentRental.rental_code}) Selesai. Status sewa: DISEWA (ONGOING)`);
        }
        // If return activity completed -> change rental to COMPLETED
        else if ((targetAct.activity_type === 'CUSTOMER_RETURN' || targetAct.activity_type === 'DRIVER_PICKUP') && newStatus === 'DONE') {
          setRentals(prev => prev.map(r => r.id === parentRental.id ? { ...r, status: 'COMPLETED' } : r));
          showToast(`Pengembalian mobil (${parentRental.rental_code}) Selesai. Transaksi COMPLETED & Mobil otomatis READY!`);
        } else {
          showToast(`Status operasional diperbarui ke: ${newStatus}`);
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Date Filter & Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tanggal Operasional</span>
            <p className="text-lg font-extrabold text-slate-900">{formatDateIndo(selectedDate)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={handlePrevDay}
            className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 transition-all"
            title="Hari Sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <input 
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-slate-200 px-3 py-1.5 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleNextDay}
            className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 transition-all"
            title="Hari Berikutnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleToday}
            className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-all flex items-center gap-1.5 ml-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Hari Ini
          </button>
        </div>
      </div>

      {/* Ringkasan Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
        <StatCard 
          title="Mobil Aktif"
          value={activeVehiclesCount}
          subtitle="Total armada siap guna"
          icon={Car}
          color="blue"
        />
        <StatCard 
          title="Mobil Ready"
          value={readyCount}
          subtitle={`Tersedia pada ${selectedDate}`}
          icon={CheckCircle}
          color="emerald"
        />
        <StatCard 
          title="Sedang Disewa"
          value={rentedCount}
          subtitle="Mobil di tangan customer"
          icon={TrendingUp}
          color="amber"
        />
        <StatCard 
          title="Booking Hari Ini"
          value={pickupsToday.length}
          subtitle="Terjadwal diambil/diantar"
          icon={Clock}
          color="purple"
        />
        <StatCard 
          title="Pengambilan"
          value={pickupsToday.length}
          subtitle="Pengambilan / Pengantaran"
          icon={Navigation}
          color="indigo"
        />
        <StatCard 
          title="Pengembalian"
          value={returnsToday.length}
          subtitle="Pengembalian / Penjemputan"
          icon={MapPin}
          color="rose"
        />
        <StatCard 
          title="Maintenance"
          value={maintenanceCount}
          subtitle="Sedang servis/perbaikan"
          icon={AlertTriangle}
          color="red"
        />
        <StatCard 
          title="Operasional Total"
          value={pickupsToday.length + returnsToday.length}
          subtitle="Total tugas hari ini"
          icon={Settings}
          color="slate"
        />
      </div>

      {/* SECTION A: MOBIL READY HARI INI */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 md:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50/50 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              A
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">MOBIL READY HARI INI</h3>
              <p className="text-xs text-slate-500">Mobil yang secara otomatis tersedia berdasarkan perhitungan sewa & status master.</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full">
            {readyVehiclesList.length} Unit Ready
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5 pl-5">ID Mobil</th>
                <th className="p-3.5">No. Polisi</th>
                <th className="p-3.5">Merk & Tipe</th>
                <th className="p-3.5">Tahun / Warna</th>
                <th className="p-3.5">Status Otomatis</th>
                <th className="p-3.5">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {readyVehiclesList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">
                    Tidak ada mobil yang ready pada tanggal ini.
                  </td>
                </tr>
              ) : (
                readyVehiclesList.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-5 font-mono text-xs font-semibold text-slate-500">{v.vehicle_code}</td>
                    <td className="p-3.5 font-extrabold text-slate-900">{v.plate_number}</td>
                    <td className="p-3.5 font-medium">{v.brand} {v.model}</td>
                    <td className="p-3.5 text-xs text-slate-500">{v.year} • {v.color}</td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        READY
                      </span>
                    </td>
                    <td className="p-3.5 text-xs text-slate-500">{v.notes || 'Siap jalan, tidak ada booking.'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION B: PENGAMBILAN / PENGANTARAN HARI INI */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 md:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              B
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">PENGAMBILAN / PENGANTARAN HARI INI</h3>
              <p className="text-xs text-slate-500">Jadwal customer mengambil unit atau pengantaran mobil oleh driver.</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-extrabold rounded-full">
            {pickupActivities.length} Transaksi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5 pl-5">Jam</th>
                <th className="p-3.5">Mobil & No. Polisi</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Aktivitas</th>
                <th className="p-3.5">Alamat Tujuan</th>
                <th className="p-3.5">PIC Driver</th>
                <th className="p-3.5 text-center">Status Operasional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {pickupActivities.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400">
                    Tidak ada jadwal pengambilan atau pengantaran pada tanggal ini.
                  </td>
                </tr>
              ) : (
                pickupActivities.map((act) => {
                  const rental = rentals.find(r => r.id === act.rental_id);
                  const vehicle = vehicles.find(v => v.id === rental?.vehicle_id);
                  const cust = customers.find(c => c.id === rental?.customer_id);

                  return (
                    <tr key={act.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 pl-5 font-bold text-blue-600">
                        {rental?.pickup_time || '-'}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{vehicle?.brand} {vehicle?.model}</div>
                        <span className="text-xs font-mono font-semibold text-slate-500">{vehicle?.plate_number}</span>
                      </td>
                      <td className="p-3.5">
                        <div className="font-medium text-slate-800">{cust?.name || 'Customer'}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {cust?.phone}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                          act.activity_type === 'DELIVERY' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {act.activity_type === 'DELIVERY' ? 'Diantar ke Customer' : 'Diambil Customer'}
                        </span>
                      </td>
                      <td className="p-3.5 text-xs text-slate-600 max-w-xs truncate" title={act.address}>
                        {act.address}
                      </td>
                      <td className="p-3.5 text-xs font-medium text-slate-700">{act.pic}</td>
                      <td className="p-3.5 text-center">
                        <ActivityStatusSelector 
                          currentStatus={act.status}
                          onSelect={(newStat) => handleUpdateActivityStatus(act.id, newStat)}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION C: PENGEMBALIAN / PENJEMPUTAN HARI INI */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 md:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-rose-50/50 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              C
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">PENGEMBALIAN / PENJEMPUTAN HARI INI</h3>
              <p className="text-xs text-slate-500">Jadwal customer mengembalikan unit atau penjemputan mobil oleh driver.</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-rose-100 text-rose-800 text-xs font-extrabold rounded-full">
            {returnActivities.length} Transaksi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5 pl-5">Jam</th>
                <th className="p-3.5">Mobil & No. Polisi</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Aktivitas</th>
                <th className="p-3.5">Alamat Penjemputan</th>
                <th className="p-3.5">PIC Driver</th>
                <th className="p-3.5 text-center">Status Operasional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {returnActivities.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400">
                    Tidak ada jadwal pengembalian atau penjemputan pada tanggal ini.
                  </td>
                </tr>
              ) : (
                returnActivities.map((act) => {
                  const rental = rentals.find(r => r.id === act.rental_id);
                  const vehicle = vehicles.find(v => v.id === rental?.vehicle_id);
                  const cust = customers.find(c => c.id === rental?.customer_id);

                  return (
                    <tr key={act.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 pl-5 font-bold text-rose-600">
                        {rental?.return_time || '-'}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{vehicle?.brand} {vehicle?.model}</div>
                        <span className="text-xs font-mono font-semibold text-slate-500">{vehicle?.plate_number}</span>
                      </td>
                      <td className="p-3.5">
                        <div className="font-medium text-slate-800">{cust?.name || 'Customer'}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {cust?.phone}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                          act.activity_type === 'DRIVER_PICKUP' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {act.activity_type === 'DRIVER_PICKUP' ? 'Dijemput Driver' : 'Dikembalikan Customer'}
                        </span>
                      </td>
                      <td className="p-3.5 text-xs text-slate-600 max-w-xs truncate" title={act.address}>
                        {act.address}
                      </td>
                      <td className="p-3.5 text-xs font-medium text-slate-700">{act.pic}</td>
                      <td className="p-3.5 text-center">
                        <ActivityStatusSelector 
                          currentStatus={act.status}
                          onSelect={(newStat) => handleUpdateActivityStatus(act.id, newStat)}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* Helper Stat Card Component */
function StatCard({ title, value, subtitle, icon: Icon, color }) {
  const colorStyles = {
    blue: 'bg-blue-50 border-blue-100 text-blue-600',
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600',
    amber: 'bg-amber-50 border-amber-100 text-amber-600',
    purple: 'bg-purple-50 border-purple-100 text-purple-600',
    indigo: 'bg-indigo-50 border-indigo-100 text-indigo-600',
    rose: 'bg-rose-50 border-rose-100 text-rose-600',
    red: 'bg-red-50 border-red-100 text-red-600',
    slate: 'bg-slate-100 border-slate-200 text-slate-600',
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500">{title}</span>
        <div className={`p-2 rounded-xl border ${colorStyles[color] || colorStyles.slate}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div>
        <div className="text-2xl font-black text-slate-900">{value}</div>
        <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

/* Operational Status Selector Dropdown Component */
function ActivityStatusSelector({ currentStatus, onSelect }) {
  const statuses = [
    { id: 'PENDING', label: 'Belum', bg: 'bg-slate-100 text-slate-700' },
    { id: 'IN_PROGRESS', label: 'Diproses', bg: 'bg-blue-100 text-blue-800' },
    { id: 'OTW', label: 'OTW', bg: 'bg-amber-100 text-amber-800' },
    { id: 'DONE', label: 'Selesai', bg: 'bg-emerald-100 text-emerald-800' },
    { id: 'CANCELLED', label: 'Batal', bg: 'bg-rose-100 text-rose-800' },
  ];

  return (
    <select
      value={currentStatus}
      onChange={(e) => onSelect(e.target.value)}
      className="text-xs font-bold rounded-lg px-2.5 py-1.5 border border-slate-200 bg-white shadow-xs focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
    >
      {statuses.map(s => (
        <option key={s.id} value={s.id}>
          {s.label}
        </option>
      ))}
    </select>
  );
}

function VehiclesView({ vehicles, setVehicles, getCalculatedVehicleStatus, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    plate_number: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    general_status: 'ACTIVE',
    notes: ''
  });

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.plate_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'ALL') return matchesSearch;
    return matchesSearch && v.general_status === filterStatus;
  });

  const handleOpenAddModal = () => {
    setEditingVehicle(null);
    setFormData({
      plate_number: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      color: '',
      general_status: 'ACTIVE',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      plate_number: vehicle.plate_number,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      color: vehicle.color,
      general_status: vehicle.general_status,
      notes: vehicle.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.plate_number || !formData.brand || !formData.model) {
      showToast('Mohon lengkapi No. Polisi, Merk, dan Tipe!', 'error');
      return;
    }

    // Check duplicate plate
    const isDuplicate = vehicles.some(v => 
      v.plate_number.toLowerCase() === formData.plate_number.toLowerCase() && v.id !== editingVehicle?.id
    );

    if (isDuplicate) {
      showToast('Nomor polisi sudah terdaftar!', 'error');
      return;
    }

    if (editingVehicle) {
      setVehicles(prev => prev.map(v => v.id === editingVehicle.id ? { ...v, ...formData } : v));
      showToast('Data mobil berhasil diperbarui.');
    } else {
      const newCode = `MOB-${String(vehicles.length + 1).padStart(3, '0')}`;
      const newVehicle = {
        id: `v-${Date.now()}`,
        vehicle_code: newCode,
        ...formData
      };
      setVehicles(prev => [newVehicle, ...prev]);
      showToast('Mobil baru berhasil ditambahkan.');
    }

    setIsModalOpen(false);
  };

  const handleSoftDelete = (vehicleId) => {
    if (window.confirm('Apakah Anda yakin ingin menonaktifkan mobil ini? (Soft Delete)')) {
      setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, general_status: 'INACTIVE' } : v));
      showToast('Status mobil diubah menjadi NONAKTIF.');
    }
  };

  return (
    <div className="space-y-5">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Cari No. Polisi / Merk / Tipe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto border border-slate-200 px-3 py-2 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Semua Status Master</option>
              <option value="ACTIVE">Aktif</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="INACTIVE">Nonaktif</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Mobil</span>
        </button>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5 pl-5">Kode Mobil</th>
                <th className="p-3.5">No. Polisi</th>
                <th className="p-3.5">Merk / Tipe</th>
                <th className="p-3.5">Tahun / Warna</th>
                <th className="p-3.5">Status Master</th>
                <th className="p-3.5">Status Sewa Real-Time</th>
                <th className="p-3.5">Catatan</th>
                <th className="p-3.5 text-right pr-5">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-slate-400">
                    Tidak ada data mobil ditemukan.
                  </td>
                </tr>
              ) : (
                filteredVehicles.map((v) => {
                  const calculatedStatus = getCalculatedVehicleStatus(v.id);

                  return (
                    <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 pl-5 font-mono text-xs font-semibold text-slate-500">{v.vehicle_code}</td>
                      <td className="p-3.5 font-extrabold text-slate-900">{v.plate_number}</td>
                      <td className="p-3.5 font-semibold text-slate-800">{v.brand} {v.model}</td>
                      <td className="p-3.5 text-xs text-slate-500">{v.year} • {v.color}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          v.general_status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' :
                          v.general_status === 'MAINTENANCE' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {v.general_status === 'ACTIVE' ? 'AKTIF' : v.general_status === 'MAINTENANCE' ? 'MAINTENANCE' : 'NONAKTIF'}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                          calculatedStatus === 'READY' ? 'bg-emerald-100 text-emerald-800' :
                          calculatedStatus === 'DISEWA' ? 'bg-purple-100 text-purple-800' :
                          calculatedStatus === 'BOOKING' ? 'bg-indigo-100 text-indigo-800' :
                          calculatedStatus === 'MAINTENANCE' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {calculatedStatus}
                        </span>
                      </td>
                      <td className="p-3.5 text-xs text-slate-500 max-w-xs truncate">{v.notes || '-'}</td>
                      <td className="p-3.5 text-right pr-5">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEditModal(v)}
                            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit Mobil"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleSoftDelete(v.id)}
                            className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                            title="Nonaktifkan Mobil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Vehicle */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingVehicle ? 'Edit Data Mobil' : 'Tambah Mobil Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">No. Polisi *</label>
                  <input 
                    type="text"
                    placeholder="Contoh: B 1234 ABC"
                    value={formData.plate_number}
                    onChange={(e) => setFormData({ ...formData, plate_number: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Status Master *</label>
                  <select
                    value={formData.general_status}
                    onChange={(e) => setFormData({ ...formData, general_status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ACTIVE">Aktif</option>
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="INACTIVE">Nonaktif</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Merk Mobil *</label>
                  <input 
                    type="text"
                    placeholder="Contoh: Toyota"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tipe Mobil *</label>
                  <input 
                    type="text"
                    placeholder="Contoh: Avanza Reborn"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tahun Kendaraan</label>
                  <input 
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value, 10) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Warna</label>
                  <input 
                    type="text"
                    placeholder="Contoh: Hitam"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan Tambahan</label>
                <textarea 
                  rows="2"
                  placeholder="Kondisi fisik, kelengkapan, dll..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl text-[11px] text-amber-800 border border-amber-200">
                ⚠️ Status ketersediaan sewa (Ready/Disewa/Booking) akan dihitung secara otomatis oleh sistem berdasarkan transaksi aktif.
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700"
                >
                  Simpan Mobil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CustomersView({ customers, setCustomers, rentals, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const handleOpenAdd = () => {
    setEditingCustomer(null);
    setFormData({ name: '', phone: '', address: '', notes: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      notes: customer.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Nama dan No. HP wajib diisi!', 'error');
      return;
    }

    if (editingCustomer) {
      setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? { ...c, ...formData } : c));
      showToast('Data customer berhasil diperbarui.');
    } else {
      const newCust = {
        id: `c-${Date.now()}`,
        ...formData
      };
      setCustomers(prev => [newCust, ...prev]);
      showToast('Customer baru berhasil ditambahkan.');
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Cari Nama / No. HP Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Customer</span>
        </button>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
            Tidak ada customer ditemukan.
          </div>
        ) : (
          filteredCustomers.map((c) => {
            const customerRentalsCount = rentals.filter(r => r.customer_id === c.id).length;

            return (
              <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{c.name}</h4>
                      <div className="text-xs text-blue-600 font-semibold flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{c.phone}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">
                      {customerRentalsCount} Transaksi
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 mt-3 space-y-1">
                    <p className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{c.address || 'Alamat belum diisi'}</span>
                    </p>
                    {c.notes && (
                      <p className="p-2 bg-slate-50 rounded-lg text-slate-600 italic text-[11px] mt-2">
                        "{c.notes}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEdit(c)}
                    className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit Data
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Form Customer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingCustomer ? 'Edit Data Customer' : 'Tambah Customer Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap *</label>
                <input 
                  type="text"
                  placeholder="Nama Customer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">No. HP / WhatsApp *</label>
                <input 
                  type="text"
                  placeholder="0812xxxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Domisili</label>
                <textarea 
                  rows="2"
                  placeholder="Alamat lengkap..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan</label>
                <input 
                  type="text"
                  placeholder="Catatan kebiasaan / status verifikasi"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700"
                >
                  Simpan Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function RentalsView({ 
  rentals, 
  setRentals, 
  vehicles, 
  customers, 
  activities, 
  setActivities, 
  checkDoubleBooking, 
  showToast 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for Booking Baru
  const [formData, setFormData] = useState({
    customer_id: '',
    vehicle_id: '',
    pickup_date: getFormattedToday(),
    pickup_time: '09:00',
    return_date: addDays(getFormattedToday(), 1),
    return_time: '09:00',
    pickup_method: 'CUSTOMER_PICKUP',
    return_method: 'CUSTOMER_RETURN',
    operational_address: '',
    pic: 'Admin Garage',
    notes: ''
  });

  const activeRentals = rentals.filter(r => r.status !== 'COMPLETED' && r.status !== 'CANCELLED');

  const filteredRentals = rentals.filter(r => {
    const cust = customers.find(c => c.id === r.customer_id);
    const veh = vehicles.find(v => v.id === r.vehicle_id);

    const matchesSearch = 
      r.rental_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      veh?.plate_number.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === 'ALL') return matchesSearch;
    return matchesSearch && r.status === statusFilter;
  });

  const handleOpenAdd = () => {
    setFormData({
      customer_id: customers[0]?.id || '',
      vehicle_id: vehicles.find(v => v.general_status === 'ACTIVE')?.id || '',
      pickup_date: getFormattedToday(),
      pickup_time: '09:00',
      return_date: addDays(getFormattedToday(), 1),
      return_time: '09:00',
      pickup_method: 'CUSTOMER_PICKUP',
      return_method: 'CUSTOMER_RETURN',
      operational_address: '',
      pic: 'Admin Garage',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.customer_id || !formData.vehicle_id) {
      showToast('Pilih customer dan mobil terlebih dahulu!', 'error');
      return;
    }

    // Mandatory address validation if DELIVERY or DRIVER_PICKUP is chosen
    if (formData.pickup_method === 'DELIVERY' || formData.return_method === 'DRIVER_PICKUP') {
      if (!formData.operational_address.trim()) {
        showToast('Alamat wajib diisi jika memilih Delivery / Driver Pickup!', 'error');
        return;
      }
    }

    // CHECK DOUBLE BOOKING OVERLAP
    const validation = checkDoubleBooking(
      formData.vehicle_id,
      formData.pickup_date,
      formData.pickup_time,
      formData.return_date,
      formData.return_time
    );

    if (validation.hasConflict) {
      showToast(validation.message, 'error');
      return;
    }

    const newRentalId = `r-${Date.now()}`;
    const newRentalCode = `RENT-${new Date().getFullYear()}-${String(rentals.length + 1).padStart(3, '0')}`;

    const newRental = {
      id: newRentalId,
      rental_code: newRentalCode,
      ...formData,
      status: 'BOOKING'
    };

    // Auto generate 2 rental activities
    const pickupActivity = {
      id: `act-p-${newRentalId}`,
      rental_id: newRentalId,
      activity_type: formData.pickup_method,
      scheduled_at: `${formData.pickup_date} ${formData.pickup_time}`,
      actual_at: null,
      pic: formData.pic || 'Admin Garage',
      status: 'PENDING',
      address: formData.pickup_method === 'DELIVERY' ? formData.operational_address : 'Garage Utama',
      notes: 'Jadwal penyerahan unit.'
    };

    const returnActivity = {
      id: `act-r-${newRentalId}`,
      rental_id: newRentalId,
      activity_type: formData.return_method,
      scheduled_at: `${formData.return_date} ${formData.return_time}`,
      actual_at: null,
      pic: formData.pic || 'Admin Garage',
      status: 'PENDING',
      address: formData.return_method === 'DRIVER_PICKUP' ? formData.operational_address : 'Garage Utama',
      notes: 'Jadwal pengembalian unit.'
    };

    setRentals(prev => [newRental, ...prev]);
    setActivities(prev => [...prev, pickupActivity, returnActivity]);

    showToast(`Booking ${newRentalCode} berhasil disimpan. Tervalidasi bebas overlap!`);
    setIsModalOpen(false);
  };

  const handleCancelRental = (rentalId) => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan booking sewa ini?')) {
      setRentals(prev => prev.map(r => r.id === rentalId ? { ...r, status: 'CANCELLED' } : r));
      setActivities(prev => prev.map(a => a.rental_id === rentalId ? { ...a, status: 'CANCELLED' } : a));
      showToast('Transaksi booking telah dibatalkan.');
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Cari Kode Sewa / Customer / Plat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto border border-slate-200 px-3 py-2 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">Semua Status Transaksi</option>
            <option value="BOOKING">BOOKING</option>
            <option value="ONGOING">ONGOING (DISEWA)</option>
            <option value="RETURN_TODAY">RETURN TODAY</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Booking Baru</span>
        </button>
      </div>

      {/* Rentals Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5 pl-5">Kode Sewa</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Mobil</th>
                <th className="p-3.5">Jadwal Ambil</th>
                <th className="p-3.5">Jadwal Kembali</th>
                <th className="p-3.5">Metode</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right pr-5">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRentals.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-slate-400">
                    Tidak ada transaksi sewa ditemukan.
                  </td>
                </tr>
              ) : (
                filteredRentals.map((r) => {
                  const cust = customers.find(c => c.id === r.customer_id);
                  const veh = vehicles.find(v => v.id === r.vehicle_id);

                  return (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 pl-5 font-mono text-xs font-bold text-blue-600">{r.rental_code}</td>
                      <td className="p-3.5 font-medium text-slate-900">{cust?.name || 'Customer'}</td>
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-800">{veh?.brand} {veh?.model}</div>
                        <div className="text-xs font-mono text-slate-500">{veh?.plate_number}</div>
                      </td>
                      <td className="p-3.5 text-xs">
                        <div className="font-semibold text-slate-800">{formatDateIndo(r.pickup_date)}</div>
                        <span className="text-slate-500">{r.pickup_time} WIB</span>
                      </td>
                      <td className="p-3.5 text-xs">
                        <div className="font-semibold text-slate-800">{formatDateIndo(r.return_date)}</div>
                        <span className="text-slate-500">{r.return_time} WIB</span>
                      </td>
                      <td className="p-3.5 text-xs">
                        <span className="block font-medium text-slate-700">{r.pickup_method}</span>
                        <span className="text-slate-400">→ {r.return_method}</span>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                          r.status === 'BOOKING' ? 'bg-indigo-100 text-indigo-800' :
                          r.status === 'ONGOING' ? 'bg-purple-100 text-purple-800' :
                          r.status === 'RETURN_TODAY' ? 'bg-rose-100 text-rose-800' :
                          r.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right pr-5">
                        {r.status !== 'COMPLETED' && r.status !== 'CANCELLED' && (
                          <button
                            onClick={() => handleCancelRental(r.id)}
                            className="px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          >
                            Batalkan
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Booking / Sewa Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Buat Transaksi Booking Baru</h3>
                <p className="text-xs text-slate-500">Sistem otomatis memvalidasi double-booking kendaraan.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Customer *</label>
                  <select
                    value={formData.customer_id}
                    onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Kendaraan *</label>
                  <select
                    value={formData.vehicle_id}
                    onChange={(e) => setFormData({ ...formData, vehicle_id: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {vehicles.filter(v => v.general_status === 'ACTIVE').map(v => (
                      <option key={v.id} value={v.id}>{v.plate_number} - {v.brand} {v.model}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tanggal & Jam Pengambilan */}
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
                <span className="text-xs font-bold text-blue-900 block">Jadwal Pengambilan</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tanggal Ambil</label>
                    <input 
                      type="date"
                      value={formData.pickup_date}
                      onChange={(e) => setFormData({ ...formData, pickup_date: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Jam Ambil</label>
                    <input 
                      type="time"
                      value={formData.pickup_time}
                      onChange={(e) => setFormData({ ...formData, pickup_time: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Metode Pengambilan</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input 
                        type="radio"
                        name="pickup_method"
                        value="CUSTOMER_PICKUP"
                        checked={formData.pickup_method === 'CUSTOMER_PICKUP'}
                        onChange={(e) => setFormData({ ...formData, pickup_method: e.target.value })}
                      />
                      Customer Datang ke Garage
                    </label>
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input 
                        type="radio"
                        name="pickup_method"
                        value="DELIVERY"
                        checked={formData.pickup_method === 'DELIVERY'}
                        onChange={(e) => setFormData({ ...formData, pickup_method: e.target.value })}
                      />
                      Diantar ke Customer (Delivery)
                    </label>
                  </div>
                </div>
              </div>

              {/* Tanggal & Jam Pengembalian */}
              <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 space-y-3">
                <span className="text-xs font-bold text-rose-900 block">Jadwal Pengembalian</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tanggal Kembali</label>
                    <input 
                      type="date"
                      value={formData.return_date}
                      onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Jam Kembali</label>
                    <input 
                      type="time"
                      value={formData.return_time}
                      onChange={(e) => setFormData({ ...formData, return_time: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Metode Pengembalian</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input 
                        type="radio"
                        name="return_method"
                        value="CUSTOMER_RETURN"
                        checked={formData.return_method === 'CUSTOMER_RETURN'}
                        onChange={(e) => setFormData({ ...formData, return_method: e.target.value })}
                      />
                      Customer Kembalikan ke Garage
                    </label>
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input 
                        type="radio"
                        name="return_method"
                        value="DRIVER_PICKUP"
                        checked={formData.return_method === 'DRIVER_PICKUP'}
                        onChange={(e) => setFormData({ ...formData, return_method: e.target.value })}
                      />
                      Dijemput Driver Rental
                    </label>
                  </div>
                </div>
              </div>

              {/* Alamat Operasional jika Delivery/Driver Pickup */}
              {(formData.pickup_method === 'DELIVERY' || formData.return_method === 'DRIVER_PICKUP') && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Antar / Jemput *</label>
                  <textarea 
                    rows="2"
                    placeholder="Alamat lengkap lokasi pengantaran / penjemputan..."
                    value={formData.operational_address}
                    onChange={(e) => setFormData({ ...formData, operational_address: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">PIC Driver / Admin</label>
                  <input 
                    type="text"
                    placeholder="Nama PIC"
                    value={formData.pic}
                    onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan Sewa</label>
                  <input 
                    type="text"
                    placeholder="Instruksi tambahan..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700"
                >
                  Simpan Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function HistoryView({ rentals, vehicles, customers }) {
  const [searchTerm, setSearchTerm] = useState('');

  const completedRentals = rentals.filter(r => r.status === 'COMPLETED' || r.status === 'CANCELLED');

  const filteredHistory = completedRentals.filter(r => {
    const cust = customers.find(c => c.id === r.customer_id);
    const veh = vehicles.find(v => v.id === r.vehicle_id);

    return (
      r.rental_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      veh?.plate_number.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Cari Riwayat Sewa / Customer / Plat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-xs font-semibold text-slate-500">
          Total {filteredHistory.length} Transaksi Selesai/Batal
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5 pl-5">Kode Sewa</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Mobil & No. Polisi</th>
                <th className="p-3.5">Periode Sewa</th>
                <th className="p-3.5">Metode Pengambilan</th>
                <th className="p-3.5">Metode Pengembalian</th>
                <th className="p-3.5 text-right pr-5">Status Akhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400">
                    Belum ada riwayat transaksi selesai atau dibatalkan.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((r) => {
                  const cust = customers.find(c => c.id === r.customer_id);
                  const veh = vehicles.find(v => v.id === r.vehicle_id);

                  return (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 pl-5 font-mono text-xs font-bold text-slate-600">{r.rental_code}</td>
                      <td className="p-3.5 font-medium text-slate-900">{cust?.name || 'Customer'}</td>
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-800">{veh?.brand} {veh?.model}</div>
                        <span className="text-xs font-mono text-slate-500">{veh?.plate_number}</span>
                      </td>
                      <td className="p-3.5 text-xs">
                        {formatDateIndo(r.pickup_date)} s/d {formatDateIndo(r.return_date)}
                      </td>
                      <td className="p-3.5 text-xs text-slate-600">{r.pickup_method}</td>
                      <td className="p-3.5 text-xs text-slate-600">{r.return_method}</td>
                      <td className="p-3.5 text-right pr-5">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                          r.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {r.status === 'COMPLETED' ? 'SELESAI' : 'DIBATALKAN'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SettingsView({ vehicles, customers, rentals }) {
  const [copied, setCopied] = useState(false);

  const supabaseSQLMigration = `-- ================================================
-- SUPABASE POSTGRESQL SCHEMA FOR RENTAL CAR SYSTEM
-- ================================================

-- 1. VEHICLES TABLE
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_code VARCHAR(50) UNIQUE NOT NULL,
  plate_number VARCHAR(20) UNIQUE NOT NULL,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  color VARCHAR(50),
  general_status VARCHAR(20) DEFAULT 'ACTIVE', -- 'ACTIVE', 'MAINTENANCE', 'INACTIVE'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RENTALS TABLE
CREATE TABLE IF NOT EXISTS public.rentals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rental_code VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE RESTRICT,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE RESTRICT,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  return_date DATE NOT NULL,
  return_time TIME NOT NULL,
  pickup_method VARCHAR(30) NOT NULL, -- 'CUSTOMER_PICKUP', 'DELIVERY'
  return_method VARCHAR(30) NOT NULL, -- 'CUSTOMER_RETURN', 'DRIVER_PICKUP'
  operational_address TEXT,
  status VARCHAR(20) DEFAULT 'BOOKING', -- 'BOOKING', 'ONGOING', 'RETURN_TODAY', 'COMPLETED', 'CANCELLED'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RENTAL ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS public.rental_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rental_id UUID REFERENCES public.rentals(id) ON DELETE CASCADE,
  activity_type VARCHAR(30) NOT NULL, -- 'CUSTOMER_PICKUP', 'DELIVERY', 'CUSTOMER_RETURN', 'DRIVER_PICKUP'
  scheduled_at TIMESTAMPTZ NOT NULL,
  actual_at TIMESTAMPTZ,
  pic VARCHAR(100),
  status VARCHAR(20) DEFAULT 'PENDING', -- 'PENDING', 'IN_PROGRESS', 'OTW', 'DONE', 'CANCELLED'
  address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Security Policies
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated admin access" ON public.vehicles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated admin access" ON public.customers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated admin access" ON public.rentals FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated admin access" ON public.rental_activities FOR ALL USING (auth.role() = 'authenticated');
`;

  const handleCopySQL = () => {
    navigator.clipboard.writeText(supabaseSQLMigration);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Supabase Status Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Panduan Supabase PostgreSQL & Deployment</h3>
            <p className="text-xs text-slate-500">Struktur database resmi siap di-migrate ke Supabase Cloud.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <span className="font-bold text-slate-900 block text-sm">🔑 Environment Variables (.env.local)</span>
            <p className="text-slate-600">Simpan kredensial Supabase Anda di file local environment:</p>
            <pre className="p-2.5 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px] overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here`}
            </pre>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <span className="font-bold text-slate-900 block text-sm">🚀 Deployment Workflow GitHub & Vercel</span>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              <li>1. Push kode repository ke GitHub.</li>
              <li>2. Connect repository ke Vercel Dashboard.</li>
              <li>3. Tambahkan Environment Variables di setting Vercel.</li>
              <li>4. Sistem otomatis deploy secara gratis & cepat.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SQL Migration Script Viewer */}
      <div className="bg-slate-900 rounded-2xl p-5 text-slate-200 shadow-lg space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono text-emerald-400 font-bold">supabase/migrations/01_schema.sql</span>
          </div>
          <button
            onClick={handleCopySQL}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tercopy!' : 'Copy SQL Migration'}</span>
          </button>
        </div>

        <pre className="text-xs font-mono text-slate-300 overflow-x-auto p-3 bg-slate-950 rounded-xl max-h-96 leading-relaxed">
          {supabaseSQLMigration}
        </pre>
      </div>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('admin@rental.com');
  const [password, setPassword] = useState('admin123');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-3xl mx-auto shadow-lg">
            R
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Login Admin Rental</h2>
          <p className="text-xs text-slate-500">Sistem Operasional Rental Mobil (Internal Admin)</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Admin</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Masuk ke Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 text-center border border-slate-100">
          💡 Gunakan kredensial demo default di atas untuk langsung masuk.
        </div>
      </div>
    </div>
  );
}