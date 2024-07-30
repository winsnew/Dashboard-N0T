import InputError from "../components/mol/inputerr";
import axios from "../lib/axios";
import InputField from "../components/mol/input";
import { useRouter } from "next/router";
import { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signin", formData,{
        body: JSON.stringify(formData),
      });
      const data = res.data;

      if (!data.success) {
        setErrorMessage(data.message);
        setLoading(false);
        return;
      }

      // Simpan token JWT di localStorage atau cookie
      localStorage.setItem("token", data.token);

      setLoading(false);
      router.push("/dashboard/main");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex w-full">
        <form className="flex flex-wrap justify-center w-full" onSubmit={handleSubmit}>
          {/* Email Address */}
          <div className="mt-[15vh] w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            {/* Email */}
            <InputField
              label="Email"
              extra="mb-3"
              placeholder="mail@simmmple.com"
              id="email"
              type="email"
              required
              autoFocus
              onChange={handleChange}
            />
            {errorMessage && <InputError className="mt-2" message={errorMessage} />}
            {/* Password */}
            <InputField
              extra="mb-3"
              label="Password"
              placeholder="Min. 8 characters"
              id="password"
              type="password"
              required
              onChange={handleChange}
            />
            {errorMessage && <InputError className="mt-2" message={errorMessage} />}
            {/* Checkbox */}
        
            <button type="submit" className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              Sign In
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
