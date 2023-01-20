import { Button } from '@hilla/react-components/Button';
import { Checkbox } from "@hilla/react-components/Checkbox.js";
import { TextField } from '@hilla/react-components/TextField';
import { useEffect, useState } from 'react';
import { EndpointValidationError } from '@hilla/frontend';
import { TodoEndpoint } from 'Frontend/generated/endpoints';
import Todo from 'Frontend/generated/com/example/application/Todo';
import { FormikErrors, useFormik } from 'formik';

// import {useMutation, useQuery, useQueryClient} from "react-query";

export default function TodoView(){

  // const queryClient = useQueryClient();
  // const todosQuery = useQuery('todos', TodoEndpoint.findAll);
  // const todoMutation = useMutation(TodoEndpoint.save, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('todos')
  //     setTask('');
  //   }
  // });
  
    const empty: Todo = { task: '', deskripsi: '', done: false };

    const [todos, setTodos] = useState(Array<Todo>)
    const [task, setTask] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [error, setError] = useState("");

    useEffect(() => {
        // (async () => {
        //     setTodos(await TodoEndpoint.findAll());
        // })();

        // return () => {};

        TodoEndpoint.findAll().then(setTodos);

    },[])

    const createForm = useFormik({
      initialValues: empty,
      onSubmit: async (value: Todo, { setSubmitting, setErrors }) => {
        try {
          const saved = (await TodoEndpoint.save(value)) ?? value;
          setTodos([...todos, saved]);
          // createForm.resetForm();
        } catch (e: unknown) {
          if (e instanceof EndpointValidationError) {
            const errors: FormikErrors<Todo> = {};
            for (const error of e.validationErrorData) {
              if (typeof error.parameterName === 'string' && error.parameterName in empty) {
                const key = error.parameterName as string & keyof Todo;
                errors[key] = error.message;
              }
            }
            setErrors(errors);
          }
        } finally {
          setSubmitting(false);
        }
      },
    });

  async function changeStatus(todo: Todo, done: Todo['done']) {
    const newTodo = { ...todo, done: done };
    const saved = (await TodoEndpoint.save(newTodo)) ?? newTodo;
    setTodos(todos.map((item) => (item.id === todo.id ? saved : item)));
  }

  async function updateTask(todo: Todo, task: Todo['task']) {
    if (todo.task == task) return;

    const newTodo = { ...todo, task };
    const saved = (await TodoEndpoint.save(newTodo)) ?? newTodo;
    setTodos(todos.map((item) => (item.id === todo.id ? saved : item)));
  }

  async function deleteTodo(todo: Todo) {
    const deletedTodoId = await TodoEndpoint.delete(todo);
    if (deletedTodoId) {
      setTodos(todos.filter((t) => t.id != deletedTodoId));
    }
  }

  return (
    <>
      <div className="m-l">
      <h1>Todo Task</h1>
      <div className="flex gap-s mb-l">
        <TextField
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}/>
        <TextField
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}/>
        <Button theme="primary" disabled={createForm.isSubmitting} onClick={createForm.submitForm}>
          Add
        </Button>
      </div>
      {todos?.map((todo) => (
        <div className="flex gap-s" key={todo.id}>
            <Checkbox
              name="done"
              checked={todo.done}
              onCheckedChanged={({ detail: { value } }) => changeStatus(todo, value)}/>
            <TextField
              name="task"
              value={todo.task}
              onBlur={(e: any) => updateTask(todo, e.target.value)}
            />
            <Button onClick={() => deleteTodo(todo)}>X</Button>
          </div>
        ))}
      </div>
    </>
  );
}
