// function Sidebar({ roomId, userCount }) {
//   return (
//     <div
//       className="panel"
//       style={{
//         width: "250px",
//         padding: "20px",
//       }}
//     >
//       <h3>ROOM</h3>

//       <div
//         style={{
//           background: "#312e81",
//           padding: "15px",
//           borderRadius: "10px",
//           marginTop: "15px",
//         }}
//       >
//         {roomId}
//       </div>

//       <p
//         style={{
//           marginTop: "20px",
//         }}
//       >
//         🟢 Users Online: {userCount}
//       </p>

//       <h3
//         style={{
//           marginTop: "30px",
//         }}
//       >
//         LANGUAGE
//       </h3>

//       <select
//         style={{
//           width: "100%",
//           marginTop: "10px",
//           padding: "10px",
//           background: "#1f2937",
//           color: "white",
//         }}
//       >
//         <option>JavaScript</option>
//         <option>Python</option>
//       </select>
//     </div>
//   );
// }

// export default Sidebar;

function Sidebar({
  roomId,
  langauge,
  copyroomId,
  leaveRoom,
  setLanguage,
}) {
  return(
    <div 
    style={{
      width:"250px",
      background:"#111827",
      padding:"20px",
      color:"white",
    }}>

      <h2>Room</h2>
      <p>{roomId}</p>

      <hr/>

      <h3>Language</h3>

      <select
      value={langauge}
      onChange={(e)=>
      setLanguage(e.target.value)}>

        <option value="javascript">Javascript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="c#">C#</option>

        <br/>
        <br/>

        <button onClick={copyroomId}>Copy-RoomId</button>

        <br/>
        <br/>

        <button onClick={leaveRoom}>LeaveRoom</button>

      </select>
    </div>
  );
}

export default Sidebar;