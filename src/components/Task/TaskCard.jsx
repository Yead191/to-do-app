import { useDraggable } from "@dnd-kit/core";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Grip, Trash, Edit, Calendar } from "lucide-react";
import UpdateTask from "../modal/UpdateTask";
import { Badge } from "../ui/badge";

const TaskCard = ({ task, refetch }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: task._id,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isChecked, setIsChecked] = useState(task.category === 'Done');
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
    const dropdownRef = useRef(null);
    const axiosPublic = useAxiosPublic();
    const [selectedTask, setSelectedTask] = useState({})
    // console.log(selectedTask);

    const handleCheckboxChange = async (event) => {
        event.stopPropagation();

        const updatedCategory = event.target.checked ? 'Done' : 'To-Do';

        if (task.category !== updatedCategory) {
            try {
                await axiosPublic.put(`/tasks/${task._id}`, { category: updatedCategory });
                setIsChecked(event.target.checked);
                toast.success('Task marked as done!');
                refetch();
            } catch (error) {
                toast.error('Failed to update task category.');
            }
        }
    };


    const handleRightClick = (event) => {
        event.preventDefault();


        setDropdownPosition({ x: event.clientX, y: event.clientY });
        setShowDropdown(true);
    };


    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };


    useState(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleDelete = async () => {
        try {
            await toast.promise(axiosPublic.delete(`/tasks/${task._id}`), {
                loading: 'Deleting Task...',
                success: <b>Task deleted successfully!</b>,
                error: <b>Failed to delete task.</b>
            })
            refetch();
        } catch (error) {
            toast.error('Failed to delete task.');
        }
    };


    const handleUpdate = (task) => {
        // toast('Update functionality not implemented yet.');
        // console.log(task);
        setSelectedTask(task)
        setIsModalOpen(true)
    };

    return (
        <div
            ref={setNodeRef}
            className={`p-2 border rounded-lg transition-all duration-200 ease-in-out ${isDragging ? 'opacity-50 scale-95' : ''}`}
            onContextMenu={handleRightClick}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">

                    <button
                        ref={setNodeRef}
                        {...listeners}
                        className=""
                    >
                        <Grip size={20} />
                    </button>


                    {/* <div className="flex items-center gap-4"> */}

                    <div>

                        <h3 className="text-lg font-medium">{task.title}</h3>
                        <p className="text-slate-600 text-sm">{task.description}</p>
                        <p className="text-xs mt-1">Created: {new Date(task.timestamp).toLocaleDateString()} </p>
                    </div>
                    {/* </div> */}
                </div>

                <div className="flex items-center gap-2">

                    <Badge className={'flex gap-1 items-center'}>

                      <Calendar size={14}  />  {new Date(task.date).toLocaleDateString()}
                    </Badge>


                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="form-checkbox cursor-pointer"
                    />
                </div>
            </div>

            {/* Dropdown menu */}
            {showDropdown && (
                <div
                    ref={dropdownRef}
                    className="absolute bg-white border rounded-lg shadow-lg mt-2 z-50"
                    style={{
                        top: `${dropdownPosition.y}px`,
                        left: `${dropdownPosition.x}px`,
                    }}
                >
                    <button
                        onClick={() => handleUpdate(task)} // Pass the task data
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        <Edit size={16} /> Update
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                        <Trash size={16} /> Delete
                    </button>
                </div>
            )}
            {/* UpdateTask modal */}
            <UpdateTask
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                task={selectedTask}
                refetch={refetch}
            />
        </div>
    );
};

export default TaskCard;