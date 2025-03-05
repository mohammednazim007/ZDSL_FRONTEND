import dynamic from "next/dynamic";

const AllBank = dynamic(() => import('@/components/AllBank/AllBank'), { ssr: false });
const page = () => {
    return (
        <div>
            <AllBank  />
        </div>
    )
}

export default page