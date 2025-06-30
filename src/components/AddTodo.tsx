
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1 border-gray-300 focus:border-blue-500"
      />
      <Button 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4"
        disabled={!inputValue.trim()}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default AddTodo;
