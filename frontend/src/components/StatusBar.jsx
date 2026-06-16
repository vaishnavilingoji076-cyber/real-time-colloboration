function StatusBar({
  language,
  userCount
}) {
  return (
    <div
      style={{
        background:"#111827",
        color:"white",
        padding:"10px",
        display:"flex",
        justifyContent:
          "space-between"
      }}
    >
      <span>
        Language:
        {language}
      </span>

      <span>
        Users:
        {userCount}
      </span>
    </div>
  );
}

export default StatusBar;