import * as React from 'react';
import { FileUploader } from "react-drag-drop-files";
import Button from '@mui/material/Button';
import { fileTypes } from '../util/consts';
import { pdfjs } from 'react-pdf';
import LoadingSpin from './LoadingSpin';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileInputTab = (props) => {
	const [text, setText] = React.useState("");
	const handleFileDrop = (file) => {
		props.setFile(file);
		const reader = new FileReader();
		reader.onload = async (event) => {
			const url = URL.createObjectURL(file[0])
			const loadingTask = pdfjs.getDocument(url);
			const pdf = await loadingTask.promise; let str = "";
			const promises = [];

			for (let i = 1; i <= pdf.numPages; i++) {
				const promise = pdf.getPage(i)
					.then((page) => page.getTextContent())
					.then((textContent) => {
						const pageText = textContent.items.map((item) => item.str).join('\n');
						return pageText;
					});
				promises.push(promise);
			}

			Promise.all(promises)
				.then((texts) => {
					str = texts.join('');
					setText(str);
				});
		};
		reader.readAsText(file[0]);
	};
	const uploadText = async () => {
		props.setLoading(true);
		await fetch("http://127.0.0.1:8000/bot/upload", {
			method: 'post',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 'text': text })
		}).then(response => response.json())
			.then(data => {
				props.setLoading(false);
				console.log('Response:', data);
				props.setStatus(data.msg)
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};
	return <>
		{
			props.file?.length > 0 ? <div className='file-content'>
				<div>{props.file[0].name}</div>
				<div>{(props.file[0].size / 1024).toFixed(1)}KB</div>
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
			{props.loading ? <LoadingSpin style={{display: 'flex', justifyContent: 'center', width: '100%'}} /> : <div>{props.status}</div>}
			</div>
		</div>
		<Button className='build-button' onClick={uploadText}>Build the bot!</Button>
	</>
}

export default FileInputTab;
