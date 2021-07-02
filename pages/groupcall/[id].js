// import React, { useState, useRef, useEffect } from 'react';
// import Peer from 'simple-peer';
// import io from 'socket.io-client';
// const GroupCallId = () => {
//   const [yourID, setYourID] = useState('');
//   const [users, setUsers] = useState({});
//   const [stream, setStream] = useState(null);
//   const [receivingCall, setReceivingCall] = useState(false);
//   const [caller, setCaller] = useState('');
//   const [callerSignal, setCallerSignal] = useState('');
//   const [callAccepted, setCallAccepted] = useState(false);

//   const userVideo = useRef();
//   const partnerVideo = useRef();
//   const socket = useRef();

//   const callPeer = (id) => {
//     console.log('clicked peer');
//     const peer = new Peer({
//       // Tells whether the person who made the call is the initiator
//       initiator: true,
//       trickle: false,
//       // Sending the stream to the other user
//       stream
//     });
//     peer.on('signal', (data) => {
//       socket.current.emit('callUser', {
//         userToCall: id,
//         signalData: data,
//         from: yourID
//       });
//     });
//     peer.on('stream', (stream) => {
//       console.log('partner', stream);
//       if (partnerVideo.current) {
//         partnerVideo.current.srcObject = stream;
//       }
//     });
//     // When the other user accepted the call , the signal from him will be sent back
//     // to complete handshake
//     socket.current.on('callAccepted', (signal) => {
//       console.log('accepted');
//       setCallAccepted(true);
//       // accept the incoming signal (the other user sends back)
//       peer.signal(signal);
//     });
//   };

//   const acceptCall = () => {
//     setCallAccepted(true);
//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//       stream
//     });
//     peer.on('signal', (data) => {
//       socket.current.emit('acceptCall', { signal: data, to: caller });
//     });
//     peer.on('stream', (stream) => {
//       partnerVideo.current.srcObject = stream;
//     });

//     peer.signal(callerSignal);
//   };

//   useEffect(() => {
//     // Create New Socket Instance
//     if (!socket.current) {
//       socket.current = io(process.env.BASE_URL, {
//         path: '/api/rooms'
//       });
//     }
//     // Get Media Stream
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         console.log(stream, navigator);
//         setStream(stream);
//       });
//     // Set Stream to video tag as srcObject
//     if (userVideo.current) {
//       userVideo.current.srcObject = stream;
//     }

//     if (socket.current) {
//       socket.current.on('yourID', (id) => {
//         setYourID(id);
//         console.log('yourId', id);
//       });
//       socket.current.on('allUsers', (users) => {
//         setUsers(users);
//         console.log(users, 'users');
//       });

//       // When we are receiving call
//       socket.current.on('hey', (data) => {
//         console.log('received hey!', data);
//         setReceivingCall(true);
//         setCaller(data.from);
//         setCallerSignal(data.signal);
//       });
//     }
//   }, []);

//   return (
//     <div>
//       <video className="h-screen w-screen" muted ref={userVideo} autoPlay />;
//       <video className="h-screen w-screen" muted ref={partnerVideo} autoPlay />;
//       <div>
//         {Object.keys(users).map((key) => {
//           if (key === yourID) {
//             return null;
//           }
//           return (
//             <button
//               className="mr-5 bg-main text-white"
//               onClick={() => callPeer(key)}
//             >
//               Call {key}
//             </button>
//           );
//         })}
//         {receivingCall && (
//           <div>
//             <button onClick={() => acceptCall()}>Accept Call</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GroupCallId;
