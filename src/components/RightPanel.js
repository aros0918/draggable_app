import React from 'react';
import { useDrag } from 'react-dnd';
import { Button, Switch, Input, Tag, Slider, Progress, Table, Tabs, Menu, Dropdown, Checkbox, List, Image } from 'antd';
import GaugeComponent from 'react-gauge-component'
const DraggableItem = ({ name, size }) => {
  const marks = {
    10: '10°C',
    90: {
      style: {
        color: '#f50',
      },
      label: <strong>90°C</strong>,
    },
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'item',
    item: { name, size },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        height: size.height + 'px',
        width: size.width + 'px',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        marginBottom: '8px',
      }}
    >
      {/* Render Ant Design component based on the name */}
      {name === 'Primary Button' && <Button type="primary">{name}</Button>}
      {name === 'Cancel Button' && <Button danger>{name}</Button>}
      {name === 'Switch' && <div style={{display: 'flex'}}><div style={{marginTop: '3px', marginLeft: '3px', marginRight: '3px'}}>Label</div><Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked /></div>}
      {name === 'Input' && <Input placeholder="Basic input" />}
      {name === 'Tag' && <Tag>{name}</Tag>}
      {name === 'Slider' && <div> <div>Range Slider</div> <Slider min={10} max={90} marks={marks} defaultValue={37} /> </div>}
      {name === 'Gauge' && <GaugeComponent
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
      {name === 'Table' && (
        <Table dataSource={[{ key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' }]} columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Age', dataIndex: 'age', key: 'age' },
          { title: 'Address', dataIndex: 'address', key: 'address' },
        ]} />
      )}
      {name === 'Tabs' && (
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </Tabs.TabPane>
        </Tabs>
      )}
      {name === 'Menu' && (
        <Menu>
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
        </Menu>
      )}
      {name === 'Dropdown' && (
        <Dropdown overlay={(
          <Menu>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
          </Menu>
        )}>
          <Button>Dropdown</Button>
        </Dropdown>
      )}
      {name === 'Checkbox' && <Checkbox>{name}</Checkbox>}
      {name === 'Image' && <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />}

      {name === 'List' && (
        <List
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={['Item 1', 'Item 2', 'Item 3']}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={<a href="#">{item}</a>} description="Description" />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

const RightPanel = () => {
  const items = [
    { name: 'Primary Button', size: { width: 80, height: 40 } },
    { name: 'Cancel Button', size: { width: 80, height: 40 } },
    { name: 'Switch', size: { width: 110, height: 40 } },
    { name: 'Input', size: { width: 120, height: 40 } },
    { name: 'Tag', size: { width: 80, height: 40 } },
    { name: 'Slider', size: { width: 160, height: 60 } },
    { name: 'Gauge', size: { width: 160, height: 160 } },
    { name: 'Table', size: { width: 240, height: 200 } },
    { name: 'Tabs', size: { width: 160, height: 200 } },
    { name: 'Menu', size: { width: 160, height: 200 } },
    { name: 'Dropdown', size: { width: 160, height: 40 } },
    { name: 'Checkbox', size: { width: 80, height: 40 } },
    { name: 'Image', size: { width: 150, height: 150 } },
    { name: 'List', size: { width: 250, height: 200 } },
  ];    

  const totalHeight = items.reduce((acc, curr) => acc + curr.size.height, 0);

  return (
    <div style={{position: 'absolute', right: 0, width: '35%', padding: '16px', backgroundColor: '#b4fac6', height: totalHeight + 32 }}>
      <h2>Right Panel</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '8px' }}>
        {items.map((item, index) => (
          <DraggableItem key={`item-${index}`} name={item.name} size={item.size} />
        ))}
      </div>
    </div>
  );
};

export default RightPanel;
