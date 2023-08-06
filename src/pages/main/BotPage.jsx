import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FileInputTab from '../../component/FileInputTab';
import BotTab from '../../component/BotTab';
import './style.css';
import { Button } from '@mui/material';

function Main() {
	const [value, setValue] = React.useState('input-file');
	const [status, setStatus] = React.useState("");
	const [file, setFile] = React.useState("");
	const [chatHistory, setChatHistory] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [chatLoading, setChatLoading] = React.useState(false);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div className='app-container'>
			<header className='app-header'>
				<img src='assets/img/logo.png' width='100' height='100' alt='logo' />
				<div className='logo-text'>
					Satoya
				</div>
				<Button onClick={(e) => {
    				localStorage.setItem("token", "");
					window.location.href = '/auth';
					}} style={{marginLeft: 'auto'}}>Logout</Button>
			</header>
			<Box sx={{ width: '100%', typography: 'body1' }}>
				<TabContext value={value}>
					<div  style={{display: 'flex', width: '100%'}}>
						<div className='side-tab-bar'>
							<TabList onChange={handleChange} orientation="vertical" style={{display: 'flex'}} aria-label="lab API tabs example">
								<Tab label="PDFドキュメントを入力" value="input-file" icon={<img className='tab-icons' src='assets/img/pdf.png' width='25' height="25" alt='pdf' />} className={value === 'input-file' ? 'tab-buttons active-tab' : 'tab-buttons'} />
								<Tab label="ナレッジボット" value="bot" icon={<img className='tab-icons' src='assets/img/bot.png' width='25' height="25" alt='bot' />} className={value === 'bot' ? 'tab-buttons active-tab' : 'tab-buttons'} />
							</TabList>
						</div>
						<TabPanel value="input-file" className='tab-container bot-build-container'>
							<FileInputTab setLoading={setLoading} loading={loading} status={status} setStatus={setStatus} setFile={setFile} file={file} />
						</TabPanel>
						<TabPanel value="bot" className='tab-container'>
							<BotTab setLoading={setChatLoading} loading={chatLoading} chatHistory={chatHistory} setChatHistory={setChatHistory} />
						</TabPanel>
					</div>
				</TabContext>
			</Box>
		</div>
	);
}

export default Main;
