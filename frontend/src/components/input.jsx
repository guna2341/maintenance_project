import { Input } from "@heroui/input";

export const InputComponent = ({
    isReadOnly,
    isInvalid,
    value,
    autofocus,
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
            key={name}
            name={name}
            autoFocus={autofocus}
            value={value ?? ""}
            isReadOnly={isReadOnly}
            errorMessage={errorMessage}
            onChange={onchange}
            isInvalid={isInvalid}
            isRequired={isRequired}
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
