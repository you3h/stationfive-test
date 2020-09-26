import React, { useState, useEffect } from 'react';
import { 
  Radio,
  Typography,
  Button,
  List
} from 'antd'

import data from './data/menu.json'

import './App.css';

const { Title } = Typography
const { Item } = List
const DEFAULT_PAGE_ITEMS = 4

const App = () => {
  const { menus, rules } = data
  const [selectedMenu, setSelectedMenu] = useState({})
  const [appliedRules, setAppliedRules] = useState([])
  const [orderList, setOrderList] = useState([])

  const selectedMenuLength = Object.keys(selectedMenu).length

  useEffect(() => {
    const generateRules = () => {
      let currentRules = []
      Object.keys(selectedMenu).forEach(menu => rules[selectedMenu[menu].id] && currentRules.push(...rules[selectedMenu[menu].id]))
      return currentRules
    }
    setAppliedRules(generateRules())

  }, [selectedMenu, rules])

  const menuOnChange = (data, cluster) => {
    console.log(data)
    const { id, value } = data

    let selected = []
    if (selectedMenuLength <= 0) {
      setSelectedMenu({ [cluster]: { id, value } })
      return 
    }

    Object.keys(selectedMenu).forEach(menu => menu < cluster && selected.push(selectedMenu[menu]))
    setSelectedMenu({ ...selected, [cluster]: { id, value } })
  }

  const isDisabled = (cluster, id) => {
    if (selectedMenuLength < cluster || appliedRules.includes(parseInt(id))) {
      return true
    }
    return false
  }

  const onSubmit = () => {
    setOrderList([selectedMenu, ...orderList])
    setSelectedMenu({})
  }

  const onClear = () => {
    setOrderList([])
  }
  
  return (
    <div className='app'>
      <div className='container'>
        <Title level={2}>Food Menu</Title>
        {
          menus.map((menu, cluster) => {
              return (
                <Radio.Group 
                  key={cluster} 
                  buttonStyle="solid" 
                  value={selectedMenu[cluster] && selectedMenu[cluster].value}
                  className='radio-group'
                > 
                {
                  menu.map((food, idx) => {
                    const { id, value } = food
                    return (
                      <Radio.Button 
                        key={idx}
                        id={id}
                        value={value}
                        checked={selectedMenu[cluster] && selectedMenu[cluster].id === id}
                        disabled={isDisabled(cluster, id)}
                        onChange={(e) => menuOnChange(e.target, cluster)}
                      >
                        {value}
                      </Radio.Button>
                    )
                  })
                }
                </Radio.Group>
              )
            }
          )
        }
        <div className='actions'>
          <Button 
            className='button'
            type="primary" 
            shape="round" 
            disabled={!(selectedMenuLength === menus.length)}
            onClick={onSubmit}
          >
            Add order
          </Button>
          <Button 
            className='button' 
            type="secondary" 
            shape="round" 
            onClick={onClear}
          >
            Clear list
          </Button>
        </div>
      </div>
      <div className='container'>
        <Title level={2}>Recent Orders:</Title>
        <List
          size='small'
          dataSource={orderList}
          renderItem={(orders, idx) => (
            <Item>
              <ol>
                {
                  Object.keys(orders).map((order, idx) => <li key={idx}>{orders[order].value}</li>)
                }
              </ol>
            </Item>
          )}
          pagination={{
            defaultPageSize: DEFAULT_PAGE_ITEMS,
          }}
        />
      </div>
    </div>
  )
}

export default App;
