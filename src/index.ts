interface TodoItem {
    id: number;
    task: string;
    completed: boolean;
    dueDate: Date;
}

class TodoList {
    private todos: TodoItem[] = [];
    private nextId: number = 1;

    // Add a new Todo with error handling
    addTodo(task: string, dueDate: Date): void {
        if (!task.trim()) {
            console.log("❌ Error: Task description cannot be empty.");
            return;
        }

        if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
            console.log("❌ Error: Invalid due date.");
            return;
        }

        if (this.todos.some(todo => todo.task.toLowerCase() === task.toLowerCase())) {
            console.log(`❌ Error: Task "${task}" already exists.`);
            return;
        }

        this.todos.push({
            id: this.nextId++,
            task,
            completed: false,
            dueDate
        });
        console.log(`✅ Added: "${task}"`);
    }

    
    completeTodo(id: number): void {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            console.log(`❌ Error: Todo with ID ${id} not found.`);
            return;
        }

        if (todo.completed) {
            console.log(`❌ Error: Task "${todo.task}" is already completed.`);
            return;
        }

        todo.completed = true;
        console.log(`✅ Completed: "${todo.task}"`);
    }

    // Remove a Todo with error handling
    removeTodo(id: number): void {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) {
            console.log(`❌ Error: Todo with ID ${id} not found.`);
            return;
        }

        const removed = this.todos.splice(index, 1);
        console.log(`🗑️ Removed: "${removed[0].task}"`);
    }

    
    listTodos(): TodoItem[] {
        if (this.todos.length === 0) {
            console.log("📋 No todos available.");
            return [];
        }

        console.log("\n📌 Your Todo List:");
        this.todos.forEach(todo => {
            console.log(`${todo.id}. ${todo.task} - ${todo.completed ? "✅ Completed" : "❌ Pending"} (Due: ${todo.dueDate.toDateString()})`);
        });
        
        return this.todos;
    }

    
    filterTodos(completed: boolean): TodoItem[] {
        return this.todos.filter(todo => todo.completed === completed);
    }

    // Update a Todo with error handling
    updateTodo(id: number, newTask: string): void {
        if (!newTask.trim()) {
            console.log("❌ Error: Task description cannot be empty.");
            return;
        }

        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            console.log(`❌ Error: Todo with ID ${id} not found.`);
            return;
        }

        todo.task = newTask;
        console.log(`📝 Updated ID ${id}: "${newTask}"`);
    }

    
    clearCompleted(): void {
        const completedTodos = this.todos.filter(todo => todo.completed);
        if (completedTodos.length === 0) {
            console.log("📌 No completed tasks to clear.");
            return;
        }

        this.todos = this.todos.filter(todo => !todo.completed);
        console.log(`🗑️ Cleared ${completedTodos.length} completed task(s).`);
    }
}

// Example usage
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
