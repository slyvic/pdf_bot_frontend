import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './App.css';
import FileInputTab from './component/FileInputTab';
import BotTab from './component/BotTab';

function App() {
	const [value, setValue] = React.useState('input-file');
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div className='app-container'>
			<Box sx={{ width: '100%', typography: 'body1' }}>
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList onChange={handleChange} aria-label="lab API tabs example">
							<Tab label="Input PDF document here" value="input-file" className={value === 'input-file' ? 'tab-buttons active-tab' : 'tab-buttons'} />
							<Tab label="Knowledge bot" value="bot" className={value === 'bot' ? 'tab-buttons active-tab' : 'tab-buttons'} />
						</TabList>
					</Box>
					<TabPanel value="input-file" className='tab-container'>
						<FileInputTab />
					</TabPanel>
					<TabPanel value="bot" className='tab-container'>
						<BotTab />
					</TabPanel>
				</TabContext>
			</Box>
		</div>
	);
}

export default App;
