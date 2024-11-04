
import notebook from "../data/notebook.json";

export default function NotebookList() {
    return (
        <>
            <ul className="flex flex-col gap-4 my-5 ml-10 overflow-x-hidden h-[22rem]">
                <li className="cursor-pointer flex font-bold items-center">
                    <img
                        src="/notebook-grad.png"
                        className="h-6 mr-5"
                    />
                    <span className="bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent">
                        Notebook
                    </span>
                </li>
                {notebook.map((e, i) => {
                    return (
                        <li
                            key={i}
                            className="cursor-pointer flex font-bold items-center"
                        >
                            <img
                                src="/notebook-white.png"
                                className="h-6 mr-5"
                            />
                            <span className="text-white">{e.name}</span>
                        </li>
                    );
                })}
            </ul>
        </>
    )
}