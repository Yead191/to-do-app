import useAuth from '@/hooks/useAuth';
import React, { useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const categories = ['To-Do', 'In Progress', 'Done'];

const UpdateTask = ({ isModalOpen, setIsModalOpen, task, refetch }) => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(task.date);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedDate && new Date(selectedDate) < new Date().setHours(0, 0, 0, 0)) {
            toast.error('You cannot select past date.');
            return;
        }
        const formData = new FormData(e.target);
        const updatedTask = {
            title: formData.get('title'),
            description: formData.get('description'),
            date: selectedDate || task.date,
            category: formData.get('category'),
        };

        try {
            await toast.promise(axiosPublic.patch(`/my-task/update/${task._id}`, updatedTask), {
                loading: 'Updating Task...',
                success: <b>Task Updated Successfully!</b>,
                error: <b>Unable to Update. Try again!</b>
            });
            refetch();
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/*  Title */}
                    <Input
                        name="title"
                        placeholder="Title (required, max 50 characters)"
                        defaultValue={task.title}
                        maxLength={50}
                        required
                    />
                    {/*  Description */}
                    <Textarea
                        name="description"
                        placeholder="Description (optional, max 200 characters)"
                        defaultValue={task.description}
                        maxLength={200}
                    />
                    {/*  Date */}
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                    />
                    {/*  Category */}
                    <Select name="category" defaultValue={task.category}>
                        <SelectTrigger>
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button type="submit">Update Task</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateTask;
