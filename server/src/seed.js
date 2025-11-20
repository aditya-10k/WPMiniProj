const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');

dotenv.config();

const cars = [
  {
    title: 'Maruti Suzuki Swift',
    description: 'Economical hatchback perfect for navigating Mumbai traffic. Ideal for daily commutes and short city runs.',
    price: 1200,
    slotsAvailable: 5,
    imageUrl: 'https://www.marutisuzuki.com/-/media/images/maruti/marutisuzuki/car/car-profile-shots/solid-redn.ashx',
    location: 'Andheri East, Mumbai'
  },
  {
    title: 'Hyundai Creta',
    description: 'Comfortable and spacious SUV suited for group outings, long drives, and city travel across Mumbai.',
    price: 2800,
    slotsAvailable: 3,
    imageUrl: "https://trident-group.s3.ap-south-1.amazonaws.com/hyundai/models/colors/1705922962.png",
    location: 'Powai, Mumbai'
  },
  {
    title: 'Honda City',
    description: 'Premium sedan with smooth drive quality, perfect for business trips, airport transfers, and comfortable city rides.',
    price: 3000,
    slotsAvailable: 4,
    //changes made to img link
    imageUrl: "https://freepngimg.com/save/32534-honda-civic-transparent-background/2048x1360",
    location: 'Bandra Kurla Complex (BKC), Mumbai'
  },
  {
    title: 'Toyota Innova Crysta',
    description: 'Reliable and spacious 7-seater MPV ideal for family trips, long-distance travel, or outstation journeys from Mumbai.',
    price: 3500,
    slotsAvailable: 2,
    imageUrl: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/140809/innova-crysta-exterior-right-front-three-quarter-3.png?isig=0&q=80&q=80",
    location: 'Andheri West, Mumbai'
  },
  {
    title: 'Mahindra Thar',
    description: 'Rugged SUV perfect for weekend getaways from Mumbai to Lonavala, Alibaug, or nearby adventure spots.',
    price: 4000,
    slotsAvailable: 1,
    imageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/204996/thar-2025-exterior-right-front-three-quarter-5.png?isig=0&q=80",
    location: 'Juhu, Mumbai'
  },
  {
    title: 'Tata Nexon EV',
    description: 'Eco-friendly electric SUV with smooth performance and zero fuel costs. Great for Mumbai city usage.',
    price: 2500,
    slotsAvailable: 4,
    imageUrl: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/149123/nexon-ev-exterior-right-front-three-quarter-80.png?isig=0&q=80&q=80",
    location: 'Lower Parel, Mumbai'
  }
];


async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Item.deleteMany();
    await Item.insertMany(cars);
    console.log('Seeded car listings.');
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

run();

