import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import {
    CheckCircleIcon,
    ChartBarIcon,
    BellAlertIcon,
    FireIcon
} from '@heroicons/react/24/outline';

export default function Stats({ tasks }) {
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        pending: 0,
        onTime: 0
    });

    useEffect(() => {
        if (!tasks) return;

        const total = tasks.length;
        const completedTasks = tasks.filter(task => task.category === "Done");
        const pendingTasks = tasks.filter(task => task.category === "To-Do" || task.category === "In Progress");

        const today = new Date().toISOString().split("T")[0];
        const onTimeCompleted = completedTasks.filter(task => task.date.split("T")[0] <= today);

        setStats({
            total,
            completed: completedTasks.length,
            pending: pendingTasks.length,
            onTime: onTimeCompleted.length
        });
    }, [tasks]);

    const StatsCard = ({ icon: Icon, title, value, bgColor, textColor }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
            <div className="flex items-center gap-4">
                <div className={`${bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${textColor}`} />
                </div>
                <div>
                    <p className="text-sm text-gray-600">{title}</p>
                    <motion.h3
                        key={value}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold text-gray-900"
                    >
                        {value}
                    </motion.h3>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatsCard
                icon={ChartBarIcon}
                title="Total Tasks"
                value={stats.total}
                bgColor="bg-blue-100"
                textColor="text-blue-600"
            />
            <StatsCard
                icon={CheckCircleIcon}
                title="Completed"
                value={stats.completed}
                bgColor="bg-green-100"
                textColor="text-green-600"
            />
            <StatsCard
                icon={BellAlertIcon}
                title="Pending"
                value={stats.pending}
                bgColor="bg-yellow-100"
                textColor="text-yellow-600"
            />
            <StatsCard
                icon={FireIcon}
                title="Completed On Time"
                value={stats.onTime}
                bgColor="bg-orange-100"
                textColor="text-orange-600"
            />
        </div>
    );
}
