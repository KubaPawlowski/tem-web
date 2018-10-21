import { firebase, database } from '.';

export const email = () => {
  const { currentUser } = firebase.auth;
  const currentUserUid = currentUser.uid;
  let emailValue;
  return database.doFetch(`users/${currentUserUid}/user-data/email`).once(
    'value',
    (snapshot) => {
      emailValue = snapshot.val();
    },
  ).then(() => { return emailValue; });
};

export const userName = () => {
  const { currentUser } = firebase.auth;
  const currentUserUid = currentUser.uid;
  let userNameValue;
  return database.doFetch(`users/${currentUserUid}/user-data/fullname`).once(
    'value',
    (snapshot) => {
      userNameValue = snapshot.val();
    },
  ).then(() => { return userNameValue; });
};
