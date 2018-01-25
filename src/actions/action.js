import ActionTypes from '../constant/constant';
import history from '../History';
import firebase from 'firebase';


var config = {
    apiKey: "AIzaSyAdrj4rkaZv6uTn_rQEUK2mMGusRJmvLT8",
    authDomain: "todo-app-redux-8db72.firebaseapp.com",
    databaseURL: "https://todo-app-redux-8db72.firebaseio.com",
    projectId: "todo-app-redux-8db72",
    storageBucket: "todo-app-redux-8db72.appspot.com",
    messagingSenderId: "572126382108"
};
firebase.initializeApp(config);


export function signupAction(user) {
    return dispatch => {
        // console.log(user);
        //
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((createdUser) => {

                // console.log('User Signed Up');

                delete user.password
                
                firebase.database().ref('users/' + createdUser.uid + '/').set(user);
                dispatch({ type: ActionTypes.USERNAME, payload: user })
                history.push('/signin')

            })
        //
        //     firebase.database().ref('users/').on('child_added' , function(snapshot){
        //         let key = snapshot.key;
        //         let data = snapshot.val();

        //         let allUsers = []
        //         allUsers.push(data);
        // dispatch({ type: ActionTypes.ALLUSERS, payload: allUsers })


        // let allUSERS= firebase.database().ref('users').once('value')
        // .then((userData) => {
        //     let users = [];

        //     let allUsers = userData.val();
        //     users.push(allUsers)
        //     dispatch({ type: ActionTypes.ALLUSERS, payload: users })


        //     console.log('All users');
        //     console.log(users)

        //     history.push('/home')
        // }
        // )
    }
}

export function signinAction(users) {
    // console.log(users);
    return dispatch => {

        firebase.auth().signInWithEmailAndPassword(users.email, users.password)
            .then(() => {

                let currentUserUid = firebase.auth().currentUser.uid
                dispatch({ type: ActionTypes.CURRENTUSER, payload: users })
                dispatch({ type: ActionTypes.CURRENTUSER_UID, payload: currentUserUid })
                dispatch({ type: ActionTypes.ISAUTH, payload: true })

                history.push('/home');

            })
    }
}

export function submitToDo(todo) {
    // console.log(todo);
    return dispatch => {

        // console.log("Action Todo");

        let Todo = []
        Todo.push(todo);
        // let user = firebase.auth().currentUser.uid;
        // firebase.database().ref('users/' + createdUser.uid + '/').set(user);
        
        // firebase.database().ref(`todo/ ${user}`).push(Todo);

        dispatch({ type: ActionTypes.TODO, payload: Todo })
        dispatch({type: ActionTypes.DELTE, payload: true})
        
        // console.log("Action Dispatched for Todo");

        // todo.map((todo, index) => {
        //     return (
        //         <div>

        //         </div>
        //     )
        // })
        

        // todo.map((todo, index) => {
        //       <li key=index>{todo}</li>
        //     })

    }
}