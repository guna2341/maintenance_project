import { Input } from "@heroui/input";

export const InputComponent = ({
    key,
    isReadOnly,
    isInvalid,
    value,
    name,
    errorMessage,
    description,
    label,
    startContent,
    endContent,
    placeholder,
    onchange,
    labelPlacement,
    type = "text",
    classname,
    isRequired = false,
}) => {
    return (
        <Input
            name={name}
            value={value}
            isReadOnly={isReadOnly}
            errorMessage={errorMessage}
            onChange={onchange}
            isInvalid={isInvalid}
            isRequired={isRequired}
            key={key}
            radius="sm"
            description={description}
            label={label}
            labelPlacement={labelPlacement}
            type={type}
            classNames={{
                inputWrapper: "bg-custom-1800 border border-black/10",
                ...classname,
            }}
            placeholder={placeholder}
            startContent={startContent}
            endContent={endContent}
        />
    );
};
