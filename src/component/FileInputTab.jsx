import * as React from "react";
import { FileUploader } from "react-drag-drop-files";
import Button from "@mui/material/Button";
import {
  API_METHOD_POST,
  API_URL_DOCUMENT_UPLOAD,
  fileTypes,
} from "../util/api_constants";
import { pdfjs } from "react-pdf";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpin from "./LoadingSpin";
import { TEXT_CONSTANTS } from "../util/text_constants";
import { satoya_api } from "../util/api";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileInputTab = (props) => {
  const lang = "JP";
  const [text, setText] = React.useState("");
  const handleFileDrop = (file) => {
    props.setFile(file);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const url = URL.createObjectURL(file[0]);
      const loadingTask = pdfjs.getDocument(url);
      const pdf = await loadingTask.promise;
      let str = "";
      const promises = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const promise = pdf
          .getPage(i)
          .then((page) => page.getTextContent())
          .then((textContent) => {
            const pageText = textContent.items
              .map((item) => item.str)
              .join("\n");
            return pageText;
          });
        promises.push(promise);
      }

      Promise.all(promises).then((texts) => {
        str = texts.join("");
        setText(str);
      });
    };
    reader.readAsText(file[0]);
  };
  const uploadText = async () => {
    props.setLoading(true);
    satoya_api(API_URL_DOCUMENT_UPLOAD, API_METHOD_POST, { text: text }).then(
      (res) => {
        props.setLoading(false);
        console.log("Response:", res);
        props.setStatus(res.msg);
      },
      (reject) => {
        props.setLoading(false);
        console.error("Error:", reject);
        toast.error(TEXT_CONSTANTS[lang].server_error);
      }
    );
  };
  return (
    <>
      {props.file?.length > 0 ? (
        <div className="file-content">
          <div>{props.file[0].name}</div>
          <div>{(props.file[0].size / 1024).toFixed(1)}KB</div>
          <button
            onClick={() => {
              props.setLoading(false);
              props.setFile(null);
            }}
          >
            {TEXT_CONSTANTS[lang].delete}
          </button>
        </div>
      ) : (
        <FileUploader
          multiple={true}
          handleChange={handleFileDrop}
          name="file"
          types={fileTypes}
          children={
            <div
              className="drop-file-content"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {TEXT_CONSTANTS[lang].file_drop_input}
            </div>
          }
        />
      )}
      <div className="text-box-container">
        <div>{TEXT_CONSTANTS[lang].text_box}</div>
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
            <div>{props.status}</div>
          )}
        </div>
      </div>
      <div className="build-button-container">
        <Button className="build-button" onClick={uploadText}>
          {TEXT_CONSTANTS[lang].bot_build}
        </Button>
      </div>
      <ToastContainer />
    </>
  );
};

export default FileInputTab;
