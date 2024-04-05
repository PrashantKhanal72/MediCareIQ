// VideoCall.js
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import EndCall from "../Assets/callEnd.png";
import AcceptCall from "../Assets/accept-call.webp";
import Mic from "../Assets/mic.png";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { clearToken } from "../Api/payment";

// io( url , options )
export const socket = io("https://appointment-c3wa.onrender.com", {
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
  const [mute, setMute] = useState(true);
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  console.log("user", user);

  const { doctorId, token } = useParams();

  useEffect(() => {
    socket.on("updateOnlineUsers", (users) => {
      console.log("Online users", users);
      setOnlineUsers(users);
    });

    socket.on("incomingCall", ({ callerUsername, offer, token }) => {
      setIncomingCall({ callerUsername, offer, token });
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

  useEffect(() => {
    handleCallUser(doctorId);
  }, [doctorId]);

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

    socket.emit("callUser", { calleeUsername, offer, token });

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

    // setIncomingCall(null);
    dispatch(
      clearToken({
        token: incomingCall?.token,
        patient_id: incomingCall?.callerUsername,
      })
    );
  };
  

  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="mt-2">
          {" "}
          {/* <ul>
          {onlineUsers.map((user, index) => (
            <li key={index}>
              {user} <button onClick={() => handleCallUser(doctorId)}>Call</button>
            </li>
          ))}
        </ul> */}
          {incomingCall && (
            <div className="w-full flex justify-center">
              {/* <p>Incoming call from {incomingCall.callerUsername}</p> */}
              <div className="h-12 w-12 flex items-center gap-4 mt-2 mb-1">
                <h2 className="text-[16px] whitespace-nowrap leading-[20px] font-semibold">
                  Incoming Call
                </h2>
                <img
                  onClick={handleAcceptCall}
                  src={AcceptCall}
                  alt="end call"
                  className="h-full w-full hover:cursor-pointer object-fill"
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col px-10  items-center">
          {/* {remoteVideoRef ? ( */}
            <div className="h-[400px] max-w-[800px]  w-full">
              <video
                className="h-full w-full max-w-full"
                ref={remoteVideoRef}
                autoPlay
              ></video>
            </div>
          {/* )  */}
        </div>
        <div className="flex gap-10 mt-1 w-full justify-center items-center">
          <div className="max-w-[800px] w-full flex items-center justify-between">
            <div className="flex-1 flex justify-center">
              <div className="h-12 w-12">
                <img
                  src={EndCall}
                  alt="end call"
                  className="h-full w-full object-fill"
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              {/* <h2>Local Video</h2> */}
              <video
                className="h-[150px] max-w-full"
                ref={localVideoRef}
                autoPlay
                muted={mute}
              ></video>
            </div>
          </div>
        </div>
        <div className="flex gap-8 w-full justify-center mt-10">
          {/* <div className="h-12 w-12">
            <img
              src={EndCall}
              alt="end call"
              className="h-full w-full object-fill"
            />
          </div> */}
          {/* <div className="h-12 rounded-full bg-[#b0b0f3] p-2 w-12">
            <img
              src={Mic}
              alt="end call"
              className="h-full w-full object-fill"
            />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default VidoeCall;
