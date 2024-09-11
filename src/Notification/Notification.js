// import axios from 'axios';

// const SERVER_KEY = 'AAAAk4B92wQ:APA91bGjdnezwY6FZ34310CXEf8axAY7Vv1Mh0eQtV4Koav0tygcGVv5jpr8qKF7DJeYQCgviMahqMDb_PbvF8OqiJwz-dkSk1fg_0rwAPiuAx1AJnyvFyToXP_uRZ8j0BNPZqqIOw9v';

// const sendNotification = async (fcmToken, title, body) => {

//     const message = {
//         to: fcmToken,
//         notification: {
//             title: title,
//             body: body,
//         },
//     };

//     try {
//         const response = await axios.post(`https://fcm.googleapis.com/v1/projects/forex-specialist/messages:send`, message, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `key=${SERVER_KEY}`,
//                 'Authorization': 'Bearer ya29.ElqKBGN2Ri_Uz...HnS_uNreA'
//             },
//         });

//         console.log('Successfully sent message:', response.data);
//     } catch (error) {
//         console.error('Error sending message:', error.response ? error.response.data : error.message);
//     }
// };



// export default sendNotification;