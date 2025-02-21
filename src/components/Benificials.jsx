import { TiTickOutline } from "react-icons/ti";
const Benificials = () => {
    return (
        <div className="my-10 w-11/12 mx-auto">
            <h3 className="text-center text-3xl font-semibold">Who Benefits Most</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-5">
                <div data-aos="fade-up" className="shadow border p-5">
                    <h2 className="text-2xl font-bold">Developers</h2>
                    <p className="mt-1">Explore efficient project management and collaboration tools tailored to your coding workflow.</p>
                    <ul className="mt-2">
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Project Planning</span></li>
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Daily Task Planning</span></li>
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Deployment Workflows</span></li>
                    </ul>
                </div>
                <div data-aos="fade-up" className="shadow border p-5">
                    <h2 className="text-2xl font-bold">Corporate Professionals</h2>
                    <p className="mt-1">Streamline daily tasks and project coordination for seamless team collaboration.</p>
                    <ul className="mt-2">
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Meeting time manage</span></li>
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Project workflow</span></li>
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Project planning</span></li>
                    </ul>
                </div>
                <div data-aos="fade-up" className="shadow border p-5">
                    <h2 className="text-2xl font-bold">Bankers</h2>
                    <p className="mt-1">Enhance organization and productivity in financial planning and task execution.</p>
                    <ul className="mt-2">
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Time management</span></li>
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Document planning</span></li>
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Working planning</span></li>
                    </ul>
                </div>
                <div data-aos="fade-up" className="shadow border p-5">
                    <h2 className="text-2xl font-bold">Freelancers</h2>
                    <p className="mt-1">Streamline client projects, manage tasks, and track project progress with ease.</p>
                    <ul className="mt-2">
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Project Planning</span></li>
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Daily Task Planning</span></li>
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Client Meeting</span></li>
                    </ul>
                </div>
                <div data-aos="fade-up" className="shadow border p-5">
                    <h2 className="text-2xl font-bold">Students</h2>
                    <p className="mt-1">Organize coursework, collaborate on group projects, and manage deadlines effectively.</p>
                    <ul className="mt-2">
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Study planing</span></li>
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Time management</span></li>
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Study workflow</span></li>
                    </ul>
                </div>
                <div data-aos="fade-up" className="shadow border p-5">
                    <h2 className="text-2xl font-bold">Entrepreneurs and Startups</h2>
                    <p className="mt-1">Scale your business by managing tasks, timelines, and team collaboration in one central hub.</p>
                    <ul className="mt-2">
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Project Planning</span></li>
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Daily Task Planning</span></li>
                        <li className="flex items-center gap-1 mt-1"><TiTickOutline /><span>Client Meeting</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Benificials;