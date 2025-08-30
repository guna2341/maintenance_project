import { Skeleton } from '@heroui/skeleton';
import { Active, Inactive, Maintenance } from '../assets';
import { Chip } from '@heroui/chip';

export const StateCard = (
    {
        states,
        item,
        className,
        chipClassname,
        loading
    }
) => {


    function getIcon(state) {
        switch (state) {
            case "active":
                return <Active />;
            case "inactive":
                return <Inactive />;
            case "maintenance":
                return <Maintenance />;
            default:
                return <Inactive />;
        }
    }

    function getBg(state) {
        switch (state) {
            case "active":
                return "bg-custom-400/15";
            case "inactive":
                return "bg-custom-500/15";
            case "maintenance":
                return "bg-custom-200/15";
            default:
                return "bg-custom-500/15";
        }
    }

    return (
        <div
            className={`border font-poppins flex flex-col text-normal text-xs sm:text-sm w-full h-full text-custom-300 border-black/10 py-2 px-3 rounded-xl gap-2 ${className}`}
        >
            {item[0]?.toUpperCase() + item?.substring(1)}
            <div className={`flex gap-2 items-center h-full justify-between font-poppins font-medium text-md sm:text-xl ${chipClassname}`}>
                {loading ? <Skeleton
                className='w-6 h-5 rounded-full'
                />
                    :
                    states?.[item]
                }
                <Chip
                    className={`${getBg(item)} p-0 hidden sm:inline-flex`}
                >
                    {getIcon(item)}
                </Chip>
            </div>
        </div>)
}
