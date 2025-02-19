import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';

const AllTask = () => {
    const [tasks, setTasks] = useState([])
    const [activeView, setActiveView] = useState("all")

    const addTask = () => {
        // Implement add task functionality
        console.log("Add new task")
    }

    const filterTasks = (view) => {
        setActiveView(view)
        // Implement task filtering based on the view
        console.log(`Filter tasks: ${view}`)
    }
    return (
        <main className="flex-1 overflow-y-auto p-4">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">{activeView.charAt(0).toUpperCase() + activeView.slice(1)} Tasks</h1>
                <Button onClick={addTask}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Task
                </Button>
            </div>
            <div className="space-y-4">
                {tasks.length === 0 ? (
                    <p>No tasks to display.</p>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="p-4 border rounded-lg">
                            {task.title}
                        </div>
                    ))
                )}
            </div>
        </main>
    );
};

export default AllTask;