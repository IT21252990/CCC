import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4, validate } from "uuid";
import { Toaster, toast } from "react-hot-toast";
//import "./JoinRoom.css";
import NavBar from '../../components/Navbar';


export default function JoinRoom() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(() => "");
  const [username, setUsername] = useState(() => "");

  useEffect(() => {
    const storedUsername = localStorage.getItem('userInfo');
    if (storedUsername) {
      const parsedUserInfo = JSON.parse(storedUsername);
      setUsername(parsedUserInfo.username);
    }
  }, []);

  function handleRoomSubmit(e) {
    e.preventDefault();
    if (!validate(roomId)) {
      toast.error("Incorrect room ID" , {duration: 1000 });
      return;
    }
    username && navigate(`/room/${roomId}`, { state: { username } });
  }

  function createRoomId(e) {
    try {
      setRoomId(uuidv4());
      toast.success("Room created" ,  {duration: 1000 });
    } catch (exp) {
      console.error(exp);
    }
  }

  function pasteFromClipboard() {
    try {
      navigator.clipboard.readText().then((text) => {
        console.log("Pasted content: " + text);
        setRoomId(text);
      }).catch((error) => {
        console.error("Failed to paste from clipboard: " + error);
      });
    } catch (exp) {
      console.error("Clipboard access is not supported: " + exp);
    }
  }
  return (
    <div> <NavBar />
    <div className="homePageWrapper">
       
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src="/max2.png"
          alt="code-connect-classroom-logo"
        />

        <form className="joinBox" onSubmit={handleRoomSubmit}>
          <h4 className="mainLabel">Paste invitation ROOM ID here :</h4>
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
              autoSave="on"
              autoComplete="on"
            />

            <button className="joinRoomPasteBtn" onClick={pasteFromClipboard} title="Paste" ></button>

            <label htmlFor="roomIdInput" className="joinBoxWarning">
              {roomId ? "" : "Room ID Required *"}
            </label>

            <br></br>

            <div className="joinBoxInputWrapper">
            <h4 className="mainLabel">Enter Your Username :</h4>
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
                {username ? "" : "Username Required *"}
              </label>
            </div>

            <button className="btn joinBtn" type="submit">
              Join
            </button>

            <p className="createInfo">
              Don't have an invite code? Create your{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer" , color:"#4aee88" , fontWeight:"bold" }}
                onClick={createRoomId}
              >
                Own Room
              </span>
            </p>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
    </div>
  );
}
