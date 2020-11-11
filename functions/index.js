const functions = require('firebase-functions');
const admin = require('firebase-admin');


  // admin.functions().useEmulator("localhost", 5001);
  admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// //

const recipesCollectionRef = admin.firestore().collection("recipes");
const firestoreFieldValueRef = admin.firestore().FieldValue;

exports.updateRecipeReviewAnalyticsData = functions
  .firestore
  .document("/recipes/{recipeId}reviews/{reviewId}")
  .onCreate(async (snapshot) => {
    const reviewData = snapshot.data();
    if(!reviewData) {
      return null;
    }

    const newRating = reviewData.rating;
    const parentRecipeDocumentId = await snapshot.getRef().getParent().getParent().getId();

    return recipesCollectionRef
      .doc(parentRecipeDocumentId)
      .set({
        avg_rating: 5,
        total_ratings: firestoreFieldValueRef.increment(1),
        updatedAt: firestoreFieldValueRef.serverTimestamp(),
      }, { merge:true });
  });