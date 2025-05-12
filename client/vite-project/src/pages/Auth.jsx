import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUserId,setUserToken } from "../redux/slice/userSlice"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import React, { useState } from "react"
import axios from "axios"
export function Auth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [signup, setSignup] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const handleSignup = async (e) => {
        e.preventDefault()
        console.log("signup",signup)
        await axios.post(`${process.env.baseUrl}/register`, signup, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error.message)
            if (error.response) {
                console.log('Status:', error.response.status);
                console.log('Data:', error.response.data);
                console.log('Headers:', error.response.headers);
            } else if (error.request) {
                console.log('Request:', error.request);
            } else {
                console.log('Error Message:', error.message);
                console.log('Error Stack:', error.stack);
            }
            console.log('Config:', error.config);
        })
    }



    const handleLogin = async (e, req, res) => {
        e.preventDefault()
         console.log("login",login)
        await axios.post(`${process.env.baseUrl}/login`, login, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res.data)
            dispatch(setUserId(res.data.user._id))
            dispatch(setUserToken(res.data.token))
            navigate("/")
        }).catch((error) => {
            console.log(error.message)
            if (error.response) {
                console.log('Status:', error.response.status);
                console.log('Data:', error.response.data);
                console.log('Headers:', error.response.headers);
            } else if (error.request) {
                console.log('Request:', error.request);
            } else {
                console.log('Error Message:', error.message);
                console.log('Error Stack:', error.stack);
            }
            console.log('Config:', error.config);
        })


    }

    return (
        <div className="flex flex-row mt-32 mb-32 mx-auto items-center justify-center">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={signup.name}
                                    onChange={(e) => setSignup({ ...signup, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Email</Label>
                                <Input
                                    id="email"
                                    name="name"
                                    value={signup.email}
                                    onChange={(e) => setSignup({ ...signup, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="name">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    value={signup.password}
                                    onChange={(e) => setSignup({ ...signup, password: e.target.value })}

                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={signup.confirmPassword}
                                    onChange={(e) => setSignup({ ...signup, confirmPassword: e.target.value })}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSignup}>Signup</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={login.email}
                                    onChange={(e) => setLogin({ ...login, email: e.target.value })}

                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={login.password}
                                    onChange={(e) => setLogin({ ...login, password: e.target.value })}

                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleLogin}>Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>

    )
}
