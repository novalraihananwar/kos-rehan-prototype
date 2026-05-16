// SmartKos Management System — Dummy Data Realistis
// Data untuk demo dan pengembangan

const SK = {
  // Info Kos
  property: {
    name: "Kos Harmoni Residence",
    address: "Jl. Cempaka Putih Timur No. 45, Jakarta Pusat 10510",
    phone: "0812-3456-7890",
    email: "admin@harmoniresidence.co.id",
    owner: "Hendra Kusuma",
    totalRooms: 40,
    activeSince: "2020-03-10",
    logo: null
  },

  // Statistik Bulan Ini (Oktober 2025)
  stats: {
    incomeThisMonth:  32500000,
    incomeLastMonth:  31200000,
    occupiedRooms:    28,
    emptyRooms:       7,
    bookingRooms:     3,
    latePayment:      2,
    totalRooms:       40,
    activeInvoices:   30,
    activeTenants:    28,
    newTenants:       3,
    complaintsOpen:   4,
    complaintsTotal:  11,
    occupancyRate:    70
  },

  // Pemasukan Bulanan 2025
  monthlyIncome: [
    { month: 'Jan', income: 28500000, target: 30000000 },
    { month: 'Feb', income: 29200000, target: 30000000 },
    { month: 'Mar', income: 30100000, target: 31000000 },
    { month: 'Apr', income: 28800000, target: 31000000 },
    { month: 'Mei', income: 31500000, target: 32000000 },
    { month: 'Jun', income: 29900000, target: 32000000 },
    { month: 'Jul', income: 32100000, target: 32000000 },
    { month: 'Agu', income: 31800000, target: 32000000 },
    { month: 'Sep', income: 33200000, target: 33000000 },
    { month: 'Okt', income: 32500000, target: 33000000 },
    { month: 'Nov', income: 0,        target: 33000000 },
    { month: 'Des', income: 0,        target: 33000000 }
  ],

  // Data Penghuni (28 aktif)
  tenants: [
    { id: 'T001', name: 'Budi Santoso',        room: 'K-101', phone: '0812-1111-0001', email: 'budi.s@gmail.com',      gender: 'L', checkIn: '2024-01-15', duration: 12, price: 750000,  payStatus: 'lunas',   dueDate: '2025-11-15', job: 'Karyawan Swasta',  emergency: '0812-9999-0001' },
    { id: 'T002', name: 'Dewi Rahayu',         room: 'K-102', phone: '0813-2222-0002', email: 'dewi.r@gmail.com',      gender: 'P', checkIn: '2024-02-01', duration: 12, price: 750000,  payStatus: 'lunas',   dueDate: '2025-11-01', job: 'Guru SD',           emergency: '0813-8888-0002' },
    { id: 'T003', name: 'Ahmad Fauzi',          room: 'K-103', phone: '0811-3333-0003', email: 'ahmad.f@gmail.com',     gender: 'L', checkIn: '2024-03-10', duration: 6,  price: 750000,  payStatus: 'pending', dueDate: '2025-11-10', job: 'Mahasiswa',         emergency: '0811-7777-0003' },
    { id: 'T004', name: 'Sari Indah',           room: 'K-104', phone: '0814-4444-0004', email: 'sari.i@yahoo.com',      gender: 'P', checkIn: '2024-03-20', duration: 12, price: 750000,  payStatus: 'lunas',   dueDate: '2025-11-20', job: 'Perawat RS',        emergency: '0814-6666-0004' },
    { id: 'T005', name: 'Rizki Pratama',        room: 'K-105', phone: '0815-5555-0005', email: 'rizki.p@gmail.com',     gender: 'L', checkIn: '2024-04-05', duration: 12, price: 750000,  payStatus: 'lunas',   dueDate: '2025-11-05', job: 'Programmer',        emergency: '0815-5555-0555' },
    { id: 'T006', name: 'Nur Fitria',           room: 'K-106', phone: '0816-6666-0006', email: 'nur.f@gmail.com',       gender: 'P', checkIn: '2024-04-15', duration: 6,  price: 750000,  payStatus: 'lunas',   dueDate: '2025-11-15', job: 'Apoteker',          emergency: '0816-4444-0006' },
    { id: 'T007', name: 'Wahyu Hidayat',        room: 'K-107', phone: '0817-7777-0007', email: 'wahyu.h@gmail.com',     gender: 'L', checkIn: '2024-05-01', duration: 12, price: 750000,  payStatus: 'terlambat', dueDate: '2025-10-01', job: 'Teknisi',         emergency: '0817-3333-0007' },
    { id: 'T008', name: 'Rina Wulandari',       room: 'K-108', phone: '0818-8888-0008', email: 'rina.w@hotmail.com',    gender: 'P', checkIn: '2024-05-15', duration: 12, price: 750000,  payStatus: 'lunas',   dueDate: '2025-11-15', job: 'Akuntan',           emergency: '0818-2222-0008' },
    { id: 'T009', name: 'Doni Saputra',         room: 'K-109', phone: '0819-9999-0009', email: 'doni.s@gmail.com',      gender: 'L', checkIn: '2024-06-01', duration: 12, price: 750000,  payStatus: 'lunas',   dueDate: '2025-11-01', job: 'Driver Ojol',       emergency: '0819-1111-0009' },
    { id: 'T010', name: 'Maya Sari',            room: 'K-110', phone: '0812-0000-0010', email: 'maya.s@gmail.com',      gender: 'P', checkIn: '2024-06-20', duration: 6,  price: 750000,  payStatus: 'pending', dueDate: '2025-11-20', job: 'Mahasiswi',         emergency: '0812-0000-1010' },
    { id: 'T011', name: 'Faisal Rahman',        room: 'K-111', phone: '0813-1111-0011', email: 'faisal.r@gmail.com',    gender: 'L', checkIn: '2024-07-10', duration: 12, price: 750000,  payStatus: 'lunas',   dueDate: '2025-11-10', job: 'Sales Executive',   emergency: '0813-9999-0011' },
    { id: 'T012', name: 'Yuni Astuti',          room: 'K-112', phone: '0811-2222-0012', email: 'yuni.a@gmail.com',      gender: 'P', checkIn: '2024-07-25', duration: 12, price: 750000,  payStatus: 'lunas',   dueDate: '2025-11-25', job: 'Desainer Grafis',   emergency: '0811-8888-0012' },
    { id: 'T013', name: 'Hendri Kurniawan',     room: 'K-113', phone: '0814-3333-0013', email: 'hendri.k@gmail.com',    gender: 'L', checkIn: '2024-08-01', duration: 6,  price: 750000,  payStatus: 'lunas',   dueDate: '2025-11-01', job: 'Barista',           emergency: '0814-7777-0013' },
    { id: 'T014', name: 'Lilis Suryani',        room: 'K-114', phone: '0815-4444-0014', email: 'lilis.su@gmail.com',    gender: 'P', checkIn: '2024-08-20', duration: 12, price: 750000,  payStatus: 'lunas',   dueDate: '2025-11-20', job: 'Customer Service',  emergency: '0815-6666-0014' },
    { id: 'T015', name: 'Agus Setiawan',        room: 'K-115', phone: '0816-5555-0015', email: 'agus.set@gmail.com',    gender: 'L', checkIn: '2024-09-05', duration: 12, price: 750000,  payStatus: 'lunas',   dueDate: '2025-11-05', job: 'Mekanik',           emergency: '0816-5555-0015' },
    { id: 'T016', name: 'Putri Melinda',        room: 'K-116', phone: '0817-6666-0016', email: 'putri.m@gmail.com',     gender: 'P', checkIn: '2024-01-10', duration: 12, price: 1200000, payStatus: 'lunas',   dueDate: '2025-11-10', job: 'HRD Manager',       emergency: '0817-4444-0016' },
    { id: 'T017', name: 'Eko Prasetyo',         room: 'K-117', phone: '0818-7777-0017', email: 'eko.p@gmail.com',       gender: 'L', checkIn: '2024-01-25', duration: 12, price: 1200000, payStatus: 'lunas',   dueDate: '2025-11-25', job: 'Software Engineer', emergency: '0818-3333-0017' },
    { id: 'T018', name: 'Ratna Dewi',           room: 'K-118', phone: '0819-8888-0018', email: 'ratna.d@gmail.com',     gender: 'P', checkIn: '2024-02-15', duration: 12, price: 1200000, payStatus: 'terlambat', dueDate: '2025-10-15', job: 'Dokter Umum',     emergency: '0819-2222-0018' },
    { id: 'T019', name: 'Gunawan Santoso',      room: 'K-119', phone: '0812-8888-0019', email: 'gunawan.s@gmail.com',   gender: 'L', checkIn: '2024-03-01', duration: 12, price: 1200000, payStatus: 'lunas',   dueDate: '2025-11-01', job: 'Project Manager',   emergency: '0812-7777-0019' },
    { id: 'T020', name: 'Hesti Ramadhani',      room: 'K-120', phone: '0813-9999-0020', email: 'hesti.r@gmail.com',     gender: 'P', checkIn: '2024-04-10', duration: 12, price: 1200000, payStatus: 'lunas',   dueDate: '2025-11-10', job: 'Marketing',         emergency: '0813-6666-0020' },
    { id: 'T021', name: 'Irfan Maulana',        room: 'K-121', phone: '0811-0000-0021', email: 'irfan.m@gmail.com',     gender: 'L', checkIn: '2024-05-20', duration: 12, price: 1200000, payStatus: 'lunas',   dueDate: '2025-11-20', job: 'Arsitek',           emergency: '0811-5555-0021' },
    { id: 'T022', name: 'Julia Kusuma',         room: 'K-122', phone: '0814-1111-0022', email: 'julia.k@gmail.com',     gender: 'P', checkIn: '2024-06-05', duration: 6,  price: 1200000, payStatus: 'pending', dueDate: '2025-11-05', job: 'Konsultan IT',      emergency: '0814-9999-0022' },
    { id: 'T023', name: 'Kevin Adrianto',       room: 'K-123', phone: '0815-2222-0023', email: 'kevin.a@gmail.com',     gender: 'L', checkIn: '2024-07-01', duration: 12, price: 1200000, payStatus: 'lunas',   dueDate: '2025-11-01', job: 'Data Analyst',      emergency: '0815-8888-0023' },
    { id: 'T024', name: 'Lina Maharani',        room: 'K-124', phone: '0816-3333-0024', email: 'lina.m@yahoo.com',      gender: 'P', checkIn: '2024-07-20', duration: 12, price: 1200000, payStatus: 'lunas',   dueDate: '2025-11-20', job: 'Apoteker',          emergency: '0816-7777-0024' },
    { id: 'T025', name: 'Miftahul Huda',        room: 'K-125', phone: '0817-4444-0025', email: 'miftahul.h@gmail.com',  gender: 'L', checkIn: '2024-08-10', duration: 12, price: 1200000, payStatus: 'lunas',   dueDate: '2025-11-10', job: 'Frontend Dev',      emergency: '0817-2222-0025' },
    { id: 'T026', name: 'Novi Kartika',         room: 'K-126', phone: '0818-5555-0026', email: 'novi.k@gmail.com',      gender: 'P', checkIn: '2024-09-01', duration: 12, price: 1200000, payStatus: 'lunas',   dueDate: '2025-11-01', job: 'Bidan',             emergency: '0818-1111-0026' },
    { id: 'T027', name: 'Oscar Firmansyah',     room: 'K-127', phone: '0819-6666-0027', email: 'oscar.f@gmail.com',     gender: 'L', checkIn: '2024-09-15', duration: 6,  price: 1200000, payStatus: 'lunas',   dueDate: '2025-11-15', job: 'Content Creator',   emergency: '0819-9999-0027' },
    { id: 'T028', name: 'Priska Amanda',        room: 'K-128', phone: '0812-6666-0028', email: 'priska.a@gmail.com',    gender: 'P', checkIn: '2024-10-01', duration: 12, price: 1200000, payStatus: 'lunas',   dueDate: '2025-11-01', job: 'Asisten Manajer',   emergency: '0812-4444-0028' }
  ],

  // Data 40 Kamar
  rooms: [
    // Lantai 1: Tipe Standard (K-101 s/d K-115) — Rp 750.000/bln
    { id: 'K-101', floor: 1, type: 'Standard', price: 750000,  status: 'terisi',   tenantId: 'T001', facilities: ['WiFi', 'KM Dalam', 'Kasur', 'Lemari'], size: '3x4 m²', ac: false },
    { id: 'K-102', floor: 1, type: 'Standard', price: 750000,  status: 'terisi',   tenantId: 'T002', facilities: ['WiFi', 'KM Dalam', 'Kasur', 'Lemari'], size: '3x4 m²', ac: false },
    { id: 'K-103', floor: 1, type: 'Standard', price: 750000,  status: 'terisi',   tenantId: 'T003', facilities: ['WiFi', 'KM Dalam', 'Kasur', 'Lemari'], size: '3x4 m²', ac: false },
    { id: 'K-104', floor: 1, type: 'Standard', price: 750000,  status: 'terisi',   tenantId: 'T004', facilities: ['WiFi', 'KM Dalam', 'Kasur', 'Lemari'], size: '3x4 m²', ac: false },
    { id: 'K-105', floor: 1, type: 'Standard', price: 750000,  status: 'terisi',   tenantId: 'T005', facilities: ['WiFi', 'KM Dalam', 'Kasur', 'Lemari'], size: '3x4 m²', ac: false },
    { id: 'K-106', floor: 1, type: 'Standard', price: 750000,  status: 'terisi',   tenantId: 'T006', facilities: ['WiFi', 'KM Dalam', 'Kasur', 'Lemari'], size: '3x4 m²', ac: false },
    { id: 'K-107', floor: 1, type: 'Standard', price: 750000,  status: 'terlambat',tenantId: 'T007', facilities: ['WiFi', 'KM Dalam', 'Kasur', 'Lemari'], size: '3x4 m²', ac: false },
    { id: 'K-108', floor: 1, type: 'Standard', price: 750000,  status: 'terisi',   tenantId: 'T008', facilities: ['WiFi', 'KM Dalam', 'Kasur', 'Lemari'], size: '3x4 m²', ac: false },
    { id: 'K-109', floor: 1, type: 'Standard', price: 750000,  status: 'terisi',   tenantId: 'T009', facilities: ['WiFi', 'KM Dalam', 'Kasur', 'Lemari'], size: '3x4 m²', ac: false },
    { id: 'K-110', floor: 1, type: 'Standard', price: 750000,  status: 'terisi',   tenantId: 'T010', facilities: ['WiFi', 'KM Dalam', 'Kasur', 'Lemari'], size: '3x4 m²', ac: false },
    { id: 'K-111', floor: 1, type: 'Standard', price: 750000,  status: 'terisi',   tenantId: 'T011', facilities: ['WiFi', 'KM Dalam', 'Kasur', 'Lemari'], size: '3x4 m²', ac: false },
    { id: 'K-112', floor: 1, type: 'Standard', price: 750000,  status: 'terisi',   tenantId: 'T012', facilities: ['WiFi', 'KM Dalam', 'Kasur', 'Lemari'], size: '3x4 m²', ac: false },
    { id: 'K-113', floor: 1, type: 'Standard', price: 750000,  status: 'terisi',   tenantId: 'T013', facilities: ['WiFi', 'KM Dalam', 'Kasur', 'Lemari'], size: '3x4 m²', ac: false },
    { id: 'K-114', floor: 1, type: 'Standard', price: 750000,  status: 'terisi',   tenantId: 'T014', facilities: ['WiFi', 'KM Dalam', 'Kasur', 'Lemari'], size: '3x4 m²', ac: false },
    { id: 'K-115', floor: 1, type: 'Standard', price: 750000,  status: 'terisi',   tenantId: 'T015', facilities: ['WiFi', 'KM Dalam', 'Kasur', 'Lemari'], size: '3x4 m²', ac: false },
    // Lantai 2: Tipe Deluxe (K-116 s/d K-128) — Rp 1.200.000/bln
    { id: 'K-116', floor: 2, type: 'Deluxe',   price: 1200000, status: 'terisi',   tenantId: 'T016', facilities: ['WiFi', 'KM Dalam', 'AC', 'Kasur', 'Lemari', 'Meja Belajar'], size: '3x4.5 m²', ac: true },
    { id: 'K-117', floor: 2, type: 'Deluxe',   price: 1200000, status: 'terisi',   tenantId: 'T017', facilities: ['WiFi', 'KM Dalam', 'AC', 'Kasur', 'Lemari', 'Meja Belajar'], size: '3x4.5 m²', ac: true },
    { id: 'K-118', floor: 2, type: 'Deluxe',   price: 1200000, status: 'terlambat',tenantId: 'T018', facilities: ['WiFi', 'KM Dalam', 'AC', 'Kasur', 'Lemari', 'Meja Belajar'], size: '3x4.5 m²', ac: true },
    { id: 'K-119', floor: 2, type: 'Deluxe',   price: 1200000, status: 'terisi',   tenantId: 'T019', facilities: ['WiFi', 'KM Dalam', 'AC', 'Kasur', 'Lemari', 'Meja Belajar'], size: '3x4.5 m²', ac: true },
    { id: 'K-120', floor: 2, type: 'Deluxe',   price: 1200000, status: 'terisi',   tenantId: 'T020', facilities: ['WiFi', 'KM Dalam', 'AC', 'Kasur', 'Lemari', 'Meja Belajar'], size: '3x4.5 m²', ac: true },
    { id: 'K-121', floor: 2, type: 'Deluxe',   price: 1200000, status: 'terisi',   tenantId: 'T021', facilities: ['WiFi', 'KM Dalam', 'AC', 'Kasur', 'Lemari', 'Meja Belajar'], size: '3x4.5 m²', ac: true },
    { id: 'K-122', floor: 2, type: 'Deluxe',   price: 1200000, status: 'terisi',   tenantId: 'T022', facilities: ['WiFi', 'KM Dalam', 'AC', 'Kasur', 'Lemari', 'Meja Belajar'], size: '3x4.5 m²', ac: true },
    { id: 'K-123', floor: 2, type: 'Deluxe',   price: 1200000, status: 'terisi',   tenantId: 'T023', facilities: ['WiFi', 'KM Dalam', 'AC', 'Kasur', 'Lemari', 'Meja Belajar'], size: '3x4.5 m²', ac: true },
    { id: 'K-124', floor: 2, type: 'Deluxe',   price: 1200000, status: 'terisi',   tenantId: 'T024', facilities: ['WiFi', 'KM Dalam', 'AC', 'Kasur', 'Lemari', 'Meja Belajar'], size: '3x4.5 m²', ac: true },
    { id: 'K-125', floor: 2, type: 'Deluxe',   price: 1200000, status: 'terisi',   tenantId: 'T025', facilities: ['WiFi', 'KM Dalam', 'AC', 'Kasur', 'Lemari', 'Meja Belajar'], size: '3x4.5 m²', ac: true },
    { id: 'K-126', floor: 2, type: 'Deluxe',   price: 1200000, status: 'terisi',   tenantId: 'T026', facilities: ['WiFi', 'KM Dalam', 'AC', 'Kasur', 'Lemari', 'Meja Belajar'], size: '3x4.5 m²', ac: true },
    { id: 'K-127', floor: 2, type: 'Deluxe',   price: 1200000, status: 'terisi',   tenantId: 'T027', facilities: ['WiFi', 'KM Dalam', 'AC', 'Kasur', 'Lemari', 'Meja Belajar'], size: '3x4.5 m²', ac: true },
    { id: 'K-128', floor: 2, type: 'Deluxe',   price: 1200000, status: 'terisi',   tenantId: 'T028', facilities: ['WiFi', 'KM Dalam', 'AC', 'Kasur', 'Lemari', 'Meja Belajar'], size: '3x4.5 m²', ac: true },
    // Lantai 3: Tipe Premium (K-129 s/d K-135) — Rp 1.800.000/bln
    { id: 'K-129', floor: 3, type: 'Premium',  price: 1800000, status: 'kosong',   tenantId: null,   facilities: ['WiFi', 'KM Dalam', 'AC', 'Water Heater', 'Kasur Queen', 'Lemari', 'Kulkas Mini', 'TV'], size: '4x5 m²', ac: true },
    { id: 'K-130', floor: 3, type: 'Premium',  price: 1800000, status: 'booking',  tenantId: null,   facilities: ['WiFi', 'KM Dalam', 'AC', 'Water Heater', 'Kasur Queen', 'Lemari', 'Kulkas Mini', 'TV'], size: '4x5 m²', ac: true },
    { id: 'K-131', floor: 3, type: 'Premium',  price: 1800000, status: 'kosong',   tenantId: null,   facilities: ['WiFi', 'KM Dalam', 'AC', 'Water Heater', 'Kasur Queen', 'Lemari', 'Kulkas Mini', 'TV'], size: '4x5 m²', ac: true },
    { id: 'K-132', floor: 3, type: 'Premium',  price: 1800000, status: 'kosong',   tenantId: null,   facilities: ['WiFi', 'KM Dalam', 'AC', 'Water Heater', 'Kasur Queen', 'Lemari', 'Kulkas Mini', 'TV'], size: '4x5 m²', ac: true },
    { id: 'K-133', floor: 3, type: 'Premium',  price: 1800000, status: 'booking',  tenantId: null,   facilities: ['WiFi', 'KM Dalam', 'AC', 'Water Heater', 'Kasur Queen', 'Lemari', 'Kulkas Mini', 'TV'], size: '4x5 m²', ac: true },
    { id: 'K-134', floor: 3, type: 'Premium',  price: 1800000, status: 'kosong',   tenantId: null,   facilities: ['WiFi', 'KM Dalam', 'AC', 'Water Heater', 'Kasur Queen', 'Lemari', 'Kulkas Mini', 'TV'], size: '4x5 m²', ac: true },
    { id: 'K-135', floor: 3, type: 'Premium',  price: 1800000, status: 'kosong',   tenantId: null,   facilities: ['WiFi', 'KM Dalam', 'AC', 'Water Heater', 'Kasur Queen', 'Lemari', 'Kulkas Mini', 'TV'], size: '4x5 m²', ac: true },
    // Lantai 4: Tipe Suite (K-136 s/d K-140) — Rp 2.500.000/bln
    { id: 'K-136', floor: 4, type: 'Suite',    price: 2500000, status: 'booking',  tenantId: null,   facilities: ['WiFi', 'KM Dalam', 'AC', 'Water Heater', 'Kasur King', 'Lemari Besar', 'Kulkas', 'TV Smart', 'Sofa'], size: '5x6 m²', ac: true },
    { id: 'K-137', floor: 4, type: 'Suite',    price: 2500000, status: 'kosong',   tenantId: null,   facilities: ['WiFi', 'KM Dalam', 'AC', 'Water Heater', 'Kasur King', 'Lemari Besar', 'Kulkas', 'TV Smart', 'Sofa'], size: '5x6 m²', ac: true },
    { id: 'K-138', floor: 4, type: 'Suite',    price: 2500000, status: 'kosong',   tenantId: null,   facilities: ['WiFi', 'KM Dalam', 'AC', 'Water Heater', 'Kasur King', 'Lemari Besar', 'Kulkas', 'TV Smart', 'Sofa'], size: '5x6 m²', ac: true },
    { id: 'K-139', floor: 4, type: 'Suite',    price: 2500000, status: 'kosong',   tenantId: null,   facilities: ['WiFi', 'KM Dalam', 'AC', 'Water Heater', 'Kasur King', 'Lemari Besar', 'Kulkas', 'TV Smart', 'Sofa'], size: '5x6 m²', ac: true },
    { id: 'K-140', floor: 4, type: 'Suite',    price: 2500000, status: 'kosong',   tenantId: null,   facilities: ['WiFi', 'KM Dalam', 'AC', 'Water Heater', 'Kasur King', 'Lemari Besar', 'Kulkas', 'TV Smart', 'Sofa'], size: '5x6 m²', ac: true }
  ],

  // Riwayat Pembayaran
  payments: [
    { id: 'INV-2510-001', tenantId: 'T001', room: 'K-101', month: 'Oktober 2025', amount: 750000,  status: 'lunas',    paidDate: '2025-10-12', method: 'Transfer BCA',  verifiedBy: 'Admin' },
    { id: 'INV-2510-002', tenantId: 'T002', room: 'K-102', month: 'Oktober 2025', amount: 750000,  status: 'lunas',    paidDate: '2025-10-08', method: 'QRIS',          verifiedBy: 'System' },
    { id: 'INV-2510-003', tenantId: 'T003', room: 'K-103', month: 'Oktober 2025', amount: 750000,  status: 'pending',  paidDate: null,          method: null,            verifiedBy: null },
    { id: 'INV-2510-004', tenantId: 'T004', room: 'K-104', month: 'Oktober 2025', amount: 750000,  status: 'lunas',    paidDate: '2025-10-05', method: 'Transfer Mandiri', verifiedBy: 'Admin' },
    { id: 'INV-2510-005', tenantId: 'T005', room: 'K-105', month: 'Oktober 2025', amount: 750000,  status: 'lunas',    paidDate: '2025-10-15', method: 'QRIS',          verifiedBy: 'System' },
    { id: 'INV-2510-006', tenantId: 'T006', room: 'K-106', month: 'Oktober 2025', amount: 750000,  status: 'lunas',    paidDate: '2025-10-18', method: 'Transfer BNI',  verifiedBy: 'Admin' },
    { id: 'INV-2510-007', tenantId: 'T007', room: 'K-107', month: 'Oktober 2025', amount: 750000,  status: 'terlambat',paidDate: null,          method: null,            verifiedBy: null },
    { id: 'INV-2510-008', tenantId: 'T008', room: 'K-108', month: 'Oktober 2025', amount: 750000,  status: 'lunas',    paidDate: '2025-10-10', method: 'Transfer BCA',  verifiedBy: 'Admin' },
    { id: 'INV-2510-009', tenantId: 'T009', room: 'K-109', month: 'Oktober 2025', amount: 750000,  status: 'lunas',    paidDate: '2025-10-22', method: 'QRIS',          verifiedBy: 'System' },
    { id: 'INV-2510-010', tenantId: 'T010', room: 'K-110', month: 'Oktober 2025', amount: 750000,  status: 'pending',  paidDate: null,          method: null,            verifiedBy: null },
    { id: 'INV-2510-016', tenantId: 'T016', room: 'K-116', month: 'Oktober 2025', amount: 1200000, status: 'lunas',    paidDate: '2025-10-09', method: 'Transfer BCA',  verifiedBy: 'Admin' },
    { id: 'INV-2510-017', tenantId: 'T017', room: 'K-117', month: 'Oktober 2025', amount: 1200000, status: 'lunas',    paidDate: '2025-10-14', method: 'Midtrans',      verifiedBy: 'System' },
    { id: 'INV-2510-018', tenantId: 'T018', room: 'K-118', month: 'Oktober 2025', amount: 1200000, status: 'terlambat',paidDate: null,          method: null,            verifiedBy: null },
    { id: 'INV-2510-019', tenantId: 'T019', room: 'K-119', month: 'Oktober 2025', amount: 1200000, status: 'lunas',    paidDate: '2025-10-03', method: 'Transfer BRI',  verifiedBy: 'Admin' },
    { id: 'INV-2510-020', tenantId: 'T020', room: 'K-120', month: 'Oktober 2025', amount: 1200000, status: 'lunas',    paidDate: '2025-10-11', method: 'QRIS',          verifiedBy: 'System' },
    { id: 'INV-2510-021', tenantId: 'T021', room: 'K-121', month: 'Oktober 2025', amount: 1200000, status: 'menunggu', paidDate: '2025-10-29', method: 'Transfer BCA',  verifiedBy: null },
    { id: 'INV-2510-022', tenantId: 'T022', room: 'K-122', month: 'Oktober 2025', amount: 1200000, status: 'pending',  paidDate: null,          method: null,            verifiedBy: null },
    { id: 'INV-2510-023', tenantId: 'T023', room: 'K-123', month: 'Oktober 2025', amount: 1200000, status: 'lunas',    paidDate: '2025-10-07', method: 'Midtrans',      verifiedBy: 'System' },
    { id: 'INV-2510-024', tenantId: 'T024', room: 'K-124', month: 'Oktober 2025', amount: 1200000, status: 'lunas',    paidDate: '2025-10-16', method: 'Transfer Mandiri', verifiedBy: 'Admin' },
    { id: 'INV-2510-025', tenantId: 'T025', room: 'K-125', month: 'Oktober 2025', amount: 1200000, status: 'lunas',    paidDate: '2025-10-20', method: 'QRIS',          verifiedBy: 'System' }
  ],

  // Aktivitas Terbaru
  activities: [
    { time: '2 mnt lalu',  type: 'payment',   icon: 'green',  text: 'Budi Santoso (K-101) bayar Rp 750.000 via Transfer BCA' },
    { time: '15 mnt lalu', type: 'booking',   icon: 'blue',   text: 'Booking baru masuk untuk K-130 dari Rizki Ahmad' },
    { time: '1 jam lalu',  type: 'reminder',  icon: 'amber',  text: 'Reminder H-3 terkirim ke 5 penghuni via WhatsApp' },
    { time: '2 jam lalu',  type: 'payment',   icon: 'green',  text: 'Priska Amanda (K-128) bayar Rp 1.200.000 via Midtrans' },
    { time: '3 jam lalu',  type: 'complaint', icon: 'red',    text: 'Komplain baru dari Eko Prasetyo (K-117): WiFi lemot' },
    { time: '5 jam lalu',  type: 'tenant',    icon: 'blue',   text: 'Penghuni baru masuk: Priska Amanda — Kamar K-128' },
    { time: 'Kemarin',     type: 'invoice',   icon: 'gray',   text: '28 invoice November 2025 berhasil dibuat otomatis' },
    { time: 'Kemarin',     type: 'payment',   icon: 'green',  text: 'Oscar Firmansyah (K-127) bayar Rp 1.200.000 via QRIS' }
  ],

  // Booking Pending
  bookings: [
    { id: 'BK-001', name: 'Rizki Ahmad',     room: 'K-130', phone: '0821-1234-5678', date: '2025-10-29', startDate: '2025-11-01', duration: 12, status: 'pending',  type: 'Premium' },
    { id: 'BK-002', name: 'Sinta Dewi',      room: 'K-133', phone: '0822-9876-5432', date: '2025-10-28', startDate: '2025-11-05', duration: 6,  status: 'pending',  type: 'Premium' },
    { id: 'BK-003', name: 'Bagas Pratama',   room: 'K-136', phone: '0823-4567-8901', date: '2025-10-27', startDate: '2025-12-01', duration: 12, status: 'confirmed',type: 'Suite' }
  ],

  // Komplain
  complaints: [
    { id: 'CMP-001', tenantId: 'T017', room: 'K-117', category: 'WiFi',       title: 'Internet Lemot',         desc: 'Wifi sangat lambat dari kemarin sore, tidak bisa meeting online.', date: '2025-10-29', status: 'diproses', priority: 'tinggi' },
    { id: 'CMP-002', tenantId: 'T005', room: 'K-105', category: 'Listrik',    title: 'Lampu Kamar Mati',       desc: 'Lampu kamar mati tiba-tiba, sudah ganti bohlam tapi tetap mati.', date: '2025-10-28', status: 'pending',  priority: 'sedang' },
    { id: 'CMP-003', tenantId: 'T022', room: 'K-122', category: 'AC',         title: 'AC Tidak Dingin',        desc: 'AC sudah menyala tapi tidak keluar angin dingin sama sekali.', date: '2025-10-27', status: 'diproses', priority: 'sedang' },
    { id: 'CMP-004', tenantId: 'T009', room: 'K-109', category: 'Kamar Mandi',title: 'Shower Tidak Berfungsi', desc: 'Air shower tidak keluar, hanya menetes sedikit.', date: '2025-10-26', status: 'pending',  priority: 'tinggi' },
    { id: 'CMP-005', tenantId: 'T014', room: 'K-114', category: 'Lainnya',    title: 'Kunci Kamar Seret',      desc: 'Kunci pintu sulit diputar, harus berkali-kali baru bisa masuk.', date: '2025-10-25', status: 'selesai',  priority: 'rendah' },
    { id: 'CMP-006', tenantId: 'T021', room: 'K-121', category: 'Listrik',    title: 'Stop Kontak Rusak',      desc: 'Stop kontak di dekat meja belajar tidak berfungsi.', date: '2025-10-24', status: 'selesai',  priority: 'rendah' }
  ],

  // Helper Functions
  formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
  },

  getTenantByRoom(roomId) {
    const room = this.rooms.find(r => r.id === roomId);
    if (!room || !room.tenantId) return null;
    return this.tenants.find(t => t.id === room.tenantId);
  },

  getTenantById(id) {
    return this.tenants.find(t => t.id === id);
  },

  getRoomById(id) {
    return this.rooms.find(r => r.id === id);
  },

  getStatusLabel(status) {
    const labels = { terisi: 'Terisi', kosong: 'Kosong', booking: 'Booking', terlambat: 'Telat Bayar', pending: 'Pending', lunas: 'Lunas', menunggu: 'Menunggu' };
    return labels[status] || status;
  }
};
