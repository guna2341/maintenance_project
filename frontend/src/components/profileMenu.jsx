import React from 'react'
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { Exit } from '../assets';
import { UseAuthStore } from '../stores';
import { useNavigate } from 'react-router-dom';

export const ProfileMenu = ({ children, isOpen, setIsOpen }) => {
        const email = UseAuthStore(e => e.email);
        const userName = UseAuthStore(e => e.userName);
        const role = UseAuthStore(e => e.role);
        const logout = UseAuthStore(e => e.logout);
        const nav = useNavigate();

    const BASE_URL = import.meta.env.VITE_BASE_URL;

        function handleLogout() {
            logout();
            nav(`/${BASE_URL}/login`);
        }
    return (
        <div
        >
            <Popover
                isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}
                placement="bottom-end"
                classNames={{
                trigger:"aria-expanded:opacity-100 aria-expanded:scale-[1]"
            }}
            >
                <PopoverTrigger>
                    {children}
                </PopoverTrigger>
                <PopoverContent>
                    <div className='min-w-[250px] flex flex-col'>
                        <div className='w-full py-3 flex items-center'>
                            <Chip
                                className='bg-white cursor-pointer py-[5px] px-0 !h-fit items-center'
                            >
                                <div className='flex items-center gap-2 w-full'>
                                    <div
                                        className='rounded-full font-poppins font-normal text-md sm:text-base min-w-[20px] min-h-[20px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center text-white bg-orange-400'
                                    >
                                        {email[0].toUpperCase()}
                                    </div>
                                </div>
                            </Chip>
                            <div className='w-full flex flex-col gap-0.5'>
                                <div className='text-sm font-semibold w-full flex items-center justify-between'>
                                    {userName}
                                    <span className='font-normal text-xs'>
                                        {role}
                                    </span>
                                </div>
                                <div className='text-xs text-black/30 font-medium'>
                                    {email}
                                </div>
                            </div>
                        </div>
                        <hr className='text-black/10 w-full mb-1' />
                        <Button className='px-4 font-semibold bg-transparent justify-start flex gap-5 text-danger hover:bg-custom-900/10 py-2 mb-1 cursor-pointer rounded-md items-center'
                        onPress={handleLogout}
                        >
                            <span className='rotate-180 text-danger'>
                                <Exit />
                            </span>
                            Sign Out
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
