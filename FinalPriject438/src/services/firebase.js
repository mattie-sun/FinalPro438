import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, getDoc, deleteDoc, doc, updateDoc, query, orderBy, increment} from "firebase/firestore";

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
//connects to database (classes var)
const classes = collection(data, "Schools", "YKHyBrcPZ675f7xshxV1", "Classes");



async function addClass(data) {
    try {
        const docRef = await addDoc(classes, {
            difficulty: data.difficulty,
            downvotes: data.downvotes,
            enjoyment: data.enjoyment,
            grade: data.grade || null,
            prof: data.prof || null,
            relevanceToUser: data.relevanceToUser,
            tags: data.tags,
            upvotes: data.upvotes,
            user: data.user,
            verification: data.verification || false,
            timeCreated: new Date().getTime()
        });

        return { ...data, id: docRef.id };
    } catch (error) {
        console.error("Error leaving review: ", error);
        return data;
    }
}



//get one class by ID
export const getClassById = async (id) => {
    try {
        const classRef = doc(data, "Schools", "YKHyBrcPZ675f7xshxV1", "Classes", id);
        const snapshot = await getDoc(classRef);
        if (!snapshot.exists()) {
            throw new Error("Class info not found");
        }
        return { id: snapshot.id, ...snapshot.data() };
    } catch (error) {
        console.error("Error fetching class by ID:", error);
        return null;
    }
};

//Load Classes
export const getClasses = async (searchQuery = '') => {
    try {
        const q = query(classes);
        const querySnapshot = await getDocs(q);
        const allClasses = [];

        querySnapshot.forEach((doc) => {
            const department = data.department ? data.department.toLowerCase() : "";
            const courseTitle = data.courseTitle ? data.courseTitle.toLowerCase() : "";
            const searchQueryTrim = searchQuery.trim().toLowerCase()

            if (
                !searchQueryTrim || department.includes(searchQueryTrim) || courseTitle.includes(searchQueryTrim)
            ) {
                allClasses.push({
                    id: doc.id,
                    ...doc.data()
                });
            }
        });
        console.log(allClasses)
        return allClasses;

    } catch (error) {
        console.error("Error getting classes: ", error);
        return [];
    }
};



export const addRating = async (classID, ratingInfo) => {
    const ratingsCollection = collection(data, "Schools","YKHyBrcPZ675f7xshxV1","Classes", classID , "Ratings");
    try {
        const docRef = await addDoc(ratingsCollection, {
            difficulty: ratingInfo.difficulty,
            enjoyment: ratingInfo.enjoyment,
            // grade: ratingInfo.grade || null,
            prof: ratingInfo.prof || null,
            rating: ratingInfo.rating,
            // relevanceToUser: ratingInfo.relevanceToUser || null,
            // tags: ratingInfo.tags || null,
            user: ratingInfo.user || null,
            votes: 0,
            upvotes: ratingInfo.upvotes || 0,
            downvotes: ratingInfo.downvotes || 0,
            // verification: ratingInfo.verification || false,
            message: ratingInfo.message,
            timeCreated: new Date().getTime()
        });

        return { ...ratingInfo, id: docRef.id };
    } catch (error) {
        console.error("Error leaving review: ", error);
        return ratingInfo;
    }
};


//Load Ratings
export const getRatings = async(classID) => {
    const ratingsCollection = collection(data, "Schools","YKHyBrcPZ675f7xshxV1","Classes", classID , "Ratings");
    try {
        const q = query(ratingsCollection);
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

//Increment upvotes
export const upvote = async (classID, ratingID, upvote) => {
    const curRating = doc(data, "Schools","YKHyBrcPZ675f7xshxV1","Classes", classID , "Ratings", ratingID);
    try {
        console.log("added 1")
        await updateDoc(curRating, { upvotes: upvote + 1 })
    } catch (error) {
        console.error("Error upvoting: ", error);
    }
}


//Incrememnt downvotes
export const downvote = async (classID, ratingID, downvote) => {
    const curRating = doc(data, "Schools","YKHyBrcPZ675f7xshxV1","Classes", classID , "Ratings", ratingID);
    try {
        await updateDoc(curRating, { downvotes: downvote + 1})
    } catch (error) {
        console.error("Error downvoting: ", error);
    }
}

export const calculateAverages = async (classID) => {
    const ratingsCollection = collection(data, "Schools", "YKHyBrcPZ675f7xshxV1", "Classes", classID, "Ratings");
    try {
        const q = query(ratingsCollection);
        const querySnapshot = await getDocs(q);
        let totalEnjoyment = 0;
        let totalDifficulty = 0;
        let totalRating = 0;
        let count = 0;

        querySnapshot.forEach((doc) => {
            const rating = doc.data();
            totalEnjoyment += Number(rating.enjoyment) || 0;
            totalDifficulty += Number(rating.difficulty) || 0;
            totalRating += Number(rating.rating) || 0;
            count++;
        });

        if (count === 0) {
            return {
                enjoyment: null,
                difficulty: null,
                rating: null,
            };
        } else {
            return {
                enjoyment: totalEnjoyment / count,
                difficulty: totalDifficulty / count,
                rating: totalRating / count,
            };
        }
    } catch (error) {
        console.error("Error getting ratings: ", error);
        return {
            enjoyment: null,
            difficulty: null,
            rating: null,
        };
    }
};



export {app, data};

