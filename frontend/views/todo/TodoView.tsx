import { Button } from '@hilla/react-components/Button';
import { TextField } from '@hilla/react-components/TextField';
import { useEffect, useState } from 'react';

export function TodoView(){
    const [todos, setTodos] = useState<Todo[]>
    const [task, setTask] = useState<Todo>

    useEffect(() => {
        TodoEnpoint.findAll().then(setTodos)
    },[])
    
    async function addTodo(){
        const saved = TodoEnpoint.add(task)
        if (saved){
            setTodos[
                ...todos, saved
            ]
            setTask("");
        }
    }

    async function updateTodo(todo: Todo, done: Boolean){
        const saved = TodoEnpoint.update({
            ...todo, done
        })
        if (saved){
            setTodos(
                todos.map(existing => existing.id === saved.id ? saved : existing)
            )
            setTask("");
        }
    }

    return (
        <div className='p-m'>
            <h1>Hilla Cool todo!</h1>

            <div className='flex gap-s'>
                <TextField value={task} onChange={
                    e => setTask(e.target.value)
                }></TextField>
                <Button theme='primary' onClick={addTodo}>Add</Button>
            </div>

            { todos.map(todo => {
                <div key={todo.id}>
                    <Checkbox checked={todo.done} onCheckedChanged={
                        e => updateTodo(todo, e.)
                    }/>
                    <span>{todo.task}</span>
                    <span>{todo.deskripsi}</span>
                </div>
            })

            }

        </div>
    );
}