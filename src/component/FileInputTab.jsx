import * as React from 'react';
import { FileUploader } from "react-drag-drop-files";
import Button from '@mui/material/Button';
import { fileTypes } from '../util/consts';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileInputTab = () => {
	const [file, setFile] = React.useState(null);
	const [text, setText] = React.useState("");
	const handleFileDrop = (file) => {
		setFile(file);
		const reader = new FileReader();
		reader.onload = async (event) => {
			const url = URL.createObjectURL(file[0])
			const loadingTask = pdfjs.getDocument(url);
			const pdf = await loadingTask.promise;
			console.log(pdf.numPages)
			let str = "";
			for (let i = 1; i <= pdf.numPages; i++) {
				pdf.getPage(i)
					.then((page) => page.getTextContent())
					.then((textContent) => {
						const pageText = textContent.items.map((item) => item.str).join('\n');
						str += pageText;
						setText(str);
						console.log(str, "======================================================")
					});
			}
		};
		reader.readAsText(file[0]);
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
		{text}
		<Button className='build-button'>Build the bot!</Button>
	</>
}

export default FileInputTab;
