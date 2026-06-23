import { useRef,useEffect } from "react";

useRef

function VideoCall() {

const videoref=useRef();
useEffect(()=>{
    navigator.mediaDevices.getUserMedia({
        video:true,
        audio:true,
    })

    .then((stream)=>{
        videoref.current.srcObject=stream;
    });
}, []);


  return (
    <div 
    style={{
        width:"320px",
        background:"#111827",
        padding:"15px",
        borderRadius:"12px",
    }}>

    <h3>Your Camera</h3>

    <video
    ref={videoref}
    autoPlay
    muted
    playsInline
    style={{
        width:"100%",
        borderRadius:"10px",
    }}/>
      
    </div>
  );
}

export default VideoCall;
