import * as React from 'react';
import { FileUploader } from "react-drag-drop-files";
import Button from '@mui/material/Button';
import { fileTypes } from '../util/consts';

const FileInputTab = () => {
    const [file, setFile] = React.useState(null);
    const handleFileDrop = (file) => {
        setFile(file);
        console.log(file)
    };
    return <>
        {
            file?.length > 0 ? <div className='file-content'>
                <div>{file[0].name}</div>
                <div>{(file[0].size / 1024).toFixed(1)}KB</div>
                <button>Download</button>
            </div> :
            <FileUploader
                multiple={true}
                handleChange={handleFileDrop}
                name="file"
                types={fileTypes}
                children={<div className='drop-file-content'>
                    <div>
                        Drop File Here
                    </div>
                    <div>
                        - or -
                    </div>
                    <div>
                        Click to Upload
                    </div>
                </div>}
            />
        }
        <div className='text-box-container'>
            <div>
                Textbox
            </div>
            <div className='text-box-value'>
                <div>Success! You can now click on the 'Knowledge bot' tab to interact with your document</div>
            </div>
        </div>
        <Button className='build-button'>Build the bot!</Button>
    </>
}

export default FileInputTab;