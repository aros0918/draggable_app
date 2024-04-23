  import React, { useState, useEffect } from 'react';
  import { useDrop } from 'react-dnd';
  import { Button, Switch, Input, Tag, Slider, Progress, Table, Tabs, Menu, Dropdown, Checkbox, List, Image } from 'antd';
  import { Responsive, WidthProvider } from 'react-grid-layout';
  import "/node_modules/react-grid-layout/css/styles.css";
  import "/node_modules/react-resizable/css/styles.css";
  import "../styles.css";

  const ResponsiveReactGridLayout = WidthProvider(Responsive);

  const LeftPanel = () => {
    const [compactType, setCompactType] = useState("vertical");
    const [mounted, setMounted] = useState(false);

    const [items, setItems] = useState([
    
    ]);

    const [layout, setLayout] = useState([
      
    ]);

    const [, drop] = useDrop(() => ({
      accept: 'item',
      drop: (item, monitor) => {
        const newItem = {
          name: item.name,
          x: (item.size.width) % 12,
          y: 0,
          width: item.size.width,
          height: item.size.height,
        };
        const newlayoutItem = {
          i: item.name,
          x: (item.size.width) % 12,
          y: 0,
          w: 2,
          h: 2,
        };
        setItems((prevItems) => [...prevItems, newItem]);
        setLayout((prevLayout) => [...prevLayout, newlayoutItem]);


      },
    }));
    useEffect(() => {
      console.log(items)
    }, [items]);
    useEffect(() => {
      setMounted(true);
    }, []);

    return (
      <div ref={drop} style={{ width: '61%', height: '100vh' }}>
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
              {item.name === 'Switch' && <Switch defaultChecked />}
              {item.name === 'Input' && <Input placeholder="Basic input" />}
              {item.name === 'Tag' && <Tag>{item.name}</Tag>}
              {item.name === 'Slider' && <Slider />}
              {item.name === 'Progress' && <Progress percent={50} />}
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
              {item.name === 'Image' && <Image src="https://via.placeholder.com/150" />}
            </div>
          ))}
        </ResponsiveReactGridLayout>
      </div>
    );
  };

  export default LeftPanel;
