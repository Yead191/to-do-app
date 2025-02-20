import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AllTask = () => {
    const [tasks, setTasks] = useState([]);
    const [activeView, setActiveView] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        category: 'To-Do'
    });

    const addTask = () => {
        const task = {
            id: tasks.length + 1,
            title: newTask.title,
            description: newTask.description,
            timestamp: new Date().toISOString(),
            category: newTask.category
        };
        setTasks([...tasks, task]);
        setIsModalOpen(false);
        setNewTask({ title: '', description: '', category: 'To-Do' });
    };

    const filterTasks = (view) => {
        setActiveView(view);
        console.log(`Filter tasks: ${view}`);
    };

    return (
        <main className="flex-1 overflow-y-auto p-4">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">{activeView.charAt(0).toUpperCase() + activeView.slice(1)} Tasks</h1>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setIsModalOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" /> Add New Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Task</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input
                                placeholder="Title (required, max 50 characters)"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                maxLength={50}
                            />
                            <Textarea
                                placeholder="Description (optional, max 200 characters)"
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                maxLength={200}
                            />
                            {/* <Select
                                value={newTask.category}
                                onValueChange={(value) => setNewTask({ ...newTask, category: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="To-Do">To-Do</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Done">Done</SelectItem>
                                </SelectContent>
                            </Select> */}
                            <Button onClick={addTask}>Add Task</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="space-y-4">
                {tasks.length === 0 ? (
                    <p>No tasks to display.</p>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="p-4 border rounded-lg">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>{new Date(task.timestamp).toLocaleString()}</p>
                            <p>{task.category}</p>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
};

export default AllTask;