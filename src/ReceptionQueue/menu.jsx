import React from 'react';
import './menu.css';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DvrIcon from '@mui/icons-material/Dvr';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';


const Menu = ({ isOpen, toggleMenu, setComponentsVisibility }) => {
    const handleButtonClick = (componentName) => {
      setComponentsVisibility(componentName);
    };
  

    return (

        <div className={`menu ${isOpen ? 'open' : ''}`}>
        <button className='getSpecificQueueBtn menuBtn'  onClick={() => handleButtonClick('Queues')}>
                <PeopleIcon />
                <span className='menuTitle'>תור</span>

            </button>
            <button className='getSpecificQueueBtn menuBtn' onClick={() => handleButtonClick('Actions')}>
                <DashboardCustomizeIcon />
                <span className='menuTitle'>פעולות</span>
            </button>
            <button className='getMessagesBtn menuBtn' onClick={() => handleButtonClick('Messages')}>
                <ChatBubbleOutlineIcon />
                <span className='menuTitle'>הודעות</span>

            </button>
            <button className='getReportBtn menuBtn' onClick={() => handleButtonClick('Chart')}>
                <AssignmentIcon />
                <span className='menuTitle'>דוחות</span>

            </button>
        
            <button className='getSpecificQueueBtn menuBtn' onClick={() => handleButtonClick('Monitor')}>
                <DvrIcon />
                <span className='menuTitle'>מוניטור</span>

            </button>

           
            <button className="toggleMenuBtn" onClick={toggleMenu}>
                תפריט
            </button>
        </div>
    );
};

export default Menu;
