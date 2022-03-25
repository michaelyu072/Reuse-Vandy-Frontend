import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
  } from 'firebase/auth';

async function signIn() {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
}

function signOutUser() {
    signOut(getAuth());
}

function getUserID() {
  return getAuth().currentUser.uid;
}

function displayUserPosts() {
  const [dataArray, setDataArray] = useState([]);

  firebase.initializeApp(config);
  const db = firebase.firestore();
  const itemsRef = db.collection("items");
  const query = itemsRef.where('uid', '==', getUserID());
  query.get().then(items => {
    var newData = [];
    items.forEach(doc => {
      newData.push(doc.data());
    });
    setDataArray(newData);
  })

  return (
      <section className = 'resultsBox'>
          {dataArray.length != 0 ? dataArray.map((c, index) => {
                 if(index < 40) {
                  return <ResultItem data = {dataArray[index]} key = {index}/>;
                 }
          }) : <p>Loading</p>}
      </section>
  );
}

function filterByTag(tag) {
  const [dataArray, setDataArray] = useState([]);

  firebase.initializeApp(config);
  const db = firebase.firestore();
  const itemsRef = db.collection("items");
  const query = itemsRef.where('tag', '==', tag);
  query.get().then(items => {
    var newData = [];
    items.forEach(doc => {
      newData.push(doc.data());
    });
    setDataArray(newData);
  })

  return (
      <section className = 'resultsBox'>
          {dataArray.length != 0 ? dataArray.map((c, index) => {
                 if(index < 40) {
                  return <ResultItem data = {dataArray[index]} key = {index}/>;
                 }
          }) : <p>Loading</p>}
      </section>
  );
}