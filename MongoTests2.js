const { MongoClient, ObjectId } = require('mongodb');
const { spawn } = require('child_process');

const uri = "mongodb+srv://aabouelh:ix87VDhmFYKoBuzV@cluster0.e6z56dx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

const collection = client.db('TestDb').collection('TestCol');

const dummyItems = Array(10000).fill({ username: "fmiller", name: "Elizabeth Ray", address: "9286 Bethany Glens\nVasqueztown, CO 22939", birthdate: new Date('2022-01-01'), email: "arroyocolton@gmail.com", active: true, accounts: [{ "$numberInt": "371138" }, { "$numberInt": "324287" }, { "$numberInt": "276528" }, { "$numberInt": "332179" }, { "$numberInt": "422649" }, { "$numberInt": "387979" }], tier_and_details: { "0df078f33aa74a2e9696e0520c1a828a": { tier: "Bronze", id: "0df078f33aa74a2e9696e0520c1a828a", active: true, benefits: ["sports tickets"] }, "699456451cc24f028d2aa99d7534c219": { tier: "Bronze", benefits: ["24 hour dedicated line", "concierge services"], active: true, id: "699456451cc24f028d2aa99d7534c219" } } });

// Connect to the MongoDB server
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

async function Init() {
    try {
        var result = await collection.insertMany(dummyItems.map(obj => ({ ...obj, _id: new ObjectId() })));
        console.log(`${result.insertedCount} documents inserted`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Fields = 1
// User load = 1
// Indexed = No
async function MongoTest9() {
    const startTime = process.hrtime.bigint();

    // Fetch documents
    const documents = await collection.find({ username: "fmiller" }).toArray();

    // Calculate elapsed time
    const endTime = process.hrtime.bigint();
    const elapsedTime = endTime - startTime;
    const docCount = documents.length;

    return { elapsedTime: elapsedTime, docCount: docCount };
}

// Fields = 3
// User load = 1
// Indexed = No
async function MongoTest10() {
    const startTime = process.hrtime.bigint();

    // Fetch documents
    const documents = await collection.find({ username: "fmiller", name: "Elizabeth Ray" }).toArray();

    // Calculate elapsed time
    const endTime = process.hrtime.bigint();
    const elapsedTime = endTime - startTime;
    const docCount = documents.length;

    return { elapsedTime: elapsedTime, docCount: docCount };
}

// Fields = 3
// User load = 1
// Indexed = No
async function MongoTest11() {
    const startTime = process.hrtime.bigint();

    // Fetch documents
    const documents = await collection.find({ username: "fmiller", name: "Elizabeth Ray", address: "9286 Bethany Glens\nVasqueztown, CO 22939" }).toArray();

    // Calculate elapsed time
    const endTime = process.hrtime.bigint();
    const elapsedTime = endTime - startTime;
    const docCount = documents.length;

    return { elapsedTime: elapsedTime, docCount: docCount };
}

// Fields = 4
// User load = 1
// Indexed = No
async function MongoTest12() {
    const startTime = process.hrtime.bigint();

    // Fetch documents
    const documents = await collection.find({ username: "fmiller", name: "Elizabeth Ray", address: "9286 Bethany Glens\nVasqueztown, CO 22939", birthdate: new Date('2022-01-01') }).toArray();

    // Calculate elapsed time
    const endTime = process.hrtime.bigint();
    const elapsedTime = endTime - startTime;
    const docCount = documents.length;

    return { elapsedTime: elapsedTime, docCount: docCount };
}

// Fields = 5
// User load = 1
// Indexed = No
async function MongoTest13() {
    const startTime = process.hrtime.bigint();

    // Fetch documents
    const documents = await collection.find({ username: "fmiller", name: "Elizabeth Ray", address: "9286 Bethany Glens\nVasqueztown, CO 22939", birthdate: new Date('2022-01-01'), email: "arroyocolton@gmail.com" }).toArray();

    // Calculate elapsed time
    const endTime = process.hrtime.bigint();
    const elapsedTime = endTime - startTime;
    const docCount = documents.length;

    return { elapsedTime: elapsedTime, docCount: docCount };
}

// Fields = 1
// User load = 1
// Indexed = Yes
async function MongoTest14() {

    try {
        // create index
        const indexName = 'index14';
        const keys = { username: 1 };
        const options = { name: indexName };
        const result = await collection.createIndex(keys, options);
        console.log('Index created:', result);
    } catch (error) {
        console.log("Couldn't create index, it may already exist", error);
    }

    const startTime = process.hrtime.bigint();

    // Fetch documents
    const documents = await collection.find({ username: "fmiller" }).toArray();

    // Calculate elapsed time
    const endTime = process.hrtime.bigint();
    const elapsedTime = endTime - startTime;
    const docCount = documents.length;

    return { elapsedTime: elapsedTime, docCount: docCount };
}

// Fields = 2
// User load = 1
// Indexed = Yes
async function MongoTest15() {

    try {
        // create index
        const indexName = 'index15';
        const keys = { username: 1, name: 1 };
        const options = { name: indexName };
        const result = await collection.createIndex(keys, options);
        console.log('Index created:', result);
    } catch (error) {
        console.log("Couldn't create index, it may already exist", error);
    }

    const startTime = process.hrtime.bigint();

    // Fetch documents
    const documents = await collection.find({ username: "fmiller", name: "Elizabeth Ray" }).toArray();

    // Calculate elapsed time
    const endTime = process.hrtime.bigint();
    const elapsedTime = endTime - startTime;
    const docCount = documents.length;

    return { elapsedTime: elapsedTime, docCount: docCount };
}

// Fields = 3
// User load = 1
// Indexed = Yes
async function MongoTest16() {

    try {
        // create index
        const indexName = 'index16';
        const keys = { username: 1, name: 1, address: 1 };
        const options = { name: indexName };
        const result = await collection.createIndex(keys, options);
        console.log('Index created:', result);
    } catch (error) {
        console.log("Couldn't create index, it may already exist", error);
    }

    const startTime = process.hrtime.bigint();

    // Fetch documents
    const documents = await collection.find({ username: "fmiller", name: "Elizabeth Ray", address: "9286 Bethany Glens\nVasqueztown, CO 22939" }).toArray();

    // Calculate elapsed time
    const endTime = process.hrtime.bigint();
    const elapsedTime = endTime - startTime;
    const docCount = documents.length;

    return { elapsedTime: elapsedTime, docCount: docCount };
}

// Fields = 4
// User load = 1
// Indexed = yes
async function MongoTest17() {

    try {
        // create index
        const indexName = 'index17';
        const keys = { username: 1, name: 1, address: 1, birthdate: 1 };
        const options = { name: indexName };
        const result = await collection.createIndex(keys, options);
        console.log('Index created:', result);
    } catch (error) {
        console.log("Couldn't create index, it may already exist", error);
    }

    const startTime = process.hrtime.bigint();

    // Fetch documents
    const documents = await collection.find({ username: "fmiller", name: "Elizabeth Ray", address: "9286 Bethany Glens\nVasqueztown, CO 22939", birthdate: new Date('2022-01-01') }).toArray();

    // Calculate elapsed time
    const endTime = process.hrtime.bigint();
    const elapsedTime = endTime - startTime;
    const docCount = documents.length;

    return { elapsedTime: elapsedTime, docCount: docCount };
}

// Fields = 5
// User load = 1
// Indexed = Yes
async function MongoTest18() {

    try {
        // create index
        const indexName = 'index18';
        const keys = { username: 1, name: 1, address: 1, birthdate: 1, email: 1 };
        const options = { name: indexName };
        const result = await collection.createIndex(keys, options);
        console.log('Index created:', result);
    } catch (error) {
        console.log("Couldn't create index, it may already exist", error);
    }

    const startTime = process.hrtime.bigint();

    // Fetch documents
    const documents = await collection.find({ username: "fmiller", name: "Elizabeth Ray", address: "9286 Bethany Glens\nVasqueztown, CO 22939", birthdate: new Date('2022-01-01'), email: "arroyocolton@gmail.com" }).toArray();

    // Calculate elapsed time
    const endTime = process.hrtime.bigint();
    const elapsedTime = endTime - startTime;
    const docCount = documents.length;

    return { elapsedTime: elapsedTime, docCount: docCount };
}


(async () => {
    try {
        var t9Avg = BigInt(0);
        var t10Avg = BigInt(0);
        var t11Avg = BigInt(0);
        var t12Avg = BigInt(0);
        var t13Avg = BigInt(0);
        var t14Avg = BigInt(0);
        var t15Avg = BigInt(0);
        var t16Avg = BigInt(0);
        var t17Avg = BigInt(0);
        var t18Avg = BigInt(0);

        var runs = BigInt(3);

        // Call the function to connect
        await connectToMongoDB();
        await Init();

        for (var i = 0; i < runs; i++) {
            const t9 = await MongoTest9();
            console.log("Test 9 Response Time: " + t9.elapsedTime + " nanoseconds." + "(" + t9.docCount + " Documents)");
            t9Avg += t9.elapsedTime;
            const t10 = await MongoTest10();
            console.log("Test 10 Response Time: " + t10.elapsedTime + " nanoseconds." + "(" + t10.docCount + " Documents)");
            t10Avg += t10.elapsedTime;
            const t11 = await MongoTest11();
            console.log("Test 11 Response Time: " + t11.elapsedTime + " nanoseconds." + "(" + t11.docCount + " Documents)");
            t11Avg += t11.elapsedTime;
            const t12 = await MongoTest12();
            console.log("Test 12 Response Time: " + t12.elapsedTime + " nanoseconds." + "(" + t12.docCount + " Documents)");
            t12Avg += t12.elapsedTime;
            const t13 = await MongoTest13();
            console.log("Test 13 Response Time: " + t13.elapsedTime + " nanoseconds." + "(" + t13.docCount + " Documents)");
            t13Avg += t13.elapsedTime;
            const t14 = await MongoTest14();
            console.log("Test 14 Response Time: " + t14.elapsedTime + " nanoseconds." + "(" + t14.docCount + " Documents)");
            t14Avg += t14.elapsedTime;
            const t15 = await MongoTest15();
            console.log("Test 15 Response Time: " + t15.elapsedTime + " nanoseconds." + "(" + t15.docCount + " Documents)");
            t15Avg += t15.elapsedTime;
            const t16 = await MongoTest16();
            console.log("Test 16 Response Time: " + t16.elapsedTime + " nanoseconds." + "(" + t16.docCount + " Documents)");
            t16Avg += t16.elapsedTime;
            const t17 = await MongoTest17();
            console.log("Test 17 Response Time: " + t17.elapsedTime + " nanoseconds." + "(" + t17.docCount + " Documents)");
            t17Avg += t17.elapsedTime;
            const t18 = await MongoTest18();
            console.log("Test 18 Response Time: " + t18.elapsedTime + " nanoseconds." + "(" + t18.docCount + " Documents)");
            t18Avg += t18.elapsedTime;
        }

        t9Avg /= runs;
        t10Avg /= runs;
        t11Avg /= runs;
        t12Avg /= runs;
        t13Avg /= runs;
        t14Avg /= runs;
        t15Avg /= runs;
        t16Avg /= runs;
        t17Avg /= runs;
        t18Avg /= runs;
        
        console.log("Average Test 9 Response Time: " + t9Avg + " nanoseconds.");
        console.log("Average Test 10 Response Time: " + t10Avg + " nanoseconds.");
        console.log("Average Test 11 Response Time: " + t11Avg + " nanoseconds.");
        console.log("Average Test 12 Response Time: " + t12Avg + " nanoseconds.");
        console.log("Average Test 13 Response Time: " + t13Avg + " nanoseconds.");
        console.log("Average Test 14 Response Time: " + t14Avg + " nanoseconds.");
        console.log("Average Test 15 Response Time: " + t15Avg + " nanoseconds.");
        console.log("Average Test 16 Response Time: " + t16Avg + " nanoseconds.");
        console.log("Average Test 17 Response Time: " + t17Avg + " nanoseconds.");
        console.log("Average Test 18 Response Time: " + t18Avg + " nanoseconds.");

        // Terminate the Node.js process
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1); // Terminate with an error code
    }
})();

