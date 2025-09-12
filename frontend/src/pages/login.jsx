import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Input } from '@heroui/input';
import React, { useRef, useState } from 'react';
import { Form } from "@heroui/form";
import { CloseEye, OpenEye } from '../assets';
import { UseAuthStore } from '../stores';
import { useNavigate } from 'react-router-dom';
import { addToast } from '@heroui/toast';

const LoginPage = () => {

      const nav = useNavigate();
      const token = UseAuthStore(e => e.token);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
      React.useEffect(() => {
        if (token) {
          nav(`/${BASE_URL}/dashboard`);
        }
        else {
            nav(`/${BASE_URL}/login`)
        }
      },[]);

    const login = UseAuthStore(e => e.login);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState({
        email: false,
        password: false
    });
    const ref = useRef();
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFocus = (field) => {
        setIsFocused(prev => ({
            ...prev,
            [field]: true
        }));
    };

    const handleBlur = (field) => {
        setIsFocused(prev => ({
            ...prev,
            [field]: false
        }));
    };

    function toast(title, description, color) {
        addToast({
            title,
            description,
            variant: "flat",
            color,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await login(formData.email,formData.password);
        if (response?.state) {
            nav(`/${BASE_URL}/dashboard`);
        }
        else {
            toast("Error",response?.message,"danger");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br font-poppins from-blue-50 via-white to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-300 rounded-full opacity-20 blur-xl"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center my-8 transform transition-all duration-500">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2"><span className='text-custom-200'>BIT</span> Maintenance</h1>
                    <p className="text-gray-600">Maintenance Management System</p>
                </div>

                <Card className="shadow-xl border border-gray-100 backdrop-blur-sm bg-white/95"

                >
                    <CardHeader className="flex flex-col gap-3 pb-0 pt-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
                            <p className="text-gray-600 text-sm mt-1">Sign in to access your dashboard</p>
                        </div>
                    </CardHeader>

                    <CardBody className="gap-5 py-6 px-4">
                        <Form onSubmit={handleSubmit} className='w-full'>
                            <div className='w-full h-full flex flex-col gap-4'>
                                <div className="relative">
                                    <Input
                                        type="email"
                                        autoFocus
                                        label="Email Address"
                                        labelPlacement='outside-top'
                                        isRequired
                                        placeholder="Enter your email"
                                        radius='sm'
                                        value={formData.email}
                                        onValueChange={(value) => handleInputChange('email', value)}
                                        onFocus={() => handleFocus('email')}
                                        onBlur={() => handleBlur('email')}
                                        variant="bordered"
                                        size="lg"
                                        classNames={{
                                            input: "text-sm",
                                            inputWrapper: `transition-all h-11 min-h-10 duration-300 ${isFocused.email ? 'border-blue-500 shadow-sm' : 'border-gray-300'} data-[hover=true]:border-blue-400 group-data-[focus=true]:border-blue-500`
                                        }}
                                    />
                                </div>

                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        isRequired
                                        ref={ref}
                                        label="Password"
                                        labelPlacement='outside-top'
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onValueChange={(value) => handleInputChange('password', value)}
                                        onFocus={() => handleFocus('password')}
                                        onBlur={() => handleBlur('password')}
                                        variant="bordered"
                                        size="lg"
                                        radius='sm'
                                        endContent={
                                            <span
                                                className='cursor-pointer'
                                                onClick={() => {
                                                    setShowPassword(!showPassword)
                                                    ref.current.focus();
                                                }}
                                            >
                                                {!showPassword ? <CloseEye /> : <OpenEye />}
                                            </span>
                                        }
                                        classNames={{
                                            input: "text-sm pr-12",
                                            inputWrapper: `transition-all h-11 min-h-10 duration-300 ${isFocused.password ? 'border-blue-500 shadow-sm' : 'border-gray-300'} data-[hover=true]:border-blue-400 group-data-[focus=true]:border-blue-500`
                                        }}
                                    />
                                </div>
                                <div className="flex select-none justify-end text-sm my-2 cursor-pointer">
                                    <span className="relative before:absolute  hover:text-custom-700 transition-all before:w-0 before:content-[''] before:bg-custom-700 before:h-[1px] before:rounded-full before:pb-[2px] pb-[2px] before:bottom-0 hover:before:w-full before:transition-all">
                                        Forgot password?
                                    </span>
                                </div>

                                <Button
                                    color="primary"
                                    size="md"
                                    radius='sm'
                                    type='submit'
                                    isLoading={isLoading}
                                >
                                    <span className='text-base'>
                                        {isLoading ? "Signing in..." : "Sign In"}
                                    </span>
                                </Button>
                            </div>
                        </Form>


                        <div className="text-center select-none">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <span className='text-sm text-custom-700 font-medium'>
                                    Contact your administrator
                                </span>
                            </p>
                        </div>
                    </CardBody>
                </Card>

            </div>
        </div>
    );
};

export default LoginPage;