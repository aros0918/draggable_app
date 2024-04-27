import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import axios from 'axios';
import { Button, Switch, Input, Tag, Slider, Table, Tabs, Menu, Dropdown, Checkbox, List, Image } from 'antd';
import { Responsive, WidthProvider } from 'react-grid-layout';
import GaugeComponent from 'react-gauge-component';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const LeftPanel = () => {
  const [items, setItems] = useState([]);
  const [layout, setLayout] = useState([]);
  const [mounted, setMounted] = useState(false);
  const marks = {
    10: '10°C',
    90: {
      style: {
        color: '#f50',
      },
      label: <strong>90°C</strong>,
    },
  };
  const [, drop] = useDrop(() => ({
    accept: 'item',
    drop: (item, monitor) => {
      const newItem = {
        name: item.name,
        i: item.name,
        x: 0,
        y: 0,
        w: 2,
        h: 2,
        width: item.size.width,
        height: item.size.height,
        imageSrc: null, // Initialize with no image
      };
      const newLayoutItem = {
        i: `${item.name}-${items.length}`,
        x: 0,
        y: 0,
        w: 2,
        h: 2,
      };
      setItems((prevItems) => [...prevItems, newItem]);
      setLayout((prevLayout) => [...prevLayout, newLayoutItem]);
    },
  }));

  const handleImageDrop = (itemIndex, file) => {
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setItems((prevItems) => {
        const newItems = [...prevItems];
        if (itemIndex < newItems.length) {
          newItems[itemIndex].imageSrc = loadEvent.target.result;
        }
        return newItems;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageDrop(index, file);
    }
  };

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    const updatedItems = newLayout.map((layoutItem, index) => {
      const correspondingItem = items[index] || {};
      return {
        name: layoutItem.i.split('-')[0],
        i: layoutItem.i.split('-')[0],
        x: layoutItem.x,
        y: layoutItem.y,
        w: layoutItem.w,
        h: layoutItem.h,
        width: layoutItem.w * 66 + (layoutItem.w - 1) * 10,
        height: layoutItem.h * 30 + (layoutItem.h - 1) * 10,
        imageSrc: null, // Initialize with no image

      };
    });

    setItems(updatedItems);
  };

  const onSave = async () => {
    try {
      const updatedLayout = layout.map((layoutItem, index) => {
        return {
          i: layoutItem.i.split('-')[0],
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h,
        };
      });
      await axios.post('http://127.0.0.1:8000/widgetsave', { updatedLayout });
      console.log('Data saved successfully');
      // console.log(layout)
      // console.log(items)
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };  

  const onLoad = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/widgetload');
      const { updatedLayout: updatedLayout } = response.data[0]; // Assuming the data is an array with one object
      
      // Update the layout state
      setLayout(updatedLayout);

      // Update the items state based on the loaded layout
      const updatedItems = updatedLayout.map((layoutItem, index) => ({
        name: layoutItem.i.split('-')[0],
        i: layoutItem.i.split('-')[0],
        x: layoutItem.x,
        y: layoutItem.y,
        w: layoutItem.w,
        h: layoutItem.h,
        width: layoutItem.w * 48 + (layoutItem.w - 1) * 10,
        height: layoutItem.h * 30 + (layoutItem.h - 1) * 10,
        imageSrc: null, // Initialize with no image

      }));

      // Update the items state
      setItems(updatedItems);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
  // const onSave = async () => {
  //   try {
  //     const updatedLayout = layout.map((layoutItem, index) => {
  //       return {
  //         i: layoutItem.i.split('-')[0],
  //         x: layoutItem.x,
  //         y: layoutItem.y,
  //         w: layoutItem.w,
  //         h: layoutItem.h,
  //       };
  //     });
  
  //     // Save the updatedLayout to session storage
  //     sessionStorage.setItem('savedLayout', JSON.stringify(updatedLayout));
  //     console.log('Data saved successfully');
  //   } catch (error) {
  //     console.error('Error saving data:', error);
  //   }
  // };
  
  // const onLoad = async () => {
  //   try {
  //     // Load the savedLayout from session storage
  //     const savedLayout = JSON.parse(sessionStorage.getItem('savedLayout'));
  
  //     if (savedLayout) {
  //       // Update the layout state
  //       setLayout(savedLayout);
  
  //       // Update the items state based on the loaded layout
  //       const updatedItems = savedLayout.map((layoutItem, index) => ({
  //         name: layoutItem.i,
  //         i: layoutItem.i,
  //         x: layoutItem.x,
  //         y: layoutItem.y,
  //         w: layoutItem.w,
  //         h: layoutItem.h,
  //         width: layoutItem.w * 66 + (layoutItem.w - 1) * 10,
  //         height: layoutItem.h * 30 + (layoutItem.h - 1) * 10,
  //         imageSrc: null, // Initialize with no image
  //       }));
  
  //       // Update the items state
  //       setItems(updatedItems);
  //       console.log('Data loaded successfully');
  //     } else {
  //       console.log('No saved data found in session storage');
  //     }
  //   } catch (error) {
  //     console.error('Error loading data:', error);
  //   }
  // };
  useEffect(() => {
    setItems(items)
    console.log('Updated items:', items);
    console.log('Updated layout:', layout);

  }, [items ]);
  

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={drop} style={{ width: '100%', height: '100vh' }}>
      <div style={{display: 'flex', textAlign: 'center', alignItems: 'center'}}>
        <h2>Left Panel</h2>
        &nbsp;
        &nbsp;
        <Button onClick={onLoad}>Load</Button>
        &nbsp;
        &nbsp;
        <Button onClick={onSave}>Save</Button>
      </div>
      <ResponsiveReactGridLayout
        rowHeight={30}
        cols={{ lg: 24, md: 20, sm: 12, xs: 8, xxs: 4 }}
        layout={layout}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType="vertical"
        onLayoutChange={onLayoutChange}
        isDroppable
      >
        {items.map((item, index) => {
          const { width, height } = item;

          return (
            <div key={`${item.name}-${index}`} style={{ position: 'relative' }}>
              {item.name === 'Primary Button' && <Button type="primary" style={{ width, height }}>{item.name}</Button>}
              {item.name === 'Cancel Button' && <Button danger style={{ width, height }}>{item.name}</Button>}
              {item.name === 'Switch' && (
                <div style={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
                  <div style={{ marginTop: '3px', marginLeft: '3px', marginRight: '3px' }}>Label</div>
                  <Switch style={{ width, height, textAlign: 'center', alignItems: 'center' }} checkedChildren="On" unCheckedChildren="Off" defaultChecked />
                </div>
              )}
              {item.name === 'Input' && <Input placeholder="Basic input" style={{ width, height }} />}
              {item.name === 'Tag' && <Tag style={{ width, height }}>{item.name}</Tag>}
              {item.name === 'Slider' && (
                <div style={{ width, height }}>
                  <div>Range Slider</div>
                  <Slider min={10} max={90} marks={marks} defaultValue={37} />
                </div>
              )}
              {item.name === 'Gauge' && (
                <GaugeComponent
                  style={{ width, height, color: 'red' }}
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
                        { value: 100 },
                      ],
                    },
                  }}
                  arc={{
                    colorArray: ['#5BE12C', '#EA4228'],
                    subArcs: [{ limit: 10 }, { limit: 30 }, {}, {}, {}],
                    padding: 0.02,
                    width: 0.3,
                  }}
                  pointer={{
                    elastic: true,
                    animationDelay: 0,
                  }}
                />
              )}
              {item.name === 'Table' && (
                <Table
                  style={{ width, height }}
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
                <Tabs defaultActiveKey="1" style={{ width, height }}>
                  <Tabs.TabPane tab="Tab 1" key="1">
                    Content of Tab Pane 1
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                  </Tabs.TabPane>
                </Tabs>
              )}
              {item.name === 'Menu' && (
                <Menu style={{ width, height }}>
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
                  <Button style={{ width, height }}>Dropdown</Button>
                </Dropdown>
              )}
              {item.name === 'Checkbox' && (
                <Checkbox style={{ width, height, textAlign: 'center', alignItems: 'center' }}>
                  {item.name}
                </Checkbox>
              )}
              {item.name === 'List' && (
                <List
                  style={{ width, height }}
                  header={<div>Header</div>}
                  footer={<div>Footer</div>}
                  bordered
                  dataSource={['Item 1', 'Item 2', 'Item 3']}
                  renderItem={(listItem) => (
                    <List.Item>
                      <List.Item.Meta
                        title={<a href="#">{listItem}</a>}
                        description="Description"
                      />
                    </List.Item>
                  )}
                />
              )}
              {item.name === 'Image' && (
                <div style={{ width, height }} className="image-drop-zone">
                  {item.imageSrc ? (
                    <Image src={item.imageSrc} alt="Preview" style={{ maxWidth: '100%' }} />
                  ) : (
                    <div>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(index, e)}
                        style={{ display: 'none' }}
                        id={`file-input-${index}`}
                      />
                      <label htmlFor={`file-input-${index}`}>
                        Click here to upload an image
                      </label>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default LeftPanel;
