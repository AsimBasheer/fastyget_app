import * as Firebase from "firebase";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_STORAGE_BUCKET
} from "react-native-dotenv";
const FbApi = Firebase.initializeApp(Object.freeze({
    apiKey: "AIzaSyBvHzs2PHli7IlVKW1qWy24BKy3vTpCotI",
    authDomain: "appleauth-bc1a8.firebaseapp.com",
    projectId: "appleauth-bc1a8",
    storageBucket: "appleauth-bc1a8.appspot.com",
    messagingSenderId: "436618574045",
    appId: "1:436618574045:web:18adb82a05ae4037050334",
    measurementId: "G-YJ9DZZ2TZ3"
    
})
)
const loginWithApple = async () => {
//   ... // Get identityToken as above
  if (identityToken) {
    const provider = new FbApi.auth.OAuthProvider("apple.com");
    const credential = provider.credential({
      idToken: identityToken,
      rawNonce: nonce // nonce value from above
    });
    await FbApi.auth().signInWithCredential(credential);
  }
}
export default loginWithApple