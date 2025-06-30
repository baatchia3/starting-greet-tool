
import TodoApp from "@/components/TodoApp";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <TodoApp />
      </div>
    </div>
  );
};

export default Index;
