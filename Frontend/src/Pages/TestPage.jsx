// Import necessary React hooks and the Socket.IO client library.
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// Initialize the Socket.IO client to connect to the server.
const socket = io('http://localhost:4000');

function TestPage() {
    // State hooks for managing component state.
    const [username, setUsername] = useState(''); // User's chosen username.
    const [onlineUsers, setOnlineUsers] = useState([]); // List of users currently online.
    const [incomingCall, setIncomingCall] = useState(null); // Information about any incoming call.
    const [callerUsername, setCallerUsername] = useState(''); // Username of the caller.
    // Refs for video elements and the peer connection.
    const localVideoRef = useRef(); // Ref to the local video element.
    const remoteVideoRef = useRef(); // Ref to the remote video element.
    const peerConnection = useRef(); // Ref to the WebRTC peer connection object.

    useEffect(() => {
        // Socket event listeners setup on component mount.

        // Updates the list of online users, excluding the current user.
        socket.on('updateOnlineUsers', (users) => {
            setOnlineUsers(users.filter(user => user !== username));
        });

        // Handles an incoming call by setting the state with the caller's information.
        socket.on('incomingCall', ({ callerUsername, offer }) => {
            setIncomingCall({ callerUsername, offer });
        });

        // Updates the peer connection with the remote description once a call is accepted.
        socket.on('callAccepted', (answer) => {
            peerConnection.current.setRemoteDescription(answer);
        });

        // Adds incoming ICE candidates to the peer connection.
        socket.on('iceCandidate', (candidate) => {
            peerConnection.current.addIceCandidate(candidate);
        });

        // Cleanup function to remove event listeners on component unmount.
        return () => {
            socket.off('updateOnlineUsers');
            socket.off('incomingCall');
            socket.off('callAccepted');
            socket.off('iceCandidate');
        };
    }, [username]); // Effect reruns if the username changes.

    // Emits an event to set the user's username.
    const handleSetUsername = () => {
        socket.emit('setUsername', username);
    };

    // Initiates a call to another user.
    const handleCallUser = async (calleeUsername) => {
        // Find the callee's socket ID from the list of online users.
        const calleeSocketId = onlineUsers.find(user => user.username === calleeUsername)?.socketId;

        // Guard clause if callee is not found or not online.
        if (!calleeSocketId) {
            console.log('Callee is not online');
            return;
        }

        // Request access to the local media (video and audio).
        const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        // Set the local video stream to be displayed in the UI.
        localVideoRef.current.srcObject = localStream;

        // Initialize a new peer connection.
        peerConnection.current = new RTCPeerConnection();
        // Add each track from the local stream to the peer connection.
        localStream.getTracks().forEach((track) => {
            peerConnection.current.addTrack(track, localStream);
        });

        // Handle the event when the remote track is received.
        peerConnection.current.ontrack = (event) => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        // Create an offer to start the video call and set the local description.
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);

        // Emit a 'callUser' event with the callee's username and the offer.
        socket.emit('callUser', { calleeUsername, offer });

        // Handle ICE candidate generation by emitting an 'iceCandidate' event.
        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('iceCandidate', { targetUsername: calleeUsername, candidate: event.candidate });
            }
        };
    };

    // Handles accepting an incoming call.
    const handleAcceptCall = async () => {
        // Similar to `handleCallUser`, gets local media and sets up peer connection.
        const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = localStream;

        peerConnection.current = new RTCPeerConnection();
        localStream.getTracks().forEach((track) => {
            peerConnection.current.addTrack(track, localStream);
        });

        peerConnection.current.ontrack = (event) => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        // Set the remote description with the offer from the caller.
        await peerConnection.current.setRemoteDescription(incomingCall.offer);
        // Create and set the local description with an answer.
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);

        // Emit an 'acceptCall' event with the answer.
        socket.emit('acceptCall', { callerUsername: incomingCall.callerUsername, answer });

        // Handle ICE candidate generation.
        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('iceCandidate', { targetUsername: incomingCall.callerUsername, candidate: event.candidate });
            }
        };

        // Reset incoming call state.
        setIncomingCall(null);
    };


    return (
        <div>
        {/* UI for setting username, listing online users, handling calls, and displaying video streams. */}
            <h1>Welcome to Video Calling TestPage</h1>
            {!username && (
                <div>
                    <input type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
                    <button onClick={handleSetUsername}>Set Username</button>
                </div>
            )}
            {username && (
                <div>
                    <h2>Online Users</h2>
                    <ul>
                        {onlineUsers.map((user, index) => (
                            <li key={index}>
                                {user.username} <button onClick={() => handleCallUser(user.username)}>Call</button>
                            </li>
                        ))}
                    </ul>
                    {incomingCall && (
                        <div>
                            <p>Incoming call from {incomingCall.callerUsername}</p>
                            <button onClick={handleAcceptCall}>Accept</button>
                        </div>
                    )}
                </div>
            )}
            <div>
                <h2>Local Video</h2>
                <video ref={localVideoRef} autoPlay muted></video>
            </div>
            <div>
                <h2>Remote Video</h2>
                <video ref={remoteVideoRef} autoPlay></video>
            </div>
        </div>
    );
}

export default TestPage;
