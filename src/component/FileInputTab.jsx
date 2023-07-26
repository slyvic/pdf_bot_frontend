import * as React from 'react';
import { FileUploader } from "react-drag-drop-files";
import Button from '@mui/material/Button';
import { fileTypes } from '../util/consts';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileInputTab = (props) => {
	const [file, setFile] = React.useState(null);
	const [text, setText] = React.useState("");
	const handleFileDrop = (file) => {
		setFile(file);
		const reader = new FileReader();
		reader.onload = async (event) => {
			const url = URL.createObjectURL(file[0])
			const loadingTask = pdfjs.getDocument(url);
			const pdf = await loadingTask.promise;
			let str = "";
			for (let i = 1; i <= pdf.numPages; i++) {
				pdf.getPage(i)
					.then((page) => page.getTextContent())
					.then((textContent) => {
						const pageText = textContent.items.map((item) => item.str).join('\n');
						str += pageText;
						setText(str);
					});
			}
		};
		reader.readAsText(file[0]);
	};
	const uploadText = async () => {
		await fetch("http://127.0.0.1:8000/bot/upload", {
			method: 'post',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'text': text})
		}).then(response => response.json())
		  .then(data => {
			// Process the response data
			console.log('Response:', data);
			props.setStatus(data.msg)
		  })
		  .catch(error => {
			// Handle errors
			console.error('Error:', error);
		  });
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
				<div>{props.status}</div>
			</div>
		</div>
		<Button className='build-button' onClick={uploadText}>Build the bot!</Button>
	</>
}

export default FileInputTab;
