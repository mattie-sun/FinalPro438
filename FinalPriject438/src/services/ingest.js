import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { classes } from './firebase.js';
import { addDoc } from 'firebase/firestore';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the JSON file
const jsonData = JSON.parse(
    readFileSync(join(__dirname, 'xyz.json'), 'utf8')
);

// Function to ingest data
const ingestData = async () => {
    try {
        console.log('Starting data ingestion...');

        for (const item of jsonData) {
            const classData = {
                avgDifficulty: item.avgDifficulty || 0,
                avgEnjoyment: item.avgEnjoyment || 0,
                avgGrade: item.avgGrade || 0,
                avgRating: item.avgRating || 0,
                avgWorkload: item.avgWorkload || 0,
                courseDesc: item.courseDesc || '',
                courseTitle: item.courseTitle || '',
                department: item.department || '',
                lastUpdated: new Date().toISOString(),
                numReviews: item.numReviews || 0,
                tags: item.tags || []
            };

            await addDoc(classes, classData);
            console.log(`Added document for ${classData.courseTitle}`);
        }

        console.log('Data ingestion complete!');
    } catch (error) {
        console.error('Error ingesting data:', error);
    }
};

// Run the ingestion
// ingestData();
