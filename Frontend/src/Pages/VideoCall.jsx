// VideoCall.js
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import EndCall from "../Assets/callEnd.png";
import AcceptCall from "../Assets/accept-call.webp";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { clearToken } from "../Api/payment";
import { useNavigate } from "react-router-dom";
import { getUserProfile, getprofileById } from "../Api/user";

// Initialize Socket.io connection
export const socket = io("https://medicareiq.onrender.com", {
  path: "/api/v1/socket.io",
  transports: ["websocket"],
  upgrade: false, // Disable upgrade to other transports
});

// Main function component for video calling
function VidoeCall() {
  const [username, setUsername] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [incomingCall, setIncomingCall] = useState(null);
  const [showIncomingCall, setShowIncoimgCall] = useState(false);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnection = useRef();
  const [mute, setMute] = useState(true);
  const dispatch = useAppDispatch();
  console.log(remoteVideoRef, "remoteuiei");
  console.log(localVideoRef, "localRef");
  const navigate = useNavigate();

  // Access the current user from Redux state
  const { user } = useAppSelector((state) => state.user);

  console.log("user", user);

  const { doctorId, token } = useParams(); // Access URL parameters

  // useEffect to handle socket events for updating online users and incoming calls
  useEffect(() => {
    // Listen for online users update
    socket.on("updateOnlineUsers", (users) => {
      console.log("Online users", users);
      setOnlineUsers(users); // Update online users state
    });

    // Listen for incoming call
    socket.on("incomingCall", ({ callerUsername, offer, token }) => {
      setIncomingCall({ callerUsername, offer, token });// Set incoming call details
      setShowIncoimgCall(true); // Show the incoming call UI
    });

    // Listen for call acceptance
    socket.on("callAccepted", (answer) => {
      const remoteDescription = new RTCSessionDescription(answer); // Create remote description from answer
      peerConnection.current
        .setRemoteDescription(remoteDescription) // Set remote description on peer connection
        .then(() => {
          console.log("Remote description set successfully");
        })
        .catch((error) => {
          console.error("Error setting remote description:", error);
        });
    });

     // Listen for ICE candidates
    socket.on("iceCandidate", (candidate) => {
      const iceCandidate = new RTCIceCandidate(candidate); // Create ICE candidate from received candidate
      peerConnection.current
        .addIceCandidate(iceCandidate) // Add ICE candidate to peer connection
        .then(() => {
          console.log("Ice candidate added successfully");
        })
        .catch((error) => {
          console.error("Error adding ice candidate:", error);
        });
    });
    // Cleanup socket event listeners on component unmount
    return () => {
      socket.off("updateOnlineUsers");
      socket.off("incomingCall");
      socket.off("callAccepted");
      socket.off("iceCandidate");
    };
  }, [username]); // Dependency array to re-run effect when username changes

  // useEffect to handle incoming end call message
  useEffect(() => {
    // Listen for end call message
    socket.on("endCall", () => {
      // Close peer connection
      if (peerConnection.current) {
        peerConnection.current.close();
      }

      // Stop local video stream
      const localStream = localVideoRef?.current?.srcObject;
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }

      // Stop remote video stream
      const remoteStream = remoteVideoRef?.current?.srcObject;
      if (remoteStream) {
        remoteStream.getTracks().forEach((track) => track.stop());
      }

      // Redirect user to call end page
      navigate("/call-end", { replace: true });
    });
 // Cleanup socket event listener for end call on component unmount
    return () => {
      socket.off("endCall");
    };
  }, []);

  // useEffect to initiate call when doctorId changes
  useEffect(() => {
    handleCallUser(doctorId);
  }, [doctorId]);

   // Function to handle calling a user
  const handleCallUser = async (calleeUsername) => {
    const calleeSocketId = onlineUsers.find(
      (user) => user === calleeUsername
    )?.socketId;

    // if (!calleeSocketId) {
    //     console.log('Callee is not online');
    //     return;
    // }
    // Get local media stream (video and audio)
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = localStream; // Set local video element's source to the media stream

      // Create a new RTCPeerConnection instance
    peerConnection.current = new RTCPeerConnection();
    localStream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream);  // Add local tracks to peer connection
    });

    // Set handler for remote stream
    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0]; // Set remote video element's source to the received stream
    };

    // Create an offer and set it as the local description
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    // Emit callUser event with callee's username, offer, and token
    socket.emit("callUser", { calleeUsername, offer, token });

     // Handle ICE candidates
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("iceCandidate", {
          targetUsername: calleeUsername,
          candidate: event.candidate,
        });
      }
    };
  };

  // Function to handle accepting a call
  const handleAcceptCall = async () => {
    // Get local media stream (video and audio)
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = localStream;  // Set local video element's source to the media stream

     // Create a new RTCPeerConnection instance
    peerConnection.current = new RTCPeerConnection();
    localStream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream); // Add local tracks to peer connection
    });

    // Set handler for remote stream
    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0]; // Set remote video element's source to the received stream
    };

     // Set remote description with the received offer
    await peerConnection.current.setRemoteDescription(incomingCall.offer);
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);

     // Emit acceptCall event with caller's username and answer
    socket.emit("acceptCall", {
      callerUsername: incomingCall.callerUsername,
      answer,
    });

      // Handle ICE candidates
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("iceCandidate", {
          targetUsername: incomingCall.callerUsername,
          candidate: event.candidate,
        });
      }
    };

    // Hide incoming call UI
    setShowIncoimgCall(false);
    dispatch(
      clearToken({
        token: incomingCall?.token,
        patient_id: incomingCall?.callerUsername,
      })
    );
  };

  // Function to handle ending a call
  const handleEndCall = () => {
    // Emit end call message to the other user
    if (incomingCall && incomingCall.callerUsername) {
      socket.emit("endCall", { targetUsername: incomingCall.callerUsername });
    }

    // Close peer connection
    if (peerConnection.current) {
      peerConnection.current.close();
    }

    // Stop local video stream
    const localStream = localVideoRef.current.srcObject;
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }

    // Stop remote video stream
    const remoteStream = remoteVideoRef.current.srcObject;
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
    }

    // Redirect user to end call page
    navigate("/call-end", { replace: true });
  };

  // useEffect(() => {
  //   if (incomingCall && incomingCall?.callerUsername) {
  //     dispatch(getprofileById(incomingCall?.callerUsername));
  //   }
  // }, [incomingCall]);

  console.log(onlineUsers, 'incomingCall')

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
          {showIncomingCall && (
            <div className="bg-black  h-screen w-screen flex items-center justify-center">
              {/* <p>Incoming call from {incomingCall.callerUsername}</p> */}
              <div className="h-[200px] w-[300px] bg-blue-400 rounded-lg">
                <div className=" flex items-center flex-col gap-4 justify-center h-full ">
                  <h2 className="text-[21px]">
                    {/* {incomingCall?.callerUsername ?? ""} */}
                  </h2>
                  <h2 className="text-[16px] text-white whitespace-nowrap leading-[20px] font-semibold">
                    Incoming Call..
                  </h2>
                  <div className="h-12 w-12">
                    <img
                      onClick={handleAcceptCall}
                      src={AcceptCall}
                      alt="end call"
                      className="h-full w-full hover:cursor-pointer object-fill"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col px-10  items-center">
          {/* {remoteVideoRef ? ( */}
          <div className="max-w-[800px]  w-full">
            <video
              className="h-[400px] w-full object-fill max-w-full"
              ref={remoteVideoRef}
              autoPlay
            ></video>
          </div>
          {/* )  */}
        </div>
        <div className="flex gap-10 mt-1 w-full justify-center items-center">
          <div className="max-w-[800px] w-full flex items-center justify-between">
            <div className="flex-1 flex justify-center">
              <div onClick={handleEndCall} className="h-12 w-12">
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
                muted
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
