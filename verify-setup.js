import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('\n' + '='.repeat(60));
console.log('🔍 TASK MANAGER - SETUP VERIFICATION SCRIPT');
console.log('='.repeat(60) + '\n');

// Step 1: Check .env file
console.log('📋 Step 1: Checking .env Configuration');
console.log('-'.repeat(60));
if (!process.env.MONGODB_URI) {
  console.log('❌ MONGODB_URI not found in .env');
  process.exit(1);
}
if (!process.env.PORT) {
  console.log('❌ PORT not found in .env');
  process.exit(1);
}
console.log('✅ MONGODB_URI:', process.env.MONGODB_URI);
console.log('✅ PORT:', process.env.PORT);

// Check database name
if (!process.env.MONGODB_URI.includes('taskmanagement')) {
  console.log('⚠️  WARNING: Database name should be "taskmanagement"');
  console.log('   Current:', process.env.MONGODB_URI);
}

// Step 2: Check Node.js version
console.log('\n📋 Step 2: Checking Node.js Version');
console.log('-'.repeat(60));
const nodeVersion = process.version;
console.log('✅ Node.js version:', nodeVersion);

// Step 3: Attempt MongoDB Connection
console.log('\n📋 Step 3: Testing MongoDB Connection');
console.log('-'.repeat(60));

const testConnection = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log('   URI:', process.env.MONGODB_URI);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB Connected Successfully!');
    console.log('   Host:', conn.connection.host);
    console.log('   Port:', conn.connection.port);
    console.log('   Database:', conn.connection.db.databaseName);
    console.log('   State:', conn.connection.readyState === 1 ? 'Connected' : 'Disconnected');

    // Step 4: Check Collections
    console.log('\n📋 Step 4: Checking Collections');
    console.log('-'.repeat(60));

    const collections = await conn.connection.db.listCollections().toArray();
    
    if (collections.length === 0) {
      console.log('⚠️  No collections found yet (this is normal for new databases)');
    } else {
      console.log(`✅ Found ${collections.length} collection(s):`);
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }

    // Step 5: Test Write Operation
    console.log('\n📋 Step 5: Testing Write Operation');
    console.log('-'.repeat(60));

    const testSchema = new mongoose.Schema({
      testField: String,
      timestamp: { type: Date, default: Date.now }
    });

    const TestModel = mongoose.model('VerificationTest', testSchema);

    const testDoc = await TestModel.create({
      testField: 'Verification successful'
    });

    console.log('✅ Write operation successful');
    console.log('   Test document ID:', testDoc._id);

    // Clean up test document
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Cleanup successful');

    // Step 6: Final Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ ALL CHECKS PASSED!');
    console.log('='.repeat(60));
    console.log('\n✨ Your backend is ready to go!');
    console.log('\n🚀 Next Steps:');
    console.log('   1. Start backend: npm start');
    console.log('   2. Test endpoints in Postman');
    console.log('   3. Integrate frontend code');
    console.log('\n' + '='.repeat(60) + '\n');

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.log('❌ MongoDB Connection Failed!');
    console.log('   Error:', error.message);
    
    console.log('\n🔧 Troubleshooting Steps:');
    console.log('   1. Ensure MongoDB is running:');
    console.log('      - Windows: Check Services for MongoDB');
    console.log('      - Docker: docker ps (should show mongodb container)');
    console.log('   2. Check connection string in .env');
    console.log('   3. Ensure database name is "taskmanagement"');
    console.log('   4. Check firewall allows port 27017');
    console.log('\n' + '='.repeat(60) + '\n');
    
    process.exit(1);
  }
};

// Run the test
testConnection();
