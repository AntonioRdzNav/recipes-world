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

    const recipeId = context.params.recipeId;

    return admin.firestore().runTransaction((transaction) => {
      const recipeDocRef = recipesCollectionRef.doc(recipeId);
      return transaction.get(recipeDocRef).then((doc) => {
        if(!doc.exists) {
          return null;
        }
        const prevAvgRating = doc.data().avg_rating;
        const prevTotalReviews = doc.data().total_reviews;
        
        
        // calculate new data depending on what happened: CREATE, UPDATE or DELETE
        const lastRating = (change.before.data() || {}).rating;
        const newRating = (change.after.data() || {}).rating;
        let incomingRating = null;
        let newTotalReviews = null;
        let newAvgRating = null;
        if(!lastRating && newRating) {
          // onCreate
          console.log("dev: EVENT: ", "onCreate")
          incomingRating = newRating;
          newTotalReviews = prevTotalReviews + 1;
        } else if(lastRating && newRating) {
          // onUpdate
          console.log("dev: EVENT: ", "onUpdate")
          incomingRating = newRating - lastRating;
          newTotalReviews = prevTotalReviews + 0;          
        } else if(lastRating && !newRating) {
          // onDelete
          console.log("dev: EVENT: ", "onDelete")
          incomingRating = 0 - lastRating;
          newTotalReviews = prevTotalReviews - 1;          
        }        
        else {
          return null;
        }


        // calculate new average using basic math operations
        if(newTotalReviews > 0) {
          newAvgRating = parseFloat((((prevAvgRating * prevTotalReviews) + incomingRating) / newTotalReviews).toFixed(2));
        } else if (newTotalReviews === 0) {
          newAvgRating = 0;
        } else {
          return null
        }

        
        // update recipe document
        return transaction.set(recipeDocRef, { 
          avg_rating: newAvgRating,
          total_reviews: newTotalReviews,
          updatedAt: firestoreFieldValueRef.serverTimestamp(),
        }, { merge:true });
      })
    });
  });