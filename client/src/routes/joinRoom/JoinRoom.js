import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4, validate } from "uuid";
import { Toaster, toast } from "react-hot-toast";
//import "./JoinRoom.css";

export default function JoinRoom() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(() => "");
  const [username, setUsername] = useState(() => "");

  function handleRoomSubmit(e) {
    e.preventDefault();
    if (!validate(roomId)) {
      toast.error("Incorrect room ID");
      return;
    }
    username && navigate(`/room/${roomId}`, { state: { username } });
  }

  function createRoomId(e) {
    try {
      setRoomId(uuidv4());
      toast.success("Room created");
    } catch (exp) {
      console.error(exp);
    }
  }

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src="/PawFect Care Logo.png"
          alt="code-connect-classroom-logo"
        />

        <form className="joinBox" onSubmit={handleRoomSubmit}>
          <h4 className="mainLabel">Paste invitation ROOM ID</h4>
          <div className="inputGroup">
            <input
              className="inputBox"
              id="roomIdInput"
              type="text"
              placeholder="Enter room ID"
              required
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
              value={roomId}
              autoSave="off"
              autoComplete="off"
            />
            <label htmlFor="roomIdInput" className="joinBoxWarning">
              {roomId ? "" : "Room ID required"}
            </label>

            <br></br>

            <div className="joinBoxInputWrapper">
              <input
                className="inputBox"
                id="usernameInput"
                type="text"
                placeholder="Enter Guest Username"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                autoSave="off"
                autoComplete="off"
              /> <br></br>
              <label htmlFor="usernameInput" className="joinBoxWarning">
                {username ? "" : "username required"}
              </label>
            </div>

            <button className="btn joinBtn" type="submit">
              Join
            </button>

            <p className="createInfo">
              Don't have an invite code? Create your{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={createRoomId}
              >
                own room
              </span>
            </p>
          </div>
        </form>
      </div>
      <footer>
        <h4>
          With LOVE 💛 &nbsp; back to the &nbsp;
          <a href="#">HOME</a>
        </h4>
      </footer>
      <Toaster />
    </div>
  );
}
