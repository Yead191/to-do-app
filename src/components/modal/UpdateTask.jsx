import useAuth from '@/hooks/useAuth';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const categories = ['To-Do', 'In Progress', 'Done'];

const UpdateTask = ({ isModalOpen, setIsModalOpen, task }) => {
    // console.log(task);
    const { user } = useAuth();
    const [newTask, setNewTask] = useState({
        title: task.title ,
        description: task.description ,
        date: task.date ,
        category: task.category,
    });

    const addTask = async () => {
        // Add task logic here
    };

    return (
        <div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Task</DialogTitle>
                    </DialogHeader>
                    {user ? (
                        <div className="space-y-4">
                            {/* Task Title */}
                            <Input
                                placeholder="Title (required, max 50 characters)"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                maxLength={50}
                            />
                            {/* Task Description */}
                            <Textarea
                                placeholder="Description (optional, max 200 characters)"
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                maxLength={200}
                            />
                            {/* Task Date */}
                            <Calendar
                                mode="single"
                                selected={newTask.date}
                                onSelect={(date) => {
                                    if (date) {
                                        setNewTask({ ...newTask, date });
                                    }
                                }}
                            />
                            {/* Task Category */}
                            <Select
                                value={newTask.category}
                                onValueChange={(value) => setNewTask({ ...newTask, category: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {/* Add Task Button */}
                            <Button onClick={addTask}>Add Task</Button>
                        </div>
                    ) : (
                        <p className='text-red-400'>Please Login to Add New Task</p>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateTask;