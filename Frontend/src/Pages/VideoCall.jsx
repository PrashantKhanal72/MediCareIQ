// VideoCall.js
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("https://appointment-c3wa.onrender.com", {
  path: "/api/v1/socket.io",
  transports: ["websocket"],
  upgrade: false,
});

function VidoeCall() {
  const [username, setUsername] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [incomingCall, setIncomingCall] = useState(null);
  const [callerUsername, setCallerUsername] = useState("");
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnection = useRef();

  useEffect(() => {
    socket.on("updateOnlineUsers", (users) => {
      console.log("Online users", users);
      setOnlineUsers(users);
    });

    socket.on("incomingCall", ({ callerUsername, offer }) => {
      setIncomingCall({ callerUsername, offer });
    });

    socket.on("callAccepted", (answer) => {
      const remoteDescription = new RTCSessionDescription(answer);
      peerConnection.current
        .setRemoteDescription(remoteDescription)
        .then(() => {
          console.log("Remote description set successfully");
        })
        .catch((error) => {
          console.error("Error setting remote description:", error);
        });
    });

    socket.on("iceCandidate", (candidate) => {
      const iceCandidate = new RTCIceCandidate(candidate);
      peerConnection.current
        .addIceCandidate(iceCandidate)
        .then(() => {
          console.log("Ice candidate added successfully");
        })
        .catch((error) => {
          console.error("Error adding ice candidate:", error);
        });
    });
    return () => {
      socket.off("updateOnlineUsers");
      socket.off("incomingCall");
      socket.off("callAccepted");
      socket.off("iceCandidate");
    };
  }, [username]); // [dependency]

  const handleSetUsername = () => {
    socket.emit("setUsername", username);
  };

  const handleCallUser = async (calleeUsername) => {
    const calleeSocketId = onlineUsers.find(
      (user) => user === calleeUsername
    )?.socketId;

    // if (!calleeSocketId) {
    //     console.log('Callee is not online');
    //     return;
    // }

    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = localStream;

    peerConnection.current = new RTCPeerConnection();
    localStream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream);
    });

    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    socket.emit("callUser", { calleeUsername, offer });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("iceCandidate", {
          targetUsername: calleeUsername,
          candidate: event.candidate,
        });
      }
    };
  };

  const handleAcceptCall = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = localStream;

    peerConnection.current = new RTCPeerConnection();
    localStream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream);
    });

    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    await peerConnection.current.setRemoteDescription(incomingCall.offer);
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);

    socket.emit("acceptCall", {
      callerUsername: incomingCall.callerUsername,
      answer,
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("iceCandidate", {
          targetUsername: incomingCall.callerUsername,
          candidate: event.candidate,
        });
      }
    };

    setIncomingCall(null);
  };

  return (
    <div>
      <h1>Welcome to Video Calling TestPage</h1>

      <div>
        <input
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSetUsername}>Set Username</button>
      </div>

      <div>
        <h2>Online Users</h2>
        <ul>
          {onlineUsers.map((user, index) => (
            <li key={index}>
              {user} <button onClick={() => handleCallUser(user)}>Call</button>
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

export default VidoeCall;