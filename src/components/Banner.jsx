import banner from '../assets/banner.jpg';
const Banner = () => {
    return (
        <div>
            <div className='w-full h-[760px] relative'>
                <img className='h-full w-full object-cover object-top' src={banner} alt="" />
                <div className='absolute top-0 w-full h-full bg-[#006d77cc]'>
                    <div className='flex justify-end items-center h-full'>
                    <div className='w-2/3'>
                    <h2 className='text-6xl px-10 font-bold text- text-right leading-normal bg-[#83C5BE} text-[#ffffff] mr-10'>Effortless Task Management with Spark Tasker.</h2>
                    <div className='text-end mt-5'>
                    <button className='px-5 py-3 mr-20 text-lg text-black rounded-md font-semibold bg-[#ffffff]'>{`Let’s Explore`}</button>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;