const products = [
	{
		id: 1,
		name: "Ноутбук Dell XPS 15",
		category: "electronics",
		price: 35000,
		stock: 15,
		salesCount: 45,
		revenue: 1575000
	},
	{
		id: 2,
		name: "MacBook Air M2",
		category: "electronics",
		price: 46000,
		stock: 8,
		salesCount: 38,
		revenue: 1748000
	},
	{
		id: 3,
		name: "Lenovo ThinkPad X1",
		category: "electronics",
		price: 42000,
		stock: 10,
		salesCount: 31,
		revenue: 1302000
	},
	{
		id: 4,
		name: "ASUS ROG Strix G16",
		category: "electronics",
		price: 52000,
		stock: 6,
		salesCount: 27,
		revenue: 1404000
	},
	{
		id: 5,
		name: "iPhone 14 Pro",
		category: "electronics",
		price: 42000,
		stock: 12,
		salesCount: 52,
		revenue: 2184000
	},
	{
		id: 6,
		name: "Samsung Galaxy S23",
		category: "electronics",
		price: 31000,
		stock: 20,
		salesCount: 48,
		revenue: 1488000
	},
	{
		id: 7,
		name: "Xiaomi 13",
		category: "electronics",
		price: 27000,
		stock: 25,
		salesCount: 60,
		revenue: 1620000
	},
	{
		id: 8,
		name: "Apple Watch Series 9",
		category: "wearables",
		price: 18000,
		stock: 18,
		salesCount: 40,
		revenue: 720000
	},
	{
		id: 9,
		name: "AirPods Pro",
		category: "wearables",
		price: 11000,
		stock: 30,
		salesCount: 75,
		revenue: 825000
	},
	{
		id: 10,
		name: "Навушники Sony WH-1000XM5",
		category: "wearables",
		price: 12000,
		stock: 14,
		salesCount: 34,
		revenue: 408000
	},

	{
		id: 11,
		name: "Монітор LG 27\"",
		category: "electronics",
		price: 9800,
		stock: 22,
		salesCount: 58,
		revenue: 568400
	},
	{
		id: 12,
		name: "Монітор Dell 24\"",
		category: "electronics",
		price: 8700,
		stock: 19,
		salesCount: 46,
		revenue: 400200
	},
	{
		id: 13,
		name: "Клавіатура Keychron K8",
		category: "accessories",
		price: 4200,
		stock: 40,
		salesCount: 90,
		revenue: 378000
	},
	{
		id: 14,
		name: "Клавіатура Logitech G Pro",
		category: "accessories",
		price: 5200,
		stock: 35,
		salesCount: 72,
		revenue: 374400
	},
	{
		id: 15,
		name: "Мишка Logitech MX Master 3",
		category: "accessories",
		price: 3900,
		stock: 50,
		salesCount: 110,
		revenue: 429000
	},
	{
		id: 16,
		name: "Мишка Razer DeathAdder",
		category: "accessories",
		price: 3100,
		stock: 45,
		salesCount: 95,
		revenue: 294500
	},
	{
		id: 17,
		name: "Смарт ТВ Samsung 55\"",
		category: "electronics",
		price: 28000,
		stock: 7,
		salesCount: 22,
		revenue: 616000
	},
	{
		id: 18,
		name: "Смарт ТВ LG 50\"",
		category: "electronics",
		price: 24000,
		stock: 9,
		salesCount: 26,
		revenue: 624000
	},
	{
		id: 19,
		name: "PlayStation 5",
		category: "gaming",
		price: 26000,
		stock: 5,
		salesCount: 40,
		revenue: 1040000
	},
	{
		id: 20,
		name: "Xbox Series X",
		category: "gaming",
		price: 25000,
		stock: 6,
		salesCount: 33,
		revenue: 825000
	},

	{
		id: 21,
		name: "Геймпад DualSense",
		category: "gaming",
		price: 2900,
		stock: 60,
		salesCount: 140,
		revenue: 406000
	},
	{
		id: 22,
		name: "Nintendo Switch",
		category: "gaming",
		price: 19500,
		stock: 8,
		salesCount: 28,
		revenue: 546000
	},
	{
		id: 23,
		name: "GoPro Hero 11",
		category: "electronics",
		price: 16500,
		stock: 11,
		salesCount: 36,
		revenue: 594000
	},
	{
		id: 24,
		name: "Фотоапарат Canon EOS M50",
		category: "electronics",
		price: 22000,
		stock: 6,
		salesCount: 19,
		revenue: 418000
	},
	{
		id: 25,
		name: "Павербанк Xiaomi 20000",
		category: "accessories",
		price: 1800,
		stock: 70,
		salesCount: 160,
		revenue: 288000
	},
	{
		id: 26,
		name: "Зарядний пристрій Anker 65W",
		category: "accessories",
		price: 2500,
		stock: 55,
		salesCount: 120,
		revenue: 300000
	},
	{
		id: 27,
		name: "SSD Samsung 1TB",
		category: "components",
		price: 4200,
		stock: 32,
		salesCount: 68,
		revenue: 285600
	},
	{
		id: 28,
		name: "RAM Kingston 16GB",
		category: "components",
		price: 3100,
		stock: 40,
		salesCount: 82,
		revenue: 254200
	},
	{
		id: 29,
		name: "Wi-Fi роутер TP-Link AX3000",
		category: "electronics",
		price: 3600,
		stock: 28,
		salesCount: 54,
		revenue: 194400
	},
	{
		id: 30,
		name: "Смарт-годинник Xiaomi Watch S1",
		category: "wearables",
		price: 7500,
		stock: 16,
		salesCount: 41,
		revenue: 307500
	},

	{
		id: 31,
		name: "Електросамокат Xiaomi Pro 2",
		category: "transport",
		price: 32000,
		stock: 4,
		salesCount: 14,
		revenue: 448000
	},
	{
		id: 32,
		name: "Робот-пилосос Roborock S7",
		category: "home",
		price: 29000,
		stock: 7,
		salesCount: 21,
		revenue: 609000
	},
	{
		id: 33,
		name: "Кавоварка DeLonghi EC685",
		category: "home",
		price: 12500,
		stock: 10,
		salesCount: 29,
		revenue: 362500
	},
	{
		id: 34,
		name: "Мультиварка Philips HD2145",
		category: "home",
		price: 8400,
		stock: 13,
		salesCount: 34,
		revenue: 285600
	},
	{
		id: 35,
		name: "Очищувач повітря Xiaomi Mi Air",
		category: "home",
		price: 9800,
		stock: 9,
		salesCount: 18,
		revenue: 176400
	}
];

export default products;
