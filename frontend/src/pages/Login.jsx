import background from '../assets/background.webp'
import AuthForm from '../component/AuthForm.jsx'

const Login = () => {
  return (
    <div className='flex h-screen w-full'>
      <div className='w-full md:w-[400px] h-screen bg-[#f0f8ff] flex-none'>
        <AuthForm />
      </div>
      <img src={background} alt='background' className='hidden md:flex h-screen w-full object-cover min-w-0' />
    </div>
  )
}

export default Login
