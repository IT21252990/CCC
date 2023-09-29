import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { generateColor } from "../../utils";
import "./Room.css";
import Feedback from "../../components/Feedback";
import FeedbackDisplay from "../../components/FeedbackDisplay"; 

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";

export default function Room({ socket }) {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [fetchedCode, setFetchedCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]); 

  const handleFeedbackSubmit = (feedbackText) => {
    socket.emit("send feedback", { roomId, feedback: feedbackText });
    setIsFeedbackOpen(false);
  };

  function onChange(newValue) {
    setFetchedCode(newValue);
    socket.emit("update code", { roomId, code: newValue });
    socket.emit("syncing the code", { roomId: roomId });
  }

  function handleLeave() {
    socket.disconnect();
    !socket.connected && navigate("/joinroom", { replace: true, state: {} });
  }

  function copyToClipboard(text) {
    try {
      navigator.clipboard.writeText(text);
      toast.success("Room ID copied");
    } catch (exp) {
      console.error(exp);
    }
  }

  useEffect(() => {
    socket.on("updating client list", ({ userslist }) => {
      setFetchedUsers(userslist);
    });

    socket.on("on language change", ({ languageUsed }) => {
      setLanguage(languageUsed);
    });

    socket.on("on code change", ({ code }) => {
      setFetchedCode(code);
    });

    
    socket.on("feedback updated", ({ feedback }) => {
      console.log("Received feedback:", feedback);
      setFeedbackList((prevFeedbackList) => [...prevFeedbackList, feedback]);
    });

    socket.on("new member joined", ({ username }) => {
      toast(`${username} joined`);
    });

    socket.on("member left", ({ username }) => {
      toast(`${username} left`);
    });

    const backButtonEventListner = window.addEventListener(
      "popstate",
      function (e) {
        const eventStateObj = e.state;
        if (!("usr" in eventStateObj) || !("username" in eventStateObj.usr)) {
          socket.disconnect();
        }
      }
    );

    return () => {
      window.removeEventListener("popstate", backButtonEventListner);
      socket.off("feedback updated");
    };
  }, [socket]);

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/max.png" alt="logo" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {fetchedUsers.map((each) => (
              <div key={each} className="roomSidebarUsersEach">
                <div
                  className="roomSidebarUsersEachAvatar"
                  style={{ backgroundColor: `${generateColor(each)}` }}
                >
                  {each.slice(0, 2).toUpperCase()}
                </div>
                <div className="roomSidebarUsersEachName">{each}</div>
              </div>
            ))}
          </div>
          <button
            className="btn feedbackBtn"
            onClick={() => setIsFeedbackOpen((prev) => !prev)}
          >
            {isFeedbackOpen ? "Close Feedback" : "Provide Feedback"}
          </button>

          {isFeedbackOpen && <Feedback onSubmit={handleFeedbackSubmit} />}
          <FeedbackDisplay feedbackList={feedbackList} />
        </div>
        <button
          className="btn copyBtn"
          onClick={() => {
            copyToClipboard(roomId);
          }}
        >
          Copy ROOM ID
        </button>
        <button
          className="btn leaveBtn"
          onClick={() => {
            handleLeave();
          }}
        >
          Leave
        </button>
      </div>
      <div className="editorWrap">
        <AceEditor
          placeholder="Write your code here."
          className="roomCodeEditor"
          mode={language}
          theme="dracula"
          name="collabEditor"
          width="100%"
          height="96vh"
          value={fetchedCode}
          onChange={onChange}
          fontSize={15}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          enableLiveAutocompletion={true}
          enableBasicAutocompletion={false}
          enableSnippets={false}
          wrapEnabled={true}
          tabSize={2}
          editorProps={{
            $blockScrolling: true,
          }}
        />
      </div>

      
      

      <Toaster />
    </div>
  );
}