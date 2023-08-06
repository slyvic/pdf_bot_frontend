import * as React from 'react';
import { FileUploader } from "react-drag-drop-files";
import Button from '@mui/material/Button';
import { API_URL_DOCUMENT_UPLOAD, fileTypes } from '../util/consts';
import { pdfjs } from 'react-pdf';
import { ToastContainer, toast } from "react-toastify";
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
        const token = localStorage.getItem("token");
		console.log(token)
		props.setLoading(true);
		await fetch(API_URL_DOCUMENT_UPLOAD, {
			method: 'post',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
			},
			body: JSON.stringify({ 'text': text })
		}).then(response => response.json())
			.then(data => {
				props.setLoading(false);
				console.log('Response:', data);
				props.setStatus(data.msg);
			})
			.catch(error => {
				props.setLoading(false)
				console.error('Error:', error);
				toast.error("申し訳ありませんが、サーバーにエラーが発生したようです。");
			});
	};
	return <>
		{
			props.file?.length > 0 ? <div className='file-content'>
				<div>{props.file[0].name}</div>
				<div>{(props.file[0].size / 1024).toFixed(1)}KB</div>
				<button onClick={() => { props.setLoading(false); props.setFile(null) }}>Delete</button>
			</div> :
				<FileUploader
					multiple={true}
					handleChange={handleFileDrop}
					name="file"
					types={fileTypes}
					children={<div className='drop-file-content'>
						<div>
							ファイルをここに置きます。
						</div>
						<div>
							-または-
						</div>
						<div>
							クリックしてアップロード
						</div>
					</div>}
				/>
		}
		<div className='text-box-container'>
			<div>
				テキストボックス
			</div>
			<div className='text-box-value'>
				{props.loading ? <LoadingSpin style={{ display: 'flex', justifyContent: 'center', width: '100%' }} /> : <div>{props.status}</div>}
			</div>
		</div>
		<div className='build-button-container'>
			<Button className='build-button' onClick={uploadText}>ボットを構築しましょう！</Button>
		</div>
      	<ToastContainer />
	</>
}

export default FileInputTab;
