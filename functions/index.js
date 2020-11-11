const functions = require('firebase-functions');
const admin = require('firebase-admin');


// admin.functions().useEmulator("localhost", 5001);
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// //

const recipesCollectionRef = admin.firestore().collection("recipes");
const firestoreFieldValueRef = admin.firestore.FieldValue;

exports.updateRecipeReviewAnalyticsData = functions
  .firestore
  .document("/recipes/{recipeId}/reviews/{reviewId}")
  .onWrite(async (change, context) => {
    const reviewData = change.after.data();
    if(!reviewData) {
      return null;
    }

    const newRating = reviewData.rating;
    const recipeId = context.params.recipeId;
    console.log("change: ",change, "context: ",context);

    return admin.firestore().runTransaction((transaction) => {
      const recipeDocRef = recipesCollectionRef.doc(recipeId);
      return transaction.get(recipeDocRef).then((doc) => {
        if(!doc.exists) {
          return null;
        }
        const prevAvgRating = doc.data().avg_rating;
        const prevTotalReviews = doc.data().total_reviews;
        const newTotalReviews = prevTotalReviews + 1;
        // calculate new average using basic math operations
        const newAvgRating = parseFloat((((prevAvgRating * prevTotalReviews) + newRating) / newTotalReviews).toFixed(2));
        return transaction.set(recipeDocRef, { 
          avg_rating: newAvgRating,
          total_reviews: newTotalReviews,
          updatedAt: firestoreFieldValueRef.serverTimestamp(),
        }, { merge:true });
      })
    });
  });