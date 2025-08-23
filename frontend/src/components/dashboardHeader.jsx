import { Search } from '../assets';
import { InputComponent } from './input';

export const DashboardHeader = ({ onChange }) => {
    return (
        <header className='flex w-full items-center justify-between pl-2'>
            <p className='font-poppins font-semibold text-xl'>
                Blocks
            </p>
            <div>
                <InputComponent
                    placeholder={"Search..."}
                    startContent={<span><Search /></span>}
                    onchange={onChange}
                    classname={{
                        inputWrapper: "bg-white border rounded-full border-black/10 min-w-[238px] shadow-none",
                        innerWrapper: "gap-1"
                    }}
                />
            </div>
        </header>
    )
}
