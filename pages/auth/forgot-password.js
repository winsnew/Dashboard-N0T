import { useState } from "react";
import Button from "../../components/CMS/mol/button";
import Input from "../../components/CMS/mol/input";
import InputError from "../../components/CMS/mol/inputerr";
import Label from "../../components/CMS/mol/label";
import { useAuth } from "../../hooks/auth";
import AuthSessionStatus from "./authsession";

const Page = () => {
    const {forgotPassword} = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/login',
    })

    const [email,setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()
        forgotPassword({email, setErrors, setStatus})
    }

    return (
        <div className="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
            <div className="flex flex-col justify-center">
            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                email address and we will email you a password reset link that
                that will allow you to choose a new one.
            </div>

            {/* Session Status */}
            <AuthSessionStatus className="mb-4" status={status} />

            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />

                    <InputError messages={errors.email} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button>Email Password Reset Link</Button>
                </div>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Page