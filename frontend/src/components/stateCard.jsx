import { Active, Inactive, Maintenance } from '../assets';
import { Chip } from '@heroui/chip';

export const StateCard = (
    {
        states,
        item,
        key,
        className,
        chipClassname
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
            key={key}
            className={`border font-poppins flex flex-col text-normal text-sm w-full h-full text-custom-300 border-black/10 py-2 px-3 rounded-xl ${className}`}
        >
            {item[0]?.toUpperCase() + item?.substring(1)}
            <div className={`flex items-center h-full justify-between font-poppins font-medium text-xl ${chipClassname}`}>
                {states?.[item]}
                <Chip
                    className={`${getBg(item)} p-0`}
                >
                    {getIcon(item)}
                </Chip>
            </div>
        </div>)
}
