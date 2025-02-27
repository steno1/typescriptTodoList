// Define the TodoItem interface
interface TodoItem {
    id: number;
    task: string;
    completed: boolean;
    dueDate: Date;
}


class TodoList {
    private todos: TodoItem[] = [];
    private nextId: number = 1; 

    // Add new Item
    addTodo(task: string, dueDate: Date): void {
        this.todos.push({
            id: this.nextId++,
            task,
            completed: false,
            dueDate
        });
        console.log(`Added: "${task}"`);
    }

    // Mark a todo item as completed
    completeTodo(id: number): void {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = true;
            console.log(`Completed: "${todo.task}"`);
        } else {
            console.log(`Todo with ID ${id} not found.`);
        }
    }

    // Remove a todo item
    removeTodo(id: number): void {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            const removed = this.todos.splice(index, 1);
            console.log(`Removed: "${removed[0].task}"`);
        } else {
            console.log(`Todo with ID ${id} not found.`);
        }
    }

    // List all 
    listTodos(): void {
        if (this.todos.length === 0) {
            console.log("No todos available.");
            return;
        }
        this.todos.forEach(todo => {
            console.log(`${todo.id}. ${todo.task} - ${todo.completed ? "✅ Completed" : "❌ Pending"} (Due: ${todo.dueDate.toDateString()})`);
        });
    }

    
    filterTodos(completed: boolean): TodoItem[] {
        return this.todos.filter(todo => todo.completed === completed);
    }

    // Update 
    updateTodo(id: number, newTask: string): void {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.task = newTask;
            console.log(`Updated ID ${id}: "${newTask}"`);
        } else {
            console.log(`Todo with ID ${id} not found.`);
        }
    }

    
    clearCompleted(): void {
        const beforeClear = this.todos.length;
        this.todos = this.todos.filter(todo => !todo.completed);
        console.log(`Cleared ${beforeClear - this.todos.length} completed tasks.`);
    }
}

// Example usage in terminal
const myTodos = new TodoList();
myTodos.addTodo("Finish TypeScript project", new Date("2025-03-01"));
myTodos.addTodo("Read a new book", new Date("2025-03-05"));
myTodos.listTodos();
myTodos.completeTodo(1);
myTodos.listTodos();
myTodos.updateTodo(2, "Read two new books");
myTodos.listTodos();
myTodos.clearCompleted();
myTodos.listTodos();
