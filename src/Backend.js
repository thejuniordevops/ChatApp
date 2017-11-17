import firebase from 'firebase';

class Backend {
    uid = '';
    messageRef = null;
    // initialize Firebase Backend
    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyDq4SKBi5GB8vNOSJCIz9DPq9krVtz7SU0",
            authDomain: "myreactchat.firebaseapp.com",
            databaseURL: "https://myreactchat.firebaseio.com",
            // projectId: "myreactchat",
            storageBucket: "",
            // messagingSenderId: "888018853088"
            storageBucket: "myreactchat.appspot.com",
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setUid(user.uid);
            } else {
                firebase.auth().signInAnonymously().catch((error) => {
                    alert(error.message);
                });
            }
        });
    }

    setUid(value) {
        this.uid = value;
    }

    getUid() {
        return this.uid;
    }

    // retreve the message from the Backend
    loadMessages(callback) {
        this.messagesRef = firebase.database().ref('messages');
        this.messagesRef.off();
        const onReceive = (data) => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.user_id,
                    name: message.user.name,
                },
            });
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
    }

    // send the message to the Backend
    sendMessage(message) {
        for (let i = 0; i < message.length; i++) {
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            });
        }
    }

    // close the connection to the Backend
    closeChat() {
        if (this.messagesRef) {
            this.messagesRef.off();
        }
    }
}

export default new Backend();
