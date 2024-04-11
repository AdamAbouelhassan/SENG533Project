const { MongoClient, ObjectId } = require('mongodb');
const { spawn } = require('child_process');

const uri = "mongodb+srv://aabouelh:ix87VDhmFYKoBuzV@cluster0.e6z56dx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

const collection = client.db('TestDb').collection('TestCol');

const dummyItems = Array(1000).fill({ username: "fmiller", name: "Elizabeth Ray", address: "9286 Bethany Glens\nVasqueztown, CO 22939", birthdate: new Date('2022-01-01'), email: "arroyocolton@gmail.com", active: true, accounts: [{ "$numberInt": "371138" }, { "$numberInt": "324287" }, { "$numberInt": "276528" }, { "$numberInt": "332179" }, { "$numberInt": "422649" }, { "$numberInt": "387979" }], tier_and_details: { "0df078f33aa74a2e9696e0520c1a828a": { tier: "Bronze", id: "0df078f33aa74a2e9696e0520c1a828a", active: true, benefits: ["sports tickets"] }, "699456451cc24f028d2aa99d7534c219": { tier: "Bronze", benefits: ["24 hour dedicated line", "concierge services"], active: true, id: "699456451cc24f028d2aa99d7534c219" } } });

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
async function MongoTest1() {
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
async function MongoTest2() {
    const startTime = process.hrtime.bigint();

    // Fetch documents
    const documents = await collection.find({ username: "fmiller", name: "Elizabeth Ray", address: "9286 Bethany Glens\nVasqueztown, CO 22939" }).toArray();

    // Calculate elapsed time
    const endTime = process.hrtime.bigint();
    const elapsedTime = endTime - startTime;
    const docCount = documents.length;

    return { elapsedTime: elapsedTime, docCount: docCount };
}

// Fields = 7
// User load = 1
// Indexed = No
async function MongoTest3() {
    const startTime = process.hrtime.bigint();

    // Fetch documents
    const documents = await collection.find({ username: "fmiller", name: "Elizabeth Ray", address: "9286 Bethany Glens\nVasqueztown, CO 22939", birthdate: new Date('2022-01-01'), email: "arroyocolton@gmail.com", active: true, accounts: [{ "$numberInt": "371138" }, { "$numberInt": "324287" }, { "$numberInt": "276528" }, { "$numberInt": "332179" }, { "$numberInt": "422649" }, { "$numberInt": "387979" }] }).toArray();

    // Calculate elapsed time
    const endTime = process.hrtime.bigint();
    const elapsedTime = endTime - startTime;
    const docCount = documents.length;

    return { elapsedTime: elapsedTime, docCount: docCount };
}

// Fields = 3
// User load = 1
// Indexed = Yes
async function MongoTest4() {

    try {
        // create index
        const indexName = 'testIndex';
        const keys = { username: 1, name: 1, birthdate: 1 };
        const options = { name: indexName };
        const result = await collection.createIndex(keys, options);
        console.log('Index created:', result);
    } catch (error) {
        console.log("Couldn't create index, it may already exist", error);
    }

    const startTime = process.hrtime.bigint();

    // Fetch documents
    const documents = await collection.find({ username: "fmiller", name: "Elizabeth Ray", birthdate: new Date('2022-01-01') }).toArray();

    // Calculate elapsed time
    const endTime = process.hrtime.bigint();
    const elapsedTime = endTime - startTime;
    const docCount = documents.length;

    return { elapsedTime: elapsedTime, docCount: docCount };
}

// Fields = 1
// User load = 5
// Indexed = No
async function MongoTest5() {
    const startTime = process.hrtime.bigint();

    // Array to store promises for each invocation of MongoTest1
    const promises = Array.from({ length: 5 }, () => MongoTest1());

    try {
        // Run all MongoTest1 invocations simultaneously
        const results = await Promise.all(promises);

        // Calculate elapsed time
        const endTime = process.hrtime.bigint();
        const elapsedTime = endTime - startTime;
        const docCount = results.map(x => x.docCount).reduce((sum, currentValue) => sum + currentValue, 0);

        return { elapsedTime: elapsedTime, docCount: docCount };
    } catch (error) {
        console.error('Error running MongoTest1:', error);
    }
}

// Fields = 1
// User load = 10
// Indexed = No
async function MongoTest6() {
    const startTime = nprocess.hrtime.bigint();

    // Array to store promises for each invocation of MongoTest1
    const promises = Array.from({ length: 10 }, () => MongoTest1());

    try {
        // Run all MongoTest1 invocations simultaneously
        const results = await Promise.all(promises);

        // Calculate elapsed time
        const endTime = process.hrtime.bigint();
        const elapsedTime = endTime - startTime;
        const docCount = results.map(x => x.docCount).reduce((sum, currentValue) => sum + currentValue, 0);

        return { elapsedTime: elapsedTime, docCount: docCount };
    } catch (error) {
        console.error('Error running MongoTest1:', error);
    }
}

// Fields = 1
// User load = 20
// Indexed = No
async function MongoTest7() {
    const startTime = process.hrtime.bigint();

    // Array to store promises for each invocation of MongoTest1
    const promises = Array.from({ length: 20 }, () => MongoTest1());

    try {
        // Run all MongoTest1 invocations simultaneously
        const results = await Promise.all(promises);

        // Calculate elapsed time
        const endTime = process.hrtime.bigint();
        const elapsedTime = endTime - startTime;
        const docCount = results.map(x => x.docCount).reduce((sum, currentValue) => sum + currentValue, 0);

        return { elapsedTime: elapsedTime, docCount: docCount };
    } catch (error) {
        console.error('Error running MongoTest1:', error);
    }
}

// Fields = 1
// User load = 50
// Indexed = No
async function MongoTest8() {
    const startTime = process.hrtime.bigint();

    // Array to store promises for each invocation of MongoTest1
    const promises = Array.from({ length: 50 }, () => MongoTest1());

    try {
        // Run all MongoTest1 invocations simultaneously
        const results = await Promise.all(promises);

        // Calculate elapsed time
        const endTime = process.hrtime.bigint();
        const elapsedTime = endTime - startTime;
        const docCount = results.map(x => x.docCount).reduce((sum, currentValue) => sum + currentValue, 0);

        return { elapsedTime: elapsedTime, docCount: docCount };
    } catch (error) {
        console.error('Error running MongoTest1:', error);
    }
}


(async () => {
    try {
        var t1Avg = BigInt(0);
        var t2Avg = BigInt(0);
        var t3Avg = BigInt(0);
        var t4Avg = BigInt(0);
        var t5Avg = BigInt(0);
        var t6Avg = BigInt(0);
        var t7Avg = BigInt(0);
        var t8Avg = BigInt(0);

        var runs = 3;

        // Call the function to connect
        await connectToMongoDB();
        //await Init();

        for (var i = 0; i < runs; i++) {
            const t1 = await MongoTest1();
            console.log("Test 1 Response Time: " + t1.elapsedTime + " nanoseconds." + "(" + t1.docCount + " Documents)");
            t1Avg += t1.elapsedTime;
            const t2 = await MongoTest2();
            console.log("Test 2 Response Time: " + t2.elapsedTime + " nanoseconds." + "(" + t2.docCount + " Documents)");
            t2Avg += t2.elapsedTime;
            const t3 = await MongoTest3();
            console.log("Test 3 Response Time: " + t3.elapsedTime + " nanoseconds." + "(" + t3.docCount + " Documents)");
            t3Avg += t3.elapsedTime;
            const t4 = await MongoTest4();
            console.log("Test 4 Response Time: " + t4.elapsedTime + " nanoseconds." + "(" + t4.docCount + " Documents)");
            t4Avg += t4.elapsedTime;
            const t5 = await MongoTest5();
            console.log("Test 5 Response Time: " + t5.elapsedTime + " nanoseconds." + "(" + t5.docCount + " Documents)");
            t5Avg += t5.elapsedTime;
            const t6 = await MongoTest6();
            console.log("Test 6 Response Time: " + t6.elapsedTime + " nanoseconds." + "(" + t6.docCount + " Documents)");
            t6Avg += t6.elapsedTime;
            const t7 = await MongoTest7();
            console.log("Test 7 Response Time: " + t7.elapsedTime + " nanoseconds." + "(" + t7.docCount + " Documents)");
            t7Avg += t7.elapsedTime;
            const t8 = await MongoTest8();
            console.log("Test 8 Response Time: " + t8.elapsedTime + " nanoseconds." + "(" + t8.docCount + " Documents)");
            t8Avg += t8.elapsedTime;
        }

        t1Avg /= runs;
        t2Avg /= runs;
        t3Avg /= runs;
        t4Avg /= runs;
        t5Avg /= runs;
        t6Avg /= runs;
        t7Avg /= runs;
        t8Avg /= runs;

        console.log("Average Test 1 Response Time: " + t1Avg + " nanoseconds.");
        console.log("Average Test 2 Response Time: " + t2Avg + " nanoseconds.");
        console.log("Average Test 3 Response Time: " + t3Avg + " nanoseconds.");
        console.log("Average Test 4 Response Time: " + t4Avg + " nanoseconds.");
        console.log("Average Test 5 Response Time: " + t5Avg + " nanoseconds.");
        console.log("Average Test 6 Response Time: " + t6Avg + " nanoseconds.");
        console.log("Average Test 7 Response Time: " + t7Avg + " nanoseconds.");
        console.log("Average Test 8 Response Time: " + t8Avg + " nanoseconds.");

        // Terminate the Node.js process
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1); // Terminate with an error code
    }
})();

