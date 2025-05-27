import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";

const firebase = {
    apiKey: "AIzaSyDxSFG04MsIQRwcBadxDUo4eSziXk-6WKk",
    authDomain: "ratemyclass-bdfe3.firebaseapp.com",
    projectId: "ratemyclass-bdfe3",
    storageBucket: "ratemyclass-bdfe3.firebasestorage.app",
    messagingSenderId: "786639731213",
    appId: "1:786639731213:web:161b085b6c54be2bfc7344"
};

const app = initializeApp(firebase);
const data = getFirestore(app);

//schools var
const schools = collection(data, "Schools");


//connects to database (classes var)
const classes = collection(data, "Schools", "YKHyBrcPZ675f7xshxV1", "Classes");


//add review to database
//TODO: find a way to import selection of school, class
export const addRating = async (rating) => {
    try {
        const docRef = await addDoc(classes, id, {
            difficulty: rating.difficulty,
            downvotes: rating.downvotes,
            enjoyment: rating.enjoyment,
            grade: rating.grade || null,
            prof: rating.prof || null,
            rating: rating.rating,
            relevanceToUser: rating.relevanceToUser,
            tags: rating.tags,
            upvotes: rating.upvotes,
            user: rating.user,
            verification: rating.verification || false,
            timeCreated: new Date().getTime()
        });

        return { ...rating, id: docRef.id };
    } catch (error) {
        console.error("Error leaving review: ", error);
        return rating;
    }
};

//Load Classes
export const getClasses = async () => {
    try {
        const q = query(classes, orderBy("rating"));
        const querySnapshot = await getDocs(q);
        const allClasses = [];

        querySnapshot.forEach((doc) => {
            allClasses.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return allClasses;
    } catch (error) {
        console.error("Error getting classes: ", error);
        return [];
    }
};


//Load Ratings & in-depth Class info
export const getRatings = async () => {
    try {
        const q = query(classes, orderBy("timeCreated"));
        const querySnapshot = await getDocs(q);
        const allRatings = [];

        querySnapshot.forEach((doc) => {
            allRatings.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return allRatings;

    } catch (error) {
        console.error("Error getting ratings: ", error);
        return [];
    }
}

export { app, data};
