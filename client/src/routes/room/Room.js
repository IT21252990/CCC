import { useEffect, useState , useRef  } from "react";
import AceEditor from "react-ace";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { generateColor } from "../../utils";
import "./Room.css";

import "ace-builds/src-noconflict/mode-javascript";

import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";

import "ace-builds/src-noconflict/keybinding-emacs";
import "ace-builds/src-noconflict/keybinding-vim";

import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";

export default function Room({ socket }) {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [fetchedUsers, setFetchedUsers] = useState(() => []);
  const [fetchedCode, setFetchedCode] = useState(() => "");
  const [language, setLanguage] = useState(() => "javascript");
  const mice = useRef({}); 

  const languagesAvailable = ["javascript", "java", "c_cpp", "python", "html"];

  function onChange(newValue) {
    setFetchedCode(newValue);
    socket.emit("update code", { roomId, code: newValue });
    socket.emit("syncing the code", { roomId: roomId });
  }

  function handleLanguageChange(e) {
    setLanguage(e.target.value);
    socket.emit("update language", { roomId, languageUsed: e.target.value });
    socket.emit("syncing the language", { roomId: roomId });
  }

  function handleLeave() {
    socket.disconnect();
    !socket.connected && navigate("/joinroom", { replace: true, state: {} });
  }

  function copyToClipboard(text) {
    try {
      navigator.clipboard.writeText(text);
      toast.success("Room ID copied", { duration: 10000 });
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

    socket.on("new member joined", ({ username }) => {
      toast.success(`${username} joined`, { duration: 10000 });
    });

   

    socket.on('mousemove', (event) => {
      if (socket.id !== event.id) {
        let mouse = mice.current[event.id];
        if (!mouse) {
          const span = document.createElement('span');
          span.style.position = 'absolute'; // Use absolute positioning
          span.textContent = '🔺';
          span.style.color = generateColor(socket.id);
          mice.current[event.id] = span;
          mouse = span;
          document.body.appendChild(span);
        }
        mouse.style.top = event.y + 'px';
        mouse.style.left = event.x + 'px';
      }
    });

    document.addEventListener('mousemove', (event) => {
      socket.emit('mousemove', {
        id: socket.id,
        x: event.clientX,
        y: event.clientY,
      });
    });
    
    socket.on("member left", ({ username }) => {
      toast.error(`${username} left`, { duration: 10000 });
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
    };
  }, [socket]);

  return (
    <div className="roomPageBody">
      <div className="mainWrap">
        <div className="aside">
          <div className="asideInner">
            <div className="logo">
              <img className="logoImage" src="/max.png" alt="logo" />
            </div>

            <h4>Select Language</h4>

            <div className="languageFieldWrapper">
              <select
                className="languageField"
                name="language"
                id="language"
                value={language}
                onChange={handleLanguageChange}
              >
                {languagesAvailable.map((eachLanguage) => (
                  <option
                    className="languageoption"
                    key={eachLanguage}
                    value={eachLanguage}
                  >
                    {eachLanguage}
                  </option>
                ))}
              </select>
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
          </div>
          <button
            className="btn_copyBtn"
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
            fontSize={18}
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
    </div>
  );
}
