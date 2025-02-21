import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { User, LogIn, LogOut, Settings } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import Spinner from '@/Spinner/Spinner';

const UserDropdown = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterForm, setIsRegisterForm] = useState(false);
    const { user, creteUser, loginUser, updateUserProfile, loading, logOut, setLoading } = useAuth()
    const navigate = useNavigate()



    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
        setIsRegisterForm(false);
    };

    const handleRegisterClick = (value) => {
        setIsRegisterForm(value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries());
        try {
            if (isRegisterForm) {
                await toast.promise(creteUser(formValues.email, formValues.password), {
                    loading: "Creating account...",
                    success: <b>Signed up successfully!</b>,
                    error: <b>Could not signup.</b>,

                });
                await updateUserProfile(formValues.name, formValues?.photo);
                const userInfo = {
                    name: formValues.name,
                    email: formValues.email,
                    createdAt: new Date().toISOString().split('T')[0]
                }
                setIsLoginModalOpen(false)
                console.log(userInfo);
                // await axiosSecure.post('/users', userInfo)
                e.target.reset()
                // setLoading(false)
                // navigate('/')
                return
            }
            await toast.promise(loginUser(formValues.email, formValues.password), {
                loading: "Signing in account....",
                success: <b>Signed in Successfully!</b>,
                error: <b>Could not sign in</b>
            })
            e.target.reset()
            setIsLoginModalOpen(false)
            navigate('/')
            // console.log(isRegisterForm ? 'Register' : 'Login', 'form submitted');
        } catch (error) {
            console.error("Authentication error:", error);
            toast.error(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }


    const handleLogout = async () => {
        await toast.promise(logOut(), {
            loading: "Signing Out...",
            success: <b>Logged Out Successfully!</b>,
            error: <b>Unable to Log Out. Try Again!</b>
        })
    }



    return (
        <div className="p-4 border-t border-gray-800">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full flex justify-start">
                        <User className="mr-2 h-5 w-5" />
                        <span>{user ? user.displayName : "User"}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">


                    <DropdownMenuItem>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `flex items-center w-full px-2 py-1 rounded-md ${isActive ? "bg-gray-700" : "hover:text-base-100"}`
                            }
                        >
                            <User className="mr-2 h-4 w-4" /> Profile
                        </NavLink>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `flex items-center w-full px-2 py-1 rounded-md ${isActive ? "bg-gray-700" : "hover:text-base-100"}`
                            }
                        >
                            <Settings className="mr-2 h-4 w-4" /> Settings
                        </NavLink>
                    </DropdownMenuItem> */}
                    {
                        user && user?.email ?
                            <DropdownMenuItem>
                                <NavLink
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-2 py-1 rounded-md hover:bg-red-600"
                                >
                                    <LogOut className="mr-2 h-4 w-4" /> Log out

                                </NavLink>
                            </DropdownMenuItem>

                            :
                            <DropdownMenuItem onClick={handleLoginClick}>
                                <LogIn className="mr-2 h-4 w-4" />
                                <span>Login</span>
                            </DropdownMenuItem>
                    }

                </DropdownMenuContent>

            </DropdownMenu>

            <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
                {
                    loading ? <Spinner></Spinner> :
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{isRegisterForm ? 'Register' : 'Login'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                {isRegisterForm && (
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        required
                                    />
                                )}
                                <Input
                                    type="email"
                                    name="email"

                                    placeholder="Email"
                                    required
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                />

                                <Button type="submit" className="w-full">
                                    {isRegisterForm ? 'Register' : 'Login'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="link"
                                    onClick={() => handleRegisterClick(!isRegisterForm)}
                                    className="w-full"
                                >
                                    {isRegisterForm ? 'Already have an account? Login' : 'Create an account'}
                                </Button>
                            </form>
                        </DialogContent>
                }
            </Dialog>
        </div>
    );
};

export default UserDropdown;