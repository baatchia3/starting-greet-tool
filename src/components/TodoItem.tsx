
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Todo } from "./TodoApp";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'monthly':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'yearly':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
      />
      
      <div className="flex-1 flex items-center gap-2">
        <span
          className={`${
            todo.completed
              ? "line-through text-gray-500 dark:text-gray-400"
              : "text-gray-800 dark:text-gray-100"
          }`}
        >
          {todo.text}
        </span>
        <Badge className={`text-xs px-2 py-1 ${getTypeColor(todo.type)}`}>
          {todo.type}
        </Badge>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TodoItem;
