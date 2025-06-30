
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
            My Tasks
          </CardTitle>
          <p className="text-gray-600">
            {completedCount} of {totalCount} tasks completed
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <AddTodo onAdd={addTodo} />
          
          <div className="space-y-2">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No tasks yet!</p>
                <p className="text-gray-400">Add your first task above</p>
              </div>
            ) : (
              todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoApp;
