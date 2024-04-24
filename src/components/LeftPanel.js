import React, { useState, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Button, Switch, Input, Tag, Slider, Progress, Table, Tabs, Menu, Dropdown, Checkbox, List, Image } from 'antd';
import { Responsive, WidthProvider } from 'react-grid-layout';
import GaugeComponent from 'react-gauge-component'
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import '../styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const LeftPanel = () => {
  const marks = {
    10: '10°C',
    90: {
      style: {
        color: '#f50',
      },
      label: <strong>90°C</strong>,
    },
  };
  const [compactType, setCompactType] = useState("vertical");
  const [mounted, setMounted] = useState(false);

  const [items, setItems] = useState([]);

  const [layout, setLayout] = useState([]);

  const [, drop] = useDrop(() => ({
    accept: 'item',
    drop: (item, monitor) => {
      const newItem = {
        name: item.name,
        x: (item.size.width) % 12,
        y: 0,
        width: item.size.width,
        height: item.size.height,
        imageSrc: null, // Initialize with no image
      };
      const newLayoutItem = {
        i: item.name,
        x: (item.size.width) % 12,
        y: 0,
        w: 2,
        h: 2,
      };
      setItems((prevItems) => [...prevItems, newItem]);
      setLayout((prevLayout) => [...prevLayout, newLayoutItem]);
    },
  }));

  const handleImageDrop = (itemIndex, event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setItems((prevItems) => {
          const newItems = [...prevItems];
          newItems[itemIndex].imageSrc = loadEvent.target.result; // Update image source
          return newItems;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={drop} style={{ width: '100%', height: '100vh' }}>
      <h2>Left Panel</h2>
      <ResponsiveReactGridLayout
        rowHeight={30}
        cols={{ lg: 24, md: 20, sm: 12, xs: 8, xxs: 4 }}
        layout={layout}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType={compactType}
        isDroppable={true}
        preventCollision={!compactType}
      >
        {items.map((item, index) => (
          <div key={`item-${index}`} style={{ position: 'relative' }}>
              {item.name === 'Primary Button' && <Button type="primary">{item.name}</Button>}
              {item.name === 'Cancel Button' && <Button danger>{item.name}</Button>}
              {item.name === 'Switch' && <div style={{display: 'flex'}}><div style={{marginTop: '3px', marginLeft: '3px', marginRight: '3px'}}>Label</div><Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked /></div>}
              {item.name === 'Input' && <Input placeholder="Basic input" />}
              {item.name === 'Tag' && <Tag>{item.name}</Tag>}
              {item.name === 'Slider' && <div> <div>Range Slider</div> <Slider min={10} max={90} marks={marks} defaultValue={37} /> </div>}
              {item.name === 'Gauge' && <GaugeComponent
                style={{width: '160px', height: '160px', color: 'red'}}
                value={70}
                type="radial"
                labels={{
                  tickLabels: {
                    type: "inner",
                    ticks: [
                      { value: 20 },
                      { value: 40 },
                      { value: 60 },
                      { value: 80 },
                      { value: 100 }
                    ]
                  }
                }}
                arc={{
                  colorArray: ['#5BE12C','#EA4228'],
                  subArcs: [{limit: 10}, {limit: 30}, {}, {}, {}],
                  padding: 0.02,
                  width: 0.3
                }}
                pointer={{
                  elastic: true,
                  animationDelay: 0
                }}
              />}
              {item.name === 'Table' && (
                <Table
                  dataSource={[
                    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
                  ]}
                  columns={[
                    { title: 'Name', dataIndex: 'name', key: 'name' },
                    { title: 'Age', dataIndex: 'age', key: 'age' },
                    { title: 'Address', dataIndex: 'address', key: 'address' },
                  ]}
                />
              )}
              {item.name === 'Tabs' && (
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="Tab 1" key="1">
                    Content of Tab Pane 1
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                  </Tabs.TabPane>
                </Tabs>
              )}
              {item.name === 'Menu' && (
                <Menu>
                  <Menu.Item key="1">Option 1</Menu.Item>
                  <Menu.Item key="2">Option 2</Menu.Item>
                  <Menu.Item key="3">Option 3</Menu.Item>
                </Menu>
              )}
              {item.name === 'Dropdown' && (
                <Dropdown overlay={
                  <Menu>
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                    <Menu.Item key="3">Option 3</Menu.Item>
                  </Menu>
                }>
                  <Button>Dropdown</Button>
                </Dropdown>
              )}
              {item.name === 'Checkbox' && <Checkbox>{item.name}</Checkbox>}
              {item.name === 'List' && (
                <List
                  header={<div>Header</div>}
                  footer={<div>Footer</div>}
                  bordered
                  dataSource={['Item 1', 'Item 2', 'Item 3']}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={<a href="#">{item}</a>}
                        description="Description"
                      />
                    </List.Item>
                  )}
                />
              )}
            {item.name === 'Image' && (
              <div
                className="image-drop-zone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleImageDrop(index, e)} // Call handler with the item index
              >
                {item.imageSrc ? (
                  <Image src={item.imageSrc} alt="Preview" style={{ maxWidth: '100%' }} />
                ) : (
                  <p>Drag and drop an image</p>
                )}
              </div>
            )}
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default LeftPanel;
