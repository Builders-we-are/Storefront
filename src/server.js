const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = 'mongodb://localhost:27017'; // Update with your MongoDB URI
const dbName = 'your_db_name'; // Update with your database name
const collectionName = 'czml_files'; // Update with your collection name

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/czml-list', async (req, res) => {
    try {
        const czmlList = await getCzmlListFromMongoDB();
        res.json(czmlList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/czml/:id', async (req, res) => {
    const czmlId = req.params.id;
    try {
        const czmlData = await getCzmlDataById(czmlId);
        res.json({ czmlData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

async function getCzmlListFromMongoDB() {
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const czmlList = await collection.find({}, { projection: { name: 1 } }).toArray();

    client.close();
    return czmlList;
}

async function getCzmlDataById(czmlId) {
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const czmlData = await collection.findOne({ _id: ObjectId(czmlId) });

    client.close();
    return czmlData.czmlData;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});







const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



// ... existing imports ...

const uploadDir = path.join(__dirname, 'uploads');

// Serve the uploaded files statically
app.use('/uploads', express.static(uploadDir));

// ... existing code ...

app.post('/upload-czml', async (req, res) => {
    try {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const czmlFile = req.files.czmlFile;
        const uploadDate = new Date();

        // Generate a unique filename based on the current timestamp
        const filename = `czml_${uploadDate.getTime()}.czml`;

        // Save the uploaded CZML file to the "uploads" directory
        const filePath = path.join(uploadDir, filename);
        czmlFile.mv(filePath);

        // Insert the CZML file info into MongoDB
        await insertCzmlInfoToMongoDB(filename, uploadDate);

        res.status(200).send('CZML file uploaded successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

async function insertCzmlInfoToMongoDB(filename, uploadDate) {
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Create a document with the CZML file info
        const czmlDocument = {
            name: filename,
            uploaddate: uploadDate,
            czmlData: '', // You can set this to an empty string initially
        };

        // Insert the document into the MongoDB collection
        await collection.insertOne(czmlDocument);
    } catch (error) {
        console.error(`Error inserting CZML info into MongoDB: ${error}`);
    } finally {
        client.close();
    }
}

// ... existing code ...
