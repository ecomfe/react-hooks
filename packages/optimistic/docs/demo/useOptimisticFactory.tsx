import React from 'react';
import {Input, Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useOptimisticFactory, useOptimisticState, useOptimisticTask} from '@huse/optimistic';


export default () => {
    const saveTodo = async (payload) => {
        setTimeout(() => { 
            return {
                id: Math.floor(Math.random()*10),
                text: payload
            }
        },1000)
    }
    const uid = () => Math.floor(Math.random()*10);
    const factory = ({type, payload}) => {
        switch (type) {
            case 'DELETE':
                return items => {
                    const index = items.findIndex(i => i.id === payload);
                    return [
                        ...items.slice(0, index),
                        {...items[index], deleted: true},
                        ...items.slice(index + 1),
                    ];
                };
            case 'CREATE':
                return [
                    function* create() {
                        // Await an async api call
                        const newTodo = yield saveTodo(payload);
                        // Insert the returned new todo to list, with pending set to false
                        yield items => [
                            ...items,
                            {...newTodo, pending: false, deleted: false},
                        ];
                    },
                    items => [
                        ...items,
                        // Insert an optimistic item with property pending set to true,
                        // this item will be removed after saveTodo resolves
                        {id: uid(), text: payload, pending: true, deleted: false},
                    ],
                ];
            default:
                return s => s;
        }
    };
    const [todos, dispatch] = useOptimisticFactory(factory, []);
    const renderTodo = ({ id, text, pending, deleted }) => {
        console.log('id----->',id);
        console.log('text----->',text);
        const textStyle = {
            flex: 1,
            textDecoration: deleted ? 'line-through' : undefined,
        };
        const actionStyle = {
            color: pending ? '#d9d9d9' : '#1a90ff',
        };
        const deleteTodo = (pending || deleted) ? undefined : () => dispatch({type: 'DELETE', paylaod: id});
        return (
            <li key={Date.now()} style={{display: 'flex'}}>
                <span style={textStyle}>{text}</span>
                <span style={actionStyle} onClick={deleteTodo}>{pending ? 'pending' : 'delete'}</span>
            </li>
        );
    };
    console.log('todos--->',todos);
    return (
        <>
            <ul>
                {todos.map(renderTodo)}
            </ul>
            <Input.Search
                placeholder="What to do..."
                enterButton="Add Todo"
                onSearch={value => dispatch({type: 'CREATE', payload: value})}
            />
        </>
    );
};