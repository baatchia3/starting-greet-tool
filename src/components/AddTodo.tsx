
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface AddTodoProps {
  onAdd: (text: string, type: 'daily' | 'monthly' | 'yearly') => void;
}

const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [inputValue, setInputValue] = useState("");
  const [taskType, setTaskType] = useState<'daily' | 'monthly' | 'yearly'>('daily');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue, taskType);
      setInputValue("");
      setTaskType('daily');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a new task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-white"
        />
        <Select value={taskType} onValueChange={(value: 'daily' | 'monthly' | 'yearly') => setTaskType(value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4"
          disabled={!inputValue.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default AddTodo;
