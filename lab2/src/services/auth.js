// import auth from '@react-native-firebase/auth';





// const userDocument = firestore().conllection('User').get();



// const signUp = (fullname,email,password) =>
// {
//     if(!fullname || !email || !password)
//     {
//       Alert.alert('Enter Data')
//     }
//     else{
//       return auth().createUserWithEmailAndPassword(email.trim(),password)
//       .then(cred => {
//         const{uid} = cred.user;
//         auth().currentUser?.updateProfile({
//           displayName: fullname
//         })

//         return uid
//       } )
//       .catch(
//         err =>alert(err.code,err.message)
//       )
//     }
// }

// const signIn =(email,password) =>
// {
//   if (!email || !password)
//   {
//     return auth().signInWithEmailAndPassword(email.trim().password)
//     .then(() =>
//     {
//       console.log(auth().currentUser?.uid)
//     })
//     .catch(
//       err => Alert.alert(err.code,err.message)
//     )
//   }
// }

// const signOut =()=>
// {
//   return auth().signOut()
// }

// const Auth ={
//   signIn,
//   signOut,
//   signUp,
// }

// export default Auth;


