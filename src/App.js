import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import { Affix } from "antd";
import { MenuOutlined } from '@ant-design/icons';

const App = () => {
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(true);
  const [buttonStyle, setButtonStyle] = useState({
    background: 'white',
    color: '#1890ff',
  });

  const toggleRightPanelVisibility = () => {
    setIsRightPanelVisible(!isRightPanelVisible);
    setButtonStyle({
      background: isRightPanelVisible ? '#1890ff' : 'white',
      color: isRightPanelVisible ? 'white' : '#1890ff',
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', height: '120vh', position: 'relative'}}>
        <LeftPanel />
        <Affix style={{ position: 'absolute', top: '40px', right: '40px', zIndex: '10'}}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: buttonStyle.background,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={toggleRightPanelVisibility}
          >
            <MenuOutlined style={{ color: buttonStyle.color }} />
          </div>
        </Affix>
        {isRightPanelVisible && <RightPanel />}
      </div>
    </DndProvider>
  );
};

export default App;
