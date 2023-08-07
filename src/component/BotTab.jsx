import * as React from "react";
import { Avatar, Typography, Box, Paper } from "@mui/material";
import LoadingSpin from "./LoadingSpin";
import { ToastContainer, toast } from "react-toastify";
import { API_CHAT, API_METHOD_POST } from "../util/api_constants";
import { TEXT_CONSTANTS } from "../util/text_constants";
import { satoya_api } from "../util/api";

const BotTab = (props) => {
  const [msg, setMsg] = React.useState("");
  const submitMsg = async () => {

    const temp = [...props.chatHistory];

    props.setLoading(true);

    temp.push({
      sender: "Me",
      content: msg,
    });

    satoya_api(API_CHAT, API_METHOD_POST, {
      text: msg + (props.lang === "JP" ? ". すべての言葉を日本語でお願いします。" : ""),
    }).then(
      (res) => {
        if (res.msg !== "") {
          temp.push({
            sender: "Bot",
            content: res.msg,
          });
          props.setChatHistory(temp);
          props.setLoading(false);
          setMsg("");
        } else {
          console.log(res);
        }
      },
      (reject) => {
        props.setLoading(false);
        toast.error(TEXT_CONSTANTS[props.lang].server_error);
        console.error("Error:", reject);
      }
    );
  };
  
  return (
    <>
      <ToastContainer />
      <div className="bot-content">
        {props.chatHistory.map((message, idx) => (
          <Box
            key={idx}
            display="flex"
            alignItems="start"
            paddingTop={1}
            justifyContent={
              message.sender === "Bot" ? "flex-start" : "flex-end"
            }
          >
            {message.sender === "Bot" && (
              <Avatar src="/Bot-avatar.png" alt="Bot" sx={{ mr: 1 }} />
            )}
            <Paper
              elevation={1}
              sx={{
                maxWidth: "80%",
                backgroundColor:
                  message.sender === "Bot" ? "#e0e0e0" : "#1976d2",
                color: message.sender === "Bot" ? "#000" : "#fff",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <Typography variant="body1">{message.content}</Typography>
            </Paper>
            {message.sender === "Me" && (
              <Avatar src="/jane-avatar.png" alt="Me" sx={{ ml: 1 }} />
            )}
          </Box>
        ))}
      </div>
      <div className="text-box-container">
        <div>{TEXT_CONSTANTS[props.lang].chat_description}</div>
        <div className="text-box-value">
          {props.loading ? (
            <LoadingSpin
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            />
          ) : (
            <input
              value={msg}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitMsg();
              }}
              onChange={(e) => setMsg(e.target.value)}
              className="chat-message"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BotTab;
