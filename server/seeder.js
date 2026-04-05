require('dotenv').config();
const mongoose = require('mongoose');
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const connectDB = require('./config/db');

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Seed exactly 1 admin user
        const adminUser = await User.create({
            name: 'Umar',
            email: 'umar@gmail.com',
            password: 'umar2023',
            isAdmin: true,
        });

        console.log(`Admin created: ${adminUser.email}`);

        const sampleProducts = products.map((product) => ({
            ...product,
            user: adminUser._id,
        }));

        await Product.insertMany(sampleProducts);

        console.log(`${sampleProducts.length} products seeded!`);
        console.log('\n✅ Data Imported Successfully!');
        console.log('────────────────────────────────');
        console.log('Admin Login:');
        console.log('  Email   : umar@gmail.com');
        console.log('  Password: umar2023');
        console.log('────────────────────────────────\n');
        process.exit();
    } catch (error) {
        console.error(`\n❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        console.log('✅ Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`\n❌ Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
