import Lottie from 'lottie-react';
import animationData from '@/assets/lottie/loading.json';
const Loader = () => {
  return (
    <div className="z-70 fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-white bg-opacity-70">
      <div className="w-60">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
